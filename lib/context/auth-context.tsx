"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { getCurrentUser, login as loginAction, signup as signupAction, logout as logoutAction, type User } from "@/lib/actions/auth"
import { useRouter } from "next/navigation"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ error?: string }>
  signup: (email: string, password: string, fullName: string, phone?: string) => Promise<{ error?: string }>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function loadUser() {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        console.error("Failed to load user:", error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }
    loadUser()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const result = await loginAction(email, password)
      if (result.error) {
        return result
      }
      if (result.user) {
        setUser(result.user)
        router.refresh()
        return {}
      }
      return { error: "Failed to login" }
    } catch (error) {
      console.error("Login error:", error)
      return { error: "Failed to login. Please try again." }
    }
  }

  const signup = async (email: string, password: string, fullName: string, phone?: string) => {
    try {
      const result = await signupAction(email, password, fullName, phone)
      if (result.error) {
        return result
      }
      if (result.user) {
        setUser(result.user)
        router.refresh()
        return {}
      }
      return { error: "Failed to create account" }
    } catch (error) {
      console.error("Signup error:", error)
      return { error: "Failed to create account. Please try again." }
    }
  }

  const logout = async () => {
    try {
      await logoutAction()
      setUser(null)
      router.refresh()
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

