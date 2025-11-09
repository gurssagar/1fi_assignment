"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export interface CartItem {
  id: string
  productId: string
  productName: string
  productImage: string
  variantStorage?: string
  variantColor?: string
  variantRam?: string
  emiPlanId: string
  emiPlanTenure: number
  monthlyPayment: number
  totalAmount: number
  quantity: number
  cashback: number
}

interface CartContextType {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: Omit<CartItem, "id" | "quantity">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  totalItems: number
  totalAmount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const addItem = useCallback((item: Omit<CartItem, "id" | "quantity">) => {
    setItems((prev) => {
      const existingItemIndex = prev.findIndex(
        (i) =>
          i.productId === item.productId &&
          i.emiPlanId === item.emiPlanId &&
          i.variantStorage === item.variantStorage &&
          i.variantColor === item.variantColor &&
          i.variantRam === item.variantRam,
      )

      if (existingItemIndex > -1) {
        const updated = [...prev]
        updated[existingItemIndex].quantity += 1
        return updated
      }

      return [
        ...prev,
        {
          ...item,
          id: `${item.productId}-${item.emiPlanId}-${Date.now()}`,
          quantity: 1,
        },
      ]
    })
    setIsOpen(true)
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(id)
        return
      }
      setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
    },
    [removeItem],
  )

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const openCart = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeCart = useCallback(() => {
    setIsOpen(false)
  }, [])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalAmount = items.reduce((sum, item) => sum + item.totalAmount * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        totalItems,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
