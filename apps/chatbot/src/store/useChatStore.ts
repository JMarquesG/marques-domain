import { create } from 'zustand'

type Msg = { id: string; role: 'user'|'assistant'; content: string; createdAt: string }
type State = {
  sessionId?: string
  messages: Msg[]
  usageUSD: number
  setSession: (id: string) => void
  addMessage: (m: Msg) => void
  setUsage: (usd: number) => void
  reset: () => void
}

export const useChatStore = create<State>((set) => ({
  messages: [],
  usageUSD: 0,
  setSession: (id) => set({ sessionId: id, messages: [] }),
  addMessage: (m) => set((s) => ({ messages: [...s.messages, m] })),
  setUsage: (usd) => set({ usageUSD: usd }),
  reset: () => set({ sessionId: undefined, messages: [], usageUSD: 0 }),
}))

