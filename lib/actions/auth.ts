"use server"

import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"

export interface User {
  id: string
  email: string
  fullName: string
  phone: string | null
  createdAt: string
}

export async function signup(email: string, password: string, fullName: string, phone?: string) {
  try {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    if (existingUser.length > 0) {
      return { error: "User with this email already exists" }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const [newUser] = await db
      .insert(users)
      .values({
        email,
        password: hashedPassword,
        fullName,
        phone: phone || null,
      })
      .returning({
        id: users.id,
        email: users.email,
        fullName: users.fullName,
        phone: users.phone,
        createdAt: users.createdAt,
      })

    const cookieStore = await cookies()
    cookieStore.set("user_id", newUser.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
    })

    return { user: newUser }
  } catch (error) {
    console.error("Signup error:", error)
    return { error: "Failed to create account. Please try again." }
  }
}

export async function login(email: string, password: string) {
  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    if (!user) {
      return { error: "Invalid email or password" }
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return { error: "Invalid email or password" }
    }

    const cookieStore = await cookies()
    cookieStore.set("user_id", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
    })

    return {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
        createdAt: user.createdAt.toISOString(),
      },
    }
  } catch (error) {
    console.error("Login error:", error)
    return { error: "Failed to login. Please try again." }
  }
}

export async function logout() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete("user_id")
    return { success: true }
  } catch (error) {
    console.error("Logout error:", error)
    return { error: "Failed to logout" }
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get("user_id")?.value

    if (!userId) {
      return null
    }

    const [user] = await db
      .select({
        id: users.id,
        email: users.email,
        fullName: users.fullName,
        phone: users.phone,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1)

    if (!user) {
      return null
    }

    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
      createdAt: user.createdAt.toISOString(),
    }
  } catch (error) {
    console.error("Get current user error:", error)
    return null
  }
}

