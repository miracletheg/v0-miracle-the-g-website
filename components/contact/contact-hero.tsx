"use client"

import { motion } from "framer-motion"

export function ContactHero() {
  return (
    <section className="pt-32 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="font-serif text-4xl md:text-6xl text-foreground mb-6">
            Let&apos;s <span className="text-gold">Connect</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Whether you have questions about our services, want to book a session, or simply want to say hello — I
            &apos;d love to hear from you. Every message is read with care.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
