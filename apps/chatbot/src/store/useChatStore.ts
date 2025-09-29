import { create } from 'zustand'

type ToolCallLog = {
  id: string
  name: string
  args: unknown
  result?: unknown
  ts: string
}

type Msg = {
  id: string
  role: 'user'|'assistant'
  content: string
  createdAt: string
  toolLogs?: ToolCallLog[]
}
type State = {
  sessionId?: string
  messages: Msg[]
  usageUSD: number
  pdfPage?: number
  pdfUrl?: string
  setSession: (id: string) => void
  addMessage: (m: Msg) => void
  updateMessageContent: (id: string, content: string) => void
  appendMessageContent: (id: string, delta: string) => void
  appendToolLog: (id: string, log: ToolCallLog) => void
  setUsage: (usd: number) => void
  setPdfPage: (page: number) => void
  setPdfUrl: (url?: string) => void
  reset: () => void
}

export const useChatStore = create<State>((set) => ({
  messages: [],
  usageUSD: 0,
  setSession: (id) => set({ sessionId: id, messages: [] }),
  addMessage: (m) => set((s) => ({ messages: [...s.messages, m] })),
  updateMessageContent: (id, content) => set((s) => ({
    messages: s.messages.map(m => m.id === id ? { ...m, content } : m)
  })),
  appendMessageContent: (id, delta) => set((s) => ({
    messages: s.messages.map(m => m.id === id ? { ...m, content: m.content + delta } : m)
  })),
  appendToolLog: (id, log) => set((s) => ({
    messages: s.messages.map(m => m.id === id ? { ...m, toolLogs: [...(m.toolLogs || []), log] } : m)
  })),
  setUsage: (usd) => set({ usageUSD: usd }),
  setPdfPage: (page) => set({ pdfPage: page }),
  setPdfUrl: (url) => set({ pdfUrl: url }),
  reset: () => set({ sessionId: undefined, messages: [], usageUSD: 0 }),
}))

