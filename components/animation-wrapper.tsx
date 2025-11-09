"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

export const smoothEase: [number, number, number, number] = [0.4, 0, 0.2, 1]
export const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

export const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: smoothEase,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: easeOut,
    },
  },
}

export const fadeInVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: smoothEase,
    },
  },
}

export const slideUpVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: smoothEase,
    },
  },
}

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
}

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: smoothEase,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: easeOut,
    },
  },
}

export const scaleInVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: smoothEase,
    },
  },
}

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {children}
    </motion.div>
  )
}

interface FadeInProps {
  children: ReactNode
  delay?: number
}

export function FadeIn({ children, delay = 0 }: FadeInProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{
        ...fadeInVariants,
        animate: {
          ...fadeInVariants.animate,
          transition: {
            ...fadeInVariants.animate.transition,
            delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

interface SlideUpProps {
  children: ReactNode
  delay?: number
}

export function SlideUp({ children, delay = 0 }: SlideUpProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{
        ...slideUpVariants,
        animate: {
          ...slideUpVariants.animate,
          transition: {
            ...slideUpVariants.animate.transition,
            delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

interface StaggerContainerProps {
  children: ReactNode
  className?: string
}

export function StaggerContainer({ children, className }: StaggerContainerProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children: ReactNode
}

export function StaggerItem({ children }: StaggerItemProps) {
  return (
    <motion.div variants={staggerItem}>
      {children}
    </motion.div>
  )
}

