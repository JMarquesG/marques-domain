/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["*"]
    }
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    PRICE_GPT5MINI_INPUT: process.env.PRICE_GPT5MINI_INPUT,
    PRICE_GPT5MINI_OUTPUT: process.env.PRICE_GPT5MINI_OUTPUT,
    PRICE_EMBEDDINGS_INPUT: process.env.PRICE_EMBEDDINGS_INPUT,
    CHAT_COST_CEIL_USD: process.env.CHAT_COST_CEIL_USD,
    MAX_UPLOAD_PAGES: process.env.MAX_UPLOAD_PAGES,
    EMBED_DIM: process.env.EMBED_DIM
  }
}

export default nextConfig

