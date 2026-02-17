"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

interface TarotCardProps {
  title: string
  image: string
  description: string
  href: string
  delay?: number
  accentColor?: string
}

export function TarotCard({
  title,
  image,
  description,
  href,
  delay = 0,
  accentColor = "var(--tarot-violet)",
}: TarotCardProps) {
  const [isActive, setIsActive] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [rippleOrigin, setRippleOrigin] = useState({ x: 50, y: 50 })
  const [rippleProgress, setRippleProgress] = useState(0)
  const rippleAnimationRef = useRef<number | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0)
  }, [])

  const animateRipple = useCallback(() => {
    const startTime = performance.now()
    const duration = 1000 // ms

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setRippleProgress(eased * 200)

      if (progress < 1) {
        rippleAnimationRef.current = requestAnimationFrame(animate)
      }
    }

    rippleAnimationRef.current = requestAnimationFrame(animate)
  }, [])

  const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    let clientX: number, clientY: number

    if ("touches" in e) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }

    const x = ((clientX - rect.left) / rect.width) * 100
    const y = ((clientY - rect.top) / rect.height) * 100

    setRippleOrigin({ x, y })
    setRippleProgress(0)

    if (isTouchDevice && !isActive) {
      e.preventDefault()
      setIsActive(true)
      animateRipple()
    }
  }

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (isTouchDevice) return

    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      setRippleOrigin({ x, y })
    }

    setRippleProgress(0)
    setIsActive(true)
    animateRipple()
  }

  const handleMouseLeave = () => {
    if (isTouchDevice) return
    setIsActive(false)
    setRippleProgress(0)
    if (rippleAnimationRef.current) {
      cancelAnimationFrame(rippleAnimationRef.current)
    }
  }

  useEffect(() => {
    if (!isTouchDevice || !isActive) return

    const handleTouchOutside = (e: TouchEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest(".tarot-card-single")) {
        setIsActive(false)
        setRippleProgress(0)
      }
    }

    document.addEventListener("touchstart", handleTouchOutside)
    return () => document.removeEventListener("touchstart", handleTouchOutside)
  }, [isTouchDevice, isActive])

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (rippleAnimationRef.current) {
        cancelAnimationFrame(rippleAnimationRef.current)
      }
    }
  }, [])

  const getRippleMaskStyle = () => {
    if (rippleProgress === 0) {
      return {
        maskImage: `radial-gradient(circle at 50% 50%, black 0%, transparent 0%)`,
        WebkitMaskImage: `radial-gradient(circle at 50% 50%, black 0%, transparent 0%)`,
      }
    }
    return {
      maskImage: `radial-gradient(circle at ${rippleOrigin.x}% ${rippleOrigin.y}%, black ${rippleProgress}%, transparent ${rippleProgress}%)`,
      WebkitMaskImage: `radial-gradient(circle at ${rippleOrigin.x}% ${rippleOrigin.y}%, black ${rippleProgress}%, transparent ${rippleProgress}%)`,
    }
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="tarot-card-single"
      style={{ "--accent": accentColor } as React.CSSProperties}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={href} className="block" onClick={handleInteraction} onTouchStart={handleInteraction}>
        <div className="relative tarot-card-frame">
          <div
            className="relative aspect-[2/3] bg-card border-2 overflow-hidden transition-colors duration-300"
            style={{ borderColor: isActive ? accentColor : `${accentColor}99` }}
          >
            {/* Corner accents */}
            {[
              "top-1.5 left-1.5",
              "top-1.5 right-1.5 -scale-x-100",
              "bottom-1.5 left-1.5 -scale-y-100",
              "bottom-1.5 right-1.5 -scale-100",
            ].map((pos, i) => (
              <svg
                key={i}
                className={`absolute ${pos} w-3 h-3 transition-colors duration-300`}
                style={{ color: isActive ? accentColor : `${accentColor}99` }}
                viewBox="0 0 12 12"
                fill="none"
              >
                <path d="M1 6V1h5" stroke="currentColor" strokeWidth="0.75" />
              </svg>
            ))}

            <div className="absolute inset-[12px] overflow-hidden bg-muted">
              <Image
                src={image || "/placeholder.svg"}
                alt={`${title} tarot card representing ${description}`}
                fill
                className="object-cover object-center transition-transform duration-500"
                style={{
                  filter: "grayscale(1)",
                  transform: isActive ? "scale(1.25)" : "scale(1.15)",
                }}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
              />
            </div>

            <div className="absolute inset-[12px] overflow-hidden pointer-events-none" style={getRippleMaskStyle()}>
              <Image
                src={image || "/placeholder.svg"}
                alt=""
                aria-hidden="true"
                fill
                className="object-cover object-center transition-transform duration-500"
                style={{
                  transform: isActive ? "scale(1.25)" : "scale(1.15)",
                }}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to top, ${accentColor}, transparent)`,
                  opacity: 0.3,
                }}
              />
            </div>

            {/* Title */}
            <div
              className="absolute bottom-[12px] left-[12px] right-[12px] bg-background/95 py-2.5 px-2 border-t transition-colors duration-300"
              style={{ borderColor: `${accentColor}4D` }}
            >
              <h3
                className="font-serif text-[9px] md:text-[10px] tracking-[0.25em] text-center uppercase transition-colors duration-300"
                style={{ color: accentColor }}
              >
                {title}
              </h3>
            </div>
          </div>
        </div>

        <p
          className="text-[10px] text-muted-foreground mt-4 text-center transition-all duration-300"
          style={{
            opacity: 1,
            color: isActive ? accentColor : undefined,
            transform: isActive ? "scale(1.05)" : "scale(1)",
          }}
        >
          {description}
        </p>

        {isTouchDevice && isActive && rippleProgress >= 200 && (
          <p className="text-[9px] mt-2 text-center animate-pulse" style={{ color: accentColor }}>
            Tap again to explore
          </p>
        )}
      </Link>
    </motion.div>
  )
}
