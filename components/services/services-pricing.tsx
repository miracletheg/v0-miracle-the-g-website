"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Calendar, Clock } from "lucide-react"

interface Service {
  name: string
  duration: string
  price: string
  description?: string
  bookingUrl: string
}

interface ServiceCategory {
  title: string
  description: 91
  services: Service[]
}

const serviceCategories: ServiceCategory[] = [
  {
    title: "Online Healing Sessions",
    description: "Connect from anywhere in the world through virtual healing sessions",
    services: [
      {
        name: "Friends and Family - Online",
        duration: "1.5 hrs",
        price: "CA$88",
        description: "Special rate for inner circle",
        bookingUrl: "https://thegoddessofmiraclesschedule.as.me/?appointmentType=75678573",
      },
      {
        name: "Follow Up Session - Online",
        duration: "1.5 hrs",
        price: "CA$111",
        description: "Continue your healing journey",
        bookingUrl: "https://thegoddessofmiraclesschedule.as.me/?appointmentType=84367946",
      },
      {
        name: "Referral Sessions - Online",
        duration: "1.5 hrs",
        price: "CA$125",
        description: "Special rate for referred clients",
        bookingUrl: "https://thegoddessofmiraclesschedule.as.me/?appointmentType=84368240",
      },
      {
        name: "First Timer - Online",
        duration: "1.5 hrs",
        price: "CA$135",
        description: "Comprehensive first session experience",
        bookingUrl: "https://thegoddessofmiraclesschedule.as.me/?appointmentType=41922605",
      },
      {
        name: "Psychic Medium Sessions - Online",
        duration: "1.5 hrs",
        price: "CA$150",
        description: "Connect with loved ones who have passed",
        bookingUrl: "https://thegoddessofmiraclesschedule.as.me/?appointmentType=84369450",
      },
      {
        name: "Bundle Pack - Online",
        duration: "2.5 hrs",
        price: "CA$375",
        description: "Commit to your transformation",
        bookingUrl: "https://thegoddessofmiraclesschedule.as.me/?appointmentType=12316131",
      },
    ],
  },
  {
    title: "In-Person Energy Healing Sessions",
    description: "Experience the full power of hands-on healing in person",
    services: [
      {
        name: "Friends and Family - In-Person",
        duration: "1.5 hrs",
        price: "CA$125",
        description: "Special rate for inner circle",
        bookingUrl: "https://thegoddessofmiraclesschedule.as.me/?appointmentType=75678482",
      },
      {
        name: "Referral Sessions - In-Person",
        duration: "1.5 hrs",
        price: "CA$135",
        description: "Special rate for referred clients",
        bookingUrl: "https://thegoddessofmiraclesschedule.as.me/?appointmentType=84368259",
      },
      {
        name: "Follow Up Session - In-Person",
        duration: "1.5 hrs",
        price: "CA$150",
        description: "Continue your in-person healing",
        bookingUrl: "https://thegoddessofmiraclesschedule.as.me/?appointmentType=84367980",
      },
      {
        name: "First Timer - In-Person",
        duration: "2 hrs",
        price: "CA$185",
        description: "Full immersive first experience",
        bookingUrl: "https://thegoddessofmiraclesschedule.as.me/?appointmentType=55705100",
      },
      {
        name: "Bundle Pack - In-Person",
        duration: "2.5 hrs",
        price: "CA$500",
        description: "Deep commitment to transformation",
        bookingUrl: "https://thegoddessofmiraclesschedule.as.me/?appointmentType=75678293",
      },
    ],
  },
  {
    title: "Readings & More",
    description: "Intuitive guidance and spiritual clarity sessions",
    services: [
      {
        name: "Free Consultation Call",
        duration: "30 min",
        price: "Free",
        description: "Discover which service is right for you",
        bookingUrl: "https://thegoddessofmiraclesschedule.as.me/?appointmentType=30723986",
      },
      {
        name: "Online - Mini Guidance Reading",
        duration: "30 min",
        price: "CA$65",
        description: "Quick intuitive guidance session",
        bookingUrl: "https://thegoddessofmiraclesschedule.as.me/?appointmentType=9252796",
      },
      {
        name: "Online - Deep Guidance Reading",
        duration: "1 hr",
        price: "CA$95",
        description: "In-depth spiritual guidance and clarity",
        bookingUrl: "https://thegoddessofmiraclesschedule.as.me/?appointmentType=9252799",
      },
      {
        name: "Online - Past Life Reading",
        duration: "1 hr",
        price: "CA$111",
        description: "Explore your soul's journey through lifetimes",
        bookingUrl: "https://thegoddessofmiraclesschedule.as.me/?appointmentType=55705484",
      },
    ],
  },
  {
    title: "Medicine Packages",
    description: "Sacred plant medicine journeys for profound transformation",
    services: [
      {
        name: "Integration Call",
        duration: "30 min",
        price: "By request",
        description: "Post-ceremony support and guidance",
        bookingUrl: "https://thegoddessofmiraclesschedule.as.me/?appointmentType=25682660",
      },
      {
        name: "Kambo Journey",
        duration: "3.5 hrs",
        price: "CA$260",
        description: "One-on-one frog medicine ceremony",
        bookingUrl: "https://thegoddessofmiraclesschedule.as.me/?appointmentType=24449218",
      },
      {
        name: "Bufo Journey",
        duration: "3.5 hrs",
        price: "CA$350",
        description: "Private toad medicine experience",
        bookingUrl: "https://thegoddessofmiraclesschedule.as.me/?appointmentType=20195426",
      },
      {
        name: "Kambo Group Journey",
        duration: "3 hrs",
        price: "CA$888",
        description: "Shared ceremonial experience",
        bookingUrl: "https://thegoddessofmiraclesschedule.as.me/?appointmentType=24449348",
      },
      {
        name: "Bufo Group Journey",
        duration: "3.5 hrs",
        price: "CA$1,250",
        description: "Group toad medicine ceremony",
        bookingUrl: "https://thegoddessofmiraclesschedule.as.me/?appointmentType=20195523",
      },
    ],
  },
]

