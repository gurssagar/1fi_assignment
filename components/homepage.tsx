"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowRight, Shield, Zap, CheckCircle2, Award, Smartphone, Wallet } from "lucide-react"
import type { Product } from "@/lib/actions/products"
import { motion } from "framer-motion"
import { FadeIn, SlideUp, StaggerContainer, StaggerItem, smoothEase } from "@/components/animation-wrapper"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface HomepageProps {
  products: Product[]
}

export function Homepage({ products }: HomepageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header showGetStarted />

      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-muted/50 to-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <FadeIn delay={0.2}>
              <Badge variant="secondary" className="mb-3 sm:mb-4">
                Powered by Mutual Funds
              </Badge>
            </FadeIn>
            <SlideUp delay={0.3}>
              <h1 className="mb-4 text-balance text-3xl font-bold tracking-tight sm:mb-6 sm:text-4xl lg:text-5xl xl:text-6xl">
                Buy Premium Products with{" "}
                <span className="bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
                  Easy EMI Plans
                </span>
              </h1>
            </SlideUp>
            <FadeIn delay={0.4}>
              <p className="mb-6 text-pretty text-base text-muted-foreground sm:mb-8 sm:text-lg lg:text-xl">
                Shop for the latest smartphones, laptops, and electronics with flexible payment options. Zero interest EMI
                backed by trusted mutual fund investments.
              </p>
            </FadeIn>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease: smoothEase }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/products" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto">
                  Browse Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                </Link>
              </motion.div>
              
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SlideUp delay={0.2}>
            <div className="mb-8 text-center sm:mb-12">
              <h2 className="mb-3 text-balance text-2xl font-bold tracking-tight sm:mb-4 sm:text-3xl lg:text-4xl">Why Choose EMI Store?</h2>
              <p className="text-pretty text-sm text-muted-foreground sm:text-base lg:text-lg">
                Discover what makes us the best choice for your next premium purchase
              </p>
            </div>
          </SlideUp>

          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                      <Wallet className="h-5 w-5 text-accent" />
                    </div>
                    <span className="font-semibold">Zero Interest EMI Plans</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-13 text-muted-foreground">
                  <p className="mb-4">
                    Get flexible payment options with 0% interest on select tenures. Break down your purchase into
                    manageable monthly installments without any hidden charges or processing fees.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span className="text-sm">No cost EMI available on 3, 6, 9, and 12 months</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span className="text-sm">Transparent pricing with no hidden charges</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span className="text-sm">Early closure available without penalties</span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                      <Shield className="h-5 w-5 text-accent" />
                    </div>
                    <span className="font-semibold">Mutual Fund Backed Security</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-13 text-muted-foreground">
                  <p className="mb-4">
                    Your payments are secured by trusted mutual fund investments, ensuring complete financial
                    transparency and security. We partner with leading mutual fund houses to provide you peace of mind.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span className="text-sm">SEBI-registered mutual fund partners</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span className="text-sm">Complete transparency on fund allocation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span className="text-sm">Regular statements and investment tracking</span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                      <Zap className="h-5 w-5 text-accent" />
                    </div>
                    <span className="font-semibold">Instant Approval Process</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-13 text-muted-foreground">
                  <p className="mb-4">
                    Get approved in minutes with our streamlined digital process. No lengthy paperwork or waiting
                    periods - start shopping for your dream products immediately after approval.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span className="text-sm">Quick digital KYC verification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span className="text-sm">Minimal documentation required</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span className="text-sm">Instant credit limit notification</span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                      <Award className="h-5 w-5 text-accent" />
                    </div>
                    <span className="font-semibold">Premium Product Selection</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-13 text-muted-foreground">
                  <p className="mb-4">
                    Access to the latest smartphones, laptops, tablets, and electronics from top brands. All products
                    are 100% authentic with official brand warranty and support.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span className="text-sm">Authorized brand partner with official warranty</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span className="text-sm">Latest models and exclusive launches</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span className="text-sm">Cashback and rewards on every purchase</span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                      <Smartphone className="h-5 w-5 text-accent" />
                    </div>
                    <span className="font-semibold">Easy Management & Support</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-13 text-muted-foreground">
                  <p className="mb-4">
                    Manage your purchases, EMI payments, and mutual fund investments through our easy-to-use mobile app
                    and web portal. Get 24/7 customer support whenever you need assistance.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span className="text-sm">Unified dashboard for all your purchases</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span className="text-sm">24/7 dedicated customer support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span className="text-sm">Automated payment reminders and alerts</span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      <section id="products" className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SlideUp delay={0.2}>
            <div className="mb-8 text-center sm:mb-12">
              <h2 className="mb-3 text-balance text-2xl font-bold tracking-tight sm:mb-4 sm:text-3xl lg:text-4xl">Featured Products</h2>
              <p className="text-pretty text-sm text-muted-foreground sm:text-base lg:text-lg">
                Explore our collection of premium electronics with flexible EMI options
              </p>
            </div>
          </SlideUp>

          <StaggerContainer className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

          <div className="mt-12 text-center">
            <Link href="/products">
              <Button size="lg" variant="outline">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-gradient-to-b from-background to-muted/50 py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <SlideUp delay={0.2}>
            <h2 className="mb-3 text-balance text-2xl font-bold tracking-tight sm:mb-4 sm:text-3xl lg:text-4xl">Ready to Start Shopping?</h2>
          </SlideUp>
          <FadeIn delay={0.3}>
            <p className="mb-6 text-pretty text-sm text-muted-foreground sm:mb-8 sm:text-base lg:text-lg">
              Join thousands of customers who trust us for their premium electronics purchases
            </p>
          </FadeIn>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5, ease: smoothEase }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/products">
            <Button size="lg">
              Get Started Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            </Link>
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  )
}
