import Chat from "@/src/components/Chat";
import PdfDropzone from "@/src/components/PdfDropzone";
import PdfViewer from "@/src/components/PdfViewer";
import { getUser } from "@/src/lib/auth";
import { supabaseServer } from "@packages/db/src/supabase-server";
import { redirect } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default async function Page() {
  const user = await getUser();

  if (!user) {
    redirect("/signin");
  }

  // Create a new session for this chat
  const supa = supabaseServer();
  const { data: session, error } = await supa
    .from("sessions")
    .insert({ user_id: user.id })
    .select("id")
    .single();

  if (error) {
    throw new Error("Failed to create chat session");
  }

  return (
    <>
      <main className="mx-auto p-4 text-white max-w-7xl">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold">Chat with your PDF</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[70vh]">
          <div className="flex flex-col gap-4">
            <PdfDropzone sessionId={session.id} />
            <div className="flex-1 min-h-0"><Chat sessionId={session.id} /></div>
          </div>
          <div className="min-h-0"><PdfViewer sessionId={session.id} /></div>
        </div>
      </main>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
