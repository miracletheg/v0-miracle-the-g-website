"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MessageCircle, ArrowRight } from "lucide-react"

export function FAQCTA() {
  return (
    <section className="py-16 pb-32 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8"
        >
          <MessageCircle className="h-10 w-10 text-gold mx-auto mb-4" />
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4">Still Have Questions?</h2>
          <p className="text-muted-foreground mb-6">
            Can&apos;t find the answer you&apos;re looking for? We&apos;re here to help. Reach out and we&apos;ll get
            back to you as soon as possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/80 text-primary-foreground">
              <Link href="/contact">
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-gold/50 text-gold hover:bg-gold/10 bg-transparent"
            >
              <Link href="/journey">Explore Services</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
