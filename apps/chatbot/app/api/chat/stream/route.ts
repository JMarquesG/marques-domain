import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/src/lib/auth";
import { supabaseServer } from "@packages/db/src/supabase-server";
import { streamText, stepCountIs } from "ai";
import { openai } from "@ai-sdk/openai";
import OpenAI from "openai";
import { topK } from "@/src/lib/rag";
import { z } from "zod";
import { dollarsFromTokens } from "@/src/lib/pricing";

export const runtime = "nodejs";

function getOpenAI() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
}

async function checkBudgetOrThrow(
  supa: ReturnType<typeof supabaseServer>,
  userId: string
) {
  const { data } = await supa
    .from("token_usage")
    .select("usd_spent")
    .eq("user_id", userId)
    .maybeSingle();
  const spent = Number(data?.usd_spent || 0);
  const ceil = parseFloat(process.env.CHAT_COST_CEIL_USD || "0.30");
  if (spent >= ceil) throw new Error("Budget exceeded");
}

export async function POST(req: NextRequest) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const supa = supabaseServer();
    await checkBudgetOrThrow(supa, user.id);

    const { sessionId, message, messageId } = (await req.json()) as {
      sessionId: string;
      message: string;
      messageId: string;
    };

    // Validate session
    const { data: session } = await supa
      .from("sessions")
      .select("id, user_id, alive")
      .eq("id", sessionId)
      .single();

    if (!session || session.user_id !== user.id || !session.alive) {
      return NextResponse.json({ error: "Invalid session" }, { status: 404 });
    }

    const channelName = `session_${sessionId}`;

    // Store user message
    await supa.from("session_messages").insert({
      session_id: sessionId,
      role: "user",
      content: message,
    });

    // Broadcast that we're starting to process
    await supa.channel(channelName).send({
      type: "broadcast",
      event: "chat",
      payload: {
        type: "start",
        messageId,
      },
    });

    // Get recent conversation history for context
    const { data: recentMessages } = await supa
      .from("session_messages")
      .select("role, content")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: false })
      .limit(10);

    const conversationHistory = (recentMessages || [])
      .reverse()
      .slice(0, -1) // Remove the last message since we just added it
      .map((msg) => ({ role: msg.role as any, content: msg.content }));

    const { data: docs } = await supa
      .from("session_docs")
      .select("id")
      .eq("session_id", sessionId)
      .limit(1);

    const hasDocuments = Array.isArray(docs) && docs.length > 0;
    // System prompt that ensures the model always responds
    const system = `You are a helpful assistant for answering questions about uploaded PDFs. Always respond in English.

When asked about PDF content:
1. Search for relevant information using available tools
2. Analyze the retrieved context
3. Provide a comprehensive answer based on the context
4. Include source citations in format [source](page)

${
  hasDocuments
    ? "You have access to uploaded PDF documents. Use the searchDocuments tool to find relevant information."
    : "No documents have been uploaded yet. You should inform the user they need to upload PDFs to get document-specific answers."
}

IMPORTANT: Always provide a complete answer. If no documents are found, explain that and ask the user to upload relevant PDFs.`;

    console.log(
      `[CHAT] Starting chat for session ${sessionId}, message: "${message.substring(0, 50)}..."`
    );

    // Start streaming the response with correct ai SDK v5 syntax
    const result = await streamText({
        model: openai("gpt-5-mini"),
        stopWhen: stepCountIs(5),
        messages: [
            { role: "system", content: system },
            ...conversationHistory,
            { role: "user", content: message },
        ],
        tools: hasDocuments ? {
            searchDocuments: {
                description: "Search for relevant information in uploaded PDF documents",
                inputSchema: z.object({
                    query: z
                        .string()
                        .describe("The search query to find relevant information"),
                    k: z
                        .number()
                        .int()
                        .min(1)
                        .max(12)
                        .optional()
                        .default(8)
                        .describe("Number of results to retrieve"),
                }),
                execute: async ({ query, k = 8 }) => {
                    const toolId = crypto.randomUUID();

                    console.log(`[TOOL] Searching documents: "${query}" with k=${k}`);

                    // Broadcast tool call start
                    await supa.channel(channelName).send({
                        type: "broadcast",
                        event: "chat",
                        payload: {
                            type: "tool-call",
                            messageId,
                            id: toolId,
                            name: "searchDocuments",
                            args: { query, k },
                        },
                    });

                    // Check if there are any chunks in the session (efficient head count)
                    const { count } = await supa
                        .from("session_chunks")
                        .select("id", { count: "exact", head: true })
                        .eq("session_id", sessionId);

                    if (!count || count === 0) {
                        const noDocsMessage = "No documents have been uploaded to this session. Please upload a PDF document first.";

                        // Broadcast tool result
                        await supa.channel(channelName).send({
                            type: "broadcast",
                            event: "chat",
                            payload: {
                                type: "tool-result",
                                messageId,
                                id: toolId,
                                name: "searchDocuments",
                                args: { query, k },
                                result: { message: noDocsMessage, contexts: [] },
                            },
                        });

                        return { message: noDocsMessage, contexts: [] };
                    }

                    // Create embedding for the query
                    const embResponse = await getOpenAI().embeddings.create({
                        model: "text-embedding-3-small",
                        input: query,
                    });

                    // Search for similar chunks
                    const contexts = await topK(
                        sessionId,
                        embResponse.data[0].embedding as any,
                        k
                    );

                    // Track embedding usage
                    const tokens = (embResponse as any).usage?.total_tokens || 0;
                    if (tokens > 0) {
                        const usd = dollarsFromTokens("embed-in", tokens);
                        await supa.rpc("bump_usage", {
                            p_user: user.id,
                            p_in: 0,
                            p_out: 0,
                            p_emb: tokens,
                            p_usd: usd,
                        });
                    }

                    let formattedContexts = contexts
                        .map((c, i) => {
                            const page = c.pageFrom !== null
                                ? `page ${c.pageFrom}${c.pageTo ? "-" + c.pageTo : ""}`
                                : "";
                            return `[Context ${i + 1}${page ? " - " + page : ""}]:\n${c.content}`;
                        })
                        .join("\n\n");

                    // Prevent overly large tool results that can cause the model to not follow up
                    const MAX_TOOL_RESULT_CHARS = 8000;
                    if (formattedContexts.length > MAX_TOOL_RESULT_CHARS) {
                        formattedContexts =
                            formattedContexts.slice(0, MAX_TOOL_RESULT_CHARS) +
                            "\n\n[Truncated tool result due to size]";
                    }

                    // Broadcast tool result
                    await supa.channel(channelName).send({
                        type: "broadcast",
                        event: "chat",
                        payload: {
                            type: "tool-result",
                            messageId,
                            id: toolId,
                            name: "searchDocuments",
                            args: { query, k },
                            result: {
                                found: contexts.length,
                                contexts: contexts.map((c) => ({
                                    content: c.content.substring(0, 100) + "...",
                                    page: c.pageFrom,
                                })),
                            },
                        },
                    });

                    console.log(`[TOOL] Found ${contexts.length} relevant contexts`);

                    return {
                        message: `Found ${contexts.length} relevant sections in the documents.`,
                        contexts: formattedContexts,
                    };
                },
            },
        } : undefined,
        onFinish: async ({ usage, text }) => {
            console.log(
                `[CHAT] Finished generating response, length: ${text.length}`
            );

            // Store assistant message
            await supa.from("session_messages").insert({
                session_id: sessionId,
                role: "assistant",
                content: text,
            });

            // Track token usage - using the correct properties from usage
            if (usage) {
                // The usage object from ai SDK v5 uses different property names
                const promptTokens = (usage as any).inputTokens || (usage as any).promptTokens || 0;
                const completionTokens = (usage as any).outputTokens || (usage as any).completionTokens || 0;

                if (promptTokens > 0 || completionTokens > 0) {
                    const inputUsd = dollarsFromTokens("chat-in", promptTokens);
                    const outputUsd = dollarsFromTokens("chat-out", completionTokens);
                    const totalUsd = inputUsd + outputUsd;

                    await supa.rpc("bump_usage", {
                        p_user: user.id,
                        p_in: promptTokens,
                        p_out: completionTokens,
                        p_emb: 0,
                        p_usd: totalUsd,
                    });

                    // Send updated usage
                    const { data: updatedUsage } = await supa
                        .from("token_usage")
                        .select("*")
                        .eq("user_id", user.id)
                        .maybeSingle();

                    const ceil = parseFloat(process.env.CHAT_COST_CEIL_USD || "0.30");

                    await supa.channel(channelName).send({
                        type: "broadcast",
                        event: "chat",
                        payload: {
                            type: "usage",
                            usage: updatedUsage ?? {
                                usd_spent: 0,
                                input_tokens: 0,
                                output_tokens: 0,
                                embed_tokens: 0,
                            },
                            ceilUSD: ceil,
                        },
                    });
                }
            }

            // Broadcast completion
            await supa.channel(channelName).send({
                type: "broadcast",
                event: "chat",
                payload: {
                    type: "done",
                    messageId,
                },
            });
        },
        onStepFinish: async (step) => {
            console.log("Step finished:", JSON.stringify(step));
        },
        onError: async (error) => {
            console.error("Chat error:", error);
        },
        onChunk: async (chunk: any) => {
            console.log("Chunk:", chunk);
        },
    });

    const content = result.textStream;
    for await (const chunk of content) {
      console.log("Chunk:", chunk);
      await supa.channel(channelName).send({
        type: "broadcast",
        event: "chat",
        payload: { type: "text", messageId, delta: typeof chunk === "string" ? chunk : String(chunk) },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { error: error?.message || "An error occurred" },
      { status: error?.message === "Budget exceeded" ? 402 : 500 }
    );
  }
}
