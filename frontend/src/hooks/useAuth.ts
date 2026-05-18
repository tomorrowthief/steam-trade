import { createContext, useContext } from 'react'

export interface User {
  steamId: string
  nickname: string
  avatar: string
}

export const AuthContext = createContext<{
  user: User | null
  setUser: (user: User | null) => void
  loading: boolean
}>({ user: null, setUser: () => {}, loading: true })

export function useAuth() {
  return useContext(AuthContext)
}
