"use client"

import { useState } from "react"
import { ProductHeader } from "./product-header"
import { ProductGallery } from "./product-gallery"
import { ProductInfo } from "./product-info"
import { EmiPlans } from "./emi-plans"
import { RelatedProducts } from "./related-products"
import { Footer } from "./footer"
import type { ProductWithDetails, Product } from "@/lib/actions/products"
import { motion } from "framer-motion"
import { FadeIn, SlideUp, StaggerContainer, StaggerItem, smoothEase } from "@/components/animation-wrapper"

interface ProductPageProps {
  product: ProductWithDetails
  relatedProducts: Product[]
}

export function ProductPage({ product, relatedProducts }: ProductPageProps) {
  const storageOptions = Array.from(new Set(product.variants.map((v) => v.storage).filter(Boolean))).map(
    (storage, index) => ({
      id: String(index + 1),
      type: "storage",
      label: storage!,
      available: true,
    }),
  )

  const colorOptions = Array.from(new Set(product.variants.map((v) => v.color))).map((color, index) => ({
    id: String(index + 1),
    name: color,
    hex: getColorHex(color),
    available: true,
  }))

  const [selectedVariant, setSelectedVariant] = useState(storageOptions[0]?.id || "1")
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]?.id || "1")
  const [selectedPlan, setSelectedPlan] = useState(product.emi_plans[0]?.id || "")

  const selectedColorName = colorOptions.find((c) => c.id === selectedColor)?.name
  const selectedStorageLabel = storageOptions.find((s) => s.id === selectedVariant)?.label

  const currentVariant =
    product.variants.find(
      (v) =>
        v.storage === selectedStorageLabel &&
        v.color === selectedColorName,
    ) || product.variants.find((v) => v.color === selectedColorName) || product.variants[0]

  const colorVariants = product.variants.filter((v) => v.color === selectedColorName)
  const allColorImages = colorVariants.flatMap((v) => v.images || [v.image_url])
  const uniqueImages = Array.from(new Set(allColorImages))

  const productData = {
    id: product.id,
    name: product.name,
    category: product.category,
    mrp: currentVariant.mrp,
    price: currentVariant.price,
    discount: currentVariant.mrp - currentVariant.price,
    images: uniqueImages.length > 0 ? uniqueImages : [currentVariant.image_url],
    variants: storageOptions,
    colors: colorOptions,
    emiPlans: product.emi_plans.map((plan) => ({
      id: plan.id,
      tenure: plan.tenure_months,
      monthlyPayment: plan.monthly_payment,
      interestRate: plan.interest_rate,
      totalAmount: plan.total_amount,
      cashback: plan.cashback,
      recommended: plan.tenure_months === 3,
    })),
    features: [
      `${product.brand} ${product.name}`,
      `Starting from ${currentVariant.storage || "base model"}`,
      "Premium build quality",
      "Latest technology",
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      <ProductHeader />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12">
          <SlideUp delay={0.2}>
            <ProductGallery key={selectedColor} images={productData.images} productName={productData.name} />
          </SlideUp>

          <div className="flex flex-col gap-6 sm:gap-8">
            <FadeIn delay={0.3}>
              <ProductInfo
                product={productData}
                selectedVariant={selectedVariant}
                selectedColor={selectedColor}
                onVariantChange={setSelectedVariant}
                onColorChange={setSelectedColor}
              />
            </FadeIn>

            <FadeIn delay={0.4}>
              <EmiPlans
                plans={productData.emiPlans}
                selectedPlan={selectedPlan}
                onPlanChange={setSelectedPlan}
                productId={product.id}
                productName={product.name}
                productImage={currentVariant.image_url}
                variantStorage={storageOptions.find((s) => s.id === selectedVariant)?.label}
                variantColor={colorOptions.find((c) => c.id === selectedColor)?.name}
              />
            </FadeIn>
          </div>
        </div>
      </main>

      <RelatedProducts products={relatedProducts} />

      <Footer />
    </div>
  )
}

function getColorHex(colorName: string): string {
  const colorMap: Record<string, string> = {
    "Natural Titanium": "#E8E8E8",
    "Blue Titanium": "#4A90E2",
    "White Titanium": "#F5F5F5",
    "Black Titanium": "#2C2C2C",
    "Titanium Black": "#1A1A1A",
    "Titanium Gray": "#6B6B6B",
    "Space Gray": "#4A4A4A",
    Silver: "#C0C0C0",
  }
  return colorMap[colorName] || "#808080"
}
