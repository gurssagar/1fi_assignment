"use server"

import { db } from "@/db"
import { orders, orderItems } from "@/db/schema"
import { eq, desc } from "drizzle-orm"
import type { CartItem } from "@/lib/context/cart-context"

export interface OrderItem {
  id: string
  productId: string
  productName: string
  productImage: string
  variantStorage: string | null
  variantColor: string | null
  variantRam: string | null
  emiPlanId: string
  emiPlanTenure: number
  monthlyPayment: number
  totalAmount: number
  cashback: number
  quantity: number
}

export interface Order {
  id: string
  orderNumber: string
  status: string
  totalAmount: number
  totalCashback: number
  shippingName: string
  shippingEmail: string
  shippingPhone: string
  shippingAddress: string
  shippingCity: string
  shippingState: string
  shippingPincode: string
  shippingLandmark: string | null
  paymentMethod: string
  createdAt: string
  items: OrderItem[]
}

function generateOrderNumber(): string {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 10000)
  return `ORD-${timestamp}-${random.toString().padStart(4, "0")}`
}

export async function createOrder(
  userId: string,
  cartItems: CartItem[],
  shippingInfo: {
    fullName: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    pincode: string
    landmark?: string
    paymentMethod: string
  }
): Promise<{ order?: Order; error?: string }> {
  try {
    if (cartItems.length === 0) {
      return { error: "Cart is empty" }
    }

    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.totalAmount * item.quantity,
      0
    )
    const totalCashback = cartItems.reduce(
      (sum, item) => sum + item.cashback * item.quantity,
      0
    )

    const orderNumber = generateOrderNumber()

    const [newOrder] = await db
      .insert(orders)
      .values({
        userId,
        orderNumber,
        status: "pending",
        totalAmount: totalAmount.toString(),
        totalCashback: totalCashback.toString(),
        shippingName: shippingInfo.fullName,
        shippingEmail: shippingInfo.email,
        shippingPhone: shippingInfo.phone,
        shippingAddress: shippingInfo.address,
        shippingCity: shippingInfo.city,
        shippingState: shippingInfo.state,
        shippingPincode: shippingInfo.pincode,
        shippingLandmark: shippingInfo.landmark || null,
        paymentMethod: shippingInfo.paymentMethod,
      })
      .returning()

    const orderItemsData = cartItems.map((item) => ({
      orderId: newOrder.id,
      productId: item.productId,
      productName: item.productName,
      productImage: item.productImage,
      variantStorage: item.variantStorage || null,
      variantColor: item.variantColor || null,
      variantRam: item.variantRam || null,
      emiPlanId: item.emiPlanId,
      emiPlanTenure: item.emiPlanTenure,
      monthlyPayment: item.monthlyPayment.toString(),
      totalAmount: item.totalAmount.toString(),
      cashback: item.cashback.toString(),
      quantity: item.quantity,
    }))

    await db.insert(orderItems).values(orderItemsData)

    const order = await getOrderById(newOrder.id)

    return { order: order || undefined }
  } catch (error) {
    console.error("Create order error:", error)
    return { error: "Failed to create order. Please try again." }
  }
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  try {
    const [order] = await db
      .select()
      .from(orders)
      .where(eq(orders.id, orderId))
      .limit(1)

    if (!order) {
      return null
    }

    const items = await db
      .select()
      .from(orderItems)
      .where(eq(orderItems.orderId, orderId))

    return {
      id: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      totalAmount: Number(order.totalAmount),
      totalCashback: Number(order.totalCashback),
      shippingName: order.shippingName,
      shippingEmail: order.shippingEmail,
      shippingPhone: order.shippingPhone,
      shippingAddress: order.shippingAddress,
      shippingCity: order.shippingCity,
      shippingState: order.shippingState,
      shippingPincode: order.shippingPincode,
      shippingLandmark: order.shippingLandmark,
      paymentMethod: order.paymentMethod,
      createdAt: order.createdAt.toISOString(),
      items: items.map((item) => ({
        id: item.id,
        productId: item.productId,
        productName: item.productName,
        productImage: item.productImage,
        variantStorage: item.variantStorage,
        variantColor: item.variantColor,
        variantRam: item.variantRam,
        emiPlanId: item.emiPlanId,
        emiPlanTenure: item.emiPlanTenure,
        monthlyPayment: Number(item.monthlyPayment),
        totalAmount: Number(item.totalAmount),
        cashback: Number(item.cashback),
        quantity: item.quantity,
      })),
    }
  } catch (error) {
    console.error("Get order error:", error)
    return null
  }
}

export async function getOrdersByUserId(userId: string): Promise<Order[]> {
  try {
    const userOrders = await db
      .select()
      .from(orders)
      .where(eq(orders.userId, userId))
      .orderBy(desc(orders.createdAt))

    const ordersWithItems: Order[] = []

    for (const order of userOrders) {
      const items = await db
        .select()
        .from(orderItems)
        .where(eq(orderItems.orderId, order.id))

      ordersWithItems.push({
        id: order.id,
        orderNumber: order.orderNumber,
        status: order.status,
        totalAmount: Number(order.totalAmount),
        totalCashback: Number(order.totalCashback),
        shippingName: order.shippingName,
        shippingEmail: order.shippingEmail,
        shippingPhone: order.shippingPhone,
        shippingAddress: order.shippingAddress,
        shippingCity: order.shippingCity,
        shippingState: order.shippingState,
        shippingPincode: order.shippingPincode,
        shippingLandmark: order.shippingLandmark,
        paymentMethod: order.paymentMethod,
        createdAt: order.createdAt.toISOString(),
        items: items.map((item) => ({
          id: item.id,
          productId: item.productId,
          productName: item.productName,
          productImage: item.productImage,
          variantStorage: item.variantStorage,
          variantColor: item.variantColor,
          variantRam: item.variantRam,
          emiPlanId: item.emiPlanId,
          emiPlanTenure: item.emiPlanTenure,
          monthlyPayment: Number(item.monthlyPayment),
          totalAmount: Number(item.totalAmount),
          cashback: Number(item.cashback),
          quantity: item.quantity,
        })),
      })
    }

    return ordersWithItems
  } catch (error) {
    console.error("Get orders by user error:", error)
    return []
  }
}

