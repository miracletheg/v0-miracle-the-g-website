"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    name: "Randolph",
    location: "London, UK",
    text: "It was the very first time for me to do a Reiki session and this Reiki session with Samira was informative, it was eye opening and it really showed me a lot about myself. She also shared with me ways to improve on areas that really need improving on and for that I am forever grateful. If you're looking to bare yourself from the inside out, Samira is the real deal.",
    service: "Reiki Healing",
  },
  {
    name: "Latoya",
    location: "Toronto, ON",
    text: "From the moment that I messaged her inquiring about her services, to the day of my session she made it such a smooth and easy process. The warmth, the genuineness, the sincerity, everything emanating from this girl was just so pure! The atmosphere, the sunlight, the crystals, the vegetation, the whole set up was a vibe!",
    service: "Reiki Healing",
  },
  {
    name: "Gabriel",
    location: "Toronto, ON",
    text: "I would definitely recommend Samira, I found her session was very relaxing and insightful. There's nothing to lose in trying it so you might as well try it, because you never know what it could do for you!",
    service: "Reiki Session",
  },
  {
    name: "Temi",
    location: "Toronto, ON",
    text: "Samira is a one of a kind spiritual therapist. A session with her can be easily described as gentle, warm, intense, honest and very grounding. Every session I've had with her up to date has immaculately manifested itself. Sessions with her is truly spiritual therapy for me.",
    service: "Spiritual Therapy",
  },
  {
    name: "Omie",
    location: "Costa Rica",
    text: "The work we did together left me feeling really wonderful and clear and open and shining. She gave me some incredible information that allowed me to take that energy and keep with me and at the same time protect myself. She truly activated the healer within me!",
    service: "Healing Session",
  },
  {
    name: "Rebecca",
    location: "Montreal, QC",
    text: "Samira knew where certain things in my life had caused the most pain. Without divulging any fine details about my life, she just knew the certain themes that surrounded my pain. It was truly a magical experience – life-changing I would say!",
    service: "Reiki Healing",
  },
  {
    name: "Francesca",
    location: "New York",
    text: "I leave every single session feeling lighter, more clear, and more connected to my body. I have a bigger and clearer understanding about things that I need to change in order to make a larger shift in my life. The shift that I've noticed in my life and the gifts that she's given me just keep on giving!",
    service: "Distance Reiki",
  },
]

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Card reveal on scroll
  const cardY = useTransform(scrollYProgress, [0, 0.3], ["20%", "0%"])
  const cardOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])

  const next = () => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const timer = setInterval(next, 8000)
    return () => clearInterval(timer)
  }, [])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 40 : -40,
      opacity: 0,
    }),
  }

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20 md:py-32">
      <div className="container mx-auto px-8 md:px-6 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[10px] tracking-[0.5em] text-muted-foreground uppercase mb-6">Testimonials</p>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-foreground tracking-tight">
            Voices of <span className="italic">Transformation</span>
          </h2>
        </motion.div>

        {/* Testimonial Card - reveals on scroll */}
        <motion.div style={{ y: cardY, opacity: cardOpacity }} className="max-w-3xl mx-auto">
          {/* Card container */}
          <div className="bg-card border border-border px-6 py-8 md:p-12 relative mx-2 md:mx-0 h-[600px] md:h-[650px] flex flex-col">
            {/* Corner accents */}
            {[
              "top-3 left-3",
              "top-3 right-3 -scale-x-100",
              "bottom-3 left-3 -scale-y-100",
              "bottom-3 right-3 -scale-100",
            ].map((pos, i) => (
              <svg key={i} className={`absolute ${pos} w-4 h-4 text-foreground/10`} viewBox="0 0 16 16" fill="none">
                <path d="M1 8V1h7" stroke="currentColor" strokeWidth="0.75" />
              </svg>
            ))}

            <div className="overflow-hidden flex-1 flex items-center">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={current}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="text-center py-4 w-full"
                >
                  {/* Quote mark */}
                  <div className="font-serif text-5xl text-foreground/10 mb-6">"</div>

                  <p className="font-serif text-lg md:text-xl lg:text-2xl text-foreground mb-10 leading-relaxed italic">
                    {testimonials[current].text}
                  </p>

                  <div>
                    <p className="text-foreground text-sm tracking-wide">{testimonials[current].name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {testimonials[current].location} · {testimonials[current].service}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-8 mt-8 pt-8 border-t border-border/50">
              <button
                onClick={prev}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex gap-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > current ? 1 : -1)
                      setCurrent(index)
                    }}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                      index === current ? "bg-foreground w-6" : "bg-foreground/20 hover:bg-foreground/40"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button
            asChild
            variant="ghost"
            className="text-muted-foreground hover:text-foreground hover:bg-transparent text-sm tracking-wide"
          >
            <Link href="/testimonials" scroll={true}>
              Read All Testimonials
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
