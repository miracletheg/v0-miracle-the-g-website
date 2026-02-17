"use client"

import { motion } from "framer-motion"
import { LeadCaptureForm } from "@/components/lead-capture-form"
import { Send, Compass, Hourglass } from "lucide-react"

const contactInfo = [
  {
    icon: Send,
    label: "Email",
    value: "opalineopulenceinc@gmail.com",
    href: "mailto:opalineopulenceinc@gmail.com",
  },
  {
    icon: Compass,
    label: "Location",
    value: "Toronto, Ontario",
    href: null,
  },
  {
    icon: Hourglass,
    label: "Response Time",
    value: "Within 24-48 hours",
    href: null,
  },
]

const socialLinks = [
  {
    icon: () => (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
    label: "Instagram",
    value: "@miracle.the.g",
    href: "https://instagram.com/miracle.the.g",
  },
  {
    icon: () => (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    ),
    label: "TikTok",
    value: "@miracle.the.g",
    href: "https://tiktok.com/@miracle.the.g",
  },
]

export function ContactContent() {
  return (
    <section className="py-12 pb-32 relative">
      <div className="container mx-auto px-6 md:px-4">
        <div className="max-w-4xl mx-auto">
          {/* Contact Form - Top */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <LeadCaptureForm
              title="Send a Message"
              subtitle="Tell us what's on your heart and we'll guide you to the right path"
            />
          </motion.div>

          {/* Contact Info - Bottom */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-8"
          >
            {/* Direct Contact */}
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
              <h3 className="font-serif text-xl text-foreground mb-6">Direct Contact</h3>
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-foreground hover:text-gold transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-foreground">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
              <h3 className="font-serif text-xl text-foreground mb-6">Follow the Journey</h3>
              <div className="space-y-4">
                {socialLinks.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                      {item.icon()}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="text-foreground group-hover:text-gold transition-colors">{item.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
