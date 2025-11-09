"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Menu, ArrowLeft, Shield } from "lucide-react"
import { useCart } from "@/lib/context/cart-context"
import { useAuth } from "@/lib/context/auth-context"
import { motion } from "framer-motion"
import { smoothEase } from "@/components/animation-wrapper"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LogOut, Package } from "lucide-react"

interface HeaderProps {
  variant?: "default" | "product" | "checkout"
  showCart?: boolean
  showGetStarted?: boolean
  title?: string
  showBackButton?: boolean
  onBack?: () => void
}

export function Header({ 
  variant = "default", 
  showCart = false, 
  showGetStarted = false,
  title,
  showBackButton = false,
  onBack
}: HeaderProps) {
  const { totalItems, openCart } = useCart()
  const { user, logout } = useAuth()

  const getNavLinks = () => {
    if (variant === "checkout") {
      return []
    }
    
    if (variant === "product") {
      return [
        { href: "/products", label: "Products" },
       
      ]
    }

    return [
      { href: "/#products", label: "Products" },
     
    ]
  }

  const navLinks = getNavLinks()

  if (variant === "checkout") {
    return (
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: smoothEase }}
        className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            {showBackButton && onBack && (
              <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }} 
                onClick={onBack}
                className="flex items-center justify-center"
              >
                <ArrowLeft className="h-5 w-5 text-foreground" />
              </motion.button>
            )}
            <span className="text-lg font-semibold">{title || "Checkout"}</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Shield className="h-4 w-4 text-accent" />
            <span className="hidden text-sm text-muted-foreground sm:inline">Secure Checkout</span>
          </div>
        </div>
      </motion.header>
    )
  }

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: smoothEase }}
      className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className={`mx-auto flex ${variant === "product" ? "h-14 sm:h-16" : "h-16"} items-center justify-between px-4 sm:px-6 ${variant === "product" ? "lg:max-w-7xl" : "max-w-7xl"} lg:px-8`}>
        <div className="flex items-center gap-6 sm:gap-8">
          <Link href="/" className="flex items-center gap-2">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg sm:h-10 sm:w-10"
            >
              <Image
                src="/1fi_logo.jpeg"
                alt="1Fi Logo"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
            <span className={`font-semibold ${variant === "product" ? "text-lg sm:text-xl" : "text-lg"}`}>
              EMI Store
            </span>
          </Link>

          {navLinks.length > 0 && (
            <nav className="hidden items-center gap-6 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />
          
          {showCart && (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon" className="relative h-9 w-9 sm:h-10 sm:w-10" onClick={openCart}>
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                {totalItems > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-accent-foreground"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </Button>
            </motion.div>
          )}

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-10 sm:w-10">
                    <User className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-semibold truncate">{user.fullName}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/orders" className="flex items-center cursor-pointer">
                    <Package className="mr-2 h-4 w-4" />
                    My Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={async () => {
                    await logout()
                  }}
                  className="cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="hidden sm:inline-flex">Sign Up</Button>
              </Link>
              <Link href="/login">
                <Button variant="ghost" size="icon" className="h-9 w-9 sm:hidden">
                  <User className="h-4 w-4" />
                </Button>
              </Link>
            </>
          )}
          
          {showGetStarted && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/products">
                <Button>Get Started</Button>
                </Link>
              
            </motion.div>
          )}

          {variant === "product" && (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-10 sm:w-10 md:hidden">
                <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.header>
  )
}

