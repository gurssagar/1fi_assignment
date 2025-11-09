"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { smoothEase } from "@/components/animation-wrapper"

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    setSelectedImage(0)
  }, [images])

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-secondary sm:rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={images[selectedImage] || selectedImage}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4, ease: smoothEase }}
            className="relative h-full w-full"
          >
            <Image
              src={images[selectedImage] || "/placeholder.svg"}
              alt={`${productName} - View ${selectedImage + 1}`}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3">
        {images.map((image, index) => (
          <motion.button
            key={index}
            onClick={() => setSelectedImage(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "relative aspect-square overflow-hidden rounded-md bg-secondary transition-all sm:rounded-lg",
              selectedImage === index
                ? "ring-2 ring-accent ring-offset-2 ring-offset-background"
                : "opacity-60 hover:opacity-100",
            )}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${productName} thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </motion.button>
        ))}
      </div>
    </div>
  )
}
