"use client"

import { useRouter } from "next/navigation"
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react"
import { useCart } from "@/lib/context/cart-context"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function SideCart() {
  const router = useRouter()
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalItems, totalAmount } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 transition-opacity duration-300",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={closeCart}
      />

      <div
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-full max-w-md transform flex-col bg-background shadow-2xl transition-transform duration-300 sm:max-w-lg",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-border p-4 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
              <ShoppingBag className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Your Cart</h2>
              <p className="text-sm text-muted-foreground">{totalItems} item(s)</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={closeCart}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <ShoppingBag className="h-10 w-10 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Your cart is empty</h3>
                <p className="mt-1 text-sm text-muted-foreground">Add products to get started</p>
              </div>
              <Button onClick={closeCart}>Continue Shopping</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="rounded-lg border border-border bg-card p-4">
                  <div className="flex gap-4">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md bg-muted">
                      <img
                        src={item.productImage || "/placeholder.svg"}
                        alt={item.productName}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col gap-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-foreground">{item.productName}</h3>
                          <div className="mt-1 flex flex-wrap gap-x-2 gap-y-1 text-xs text-muted-foreground">
                            {item.variantStorage && <span>{item.variantStorage}</span>}
                            {item.variantColor && (
                              <>
                                <span>•</span>
                                <span>{item.variantColor}</span>
                              </>
                            )}
                            {item.variantRam && (
                              <>
                                <span>•</span>
                                <span>{item.variantRam}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 shrink-0"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                          <div className="text-sm">
                            <div className="font-semibold text-accent">{formatPrice(item.monthlyPayment)}/mo</div>
                            <div className="text-xs text-muted-foreground">{item.emiPlanTenure} months EMI</div>
                          </div>

                        <div className="flex items-center gap-2 rounded-lg border border-border">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      {item.cashback > 0 && (
                        <div className="rounded bg-accent/10 px-2 py-1 text-xs font-medium text-accent">
                          {formatPrice(item.cashback)} Cashback
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border bg-background p-4 sm:p-6">
            <div className="mb-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
                <span className="font-semibold text-foreground">{formatPrice(totalAmount)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Processing Fee</span>
                <span className="font-semibold text-accent">FREE</span>
              </div>
              <div className="border-t border-border pt-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">Total Amount</span>
                  <span className="text-lg font-bold text-foreground">{formatPrice(totalAmount)}</span>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={() => {
                closeCart()
                router.push("/checkout")
              }}
            >
              Proceed to Checkout
            </Button>

            <p className="mt-3 text-center text-xs text-muted-foreground">
              Secured by mutual funds • No credit score impact
            </p>
          </div>
        )}
      </div>
    </>
  )
}
