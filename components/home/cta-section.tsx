"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { LeadCaptureForm } from "@/components/lead-capture-form"

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Card reveal on scroll
  const cardY = useTransform(scrollYProgress, [0, 0.4], ["15%", "0%"])
  const cardOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6 relative">
        <motion.div style={{ y: cardY, opacity: cardOpacity }} className="max-w-2xl mx-auto">
          {/* Card container */}
          <div className="bg-card border border-border p-8 md:p-12 relative px-0 text-center font-extralight text-sm tracking-normal mx-0">
            {/* Corner accents */}
            {[
              "top-3 left-3",
              "top-3 right-3 -scale-x-100",
              "bottom-3 left-3 -scale-y-100",
              "bottom-3 right-3 -scale-100",
            ].map((pos, i) => (
              <svg key={i} className={`absolute ${pos} w-4 h-4 text-foreground/10`} viewBox="0 0 16 16" fill="none">
                <path d="M1 8V1h7" stroke="currentColor" strokeWidth="0.75" />
              </svg>
            ))}

            <LeadCaptureForm
              title="Ready to Begin Your Journey?"
              subtitle="Leave your details and we'll guide you to the perfect healing experience"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
