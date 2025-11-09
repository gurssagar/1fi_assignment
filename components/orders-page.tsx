"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/context/auth-context"
import { getOrdersByUserId, type Order } from "@/lib/actions/orders"
import { motion } from "framer-motion"
import { FadeIn, SlideUp, StaggerContainer, StaggerItem, smoothEase } from "@/components/animation-wrapper"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Package, Calendar, MapPin, Phone, Mail, ArrowRight, ShoppingBag } from "lucide-react"
import { format } from "date-fns"

export function OrdersPage() {
  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/login")
        return
      }
      loadOrders()
    }
  }, [user, authLoading, router])

  const loadOrders = async () => {
    if (!user) return
    
    try {
      setIsLoading(true)
      const userOrders = await getOrdersByUserId(user.id)
      setOrders(userOrders)
    } catch (error) {
      console.error("Failed to load orders:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
      case "confirmed":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400"
      case "shipped":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400"
      case "delivered":
        return "bg-[rgba(120,50,223,0.1)] text-[#7832df] dark:text-purple-400"
      case "cancelled":
        return "bg-red-500/10 text-red-600 dark:text-red-400"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header showGetStarted={false} />
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="h-8 w-8 rounded-full border-2 border-accent border-t-transparent"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header showGetStarted={false} />

      <section className="border-b border-border bg-gradient-to-b from-muted/50 to-background py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SlideUp delay={0.2}>
            <h1 className="mb-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              My Orders
            </h1>
            <p className="text-pretty text-lg text-muted-foreground sm:text-xl">
              View and track all your past orders
            </p>
          </SlideUp>
        </div>
      </section>

      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {orders.length === 0 ? (
            <FadeIn delay={0.3}>
              <Card className="text-center">
                <CardContent className="py-12">
                  <ShoppingBag className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="mb-2 text-lg font-semibold text-foreground">No orders yet</h3>
                  <p className="mb-6 text-sm text-muted-foreground">
                    You haven't placed any orders yet. Start shopping to see your orders here.
                  </p>
                  <Link href="/products">
                    <Button>
                      Browse Products
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </FadeIn>
          ) : (
            <StaggerContainer className="space-y-6">
              {orders.map((order) => (
                <StaggerItem key={order.id}>
                  <Card>
                    <CardHeader>
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <CardTitle className="mb-2 flex items-center gap-2">
                            <Package className="h-5 w-5 text-accent" />
                            Order #{order.orderNumber}
                          </CardTitle>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {format(new Date(order.createdAt), "MMM dd, yyyy")}
                            </div>
                            <Badge className={getStatusColor(order.status)}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-foreground">
                            {formatPrice(order.totalAmount)}
                          </div>
                          {order.totalCashback > 0 && (
                            <div className="text-sm text-accent">
                              {formatPrice(order.totalCashback)} Cashback
                            </div>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex gap-3 rounded-lg border border-border p-3"
                          >
                            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
                              <img
                                src={item.productImage || "/placeholder.svg"}
                                alt={item.productName}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="truncate text-sm font-semibold text-foreground">
                                {item.productName}
                              </h4>
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
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-border pt-4">
                        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                          <MapPin className="h-4 w-4 text-accent" />
                          Shipping Address
                        </h4>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p className="font-medium text-foreground">{order.shippingName}</p>
                          <p>{order.shippingAddress}</p>
                          <p>
                            {order.shippingCity}, {order.shippingState} - {order.shippingPincode}
                          </p>
                          {order.shippingLandmark && <p>Landmark: {order.shippingLandmark}</p>}
                          <div className="mt-2 flex flex-wrap gap-4">
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              <span>{order.shippingEmail}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              <span>{order.shippingPhone}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

