"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { soundManager } from "@/lib/sounds"

const tarotCards = [
  {
    title: "THE HEALER",
    image: "/images/snake-healer1.jpg",
    description: "Reiki & energy work for restoration",
    href: "/services/healer",
    color: "#8B5CF6",
  },
  {
    title: "THE SHAMAN",
    image: "/images/jaguar-shaman1.jpg",
    description: "Sacred ceremonies & transformation",
    href: "/services/shaman",
    color: "#6366F1",
  },
  {
    title: "THE ORACLE",
    image: "/images/peacock-oracle1.jpg",
    description: "Psychic readings & intuitive guidance",
    href: "/services/oracle",
    color: "#EC4899",
  },
  {
    title: "THE TEACHER",
    image: "/images/fox-teacher1.jpg",
    description: "Medicine packages & spiritual training",
    href: "/services/teacher",
    color: "#F59E0B",
  },
]

interface RippleState {
  index: number
  x: number
  y: number
  progress: number
}

export function TarotShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const [rippleState, setRippleState] = useState<RippleState | null>(null)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const animationRef = useRef<number | null>(null)
  const router = useRouter()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"])
  const y2 = useTransform(scrollYProgress, [0, 1], ["20%", "-10%"])
  const y3 = useTransform(scrollYProgress, [0, 1], ["10%", "-20%"])
  const y4 = useTransform(scrollYProgress, [0, 1], ["25%", "-5%"])
  const cardY = [y1, y2, y3, y4]

  const headerY = useTransform(scrollYProgress, [0, 0.3], ["30%", "0%"])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0)
  }, [])

  useEffect(() => {
    if (!rippleState || rippleState.progress >= 1) return

    const animate = () => {
      setRippleState((prev) => {
        if (!prev) return null
        const newProgress = Math.min(prev.progress + 0.015, 1) // ~65 frames / ~1 second to complete
        return { ...prev, progress: newProgress }
      })
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [rippleState]) // Updated to use the entire rippleState object

  const handleTouchStart = (e: React.TouchEvent, index: number, href: string) => {
    const touch = e.touches[0]
    const card = cardRefs.current[index]

    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = ((touch.clientX - rect.left) / rect.width) * 100
    const y = ((touch.clientY - rect.top) / rect.height) * 100

    if (activeCard === index && rippleState?.progress === 1) {
      soundManager.play("select")
      router.push(href)
    } else {
      e.preventDefault()
      soundManager.play("hover")
      setActiveCard(index)
      setRippleState({ index, x, y, progress: 0 })
    }
  }

  const handleMouseEnter = (e: React.MouseEvent, index: number) => {
    if (isTouchDevice) return

    const card = cardRefs.current[index]
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    soundManager.play("hover")
    setActiveCard(index)
    setRippleState({ index, x, y, progress: 0 })
  }

  const handleMouseLeave = () => {
    if (isTouchDevice) return
    setActiveCard(null)
    setRippleState(null)
  }

  useEffect(() => {
    if (!isTouchDevice) return

    const handleTouchOutside = (e: TouchEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest(".tarot-card-touch")) {
        setActiveCard(null)
        setRippleState(null)
      }
    }

    document.addEventListener("touchstart", handleTouchOutside)
    return () => document.removeEventListener("touchstart", handleTouchOutside)
  }, [isTouchDevice])

  const getRippleMaskStyle = (index: number): React.CSSProperties => {
    if (!rippleState || rippleState.index !== index) {
      return { opacity: 0 }
    }

    const { x, y, progress } = rippleState
    const size = progress * 200

    return {
      opacity: 1,
      maskImage: `radial-gradient(circle at ${x}% ${y}%, black ${size}%, transparent ${size}%)`,
      WebkitMaskImage: `radial-gradient(circle at ${x}% ${y}%, black ${size}%, transparent ${size}%)`,
    }
  }

  return (
    <section ref={sectionRef} className="py-16 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div style={{ y: headerY, opacity: headerOpacity }} className="text-center mb-12 md:mb-24">
          <p className="text-[10px] tracking-[0.5em] text-muted-foreground uppercase mb-6">The Sacred Deck</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 tracking-tight">
            Choose Your <span className="italic">Path</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-border" />
            <div className="w-1.5 h-1.5 bg-foreground/20 rotate-45" />
            <div className="w-8 h-px bg-border" />
          </div>
          <p className="text-muted-foreground max-w-md mx-auto text-sm leading-relaxed">
            Four sacred archetypes guide different aspects of your spiritual journey
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-12 md:mb-24">
          {tarotCards.map((card, index) => {
            const isActive = activeCard === index
            const isRippling = rippleState?.index === index
            const rippleComplete = isRippling && rippleState.progress >= 1

            return (
              <motion.div
                key={card.title}
                style={{ y: cardY[index] }}
                className="tarot-card-touch"
                ref={(el) => {
                  cardRefs.current[index] = el
                }}
                onTouchStart={(e) => handleTouchStart(e, index, card.href)}
                onMouseEnter={(e) => handleMouseEnter(e, index)}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="block cursor-pointer"
                  onClick={(e) => {
                    if (!isTouchDevice) {
                      soundManager.play("select")
                    }
                  }}
                >
                  <Link
                    href={card.href}
                    className="block"
                    onClick={(e) => {
                      if (isTouchDevice && (!isActive || !rippleComplete)) {
                        e.preventDefault()
                      }
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 60 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
                    >
                      <div className="relative" style={{ "--card-color": card.color } as React.CSSProperties}>
                        <div
                          className="relative aspect-[2/3] bg-card border overflow-hidden transition-colors duration-500"
                          style={{ borderColor: isActive ? card.color : "var(--border)" }}
                        >
                          <div
                            className="absolute inset-[4px] sm:inset-[6px] border pointer-events-none transition-colors duration-500"
                            style={{ borderColor: isActive ? `${card.color}30` : "rgba(255,255,255,0.1)" }}
                          />

                          {[
                            "top-1 left-1 sm:top-1.5 sm:left-1.5",
                            "top-1 right-1 sm:top-1.5 sm:right-1.5 -scale-x-100",
                            "bottom-1 left-1 sm:bottom-1.5 sm:left-1.5 -scale-y-100",
                            "bottom-1 right-1 sm:bottom-1.5 sm:right-1.5 -scale-100",
                          ].map((pos, i) => (
                            <svg
                              key={i}
                              className={`absolute ${pos} w-2 h-2 sm:w-3 sm:h-3 transition-colors duration-500`}
                              style={{ color: isActive ? `${card.color}99` : "rgba(255,255,255,0.2)" }}
                              viewBox="0 0 12 12"
                              fill="none"
                            >
                              <path d="M1 6V1h5" stroke="currentColor" strokeWidth="0.75" />
                            </svg>
                          ))}

                          <div className="absolute inset-[8px] sm:inset-[12px] overflow-hidden bg-muted">
                            {/* Grayscale base layer */}
                            <Image
                              src={card.image || "/placeholder.svg"}
                              alt={`${card.title} tarot card - ${card.description}`}
                              fill
                              className="object-cover object-center transition-transform duration-700 ease-out"
                              style={{
                                filter: "grayscale(1)",
                                transform: isActive ? "scale(1.25)" : "scale(1.15)",
                              }}
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                            />

                            {/* Color layer with ripple mask (mobile) or full reveal (desktop) */}
                            <div className="absolute inset-0" style={getRippleMaskStyle(index)}>
                              <Image
                                src={card.image || "/placeholder.svg"}
                                alt=""
                                aria-hidden="true"
                                fill
                                className="object-cover object-center transition-transform duration-700 ease-out"
                                style={{
                                  transform: isActive ? "scale(1.25)" : "scale(1.15)",
                                }}
                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                              />
                            </div>

                            {/* Color overlay gradient */}
                            <div
                              className="absolute inset-0 transition-opacity duration-700"
                              style={{
                                background: `linear-gradient(to top, ${card.color}, transparent)`,
                                opacity: isActive ? 0.3 : 0.15,
                              }}
                            />
                          </div>

                          <div className="absolute bottom-[8px] sm:bottom-[12px] left-[8px] sm:left-[12px] right-[8px] sm:right-[12px] bg-background/95 py-1.5 sm:py-2.5 px-1 sm:px-2 border-t border-border/30">
                            <h3
                              className="font-serif text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] text-center uppercase transition-colors duration-500"
                              style={{ color: isActive ? card.color : "var(--foreground)" }}
                            >
                              {card.title}
                            </h3>
                          </div>
                        </div>
                      </div>

                      <p
                        className="text-[10px] text-muted-foreground mt-4 text-center transition-opacity duration-500"
                        style={{ opacity: isActive ? 1 : 0 }}
                      >
                        {card.description}
                      </p>

                      {isTouchDevice && isActive && rippleComplete && (
                        <p className="text-[9px] text-foreground/50 mt-2 text-center animate-pulse">
                          Tap again to explore
                        </p>
                      )}
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-muted-foreground mb-6 text-xs">Not sure which path calls to you?</p>
          <Button
            asChild
            variant="outline"
            className="border-border hover:border-foreground hover:bg-transparent px-10 py-6 text-xs tracking-[0.2em] uppercase transition-all duration-300 bg-transparent"
            onClick={() => soundManager.play("select")}
          >
            <Link href="/journey" scroll={true}>
              Begin Your Journey
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
