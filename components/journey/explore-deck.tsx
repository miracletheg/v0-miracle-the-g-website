"use client"

import { motion } from "framer-motion"
import { TarotCard } from "@/components/tarot-card"

const cards = [
  {
    title: "THE HEALER",
    image: "/images/snake-healer1.jpg",
    description: "In-person Reiki sessions and energy healing for deep restoration, pain relief, and chakra balancing.",
    href: "/services/healer",
  },
  {
    title: "THE SHAMAN",
    image: "/images/jaguar-shaman1.jpg",
    description:
      "Sacred plant medicine ceremonies and shamanic rituals for profound transformation and spiritual awakening.",
    href: "/services/shaman",
  },
  {
    title: "THE ORACLE",
    image: "/images/peacock-oracle1.jpg",
    description: "Psychic readings, tarot consultations, and intuitive guidance to illuminate your path forward.",
    href: "/services/oracle",
  },
  {
    title: "THE TEACHER",
    image: "/images/fox-teacher1.jpg",
    description: "Reiki certification training and spiritual education to awaken and master your own healing gifts.",
    href: "/services/teacher",
  },
]

export function ExploreDeck() {
  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4 font-light">
          The Sacred <span className="text-cream italic">Deck</span>
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto text-sm font-light">
          Each card represents a unique path of healing and growth. Click on the card that speaks to your soul.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {cards.map((card, index) => (
          <TarotCard key={card.title} {...card} delay={index * 0.1} />
        ))}
      </div>
    </div>
  )
}