export function ServicesPricing() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">Services & Pricing</p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Healing <span className="italic">Offerings</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Choose the session type that resonates with your current needs. All sessions include personalized guidance
            and support.
          </p>
        </motion.div>

        {/* Service Categories */}
        <div className="space-y-20 md:space-y-32">
          {serviceCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              {/* Category Header */}
              <div className="text-center mb-12">
                <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-3">{category.title}</h2>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {category.services.map((service, serviceIndex) => (
                  <motion.div
                    key={service.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: serviceIndex * 0.05 }}
                    className="group relative border border-border/50 rounded-lg p-6 hover:border-foreground/30 transition-all duration-300 bg-background/50 backdrop-blur-sm"
                  >
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-foreground/20 rounded-tl-lg" />
                    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-foreground/20 rounded-tr-lg" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-foreground/20 rounded-bl-lg" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-foreground/20 rounded-br-lg" />

                    <div className="flex flex-col h-full">
                      <h3 className="font-serif text-lg text-foreground mb-2">{service.name}</h3>
                      {service.description && (
                        <p className="text-xs text-muted-foreground mb-4 flex-grow">{service.description}</p>
                      )}
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/30">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{service.duration}</span>
                        </div>
                        <span className="font-medium text-foreground">{service.price}</span>
                      </div>

                      {/* Book Button */}
                      <Button
                        asChild
                        size="sm"
                        className="w-full mt-4 bg-foreground text-background hover:bg-foreground/90 text-[9px] tracking-[0.2em] uppercase"
                      >
                        <a href={service.bookingUrl} target="_blank" rel="noopener noreferrer">
                          <Calendar className="w-3 h-3 mr-2" />
                          Book Now
                        </a>
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-20 md:mt-32 pt-16 border-t border-border/30"
        >
          <p className="text-muted-foreground mb-6">Not sure which session is right for you?</p>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-border hover:border-foreground hover:bg-transparent px-10 py-6 text-[10px] tracking-[0.2em] uppercase bg-transparent"
          >
            <a
              href="https://thegoddessofmiraclesschedule.as.me/?appointmentType=30723986"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a Free Consultation
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
