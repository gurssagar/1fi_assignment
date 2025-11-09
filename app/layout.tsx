import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/lib/context/cart-context"
import { AuthProvider } from "@/lib/context/auth-context"
import { SideCart } from "@/components/side-cart"
import { PageTransitionWrapper } from "@/components/page-transition-wrapper"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EMI Store",
  description: "Premium products with flexible EMI plans",
  icons: {
    icon: [
      {
        url: "/1fi_logo.jpeg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/1fi_logo.jpeg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/1fi_logo.jpeg",
        type: "image/svg+xml",
      },
    ],
    apple: "/1fi_logo.jpeg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <CartProvider>
              <PageTransitionWrapper>
                {children}
              </PageTransitionWrapper>
              <SideCart />
            </CartProvider>
          </AuthProvider>
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
