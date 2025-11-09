import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: process.env.NEXT_PUBLIC_API_URL || (typeof window !== "undefined" ? window.location.origin : ""),
})

export const { signIn, signUp, signOut, useSession } = authClient

// Helper function for GitHub OAuth sign-in/sign-up
export const signInWithGitHub = async () => {
    try {
        const data = await authClient.signIn.social({
            provider: "github",
        })
        return data
    } catch (error) {
        console.error("GitHub sign-in error:", error)
        throw error
    }
}