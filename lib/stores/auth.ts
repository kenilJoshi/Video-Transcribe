import { create } from 'zustand'

interface User {
  username: string
  email: string
  profile_pic: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  setLoading: (loading: boolean) => void
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
}))