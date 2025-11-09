"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/actions/products"
import { motion } from "framer-motion"
import { SlideUp, StaggerContainer, StaggerItem, smoothEase } from "@/components/animation-wrapper"

interface RelatedProductsProps {
  products: Product[]
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) {
    return null
  }

  return (
    <section className="border-t border-border bg-background py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SlideUp delay={0.2}>
          <h2 className="mb-4 text-balance text-lg font-bold tracking-tight sm:mb-6 sm:text-xl lg:mb-8 lg:text-2xl xl:text-3xl">
            You Might Also Like
          </h2>
        </SlideUp>
        <StaggerContainer className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:gap-6 lg:grid-cols-4">
          {products.map((product) => {
            const priceInK = (product.base_price / 1000).toFixed(1)
            const emiFrom = Math.floor(product.base_price / 12)
            const cashback = Math.floor(product.base_price * 0.05)

            return (
              <StaggerItem key={product.id}>
                <Link href={`/product/${product.slug}`}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3, ease: smoothEase }}
                  >
                    <Card className="group overflow-hidden border-border transition-all hover:shadow-lg">
                      <div className="relative aspect-square overflow-hidden bg-muted">
                        <motion.img
                          src={product.image_url || "/placeholder.svg"}
                          alt={product.name}
                          className="h-full w-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.4, ease: smoothEase }}
                        />
                        {cashback > 0 && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.4, ease: smoothEase }}
                          >
                            <Badge className="absolute right-2 top-2 bg-accent text-[10px] text-accent-foreground sm:text-xs">
                              ₹{(cashback / 1000).toFixed(1)}K Cashback
                            </Badge>
                          </motion.div>
                        )}
                      </div>
                      <CardContent className="p-3 sm:p-4">
                        <p className="mb-1 text-[10px] font-medium text-muted-foreground sm:text-xs">{product.category}</p>
                        <h3 className="mb-2 line-clamp-2 text-balance text-sm font-semibold sm:text-base">
                          {product.name}
                        </h3>
                        <div className="mb-2 flex items-baseline gap-2 sm:mb-3">
                          <span className="text-lg font-bold sm:text-xl">₹{priceInK}K</span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg bg-accent/10 px-2 py-1.5 sm:px-3 sm:py-2">
                          <span className="text-[10px] font-medium text-muted-foreground sm:text-xs">EMI from</span>
                          <span className="text-xs font-semibold text-accent sm:text-sm">
                            ₹{emiFrom.toLocaleString("en-IN")}/mo
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}
