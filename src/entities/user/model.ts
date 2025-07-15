import { create } from 'zustand'

export interface User {
  id: string
  email: string
}

interface Store {
  user: User | null
  accessToken: string | null
  setSession: (u: User, t: string) => void
  clear: () => void
}

export const useUserStore = create<Store>((set) => ({
  user: null,
  accessToken: null,
  setSession: (u, t) => set({ user: u, accessToken: t }),
  clear: () => set({ user: null, accessToken: null }),
}))
