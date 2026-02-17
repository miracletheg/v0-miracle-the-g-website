"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sparkles, Grid3X3 } from "lucide-react"
import { JourneyQuiz } from "./journey-quiz"
import { ExploreDeck } from "./explore-deck"

export function JourneyOptions() {
  const [selectedOption, setSelectedOption] = useState<"quiz" | "deck" | null>(null)

  return (
    <section className="relative pt-32 pb-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <AnimatePresence mode="wait">
          {selectedOption === null && (
            <motion.div
              key="options"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <div className="flex flex-col items-center gap-8">
                <motion.button
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedOption("quiz")}
                  className="group text-center"
                >
                  <Sparkles className="h-8 w-8 mx-auto mb-6 text-foreground/70 group-hover:text-foreground transition-colors" />

                  <h1 className="font-serif text-4xl md:text-6xl text-foreground mb-6 tracking-wide">
                    Discover Your <span className="text-gold">Path</span>
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
                    Every soul&apos;s journey is unique. Answer a few questions and let the universe guide you to the
                    perfect service for your soul.
                  </p>

                  <span className="inline-flex items-center justify-center px-8 py-3 border border-foreground text-foreground font-medium tracking-widest text-sm uppercase group-hover:bg-foreground group-hover:text-background transition-all duration-300">
                    Begin Your Journey
                    <svg
                      className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </motion.button>

                {/* Secondary CTA - Explore Deck (subtle text link) */}
                <motion.button
                  whileHover={{ opacity: 1 }}
                  onClick={() => setSelectedOption("deck")}
                  className="group flex items-center gap-2 text-muted-foreground/60 hover:text-foreground transition-colors duration-300"
                >
                  <Grid3X3 className="h-4 w-4" />
                  <span className="text-sm tracking-wide">browse deck</span>
                  <svg
                    className="h-3 w-3 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          )}

          {selectedOption === "quiz" && (
            <JourneyQuiz
              open={true}
              onOpenChange={(isOpen) => {
                if (!isOpen) setSelectedOption(null)
              }}
            />
          )}

          {selectedOption === "deck" && (
            <motion.div
              key="deck"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Button
                variant="ghost"
                onClick={() => setSelectedOption(null)}
                className="mb-8 text-muted-foreground hover:text-foreground"
              >
                <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Options
              </Button>
              <ExploreDeck />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
