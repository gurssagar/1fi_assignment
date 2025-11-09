"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { smoothEase } from "@/components/animation-wrapper"

interface Variant {
  id: string
  type: string
  label: string
  available: boolean
  ram?: string
  connectivity?: string
}

interface Color {
  id: string
  name: string
  hex: string
  available: boolean
}

interface ProductInfoProps {
  product: {
    name: string
    category: string
    mrp: number
    price: number
    discount: number
    variants: Variant[]
    colors: Color[]
    features: string[]
  }
  selectedVariant: string
  selectedColor: string
  onVariantChange: (id: string) => void
  onColorChange: (id: string) => void
}

export function ProductInfo({
  product,
  selectedVariant,
  selectedColor,
  onVariantChange,
  onColorChange,
}: ProductInfoProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const storageOptions = Array.from(new Set(product.variants.map((v) => v.label)))
  const ramOptions = Array.from(new Set(product.variants.map((v) => v.ram).filter(Boolean)))
  const connectivityOptions = Array.from(new Set(product.variants.map((v) => v.connectivity).filter(Boolean)))

  const selectedVariantData = product.variants.find((v) => v.id === selectedVariant)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{product.category}</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
          {product.name}
        </h1>
      </div>

      <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
        <span className="text-2xl font-bold text-foreground sm:text-3xl">{formatPrice(product.price)}</span>
        <span className="text-base text-muted-foreground line-through sm:text-lg">{formatPrice(product.mrp)}</span>
        <Badge variant="secondary" className="bg-accent/10 text-accent">
          Save {formatPrice(product.discount)}
        </Badge>
      </div>

      <div>
        <label className="mb-3 block text-sm font-medium text-foreground">Storage</label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {product.variants.map((variant) => (
            <motion.button
              key={variant.id}
              onClick={() => variant.available && onVariantChange(variant.id)}
              disabled={!variant.available}
              whileHover={variant.available ? { scale: 1.05 } : {}}
              whileTap={variant.available ? { scale: 0.95 } : {}}
              transition={{ duration: 0.2, ease: smoothEase }}
              className={cn(
                "rounded-lg border-2 px-3 py-2.5 text-sm font-medium transition-all sm:px-4 sm:py-3",
                selectedVariant === variant.id
                  ? "border-accent bg-accent/5 text-accent"
                  : "border-border bg-card text-card-foreground hover:border-accent/50",
                !variant.available && "cursor-not-allowed opacity-40",
              )}
            >
              {variant.label}
            </motion.button>
          ))}
        </div>
      </div>

      {ramOptions.length > 0 && (
        <div>
          <label className="mb-3 block text-sm font-medium text-foreground">RAM</label>
          <div className="flex flex-wrap gap-2">
            {ramOptions.map((ram) => (
              <motion.button
                key={ram}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: smoothEase }}
                className={cn(
                  "rounded-lg border-2 px-4 py-2.5 text-sm font-medium transition-all",
                  selectedVariantData?.ram === ram
                    ? "border-accent bg-accent/5 text-accent"
                    : "border-border bg-card text-card-foreground hover:border-accent/50",
                )}
              >
                {ram}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {connectivityOptions.length > 0 && (
        <div>
          <label className="mb-3 block text-sm font-medium text-foreground">Connectivity</label>
          <div className="flex flex-wrap gap-2">
            {connectivityOptions.map((connectivity) => (
              <motion.button
                key={connectivity}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: smoothEase }}
                className={cn(
                  "rounded-lg border-2 px-4 py-2.5 text-sm font-medium transition-all",
                  selectedVariantData?.connectivity === connectivity
                    ? "border-accent bg-accent/5 text-accent"
                    : "border-border bg-card text-card-foreground hover:border-accent/50",
                )}
              >
                {connectivity}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="mb-3 block text-sm font-medium text-foreground">Color</label>
        <div className="flex flex-wrap gap-3">
          {product.colors.map((color) => (
            <motion.button
              key={color.id}
              onClick={() => color.available && onColorChange(color.id)}
              disabled={!color.available}
              whileHover={color.available ? { scale: 1.1 } : {}}
              whileTap={color.available ? { scale: 0.9 } : {}}
              transition={{ duration: 0.2, ease: smoothEase }}
              className={cn(
                "group relative flex flex-col items-center gap-2",
                !color.available && "cursor-not-allowed opacity-40",
              )}
            >
              <motion.div
                className={cn(
                  "relative h-10 w-10 rounded-full border-2 transition-all",
                  selectedColor === color.id
                    ? "border-accent ring-2 ring-accent ring-offset-2 ring-offset-background"
                    : "border-border group-hover:border-accent/50",
                )}
                style={{ backgroundColor: color.hex }}
                animate={selectedColor === color.id ? { scale: 1.1 } : { scale: 1 }}
                transition={{ duration: 0.2, ease: smoothEase }}
              >
                {selectedColor === color.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2, ease: smoothEase }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Check className="h-5 w-5 text-white drop-shadow-md" strokeWidth={3} />
                  </motion.div>
                )}
              </motion.div>
              <span className="hidden text-xs text-muted-foreground xs:block">{color.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
        <h3 className="mb-3 text-sm font-semibold text-card-foreground">Key Features</h3>
        <ul className="space-y-2">
          {product.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
