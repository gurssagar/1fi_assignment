"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Check, CreditCard, MapPin, Phone, Mail, User, Lock, Shield } from "lucide-react"
import { useCart } from "@/lib/context/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { FadeIn, SlideUp, StaggerContainer, StaggerItem, smoothEase } from "@/components/animation-wrapper"
import { toast } from "sonner"
import { Header } from "@/components/header"
import { useAuth } from "@/lib/context/auth-context"
import { createOrder } from "@/lib/actions/orders"

export function CheckoutPage() {
  const router = useRouter()
  const { items, totalAmount, totalItems, clearCart } = useCart()
  const { user } = useAuth()
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
    paymentMethod: "emi",
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const calculateTotalCashback = () => {
    return items.reduce((sum, item) => sum + item.cashback * item.quantity, 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      toast.error("Please login to place an order")
      router.push("/login")
      return
    }

    setIsProcessing(true)

    try {
      const result = await createOrder(user.id, items, {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        landmark: formData.landmark,
        paymentMethod: formData.paymentMethod,
      })

      if (result.error) {
        toast.error(result.error)
        setIsProcessing(false)
        return
      }

      clearCart()
      setIsSuccess(true)
      setIsProcessing(false)
      toast.success("Order placed successfully!")

      setTimeout(() => {
        router.push("/orders")
      }, 3000)
    } catch (error) {
      console.error("Order creation error:", error)
      toast.error("Failed to place order. Please try again.")
      setIsProcessing(false)
    }
  }

  if (items.length === 0 && !isSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-md text-center">
            <h1 className="mb-4 text-2xl font-bold text-foreground">Your cart is empty</h1>
            <p className="mb-6 text-muted-foreground">Add items to your cart to proceed with checkout</p>
            <Link href="/products">
              <Button>Browse Products</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: smoothEase }}
            className="rounded-lg border border-border bg-card p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500"
            >
              <Check className="h-8 w-8 text-white" />
            </motion.div>
            <h1 className="mb-2 text-2xl font-bold text-foreground">Order Placed Successfully!</h1>
            <p className="mb-6 text-muted-foreground">Thank you for your purchase. We'll send you a confirmation email shortly.</p>
            <Link href="/">
              <Button>Continue Shopping</Button>
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  const totalCashback = calculateTotalCashback()

  return (
    <div className="min-h-screen bg-background">
      <Header 
        variant="checkout" 
        title="Checkout" 
        showBackButton 
        onBack={() => router.back()} 
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SlideUp delay={0.2}>
              <h1 className="mb-6 text-2xl font-bold text-foreground">Shipping Information</h1>
            </SlideUp>

            <form onSubmit={handleSubmit} className="space-y-6">
              <StaggerContainer>
                <StaggerItem>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <User className="h-5 w-5 text-accent" />
                        Personal Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              required
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="your@email.com"
                              className="pl-10"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              required
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="+91 98765 43210"
                              className="pl-10"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>

                <StaggerItem>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <MapPin className="h-5 w-5 text-accent" />
                        Shipping Address
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="address">Street Address *</Label>
                        <Textarea
                          id="address"
                          name="address"
                          required
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="House/Flat No., Building Name, Street"
                          rows={3}
                        />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            name="city"
                            type="text"
                            required
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="Enter city"
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State *</Label>
                          <Input
                            id="state"
                            name="state"
                            type="text"
                            required
                            value={formData.state}
                            onChange={handleInputChange}
                            placeholder="Enter state"
                          />
                        </div>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="pincode">PIN Code *</Label>
                          <Input
                            id="pincode"
                            name="pincode"
                            type="text"
                            required
                            value={formData.pincode}
                            onChange={handleInputChange}
                            placeholder="123456"
                            maxLength={6}
                          />
                        </div>
                        <div>
                          <Label htmlFor="landmark">Landmark (Optional)</Label>
                          <Input
                            id="landmark"
                            name="landmark"
                            type="text"
                            value={formData.landmark}
                            onChange={handleInputChange}
                            placeholder="Near..."
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>

                <StaggerItem>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <CreditCard className="h-5 w-5 text-accent" />
                        Payment Method
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <label className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-accent bg-accent/5 p-4">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="emi"
                            checked={formData.paymentMethod === "emi"}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-accent"
                          />
                          <div className="flex-1">
                            <div className="font-semibold text-foreground">EMI Plan</div>
                            <div className="text-sm text-muted-foreground">
                              Pay in monthly installments as per your selected plan
                            </div>
                          </div>
                        </label>
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>
              </StaggerContainer>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5, ease: smoothEase }}
              >
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="mr-2 h-4 w-4 rounded-full border-2 border-accent-foreground border-t-transparent"
                      />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 h-4 w-4" />
                      Place Order
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </div>

          <div className="lg:col-span-1">
            <SlideUp delay={0.3}>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3 rounded-lg border border-border p-3">
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
                          <img
                            src={item.productImage || "/placeholder.svg"}
                            alt={item.productName}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-foreground">{item.productName}</h4>
                          <div className="mt-1 text-xs text-muted-foreground">
                            {item.variantStorage && <span>{item.variantStorage}</span>}
                            {item.variantColor && (
                              <>
                                <span> • </span>
                                <span>{item.variantColor}</span>
                              </>
                            )}
                          </div>
                          <div className="mt-1 flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              Qty: {item.quantity} × {formatPrice(item.monthlyPayment)}/mo
                            </span>
                            <span className="text-sm font-semibold text-foreground">
                              {formatPrice(item.totalAmount * item.quantity)}
                            </span>
                          </div>
                          {item.cashback > 0 && (
                            <Badge variant="secondary" className="mt-1 text-xs">
                              {formatPrice(item.cashback * item.quantity)} Cashback
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
                        <span className="font-semibold text-foreground">{formatPrice(totalAmount)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Processing Fee</span>
                        <span className="font-semibold text-accent">FREE</span>
                      </div>
                      {totalCashback > 0 && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Total Cashback</span>
                          <span className="font-semibold text-accent">{formatPrice(totalCashback)}</span>
                        </div>
                      )}
                      <div className="border-t border-border pt-2">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-foreground">Total Amount</span>
                          <span className="text-lg font-bold text-foreground">{formatPrice(totalAmount)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-green-200 bg-green-50/50 p-3 dark:border-green-800 dark:bg-green-950/20">
                    <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-400">
                      <Shield className="h-4 w-4" />
                      <span>Secure 256-bit SSL encrypted checkout</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </SlideUp>
          </div>
        </div>
      </div>
    </div>
  )
}

