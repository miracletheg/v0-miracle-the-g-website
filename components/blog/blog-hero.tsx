"use client"

import { motion } from "framer-motion"
import { BookOpen } from "lucide-react"

export function BlogHero() {
  return (
    <section className="pt-32 pb-12 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <BookOpen className="h-8 w-8 text-gold" />
          </motion.div>

          <h1 className="font-serif text-4xl md:text-6xl text-foreground mb-6">
            Wisdom & <span className="text-gold">Insights</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Dive into articles on spiritual practices, healing modalities, and transformative wisdom. Learn, grow, and
            deepen your understanding of the healing arts.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
