"use server"

import { db } from "@/db";
import { products, productVariants, emiPlans, variantImages } from "@/db/schema";
import { eq, desc, and, ne, asc, inArray } from "drizzle-orm";

export interface Product {
  id: string
  name: string
  brand: string
  category: string
  description: string | null
  base_price: number
  image_url: string
  slug: string
  created_at: string
  updated_at: string
}

export interface ProductVariant {
  id: string
  product_id: string
  storage: string | null
  color: string
  ram: string | null
  connectivity: string | null
  mrp: number
  price: number
  image_url: string
  images: string[]
  created_at: string
  updated_at: string
}

export interface EMIPlan {
  id: string
  product_id: string
  variant_id: string | null
  tenure_months: number
  monthly_payment: number
  interest_rate: number
  total_amount: number
  cashback: number
  created_at: string
  updated_at: string
}

export interface ProductWithDetails extends Product {
  variants: ProductVariant[]
  emi_plans: EMIPlan[]
}

function formatProduct(product: typeof products.$inferSelect): Product {
  return {
    id: product.id,
    name: product.name,
    brand: product.brand,
    category: product.category,
    description: product.description,
    base_price: Number(product.basePrice),
    image_url: product.imageUrl,
    slug: product.slug,
    created_at: product.createdAt.toISOString(),
    updated_at: product.updatedAt.toISOString(),
  }
}

function formatVariant(variant: typeof productVariants.$inferSelect, images: string[] = []): ProductVariant {
  return {
    id: variant.id,
    product_id: variant.productId,
    storage: variant.storage,
    color: variant.color,
    ram: variant.ram,
    connectivity: variant.connectivity,
    mrp: Number(variant.mrp),
    price: Number(variant.price),
    image_url: variant.imageUrl,
    images: images.length > 0 ? images : [variant.imageUrl],
    created_at: variant.createdAt.toISOString(),
    updated_at: variant.updatedAt.toISOString(),
  }
}

function formatEMIPlan(plan: typeof emiPlans.$inferSelect): EMIPlan {
  return {
    id: plan.id,
    product_id: plan.productId,
    variant_id: plan.variantId || null,
    tenure_months: plan.tenureMonths,
    monthly_payment: Number(plan.monthlyPayment),
    interest_rate: Number(plan.interestRate),
    total_amount: Number(plan.totalAmount),
    cashback: Number(plan.cashback),
    created_at: plan.createdAt.toISOString(),
    updated_at: plan.updatedAt.toISOString(),
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const result = await db
      .select()
      .from(products)
      .orderBy(desc(products.createdAt))

    return result.map(formatProduct)
  } catch (error) {
    console.error("Database connection error:", error)
    return []
  }
}

export async function getProductById(productId: string): Promise<ProductWithDetails | null> {
  try {
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.id, productId))
      .limit(1)

    if (!product) {
      return null
    }

    const variantsResult = await db
      .select()
      .from(productVariants)
      .where(eq(productVariants.productId, productId))
      .orderBy(asc(productVariants.storage))

    const variantIds = variantsResult.map((v) => v.id)
    const allImages = variantIds.length > 0
      ? await db
          .select()
          .from(variantImages)
          .where(inArray(variantImages.variantId, variantIds))
          .orderBy(asc(variantImages.displayOrder))
      : []

    const imagesMap = new Map<string, string[]>()
    for (const variant of variantsResult) {
      const variantImgs = allImages.filter((img) => img.variantId === variant.id)
      const imgUrls = variantImgs.length > 0
        ? variantImgs.map((img) => img.imageUrl)
        : [variant.imageUrl]
      imagesMap.set(variant.id, imgUrls)
    }

    const emiPlansResult = await db
      .select()
      .from(emiPlans)
      .where(eq(emiPlans.productId, productId))
      .orderBy(asc(emiPlans.tenureMonths))

    return {
      ...formatProduct(product),
      variants: variantsResult.map((v) => formatVariant(v, imagesMap.get(v.id) || [v.imageUrl])),
      emi_plans: emiPlansResult.map(formatEMIPlan),
    }
  } catch (error) {
    console.error("Database connection error:", error)
    return null
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const result = await db
      .select()
      .from(products)
      .orderBy(desc(products.createdAt))
      .limit(4)

    return result.map(formatProduct)
  } catch (error) {
    console.error("Database connection error:", error)
    return []
  }
}

export async function getRelatedProducts(slug: string, category: string): Promise<Product[]> {
  try {
    const result = await db
      .select()
      .from(products)
      .where(and(
        eq(products.category, category),
        ne(products.slug, slug)
      ))
      .orderBy(desc(products.createdAt))
      .limit(4)

    return result.map(formatProduct)
  } catch (error) {
    console.error("Database connection error:", error)
    return []
  }
}

export async function getProductBySlug(slug: string): Promise<ProductWithDetails | null> {
  try {
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.slug, slug))
      .limit(1)

    if (!product) {
      return null
    }

    const variantsResult = await db
      .select()
      .from(productVariants)
      .where(eq(productVariants.productId, product.id))
      .orderBy(asc(productVariants.storage))

    const variantIds = variantsResult.map((v) => v.id)
    const allImages = variantIds.length > 0
      ? await db
          .select()
          .from(variantImages)
          .where(inArray(variantImages.variantId, variantIds))
          .orderBy(asc(variantImages.displayOrder))
      : []

    const imagesMap = new Map<string, string[]>()
    for (const variant of variantsResult) {
      const variantImgs = allImages.filter((img) => img.variantId === variant.id)
      const imgUrls = variantImgs.length > 0
        ? variantImgs.map((img) => img.imageUrl)
        : [variant.imageUrl]
      imagesMap.set(variant.id, imgUrls)
    }

    const emiPlansResult = await db
      .select()
      .from(emiPlans)
      .where(eq(emiPlans.productId, product.id))
      .orderBy(asc(emiPlans.tenureMonths))

    return {
      ...formatProduct(product),
      variants: variantsResult.map((v) => formatVariant(v, imagesMap.get(v.id) || [v.imageUrl])),
      emi_plans: emiPlansResult.map(formatEMIPlan),
    }
  } catch (error) {
    console.error("Database connection error:", error)
    return null
  }
}

export async function getLowestPriceVariant(productId: string): Promise<ProductVariant | null> {
  try {
    const [result] = await db
      .select()
      .from(productVariants)
      .where(eq(productVariants.productId, productId))
      .orderBy(asc(productVariants.price))
      .limit(1)

    if (!result) return null

    const variantImgs = await db
      .select()
      .from(variantImages)
      .where(eq(variantImages.variantId, result.id))
      .orderBy(asc(variantImages.displayOrder))

    const imgUrls = variantImgs.length > 0
      ? variantImgs.map((img) => img.imageUrl)
      : [result.imageUrl]

    return formatVariant(result, imgUrls)
  } catch (error) {
    console.error("Database connection error:", error)
    return null
  }
}

export async function getBestEMIPlan(productId: string): Promise<EMIPlan | null> {
  try {
    const [result] = await db
      .select()
      .from(emiPlans)
      .where(eq(emiPlans.productId, productId))
      .orderBy(asc(emiPlans.monthlyPayment))
      .limit(1)

    return result ? formatEMIPlan(result) : null
  } catch (error) {
    console.error("Database connection error:", error)
    return null
  }
}
