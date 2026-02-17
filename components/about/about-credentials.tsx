"use client"

import { motion } from "framer-motion"

const modalities = [
  "Reiki Healing of the Usui Rhoyo Lineage",
  "Tarot, Runes and Oracle readings",
  "Past Life Readings & Regression",
  "Guided Meditation & Yoga Nidra",
  "Facilitating Amphibian & Plant Medicine Ceremonies",
  "Entity/Paranormal Extraction and Karmic Cord Cutting",
]

export function AboutCredentials() {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-cosmic-purple/10 via-transparent to-cosmic-violet/10" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Although many of my gifts were inherited, I still felt it was important for me to expand my knowledge by
            exploring a plethora of other healing modalities to obtain a greater connection to the mind, body and soul.
          </p>

          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-8">
            Every Healer Has Their Methods <span className="text-gold">and Their Magick...</span>
          </h2>

          <p className="text-muted-foreground mb-8">These modalities include:</p>

          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {modalities.map((modality, index) => (
              <motion.div
                key={modality}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex items-center gap-3 bg-card/30 border border-border rounded-lg p-4 hover:border-gold/30 transition-colors"
              >
                <div className="w-2 h-2 bg-gold rotate-45 shrink-0" />
                <span className="text-foreground">{modality}</span>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            Today my experience has lead me to focus more specifically on holding and facilitating space for energy
            healing through a combination of these modalities at once, sometimes even pairing them with sacred plant or
            amphibian medicine ceremonies.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
