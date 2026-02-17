"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"])
  const subtitleY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"])
  const ctaY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  return (
    <>
      {/* Tagline Section - Positioned between nav and hero */}
      <section className="relative py-8 md:py-12 bg-gradient-to-b from-background/50 to-transparent leading-[0rem] lg:py-0">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="container mx-auto px-6 md:px-8 text-center"
        >
          
        </motion.div>
      </section>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ scale: imageScale }} className="absolute inset-0 z-0">
          <Image
            src="/images/tarot-session-wide.jpeg"
            alt="Mystical tarot reading session with cards spread on a table surrounded by candles and sacred objects"
            fill
            className="object-cover object-center opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </motion.div>

        {/* Content */}
        <motion.div style={{ opacity, scale }} className="container mx-auto px-8 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center leading-7">

          <motion.div style={{ y: titleY }}>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground leading-[1.05] tracking-tight py-0 mb-8"
            >
              Guiding You Through
              <br />
              <span className="italic">Spiritual</span>
              <br />
              Awakening
            </motion.h1>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="w-10 h-px bg-border" />
            <div className="w-1.5 h-1.5 bg-foreground/30 rotate-45" />
            <div className="w-10 h-px bg-border" />
          </motion.div>

          {/* Subtitle with parallax */}
          <motion.div style={{ y: subtitleY }}>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-sm md:text-base text-muted-foreground mb-12 max-w-md mx-auto leading-relaxed"
            >
              Clear your energy. Hear your guides. Transform your life through healing and spiritual awakening.
            </motion.p>
          </motion.div>

          <motion.div style={{ y: ctaY }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 border-0 px-10 py-6 text-[10px] tracking-[0.2em] uppercase transition-all duration-300"
              >
                <Link href="/services">
                  Services
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-border hover:border-foreground hover:bg-transparent px-10 py-6 text-[10px] tracking-[0.2em] uppercase bg-transparent"
              >
                <Link href="/shop">Shop Digital Products</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        
      </motion.div>
      </section>
    </>
  )
}
