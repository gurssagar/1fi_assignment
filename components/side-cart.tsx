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
        <div className="flex items-center justify-between border-b border-border p-3 sm:p-4 lg:p-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 sm:h-10 sm:w-10">
              <ShoppingBag className="h-4 w-4 text-accent sm:h-5 sm:w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground sm:text-lg">Your Cart</h2>
              <p className="text-xs text-muted-foreground sm:text-sm">{totalItems} item(s)</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={closeCart}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center sm:gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted sm:h-20 sm:w-20">
                <ShoppingBag className="h-8 w-8 text-muted-foreground sm:h-10 sm:w-10" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground sm:text-lg">Your cart is empty</h3>
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">Add products to get started</p>
              </div>
              <Button onClick={closeCart}>Continue Shopping</Button>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {items.map((item) => (
                <div key={item.id} className="rounded-lg border border-border bg-card p-3 sm:p-4">
                  <div className="flex gap-2 sm:gap-4">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted sm:h-20 sm:w-20">
                      <img
                        src={item.productImage || "/placeholder.svg"}
                        alt={item.productName}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col gap-1.5 sm:gap-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <h3 className="truncate text-sm font-semibold text-foreground sm:text-base">{item.productName}</h3>
                          <div className="mt-0.5 flex flex-wrap gap-x-1.5 gap-y-0.5 text-[10px] text-muted-foreground sm:mt-1 sm:gap-x-2 sm:gap-y-1 sm:text-xs">
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
                          <div className="text-xs sm:text-sm">
                            <div className="font-semibold text-accent">{formatPrice(item.monthlyPayment)}/mo</div>
                            <div className="text-[10px] text-muted-foreground sm:text-xs">{item.emiPlanTenure} months EMI</div>
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
          <div className="border-t border-border bg-background p-3 sm:p-4 lg:p-6">
            <div className="mb-3 space-y-1.5 sm:mb-4 sm:space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
                <span className="font-semibold text-foreground">{formatPrice(totalAmount)}</span>
              </div>
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-muted-foreground">Processing Fee</span>
                <span className="font-semibold text-accent">FREE</span>
              </div>
              <div className="border-t border-border pt-1.5 sm:pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground sm:text-base">Total Amount</span>
                  <span className="text-base font-bold text-foreground sm:text-lg">{formatPrice(totalAmount)}</span>
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
