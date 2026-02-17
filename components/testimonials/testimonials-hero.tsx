"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

export function TestimonialsHero() {
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
            className="flex justify-center gap-1 mb-6"
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="h-8 w-8 fill-gold text-gold" />
            ))}
          </motion.div>

          <h1 className="font-serif text-4xl md:text-6xl text-foreground mb-6">
            Voices of <span className="text-gold">Transformation</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Real stories from real people who have experienced profound healing and transformation. These testimonials
            reflect the power of opening yourself to the healing journey.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
