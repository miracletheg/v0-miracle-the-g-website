"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AcuityBookingModal } from "@/components/acuity-booking-modal"

interface Medicine {
  name: string
  description: string
  bookingUrl?: string
}

const medicines: Medicine[] = [
  {
    name: "Kambo",
    description: "Amazonian frog medicine for deep physical and energetic purification",
    bookingUrl:
      "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/24449218/calendar/2793889",
  },
  {
    name: "Bufo",
    description: "The most powerful naturally occurring entheogen for ego dissolution and spiritual awakening",
    bookingUrl:
      "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/20195426/calendar/2793889",
  },
  {
    name: "Psilocybin (Magic Mushies)",
    description: "Sacred fungi for expanded consciousness and profound inner journeys",
  },
  {
    name: "Hapéh",
    description: "Sacred Amazonian snuff for grounding, clarity, and spiritual alignment",
  },
  {
    name: "Sananga",
    description: "Amazonian eye drops that sharpen spiritual vision and clear energetic blockages",
  },
  {
    name: "Cacao",
    description: "Heart-opening plant medicine connecting you to love and divine guidance",
  },
]

export function MedicineList() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [selectedBookingUrl, setSelectedBookingUrl] = useState("")
  const [selectedMedicine, setSelectedMedicine] = useState("")

  const openBooking = (medicine: Medicine) => {
    if (medicine.bookingUrl) {
      setSelectedBookingUrl(medicine.bookingUrl)
      setSelectedMedicine(medicine.name)
      setIsBookingOpen(true)
    }
  }

  // General consultation URL for medicines without specific booking
  const consultationUrl =
    "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/30723986/calendar/2793889"

  return (
    <>
      <AcuityBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        acuityUrl={selectedBookingUrl}
        serviceTitle={selectedMedicine}
      />

      <div className="py-16 md:py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-[10px] tracking-[0.5em] text-muted-foreground uppercase mb-4">Sacred Medicines</p>
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground tracking-tight text-balance">
              Plant & Amphibian <span className="italic">Allies</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl text-pretty text-sm md:text-base">
              Ancient wisdom keepers working in harmony to facilitate profound healing and spiritual transformation
            </p>
          </motion.div>

          {/* Medicine List */}
          <div className="space-y-3 max-w-2xl">
            {medicines.map((medicine, index) => (
              <motion.div
                key={medicine.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group border border-border/50 hover:border-border transition-all duration-300 bg-card/30 hover:bg-card/50"
              >
                <div className="px-5 py-4 md:px-6 md:py-5">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-foreground text-base md:text-lg font-medium tracking-wide">
                        {medicine.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1">{medicine.description}</p>
                    </div>
                    {medicine.bookingUrl ? (
                      <Button
                        size="sm"
                        variant="outline"
                        className="shrink-0 bg-transparent"
                        onClick={() => openBooking(medicine)}
                      >
                        <Calendar className="mr-2 h-3 w-3" />
                        Book
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="shrink-0 text-muted-foreground"
                        onClick={() => {
                          setSelectedBookingUrl(consultationUrl)
                          setSelectedMedicine("Free Consultation")
                          setIsBookingOpen(true)
                        }}
                      >
                        Inquire
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-muted-foreground/60 text-xs mt-6 italic"
          >
            More medicines available as they become accessible
          </motion.p>
        </div>
      </div>
    </>
  )
}
