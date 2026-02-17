"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function AboutHero() {
  return (
    <section className="pt-32 pb-16 relative">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[4/5] max-w-lg mx-auto">
              <div className="absolute inset-0 rounded-2xl border border-border/60 overflow-hidden">
                <Image
                  src="/images/samira-portrait.png"
                  alt="Portrait of Samira Maharaj, also known as Miracle The G, a psychic medium and shamanic healer based in Toronto"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-4 border border-cream/15 rounded-xl pointer-events-none" />

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -bottom-6 -right-6 bg-card border border-cream/30 rounded-xl p-4 shadow-xl"
              >
                <p className="font-serif text-3xl text-cream font-semibold">10+</p>
                <p className="text-sm text-muted-foreground">Years Healing</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Content - Updated to use Samira's actual bio */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <p className="text-cream text-sm uppercase tracking-wider mb-4">Meet Samira</p>

            <h1 className="font-serif text-4xl md:text-6xl text-foreground mb-6">
              Hello <span className="text-cream">Beloved Universe</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              I&apos;m Samira Maharaj, but many know me as Samiracle or The Goddess of Miracles. I was born and raised
              in the greater Toronto area of Ontario, Canada although I am quite the globe trotter. I am a psychic
              medium and shamanic medicine practitioner, which has allowed me to connect with hundreds of beautiful
              souls from all over the world!
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              My journey has lead me to confront and work through a wide spectrum of personal challenges myself. By
              doing this work diligently for myself over the span of 10+ years and by cultivating the courage to share
              my experiences with others, I very naturally solidified my role as a psychic space holder for many others.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
