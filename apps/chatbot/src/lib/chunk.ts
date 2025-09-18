export function chunkByTokens(text: string, target=900, overlap=150) {
  const words = text.split(/\s+/)
  const chunks: string[] = []
  let i=0
  while (i<words.length) {
    const piece = words.slice(i, i+target).join(' ')
    chunks.push(piece)
    i += target - overlap
  }
  return chunks.filter(Boolean)
}

