"use client"

import { motion } from "framer-motion"
import { LeadCaptureForm } from "@/components/lead-capture-form"
import { ShoppingBag, Sparkles, Moon, Star, Flame } from "lucide-react"

const upcomingProducts = [
  {
    icon: Sparkles,
    title: "Healing Crystals",
    description: "Hand-selected crystals charged with Reiki energy",
  },
  {
    icon: Flame,
    title: "Ritual Candles",
    description: "Intention candles for ceremony and meditation",
  },
  {
    icon: Moon,
    title: "Oracle Decks",
    description: "Custom-designed divination tools",
  },
  {
    icon: Star,
    title: "Sacred Tools",
    description: "Smudge kits, singing bowls, and more",
  },
]

export function ShopComingSoon() {
  return (
    <section className="pt-32 pb-32 relative min-h-[80vh] flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <ShoppingBag className="h-10 w-10 text-gold" />
            </motion.div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="inline-block bg-gold/20 text-gold text-sm font-medium px-4 py-1.5 rounded-full mb-6"
            >
              Coming Soon
            </motion.span>

            <h1 className="font-serif text-4xl md:text-6xl text-foreground mb-6">
              The Sacred <span className="text-gold">Shop</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              We&apos;re carefully curating a collection of sacred tools, healing crystals, and spiritual treasures to
              support your journey. Be the first to know when we launch.
            </p>
          </motion.div>

          {/* What's Coming */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="font-serif text-xl text-center text-muted-foreground mb-8">What&apos;s Coming</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {upcomingProducts.map((product, index) => (
                <motion.div
                  key={product.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  className="bg-card/30 border border-border rounded-xl p-4 text-center hover:border-gold/30 transition-colors"
                >
                  <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <product.icon className="h-5 w-5 text-gold" />
                  </div>
                  <h3 className="font-serif text-foreground mb-1">{product.title}</h3>
                  <p className="text-xs text-muted-foreground">{product.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Lead Capture Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <LeadCaptureForm
              title="Get Notified"
              subtitle="Be the first to shop when we launch and receive an exclusive early-access discount"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
