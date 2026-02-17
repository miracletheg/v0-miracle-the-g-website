"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform, type PanInfo } from "framer-motion"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AcuityBookingModal } from "@/components/acuity-booking-modal"

interface Service {
  name: string
  description: string
  image: string
  bookingUrl: { inPerson?: string; online?: string }
}

const services: Service[] = [
  {
    name: "Shadow Work",
    description: "Integrate hidden aspects of self for wholeness and healing",
    image: "/images/4f289e5a-00ba-4864-bfb5.jpeg", // Fixed to use direct blob URL
    bookingUrl: {
      inPerson:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/55705100/calendar/2793889",
      online:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/41922605/calendar/2793889",
    },
  },
  {
    name: "Root Work",
    description: "Clear ancestral patterns and ground your energy foundation",
    image: "/images/f4a13149-9f88-4064-8ca1.jpeg", // Fixed to use direct blob URL
    bookingUrl: {
      inPerson:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/55705100/calendar/2793889",
      online:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/41922605/calendar/2793889",
    },
  },
  {
    name: "Just For You",
    description: "Personalized healing tailored to your unique journey",
    image: "/images/f976dd6e-c2b1-487a-9be2.jpeg", // Fixed to use direct blob URL
    bookingUrl: {
      inPerson:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/55705100/calendar/2793889",
      online:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/41922605/calendar/2793889",
    },
  },
  {
    name: "Heart Activation",
    description: "Open and expand your heart center for deeper connection",
    image: "/images/65640ede-2ac2-45c1-93dc.jpeg", // Fixed to use direct blob URL
    bookingUrl: {
      inPerson:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/55705100/calendar/2793889",
      online:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/41922605/calendar/2793889",
    },
  },
  {
    name: "The Exterminator",
    description: "Remove energetic parasites and unwanted attachments",
    image: "/images/2bb5f0ee-c1ed-407a-abc4.jpeg", // Fixed to use direct blob URL
    bookingUrl: {
      inPerson:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/55705100/calendar/2793889",
      online:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/41922605/calendar/2793889",
    },
  },
  {
    name: "The Other Side",
    description: "Connect with spirit guides and receive divine messages",
    image: "/images/e13a9805-459f-49d4-a3c6.jpeg", // Fixed to use direct blob URL
    bookingUrl: {
      inPerson:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/55705100/calendar/2793889",
      online:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/41922605/calendar/2793889",
    },
  },
  {
    name: "Phoenix Rising",
    description: "Transform through rebirth and emerge renewed",
    image: "/images/7b26d811-355d-4142-a739.jpeg", // Fixed to use direct blob URL
    bookingUrl: {
      inPerson:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/55705100/calendar/2793889",
      online:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/41922605/calendar/2793889",
    },
  },
  {
    name: "I Can See Clearly Now",
    description: "Awaken your third eye and enhance intuitive vision",
    image: "/images/a8be019e-e42a-4745-a003.jpeg", // Fixed to use direct blob URL
    bookingUrl: {
      inPerson:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/55705100/calendar/2793889",
      online:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/41922605/calendar/2793889",
    },
  },
  {
    name: "Womb Healing",
    description: "Heal feminine energy and restore creative power",
    image: "/images/7a6b5e6f-5da9-4470-94ab.jpeg", // Fixed to use direct blob URL
    bookingUrl: {
      inPerson:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/55705100/calendar/2793889",
      online:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/41922605/calendar/2793889",
    },
  },
  {
    name: "The Purge",
    description: "Deep energetic cleanse to release stagnant energy",
    image: "/images/6ae1db03-6f9b-44da-8759.jpeg", // Fixed to use the correct blob URL for The Purge
    bookingUrl: {
      inPerson:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/55705100/calendar/2793889",
      online:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/41922605/calendar/2793889",
    },
  },
]

export function ServicesImageCarousel() {
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
    setCurrent((prev) => (prev + 1) % services.length)
  }

  const prev = () => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + services.length) % services.length)
  }

  const handleDragEnd = (_: any, info: PanInfo) => {
    const swipeThreshold = 50
    const swipeVelocity = 500

    // Check if swipe was significant enough
    if (Math.abs(info.offset.x) > swipeThreshold || Math.abs(info.velocity.x) > swipeVelocity) {
      // Calculate how many positions to move based on velocity
      const velocityFactor = Math.abs(info.velocity.x) / 1000
      const positions = Math.min(Math.ceil(velocityFactor), 3) // Max 3 positions per swipe

      if (info.offset.x > 0) {
        // Swipe right - go to previous
        setDirection(-1)
        setCurrent((prev) => (prev - positions + services.length) % services.length)
      } else {
        // Swipe left - go to next
        setDirection(1)
        setCurrent((prev) => (prev + positions) % services.length)
      }
    }
  }

  const openBooking = () => {
    setSelectedBookingUrl(services[current].bookingUrl)
    setIsBookingOpen(true)
  }

  useEffect(() => {
    const timer = setInterval(next, 35000)
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
        serviceTitle={services[current].name}
      />

      <div ref={sectionRef} className="py-8 md:py-12 relative overflow-hidden">
        {" "}
        {/* Reduced padding from py-16 md:py-20 to py-8 md:py-12 */}
        <div className="container mx-auto px-6 relative">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 md:mb-12" // Reduced margin from mb-12 md:mb-16 to mb-8 md:mb-12
          >
            <p className="text-[10px] tracking-[0.5em] text-muted-foreground uppercase mb-4 md:mb-6">Services</p>
            <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl text-foreground tracking-tight">
              Energy Healing <span className="italic">Sessions</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-pretty text-sm md:text-base">
              Choose what resonates with your current needs
            </p>
          </motion.div>

          {/* Carousel Card */}
          <motion.div
            style={{ y: cardY, opacity: cardOpacity, touchAction: "pan-y" }}
            className="max-w-3xl mx-auto"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          >
            <div className="bg-card border border-border px-5 py-6 md:px-10 md:py-8 relative mx-2 md:mx-0 min-h-[520px] md:min-h-[560px] flex flex-col">
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

              <div className="overflow-hidden flex-1 flex flex-col items-center gap-0 my-[30px]">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={current}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="text-center py-2 w-full flex flex-col items-center"
                  >
                    <div className="w-1/3 aspect-square mb-6 rounded-lg overflow-hidden bg-black/20 mx-auto">
                      <img
                        src={services[current].image || "/placeholder.svg"}
                        alt={services[current].name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl mx-auto text-pretty mb-6">
                      {services[current].description}
                    </p>

                    <Button onClick={openBooking} className="bg-cream text-cosmic-deep hover:bg-cream/90">
                      <Calendar className="mr-2 h-4 w-4" />
                      Book {services[current].name}
                    </Button>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-center gap-8 mt-4 pt-4 border-t border-border/50">
                <button
                  onClick={prev}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Previous service"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <div className="flex gap-3">
                  {services.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setDirection(index > current ? 1 : -1)
                        setCurrent(index)
                      }}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                        index === current ? "bg-foreground w-6" : "bg-foreground/20 hover:bg-foreground/40"
                      }`}
                      aria-label={`Go to ${services[index].name}`}
                    />
                  ))}
                </div>

                <button
                  onClick={next}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Next service"
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
