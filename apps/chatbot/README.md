# Chatbot App - PDF Chat with AI

This app allows users to upload PDFs and chat with an AI assistant about the content.

## Architecture

The app uses Supabase Realtime Broadcast for real-time communication between the client and server:

### Key Components

1. **Client (Chat.tsx)**
   - Subscribes to a Supabase Realtime channel for the session
   - Sends chat messages via POST to `/api/chat/stream`
   - Receives real-time updates via broadcast events
   - Fetches usage stats periodically via `/api/usage/realtime`

2. **Server (API Routes)**
   - `/api/chat/stream`: Processes chat messages with AI SDK
   - Broadcasts updates via Supabase Realtime:
     - Text updates (partial messages)
     - Tool calls and results (RAG)
     - Usage statistics
     - Completion status

3. **Real-time Events**
   - `chat` event with payload types:
     - `start`: Message processing started
     - `text`: Partial text update
     - `tool-call`: RAG tool invoked
     - `tool-result`: RAG results received
     - `usage`: Token usage update
     - `done`: Message completed
     - `error`: Error occurred

## Features

- **Real-time streaming**: Messages stream in real-time as the AI generates them
- **RAG (Retrieval Augmented Generation)**: Searches uploaded PDFs for relevant context
- **Usage tracking**: Tracks token usage and costs in real-time
- **Budget limits**: Enforces spending limits per user

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
CHAT_COST_CEIL_USD=0.30
```

## Database Schema

The app uses these main tables:
- `sessions`: Chat sessions
- `session_messages`: Chat messages
- `session_docs`: Uploaded PDFs
- `session_chunks`: PDF chunks with embeddings
- `token_usage`: Usage tracking

## Development

```bash
npm run dev
```

The app will be available at http://localhost:3000