"use client"

import { PageTransition } from "./animation-wrapper"

interface PageTransitionWrapperProps {
  children: React.ReactNode
}

export function PageTransitionWrapper({ children }: PageTransitionWrapperProps) {
  return <PageTransition>{children}</PageTransition>
}


