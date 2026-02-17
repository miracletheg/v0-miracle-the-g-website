"use client"

import type React from "react"

import { useRouter, usePathname } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useSwipe } from "@/hooks/use-swipe"

const SERVICES = [
  { slug: "oracle", name: "The Oracle", order: 0 },
  { slug: "shaman", name: "The Shaman", order: 1 },
  { slug: "healer", name: "The Healer", order: 2 },
  { slug: "teacher", name: "The Teacher", order: 3 },
]

export function ServiceCarousel({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [direction, setDirection] = useState<"left" | "right">("right")
  const [currentIndex, setCurrentIndex] = useState(0)

  // Determine current service from pathname
  useEffect(() => {
    const currentService = SERVICES.find((s) => pathname.includes(`/services/${s.slug}`))
    if (currentService) {
      setCurrentIndex(currentService.order)
    }
  }, [pathname])

  const navigate = (newDirection: "left" | "right") => {
    setDirection(newDirection)
    let newIndex = currentIndex

    if (newDirection === "right") {
      newIndex = (currentIndex + 1) % SERVICES.length
    } else {
      newIndex = (currentIndex - 1 + SERVICES.length) % SERVICES.length
    }

    router.push(`/services/${SERVICES[newIndex].slug}`)
  }

  const swipeHandlers = useSwipe({
    onSwipeLeft: () => navigate("right"),
    onSwipeRight: () => navigate("left"),
    threshold: 75,
  })

  return (
    <div className="relative" style={{ touchAction: "pan-y" }} {...swipeHandlers}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: direction === "right" ? 100 : -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction === "right" ? -100 : 100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Left Navigation Button */}
      <motion.button
        onClick={() => navigate("left")}
        whileHover={{ scale: 1.1, x: -4 }}
        whileTap={{ scale: 0.95 }}
        className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex items-center justify-center w-12 h-12 rounded-full border border-border/50 bg-background/80 backdrop-blur-sm hover:bg-background hover:border-border transition-colors duration-300"
        aria-label="Previous service"
      >
        <ChevronLeft className="w-5 h-5 text-foreground" />
      </motion.button>

      {/* Right Navigation Button */}
      <motion.button
        onClick={() => navigate("right")}
        whileHover={{ scale: 1.1, x: 4 }}
        whileTap={{ scale: 0.95 }}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex items-center justify-center w-12 h-12 rounded-full border border-border/50 bg-background/80 backdrop-blur-sm hover:bg-background hover:border-border transition-colors duration-300"
        aria-label="Next service"
      >
        <ChevronRight className="w-5 h-5 text-foreground" />
      </motion.button>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-3 bg-background/80 backdrop-blur-sm border border-border/50 rounded-full p-2">
        <motion.button
          onClick={() => navigate("left")}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full hover:bg-muted transition-colors"
          aria-label="Previous service"
        >
          <ChevronLeft className="w-4 h-4" />
        </motion.button>

        <div className="flex items-center gap-1 px-2">
          {SERVICES.map((_, index) => (
            <motion.div
              key={index}
              className={`h-1.5 rounded-full transition-all ${
                index === currentIndex ? "w-6 bg-cream" : "w-1.5 bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        <motion.button
          onClick={() => navigate("right")}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full hover:bg-muted transition-colors"
          aria-label="Next service"
        >
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  )
}
