"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AcuityBookingModal } from "@/components/acuity-booking-modal"
import { useSwipe } from "@/hooks/use-swipe"

interface EnergyWork {
  name: string
  description: string
  bookingUrl: { inPerson?: string; online?: string }
}

const energyWorks: EnergyWork[] = [
  {
    name: "Reiki Healing",
    description:
      "Universal life force energy channeled through the practitioner to restore balance and harmony to your physical, emotional, and spiritual bodies. Each session is intuitively guided to address your unique needs.",
    bookingUrl: {
      inPerson:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/55705100/calendar/2793889",
      online:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/41922605/calendar/2793889",
    },
  },
  {
    name: "Chakra Balancing",
    description:
      "A deep energetic tune-up that aligns and harmonizes your seven primary energy centers, clearing blockages and restoring optimal flow throughout your entire being.",
    bookingUrl: {
      inPerson:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/55705100/calendar/2793889",
      online:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/41922605/calendar/2793889",
    },
  },
  {
    name: "Crystal Healing",
    description:
      "Ancient stones and crystals are placed on and around your body to amplify healing energy, clear stagnant patterns, and restore your natural energetic blueprint.",
    bookingUrl: {
      inPerson:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/55705100/calendar/2793889",
      online:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/41922605/calendar/2793889",
    },
  },
  {
    name: "Sound Healing",
    description:
      "Sacred instruments including singing bowls, drums, and tuning forks create vibrational frequencies that penetrate deep into your cellular memory, releasing trauma and restoring harmony.",
    bookingUrl: {
      inPerson:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/55705100/calendar/2793889",
      online:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/41922605/calendar/2793889",
    },
  },
  {
    name: "Breathwork",
    description:
      "Conscious breathing techniques guide you through layers of held emotion and trauma, expanding consciousness and reconnecting you to your innate wisdom and power.",
    bookingUrl: {
      inPerson:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/55705100/calendar/2793889",
      online:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/41922605/calendar/2793889",
    },
  },
]

export function EnergyWorkCarousel() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [selectedBookingUrl, setSelectedBookingUrl] = useState<{ inPerson?: string; online?: string }>({})
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const cardY = useTransform(scrollYProgress, [0, 0.3], ["20%", "0%"])
  const cardOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])

  const next = () => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % energyWorks.length)
  }

  const prev = () => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + energyWorks.length) % energyWorks.length)
  }

  const swipeHandlers = useSwipe({
    onSwipeLeft: next,
    onSwipeRight: prev,
  })

  const openBooking = () => {
    setSelectedBookingUrl(energyWorks[current].bookingUrl)
    setIsBookingOpen(true)
  }

  useEffect(() => {
    const timer = setInterval(next, 7000)
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
    <>
      <AcuityBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        acuityUrl={selectedBookingUrl}
        serviceTitle={energyWorks[current].name}
      />

      <div ref={sectionRef} className="py-16 md:py-20 relative overflow-hidden">
        <div className="container mx-auto px-6 relative">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <p className="text-[10px] tracking-[0.5em] text-muted-foreground uppercase mb-4 md:mb-6">Modalities</p>
            <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl text-foreground tracking-tight">
              Energy Healing <span className="italic">Arts</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-pretty text-sm md:text-base">
              Each session is uniquely tailored, drawing from multiple healing modalities to address your specific needs
            </p>
          </motion.div>

          {/* Carousel Card */}
          <motion.div
            style={{ y: cardY, opacity: cardOpacity, touchAction: "pan-y" }}
            className="max-w-3xl mx-auto"
            {...swipeHandlers}
          >
            <div className="bg-card border border-border px-5 py-6 md:px-10 md:py-8 relative mx-2 md:mx-0 h-[380px] md:h-[420px] flex flex-col">
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
                    className="text-center py-2 w-full"
                  >
                    <div className="flex justify-center mb-4">
                      <div className="w-8 h-[2px] bg-foreground/20" />
                    </div>

                    <h3 className="font-serif text-xl md:text-2xl lg:text-3xl text-foreground mb-4 tracking-wide">
                      {energyWorks[current].name}
                    </h3>

                    <p className="text-muted-foreground text-sm md:text-base lg:text-lg leading-relaxed max-w-xl mx-auto text-pretty mb-6">
                      {energyWorks[current].description}
                    </p>

                    <Button onClick={openBooking} className="bg-cream text-cosmic-deep hover:bg-cream/90">
                      <Calendar className="mr-2 h-4 w-4" />
                      Book {energyWorks[current].name}
                    </Button>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-center gap-8 mt-4 pt-4 border-t border-border/50">
                <button
                  onClick={prev}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Previous modality"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <div className="flex gap-3">
                  {energyWorks.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setDirection(index > current ? 1 : -1)
                        setCurrent(index)
                      }}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                        index === current ? "bg-foreground w-6" : "bg-foreground/20 hover:bg-foreground/40"
                      }`}
                      aria-label={`Go to ${energyWorks[index].name}`}
                    />
                  ))}
                </div>

                <button
                  onClick={next}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Next modality"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
