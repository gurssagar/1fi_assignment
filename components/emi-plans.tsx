"use client"

import { useState } from "react"
import { Check, Sparkles, Info, AlertCircle, FileText, Shield, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/context/cart-context"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { motion } from "framer-motion"
import { smoothEase } from "@/components/animation-wrapper"

interface EmiPlan {
  id: string
  tenure: number
  monthlyPayment: number
  interestRate: number
  totalAmount: number
  cashback: number
  recommended: boolean
}

interface EmiPlansProps {
  plans: EmiPlan[]
  selectedPlan: string
  onPlanChange: (id: string) => void
  productId: string
  productName: string
  productImage: string
  variantStorage?: string
  variantColor?: string
  variantRam?: string
}

export function EmiPlans({
  plans,
  selectedPlan,
  onPlanChange,
  productId,
  productName,
  productImage,
  variantStorage,
  variantColor,
  variantRam,
}: EmiPlansProps) {
  const { addItem } = useCart()
  const [openDialogId, setOpenDialogId] = useState<string | null>(null)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const selectedPlanData = plans.find((plan) => plan.id === selectedPlan)

  const handleAddToCart = () => {
    if (!selectedPlanData) return

    addItem({
      productId,
      productName,
      productImage,
      variantStorage,
      variantColor,
      variantRam,
      emiPlanId: selectedPlanData.id,
      emiPlanTenure: selectedPlanData.tenure,
      monthlyPayment: selectedPlanData.monthlyPayment,
      totalAmount: selectedPlanData.totalAmount,
      cashback: selectedPlanData.cashback,
    })
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 sm:h-10 sm:w-10">
          <Sparkles className="h-4 w-4 text-accent sm:h-5 sm:w-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground sm:text-xl">Choose Your EMI Plan</h2>
          <p className="text-xs text-muted-foreground sm:text-sm">Backed by mutual funds • Zero hidden charges</p>
        </div>
      </div>

      <div className="grid gap-2.5 sm:gap-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={cn(
              "group relative rounded-lg border-2 p-4 transition-all sm:rounded-xl sm:p-5",
              selectedPlan === plan.id
                ? "border-accent bg-accent/5 shadow-sm"
                : "border-border bg-card hover:border-accent/50",
            )}
          >
            {plan.recommended && (
              <Badge className="absolute -top-2.5 left-4 bg-accent text-accent-foreground">Recommended</Badge>
            )}

            <div className="flex items-start justify-between gap-3 sm:gap-4">
              <button
                onClick={() => onPlanChange(plan.id)}
                className="flex-1 text-left"
                type="button"
              >
                <div className="flex items-baseline gap-1.5 sm:gap-2">
                  <span className="text-xl font-bold text-foreground sm:text-2xl">
                    {formatPrice(plan.monthlyPayment)}
                  </span>
                  <span className="text-xs text-muted-foreground sm:text-sm">/month</span>
                </div>

                <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:mt-2 sm:gap-x-4 sm:text-sm">
                  <span className="text-muted-foreground">
                    <span className="font-medium text-foreground">{plan.tenure} months</span> tenure
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">
                    <span className="font-medium text-foreground">
                      {plan.interestRate === 0 ? "0%" : `${plan.interestRate}%`}
                    </span>{" "}
                    interest
                  </span>
                  {plan.cashback > 0 && (
                    <>
                      <span className="text-muted-foreground">•</span>
                      <span className="font-medium text-accent">{formatPrice(plan.cashback)} cashback</span>
                    </>
                  )}
                </div>

                <div className="mt-1.5 text-[11px] text-muted-foreground sm:mt-2 sm:text-xs">
                  Total: {formatPrice(plan.totalAmount)}
                </div>
              </button>

              <div className="flex items-center gap-2">
                <Dialog open={openDialogId === plan.id} onOpenChange={(open) => setOpenDialogId(open ? plan.id : null)}>
                  <DialogTrigger asChild>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        setOpenDialogId(plan.id)
                      }}
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all sm:h-8 sm:w-8",
                        "border-border bg-muted/50 hover:border-accent hover:bg-accent/10",
                        "text-muted-foreground hover:text-accent",
                      )}
                      aria-label="View plan details"
                    >
                      <Info className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </motion.button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2 text-xl">
                        <FileText className="h-5 w-5 text-accent" />
                        EMI Plan Details - {plan.tenure} Months
                      </DialogTitle>
                      <DialogDescription>
                        Complete terms, conditions, and declarations for this EMI plan
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.3, ease: smoothEase }}
                        className="rounded-lg border border-border bg-muted/30 p-4"
                      >
                        <h3 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
                          <Sparkles className="h-4 w-4 text-accent" />
                          Plan Summary
                        </h3>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div>
                            <p className="text-xs text-muted-foreground">Monthly Payment</p>
                            <p className="text-lg font-bold text-foreground">{formatPrice(plan.monthlyPayment)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Tenure</p>
                            <p className="text-lg font-bold text-foreground">{plan.tenure} Months</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Interest Rate</p>
                            <p className="text-lg font-bold text-foreground">
                              {plan.interestRate === 0 ? "0% (Zero Interest)" : `${plan.interestRate}%`}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Total Amount</p>
                            <p className="text-lg font-bold text-foreground">{formatPrice(plan.totalAmount)}</p>
                          </div>
                          {plan.cashback > 0 && (
                            <div className="sm:col-span-2">
                              <p className="text-xs text-muted-foreground">Cashback</p>
                              <p className="text-lg font-bold text-accent">{formatPrice(plan.cashback)}</p>
                            </div>
                          )}
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.3, ease: smoothEase }}
                      >
                        <h3 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
                          <Check className="h-4 w-4 text-accent" />
                          Key Features
                        </h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                            <span>Zero interest EMI backed by mutual fund investments</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                            <span>No credit score impact - payments secured by mutual funds</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                            <span>Flexible prepayment options without penalties</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                            <span>Instant approval with minimal documentation</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                            <span>Transparent pricing with no hidden charges</span>
                          </li>
                        </ul>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.3, ease: smoothEase }}
                      >
                        <h3 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
                          <FileText className="h-4 w-4 text-accent" />
                          Terms & Conditions
                        </h3>
                        <div className="space-y-3 text-sm text-muted-foreground">
                          <div>
                            <p className="font-medium text-foreground mb-1">Payment Schedule</p>
                            <p>
                              Monthly payments of {formatPrice(plan.monthlyPayment)} will be automatically deducted from
                              your registered payment method on the same date each month for {plan.tenure} months.
                            </p>
                          </div>
                          <div>
                            <p className="font-medium text-foreground mb-1">Interest & Charges</p>
                            <p>
                              {plan.interestRate === 0
                                ? "This is a zero-interest EMI plan. No interest charges apply."
                                : `Interest rate of ${plan.interestRate}% per annum applies to this plan.`}{" "}
                              Processing fees and other charges are included in the monthly payment amount.
                            </p>
                          </div>
                          <div>
                            <p className="font-medium text-foreground mb-1">Prepayment</p>
                            <p>
                              You can prepay the entire outstanding amount at any time without any prepayment charges or
                              penalties. Early closure benefits may apply.
                            </p>
                          </div>
                          <div>
                            <p className="font-medium text-foreground mb-1">Late Payment</p>
                            <p>
                              Late payment fees of ₹500 per month will be charged if payment is not received within 5
                              days of the due date. Continuous defaults may result in plan cancellation.
                            </p>
                          </div>
                          <div>
                            <p className="font-medium text-foreground mb-1">Mutual Fund Security</p>
                            <p>
                              Your EMI payments are secured by investments in SEBI-registered mutual funds. You will
                              receive regular statements showing your investment allocation and performance.
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.3, ease: smoothEase }}
                        className="rounded-lg border border-amber-200 bg-amber-50/50 p-4 dark:border-amber-800 dark:bg-amber-950/20"
                      >
                        <h3 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
                          <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                          Important Declarations
                        </h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                            <span>
                              Mutual fund investments are subject to market risks. Past performance does not guarantee
                              future returns.
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                            <span>
                              EMI approval is subject to KYC verification and credit assessment. Terms may vary based on
                              individual profile.
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                            <span>
                              Product warranty and after-sales service are provided by the manufacturer, not by EMI
                              Store.
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                            <span>
                              Cashback will be credited to your account within 30 days of plan completion or early
                              closure.
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                            <span>
                              All disputes are subject to the jurisdiction of courts in India. Terms are governed by
                              Indian laws.
                            </span>
                          </li>
                        </ul>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.3, ease: smoothEase }}
                        className="rounded-lg border p-4 dark:border-purple-800 dark:bg-purple-950/20"
                        style={{ borderColor: 'rgba(120, 50, 223, 0.2)', backgroundColor: 'rgba(120, 50, 223, 0.05)' }}
                      >
                        <h3 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
                          <Shield className="h-4 w-4 dark:text-purple-400" style={{ color: '#7832df' }} />
                          Security & Protection
                        </h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <Shield className="mt-0.5 h-4 w-4 shrink-0 dark:text-purple-400" style={{ color: '#7832df' }} />
                            <span>All transactions are secured with 256-bit SSL encryption</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Shield className="mt-0.5 h-4 w-4 shrink-0 dark:text-purple-400" style={{ color: '#7832df' }} />
                            <span>Your data is protected as per RBI guidelines and data protection laws</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Shield className="mt-0.5 h-4 w-4 shrink-0 dark:text-purple-400" style={{ color: '#7832df' }} />
                            <span>Mutual fund investments are managed by SEBI-registered fund houses</span>
                          </li>
                        </ul>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.3, ease: smoothEase }}
                        className="rounded-lg border border-border bg-muted/30 p-4"
                      >
                        <h3 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
                          <Clock className="h-4 w-4 text-accent" />
                          Need Help?
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          For any queries regarding this EMI plan, please contact our customer support team at{" "}
                          <a href="mailto:support@emistore.com" className="font-medium text-accent hover:underline">
                            support@emistore.com
                          </a>{" "}
                          or call us at{" "}
                          <a href="tel:+911800123456" className="font-medium text-accent hover:underline">
                            1800-123-456
                          </a>
                          . Our support team is available 24/7 to assist you.
                        </p>
                      </motion.div>
                    </div>
                  </DialogContent>
                </Dialog>

                <div
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all sm:h-6 sm:w-6",
                    selectedPlan === plan.id ? "border-accent bg-accent" : "border-border group-hover:border-accent/50",
                  )}
                >
                  {selectedPlan === plan.id && <Check className="h-3 w-3 text-accent-foreground sm:h-4 sm:w-4" />}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        size="lg"
        className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
        onClick={handleAddToCart}
      >
        <span className="hidden sm:inline">Add to Cart - {selectedPlanData?.tenure} Month Plan</span>
        <span className="sm:hidden">Add to Cart ({selectedPlanData?.tenure} Months)</span>
      </Button>

      <div className="rounded-lg bg-muted/50 p-3 sm:p-4">
        <div className="grid gap-2 text-xs text-muted-foreground sm:grid-cols-3 sm:gap-3">
          <div className="flex items-center gap-2">
            <Check className="h-3.5 w-3.5 shrink-0 text-accent sm:h-4 sm:w-4" />
            <span>No credit score impact</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-3.5 w-3.5 shrink-0 text-accent sm:h-4 sm:w-4" />
            <span>Instant approval</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-3.5 w-3.5 shrink-0 text-accent sm:h-4 sm:w-4" />
            <span>Flexible prepayment</span>
          </div>
        </div>
      </div>
    </div>
  )
}
