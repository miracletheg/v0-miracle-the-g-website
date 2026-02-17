"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Calendar } from "lucide-react"

export function AboutCTA() {
  return (
    <section className="py-20 pb-32 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center bg-card/50 backdrop-blur-sm border border-gold/30 rounded-2xl p-8 md:p-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
            Ready to Begin Your <span className="text-gold">Journey</span>?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            I would be honored to guide you on your path to healing and transformation. Let&apos;s discover which
            service is right for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/80 text-primary-foreground">
              <Link href="/journey">
                Discover Your Path
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-gold/50 text-gold hover:bg-gold/10 bg-transparent"
            >
              <Link href="/contact">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule a Call
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
