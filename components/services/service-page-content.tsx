"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { LeadCaptureForm } from "@/components/lead-capture-form"
import { AcuityBookingModal } from "@/components/acuity-booking-modal"
import { Check, Star, Calendar } from "lucide-react"

interface Offering {
  name: string
  duration: string
  price: string
  description: string
  bookingUrl?: string
}

interface Testimonial {
  text: string
  author: string
  location: string
}

interface ServicePageContentProps {
  title: string
  subtitle: string
  image: string
  practitionerImage?: string
  description: string
  longDescription: string
  benefits: string[]
  offerings: Offering[]
  testimonial: Testimonial
  bookingUrl: string | { inPerson?: string; online?: string }
  backgroundPattern?: string
}

export function ServicePageContent({
  title,
  subtitle,
  image,
  practitionerImage,
  description,
  longDescription,
  benefits,
  offerings,
  testimonial,
  bookingUrl,
  backgroundPattern,
}: ServicePageContentProps) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [selectedBookingUrl, setSelectedBookingUrl] = useState<string | { inPerson?: string; online?: string }>(
    bookingUrl,
  )

  const getServiceColor = (serviceTitle: string) => {
    const colors: Record<string, string> = {
      "The Healer": "#8B5CF6",
      "The Shaman": "#6366F1",
      "The Oracle": "#EC4899",
      "The Teacher": "#F59E0B",
    }
    return colors[serviceTitle] || "#8B5CF6"
  }

  const cardColor = getServiceColor(title)

  const openBookingModal = (offeringUrl?: string) => {
    if (offeringUrl) {
      setSelectedBookingUrl(offeringUrl)
    } else {
      setSelectedBookingUrl(bookingUrl)
    }
    setIsBookingModalOpen(true)
  }

  return (
    <>
      <AcuityBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        acuityUrl={selectedBookingUrl}
        serviceTitle={title}
      />

      <section className="pt-32 pb-16 relative overflow-hidden">
        {backgroundPattern && (
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
          </div>
        )}

        <div className="container mx-auto px-6 relative z-10 md:px-[69px]">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-cream text-sm uppercase tracking-wider mb-4"
              >
                {subtitle}
              </motion.p>

              <h1 className="font-serif text-4xl md:text-6xl text-foreground mb-6">{title}</h1>

              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{description}</p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-cream text-cosmic-deep hover:bg-cream/90"
                  onClick={() => openBookingModal()}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Now
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-muted-foreground hover:text-foreground hover:bg-transparent"
                  onClick={() => openBookingModal("https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c")}
                >
                  Browse All Services
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative group cursor-default"
              style={{ "--card-color": cardColor } as React.CSSProperties}
              onTouchStart={(e) => e.currentTarget.classList.add("touch-active")}
              onTouchEnd={(e) => e.currentTarget.classList.remove("touch-active")}
            >
              <div className="relative w-full aspect-[2/3] bg-card border-2 border-[var(--card-color)]/50 overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform group-hover:border-[var(--card-color)]/80 group-hover:-translate-y-3 group-hover:shadow-[0_20px_40px_-12px_var(--card-color)] group-[.touch-active]:border-[var(--card-color)]/80 group-[.touch-active]:-translate-y-3 group-[.touch-active]:shadow-[0_20px_40px_-12px_var(--card-color)]">
                <div className="absolute inset-[8px] border border-[var(--card-color)]/30 pointer-events-none transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:border-[var(--card-color)]/50 group-[.touch-active]:border-[var(--card-color)]/50" />

                <div className="absolute inset-[16px] overflow-hidden bg-muted">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${title} service - sacred imagery representing this spiritual path`}
                    fill
                    className="object-cover object-center scale-[1.15]"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{ background: `linear-gradient(to top, ${cardColor}, transparent)` }}
                  />
                </div>

                <div className="absolute bottom-[16px] left-[16px] right-[16px] bg-background/95 py-3 px-3 border-t border-[var(--card-color)]/20">
                  <h3 className="font-serif text-[10px] tracking-[0.3em] text-center uppercase text-[var(--card-color)]">
                    {title.toUpperCase()}
                  </h3>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="container mx-auto px-6 md:px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-10 text-center">
              About This <span className="text-cream">Path</span>
            </h2>

            <div className={`${practitionerImage ? "grid md:grid-cols-2 gap-10 items-center" : ""}`}>
              {practitionerImage && (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="relative aspect-[4/5] rounded-lg overflow-hidden"
                >
                  <Image
                    src={practitionerImage || "/placeholder.svg"}
                    alt="Samira Maharaj (Miracle The G) in a spiritual healing session"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                </motion.div>
              )}

              <div className="prose prose-invert prose-lg">
                {longDescription.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="container mx-auto px-6 md:px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-12 text-center">
              Service <span className="text-cream">Offerings</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {offerings.map((offering, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="p-6 bg-card/30 border border-border/50 rounded-lg hover:border-border transition-colors"
                >
                  <h3 className="font-serif text-xl text-foreground mb-2">{offering.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span>{offering.duration}</span>
                    <span>•</span>
                    <span className="text-cream font-medium">{offering.price}</span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{offering.description}</p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => openBookingModal(offering.bookingUrl)}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {offering.bookingUrl ? "Book This Service" : "Inquire About This Service"}
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 relative overflow-hidden">
        {backgroundPattern && (
          <div className="absolute inset-0 z-0">
            <Image
              src={backgroundPattern || "/placeholder.svg"}
              alt=""
              aria-hidden="true"
              fill
              className="object-cover opacity-[0.04]"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-cosmic-purple/5 via-transparent to-cosmic-violet/5" />
        <div className="container mx-auto px-6 md:px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-12 text-center">
              What You&apos;ll <span className="text-cream">Experience</span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex items-start gap-3 p-4 bg-card/30 border border-border/50 rounded-lg"
                >
                  <div className="w-5 h-5 rounded-full bg-cream/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-cream" />
                  </div>
                  <span className="text-foreground text-sm">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="container mx-auto px-8 md:px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="flex justify-center gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-4 w-4 fill-cream text-cream" />
              ))}
            </div>
            <p className="text-xl text-foreground italic mb-6 leading-relaxed">&ldquo;{testimonial.text}&rdquo;</p>
            <p className="text-foreground">{testimonial.author}</p>
            <p className="text-sm text-muted-foreground">{testimonial.location}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 pb-32 relative">
        <div className="container mx-auto px-6 md:px-4">
          <div className="max-w-2xl mx-auto">
            <LeadCaptureForm
              title="Have Questions?"
              subtitle="Leave your details and we'll help guide you to the right service"
            />
          </div>
        </div>
      </section>
    </>
  )
}
