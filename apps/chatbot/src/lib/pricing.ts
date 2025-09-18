export const PRICES = {
  gpt5mini: {
    inputPer1K: parseFloat(process.env.PRICE_GPT5MINI_INPUT || '0.15'),
    outputPer1K: parseFloat(process.env.PRICE_GPT5MINI_OUTPUT || '0.60'),
  },
  embedSmall: {
    inputPer1K: parseFloat(process.env.PRICE_EMBEDDINGS_INPUT || '0.02'),
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

