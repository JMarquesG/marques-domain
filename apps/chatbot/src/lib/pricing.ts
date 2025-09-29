export const PRICES = {
  gpt5mini: {
    // GPT-5-mini pricing: $0.25 per 1M input tokens = 0.00025 per 1K
    // $2.00 per 1M output tokens = 0.002 per 1K
    inputPer1K: parseFloat(process.env.PRICE_GPT5MINI_INPUT || '0.00025'),
    outputPer1K: parseFloat(process.env.PRICE_GPT5MINI_OUTPUT || '0.002'),
  },
  embedSmall: {
    // OpenAI text-embedding-3-small is ~$0.02 per 1M tokens => 0.00002 per 1K
    inputPer1K: parseFloat(process.env.PRICE_EMBEDDINGS_INPUT || '0.00002'),
  },
  ceilUSD: parseFloat(process.env.CHAT_COST_CEIL_USD || '0.30'),
}

export function dollarsFromTokens(kind:'chat-in'|'chat-out'|'embed-in', tokens:number){
  const per1k =
    kind==='chat-in' ? PRICES.gpt5mini.inputPer1K :
    kind==='chat-out' ? PRICES.gpt5mini.outputPer1K :
    PRICES.embedSmall.inputPer1K
  return (tokens/1000) * per1k
}

