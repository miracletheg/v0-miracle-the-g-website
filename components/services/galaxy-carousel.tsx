"use client"

import type React from "react"
import { useRouter, usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useSwipe } from "@/hooks/use-swipe"

const SERVICES = [
  { slug: "oracle", name: "The Oracle", order: 0 },
  { slug: "shaman", name: "The Shaman", order: 1 },
  { slug: "healer", name: "The Healer", order: 2 },
  { slug: "teacher", name: "The Teacher", order: 3 },
]

export function GalaxyCarousel({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [direction, setDirection] = useState(0)

  // Determine current service from pathname
  useEffect(() => {
    const currentService = SERVICES.find((s) => pathname.includes(`/services/${s.slug}`))
    if (currentService) {
      setCurrentIndex(currentService.order)
    }
  }, [pathname])

  const navigate = (newIndex: number, dir: number) => {
    if (isTransitioning || newIndex === currentIndex) return

    setDirection(dir)
    setIsTransitioning(true)

    // Navigate after slight delay for animation
    setTimeout(() => {
      router.push(`/services/${SERVICES[newIndex].slug}`)
      setTimeout(() => {
        setIsTransitioning(false)
      }, 800)
    }, 300)
  }

  const handlePrevious = () => {
    const newIndex = (currentIndex - 1 + SERVICES.length) % SERVICES.length
    navigate(newIndex, -1)
  }

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % SERVICES.length
    navigate(newIndex, 1)
  }

  const swipeHandlers = useSwipe({
    onSwipeLeft: handleNext,
    onSwipeRight: handlePrevious,
    threshold: 75, // Slightly higher threshold for page navigation
  })

  return (
    <div className="relative w-full" style={{ touchAction: "pan-y" }} {...swipeHandlers}>
      {/* Content always visible, smooth transitions only */}
      <motion.div key={pathname} initial={false} animate={{ opacity: 1 }} className="relative z-10">
        {children}
      </motion.div>

      {/* Left Navigation - Desktop */}
      <motion.button
        onClick={handlePrevious}
        disabled={isTransitioning}
        whileHover={{ scale: 1.1, x: -4 }}
        whileTap={{ scale: 0.95 }}
        className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex items-center justify-center w-14 h-14 rounded-full border border-border/30 bg-background/40 backdrop-blur-sm hover:bg-background/60 hover:border-border/50 transition-all duration-500 ease-out disabled:opacity-30 disabled:cursor-not-allowed group"
        aria-label="Previous service"
      >
        <ChevronLeft className="w-6 h-6 transition-transform duration-300 group-hover:-translate-x-0.5" />
      </motion.button>

      {/* Right Navigation - Desktop */}
      <motion.button
        onClick={handleNext}
        disabled={isTransitioning}
        whileHover={{ scale: 1.1, x: 4 }}
        whileTap={{ scale: 0.95 }}
        className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex items-center justify-center w-14 h-14 rounded-full border border-border/30 bg-background/40 backdrop-blur-sm hover:bg-background/60 hover:border-border/50 transition-all duration-500 ease-out disabled:opacity-30 disabled:cursor-not-allowed group"
        aria-label="Next service"
      >
        <ChevronRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-0.5" />
      </motion.button>

      {/* Mobile Navigation - Subtle edge tap zones */}
      <motion.button
        onClick={handlePrevious}
        disabled={isTransitioning}
        whileTap={{ scale: 0.95, opacity: 0.5 }}
        className="lg:hidden fixed left-0 top-1/2 -translate-y-1/2 z-50 w-16 h-32 flex items-center justify-start pl-2 opacity-0 active:opacity-100 transition-opacity disabled:opacity-0"
        aria-label="Previous service"
      >
        <ChevronLeft className="w-6 h-6" />
      </motion.button>

      <motion.button
        onClick={handleNext}
        disabled={isTransitioning}
        whileTap={{ scale: 0.95, opacity: 0.5 }}
        className="lg:hidden fixed right-0 top-1/2 -translate-y-1/2 z-50 w-16 h-32 flex items-center justify-end pr-2 opacity-0 active:opacity-100 transition-opacity disabled:opacity-0"
        aria-label="Next service"
      >
        <ChevronRight className="w-6 h-6" />
      </motion.button>
    </div>
  )
}
