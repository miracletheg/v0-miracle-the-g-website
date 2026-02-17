"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function AboutPreview() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Clear parallax for image and content moving at different speeds
  const imageY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"])
  const contentY = useTransform(scrollYProgress, [0, 1], ["30%", "-10%"])
  const cardOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])

  return (
    <section ref={sectionRef} className="relative overflow-hidden md:py-36 py-0">
      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image card - reveals on scroll with parallax */}
          <motion.div style={{ y: imageY, opacity: cardOpacity }} className="relative order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative aspect-[3/4] bg-card border border-border">
                {/* Inner frame */}
                <div className="absolute inset-[8px] border border-border/50" />

                {/* Corner ornaments */}
                {[
                  "top-3 left-3",
                  "top-3 right-3 -scale-x-100",
                  "bottom-3 left-3 -scale-y-100",
                  "bottom-3 right-3 -scale-100",
                ].map((pos, i) => (
                  <svg key={i} className={`absolute ${pos} w-5 h-5 text-foreground/15`} viewBox="0 0 20 20" fill="none">
                    <path d="M1 10V1h9" stroke="currentColor" strokeWidth="0.75" />
                  </svg>
                ))}

                {/* Image */}
                <div className="absolute inset-[16px] overflow-hidden bg-muted">
                  <Image
                    src="/images/samira-portrait.png"
                    alt="Samira Maharaj in a spiritual setting, ready to guide healing journeys"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content card - reveals on scroll with different parallax */}
          <motion.div style={{ y: contentY }} className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            >
              <p className="text-[10px] tracking-[0.5em] text-muted-foreground uppercase mb-8">About</p>

              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-10 tracking-tight leading-[1.1]">
                Meet <span className="italic">Samira</span>
              </h2>

              <div className="flex items-center gap-4 mb-10">
                <div className="w-8 h-px bg-border" />
                <div className="w-2 h-2 bg-foreground/10 rotate-45" />
                <div className="w-8 h-px bg-border" />
              </div>

              <div className="space-y-6 mb-12">
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  Known as "Miracle The G," Samira is a certified Reiki Master, shamanic healer, and psychic medium who
                  has dedicated her life to guiding others toward their highest potential.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  Her journey began with her own profound healing experience, which ignited a passion to share these
                  transformative practices with the world.
                </p>
              </div>

              <Button
                asChild
                variant="outline"
                className="border-border hover:border-foreground hover:bg-transparent px-10 py-6 text-xs tracking-[0.2em] uppercase transition-all duration-300 bg-transparent"
              >
                <Link href="/about">Read Full Story</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
