"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ArrowLeft, Filter, X, ChevronDown, ChevronUp } from "lucide-react"
import type { Product } from "@/lib/actions/products"
import { motion, AnimatePresence } from "framer-motion"
import { FadeIn, SlideUp, StaggerContainer, StaggerItem, smoothEase } from "@/components/animation-wrapper"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface ProductsPageProps {
  products: Product[]
}

type SortOption = "default" | "price-low" | "price-high" | "name-asc" | "name-desc"

const ITEMS_PER_PAGE = 10

export function ProductsPage({ products }: ProductsPageProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<SortOption>("default")
  const [isFilterOpen, setIsFilterOpen] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category))).sort()
  }, [products])

  const brands = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.brand))).sort()
  }, [products])

  const minPrice = useMemo(() => {
    if (products.length === 0) return 0
    return Math.min(...products.map((p) => p.base_price))
  }, [products])

  const maxPrice = useMemo(() => {
    if (products.length === 0) return 500000
    return Math.max(...products.map((p) => p.base_price))
  }, [products])

  const [priceRange, setPriceRange] = useState<[number, number]>(() => {
    if (products.length === 0) return [0, 500000]
    const min = Math.min(...products.map((p) => p.base_price))
    const max = Math.max(...products.map((p) => p.base_price))
    return [min, max]
  })

  useEffect(() => {
    if (products.length > 0) {
      const currentMin = Math.min(...products.map((p) => p.base_price))
      const currentMax = Math.max(...products.map((p) => p.base_price))
      setPriceRange((prev) => {
        if (prev[0] === 0 && prev[1] === 500000) {
          return [currentMin, currentMax]
        }
        if (prev[0] < currentMin || prev[1] > currentMax) {
          return [
            Math.max(prev[0], currentMin),
            Math.min(prev[1], currentMax)
          ]
        }
        return prev
      })
    }
  }, [products])

  const filteredAndSortedProducts = useMemo(() => {
    if (products.length === 0) return []
    
    let filtered = products.filter((product) => {
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category)
      const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.brand)
      const priceMatch = product.base_price >= priceRange[0] && product.base_price <= priceRange[1]

      return categoryMatch && brandMatch && priceMatch
    })

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.base_price - b.base_price)
        break
      case "price-high":
        filtered.sort((a, b) => b.base_price - a.base_price)
        break
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name))
        break
      default:
        break
    }

    return filtered
  }, [products, selectedCategories, selectedBrands, priceRange, sortBy])

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedProducts = filteredAndSortedProducts.slice(startIndex, endIndex)

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategories, selectedBrands, priceRange, sortBy])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('ellipsis')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('ellipsis')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('ellipsis')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('ellipsis')
        pages.push(totalPages)
      }
    }

    return pages
  }

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    )
  }

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  const handleClearFilters = () => {
    setSelectedCategories([])
    setSelectedBrands([])
    if (products.length > 0) {
      const currentMin = Math.min(...products.map((p) => p.base_price))
      const currentMax = Math.max(...products.map((p) => p.base_price))
      setPriceRange([currentMin, currentMax])
    }
    setSortBy("default")
  }

  const activeFiltersCount = useMemo(() => {
    const priceFilterActive = products.length > 0 && (priceRange[0] !== minPrice || priceRange[1] !== maxPrice)
    return selectedCategories.length + selectedBrands.length + (priceFilterActive ? 1 : 0)
  }, [selectedCategories.length, selectedBrands.length, priceRange, minPrice, maxPrice, products.length])

  return (
    <div className="min-h-screen bg-background">
      <Header variant="default" showGetStarted />

      <section className="border-b border-border bg-gradient-to-b from-muted/50 to-background py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn delay={0.2}>
            <Link
              href="/"
              className="mb-3 inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground sm:mb-4 sm:text-sm"
            >
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
              Back to Home
            </Link>
          </FadeIn>
          <SlideUp delay={0.3}>
            <h1 className="mb-3 text-balance text-2xl font-bold tracking-tight sm:mb-4 sm:text-3xl lg:text-4xl xl:text-5xl">All Products</h1>
          </SlideUp>
          <FadeIn delay={0.4}>
            <p className="text-pretty text-sm text-muted-foreground sm:text-base lg:text-lg xl:text-xl">
              Browse our complete collection of premium electronics with flexible EMI options
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row">
            <aside className={`${isSidebarOpen ? "block" : "hidden"} w-full lg:block lg:w-64 lg:shrink-0`}>
              <SlideUp delay={0.2}>
                <Card className="sticky top-24 border-border">
                  <CardContent className="p-6">
                    <div className="mb-6 flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-foreground">Filters</h2>
                      {activeFiltersCount > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleClearFilters}
                          className="h-8 text-xs"
                        >
                          <X className="mr-1 h-3 w-3" />
                          Clear All
                        </Button>
                      )}
                    </div>

                    <div className="space-y-6">
                      <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                        <CollapsibleTrigger className="flex w-full items-center justify-between text-sm font-medium text-foreground">
                          <span>Sort By</span>
                          {isFilterOpen ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-3">
                          <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Sort products" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="default">Default</SelectItem>
                              <SelectItem value="price-low">Price: Low to High</SelectItem>
                              <SelectItem value="price-high">Price: High to Low</SelectItem>
                              <SelectItem value="name-asc">Name: A to Z</SelectItem>
                              <SelectItem value="name-desc">Name: Z to A</SelectItem>
                            </SelectContent>
                          </Select>
                        </CollapsibleContent>
                      </Collapsible>

                      <Separator />

                      <Collapsible defaultOpen>
                        <CollapsibleTrigger className="flex w-full items-center justify-between text-sm font-medium text-foreground">
                          <span>Category</span>
                          <ChevronDown className="h-4 w-4" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-3 space-y-2">
                          {categories.map((category) => (
                            <div key={category} className="flex items-center space-x-2">
                              <Checkbox
                                id={`category-${category}`}
                                checked={selectedCategories.includes(category)}
                                onCheckedChange={() => handleCategoryToggle(category)}
                              />
                              <Label
                                htmlFor={`category-${category}`}
                                className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                              >
                                {category}
                              </Label>
                            </div>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>

                      <Separator />

                      <Collapsible defaultOpen>
                        <CollapsibleTrigger className="flex w-full items-center justify-between text-sm font-medium text-foreground">
                          <span>Brand</span>
                          <ChevronDown className="h-4 w-4" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-3 space-y-2">
                          {brands.map((brand) => (
                            <div key={brand} className="flex items-center space-x-2">
                              <Checkbox
                                id={`brand-${brand}`}
                                checked={selectedBrands.includes(brand)}
                                onCheckedChange={() => handleBrandToggle(brand)}
                              />
                              <Label
                                htmlFor={`brand-${brand}`}
                                className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                              >
                                {brand}
                              </Label>
                            </div>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>

                      <Separator />

                      <Collapsible defaultOpen>
                        <CollapsibleTrigger className="flex w-full items-center justify-between text-sm font-medium text-foreground">
                          <span>Price Range</span>
                          <ChevronDown className="h-4 w-4" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-3">
                          <div className="space-y-4">
                            <Slider
                              value={[priceRange[0], priceRange[1]]}
                              onValueChange={(value) => setPriceRange([value[0], value[1]])}
                              min={minPrice}
                              max={maxPrice}
                              step={1000}
                              className="w-full"
                            />
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">
                                ₹{(priceRange[0] / 1000).toFixed(0)}K
                              </span>
                              <span className="text-muted-foreground">
                                ₹{(priceRange[1] / 1000).toFixed(0)}K
                              </span>
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  </CardContent>
                </Card>
              </SlideUp>
            </aside>

            <div className="flex-1">
              <FadeIn delay={0.2}>
                <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                      className="lg:hidden"
                    >
                      <Filter className="mr-2 h-4 w-4" />
                      Filters
                      {activeFiltersCount > 0 && (
                        <Badge variant="secondary" className="ml-2">
                          {activeFiltersCount}
                        </Badge>
                      )}
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      Showing <span className="font-semibold text-foreground">
                        {filteredAndSortedProducts.length > 0 ? startIndex + 1 : 0} - {Math.min(endIndex, filteredAndSortedProducts.length)}
                      </span> of{" "}
                      <span className="font-semibold text-foreground">{filteredAndSortedProducts.length}</span> products
                      {filteredAndSortedProducts.length !== products.length && (
                        <span className="text-muted-foreground"> (filtered from {products.length} total)</span>
                      )}
                    </p>
                    {activeFiltersCount > 0 && (
                      <Badge variant="secondary" className="hidden lg:inline-flex ml-2">
                        {activeFiltersCount} filter{activeFiltersCount !== 1 ? "s" : ""} active
                      </Badge>
                    )}
                  </div>
                </div>
              </FadeIn>

              <AnimatePresence mode="wait">
                {paginatedProducts.length > 0 ? (
                  <>
                    <StaggerContainer
                      key={`products-${filteredAndSortedProducts.length}-${selectedCategories.join(',')}-${selectedBrands.join(',')}-${priceRange[0]}-${priceRange[1]}-${currentPage}`}
                      className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
                    >
                      {paginatedProducts.map((product) => {
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
                              <Badge className="absolute right-2 top-2 bg-accent text-accent-foreground">
                                ₹{(cashback / 1000).toFixed(1)}K Cashback
                              </Badge>
                            </motion.div>
                          )}
                        </div>
                        <CardContent className="p-3 sm:p-4">
                          <p className="mb-1 text-[10px] font-medium text-muted-foreground sm:text-xs">{product.category}</p>
                          <h3 className="mb-2 line-clamp-2 text-balance text-sm font-semibold sm:text-base lg:text-lg">{product.name}</h3>
                          <div className="mb-2 flex items-baseline gap-2 sm:mb-3">
                            <span className="text-xl font-bold sm:text-2xl">₹{priceInK}K</span>
                          </div>
                          <div className="flex items-center justify-between rounded-lg bg-accent/10 px-2 py-1.5 sm:px-3 sm:py-2">
                            <span className="text-[10px] font-medium text-muted-foreground sm:text-xs">EMI from</span>
                            <span className="text-xs font-semibold text-accent sm:text-sm">₹{emiFrom.toLocaleString("en-IN")}/mo</span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Link>
                </StaggerItem>
                    )
                  })}
                    </StaggerContainer>

                    {totalPages > 1 && (
                      <div className="mt-8 flex justify-center">
                        <Pagination>
                          <PaginationContent>
                            <PaginationItem>
                              <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault()
                                  if (currentPage > 1) handlePageChange(currentPage - 1)
                                }}
                                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                              />
                            </PaginationItem>
                            {getPageNumbers().map((page, index) => (
                              <PaginationItem key={index}>
                                {page === 'ellipsis' ? (
                                  <PaginationEllipsis />
                                ) : (
                                  <PaginationLink
                                    href="#"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      handlePageChange(page)
                                    }}
                                    isActive={currentPage === page}
                                    className="cursor-pointer"
                                  >
                                    {page}
                                  </PaginationLink>
                                )}
                              </PaginationItem>
                            ))}
                            <PaginationItem>
                              <PaginationNext
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault()
                                  if (currentPage < totalPages) handlePageChange(currentPage + 1)
                                }}
                                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                              />
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                      </div>
                    )}
                  </>
                ) : (
                  <motion.div
                    key="no-products"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, ease: smoothEase }}
                    className="py-8 text-center sm:py-12"
                  >
                    <div className="mx-auto max-w-md px-4">
                      <Filter className="mx-auto mb-3 h-10 w-10 text-muted-foreground sm:mb-4 sm:h-12 sm:w-12" />
                      <h3 className="mb-2 text-base font-semibold text-foreground sm:text-lg">No products found</h3>
                      <p className="mb-4 text-xs text-muted-foreground sm:text-sm">
                        Try adjusting your filters to see more products
                      </p>
                      <Button variant="outline" onClick={handleClearFilters}>
                        Clear All Filters
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
