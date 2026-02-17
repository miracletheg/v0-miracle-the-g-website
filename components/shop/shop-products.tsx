"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ExternalLink, Sparkles, BookOpen } from "lucide-react"

interface Product {
  name: string
  price: string
  originalPrice?: string
  description: string
  icon: React.ReactNode
  gumroadUrl: string
  featured?: boolean
}

const products: Product[] = [
  {
    name: "Reiki Manual Level 1",
    price: "CA$79",
    description:
      "Comprehensive guide to Reiki Level 1. Learn the foundations of energy healing, hand positions, and self-healing techniques.",
    icon: <BookOpen className="w-6 h-6" />,
    gumroadUrl: "https://miracletheg.gumroad.com/l/reiki1",
  },
  {
    name: "Reiki Manual Level 2",
    price: "CA$79",
    description:
      "Advance your practice with Reiki Level 2. Master distance healing, sacred symbols, and deepen your connection to universal energy.",
    icon: <BookOpen className="w-6 h-6" />,
    gumroadUrl: "https://miracletheg.gumroad.com/l/reiki2",
  },
  {
    name: "Reiki Manual Bundle",
    price: "CA$127",
    originalPrice: "CA$158",
    description:
      "Save with both Reiki manuals. Get Level 1 and Level 2 together and save CA$31 on your complete Reiki education.",
    icon: <Sparkles className="w-6 h-6" />,
    gumroadUrl: "https://miracletheg.gumroad.com/l/reiki-bundle",
    featured: true,
  },
]

export function ShopProducts() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">Digital Products</p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Sacred <span className="italic">Resources</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Deepen your spiritual practice with these carefully crafted digital resources and live experiences.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative border rounded-xl p-8 transition-all duration-300 bg-background/50 backdrop-blur-sm ${
                product.featured
                  ? "border-foreground/30 hover:border-foreground/50"
                  : "border-border/50 hover:border-foreground/30"
              }`}
            >
              {/* Featured badge */}
              {product.featured && (
                <div className="absolute -top-3 left-6 px-3 py-1 bg-foreground text-background text-[9px] tracking-[0.2em] uppercase rounded-full">
                  Popular
                </div>
              )}

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-foreground/20 rounded-tl-xl" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-foreground/20 rounded-tr-xl" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-foreground/20 rounded-bl-xl" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-foreground/20 rounded-br-xl" />

              <div className="flex flex-col h-full">
                {/* Icon and Title */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-foreground/5 text-foreground/70">{product.icon}</div>
                  <div className="flex-grow">
                    <h3 className="font-serif text-xl text-foreground mb-1">{product.name}</h3>
                    <div className="flex items-center gap-2">
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>
                      )}
                      <p className="text-lg font-medium text-foreground/80">{product.price}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">{product.description}</p>

                {/* CTA */}
                <Button
                  asChild
                  className={`w-full py-6 text-[10px] tracking-[0.2em] uppercase transition-all duration-300 ${
                    product.featured
                      ? "bg-foreground text-background hover:bg-foreground/90"
                      : "bg-transparent border-2 border-foreground text-foreground hover:bg-foreground hover:text-background"
                  }`}
                >
                  <a href={product.gumroadUrl} target="_blank" rel="noopener noreferrer">
                    <span>Get Access</span>
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16 md:mt-24"
        >
          <p className="text-muted-foreground mb-6">Looking for personalized guidance?</p>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-border hover:border-foreground hover:bg-transparent px-10 py-6 text-[10px] tracking-[0.2em] uppercase bg-transparent"
          >
            <a href="https://miracletheg.as.me/" target="_blank" rel="noopener noreferrer">
              Book a Session
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
