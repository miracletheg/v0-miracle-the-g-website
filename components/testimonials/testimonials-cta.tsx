"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Heart } from "lucide-react"

export function TestimonialsCTA() {
  return (
    <section className="py-16 pb-32 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center bg-card/50 backdrop-blur-sm border border-gold/30 rounded-2xl p-8"
        >
          <Heart className="h-10 w-10 text-gold mx-auto mb-4" />
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4">Ready to Write Your Own Story?</h2>
          <p className="text-muted-foreground mb-6">
            Every transformation begins with a single step. Discover which path is right for you and begin your healing
            journey today.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/80 text-primary-foreground">
            <Link href="/journey">
              Start Your Journey
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
