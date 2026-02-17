"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Instagram, Mail } from "lucide-react"

const footerLinks = {
  services: [
    { href: "/services/oracle", label: "Online Sessions" },
    { href: "/services/healer", label: "In-Person Sessions" },
    { href: "/services/shaman", label: "Medicine Ceremonies" },
    { href: "/services/oracle", label: "Readings" },
  ],
  shop: [
    { href: "/shop", label: "Reiki Manuals" },
    { href: "/shop", label: "Miracle Monday" },
  ],
  company: [
    { href: "/about", label: "About Samira" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <Link href="/" scroll={true} className="inline-block mb-8">
              <span className="font-serif text-xl text-foreground">
                Miracle<span className="italic font-light">TheG</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8 font-light">
              Guiding you through transformative healing journeys with Reiki, shamanic practices, and spiritual wisdom.
            </p>
            <div className="flex gap-5">
              <a
                href="https://instagram.com/miracle.the.g"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-mystic-violet transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://tiktok.com/@miracle.the.g"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-mystic-violet transition-colors duration-200"
                aria-label="TikTok"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
              <a
                href="https://facebook.com/miracletheg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-mystic-violet transition-colors duration-200"
                aria-label="Facebook"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-foreground mb-8 font-medium">Services</h4>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    scroll={true}
                    className="text-sm text-muted-foreground hover:text-mystic-violet transition-colors duration-200 font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Shop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-foreground mb-8 font-medium">Shop</h4>
            <ul className="space-y-4">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    scroll={true}
                    className="text-sm text-muted-foreground hover:text-mystic-violet transition-colors duration-200 font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-foreground mb-8 font-medium">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    scroll={true}
                    className="text-sm text-muted-foreground hover:text-mystic-violet transition-colors duration-200 font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-foreground mb-8 font-medium">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:opalineopulenceinc@gmail.com"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-mystic-violet transition-colors duration-200 font-light"
                >
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span className="break-all">opalineopulenceinc@gmail.com</span>
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-border mt-16 pt-10 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-2">
            <p className="text-[11px] text-muted-foreground font-light tracking-wide">
              © {new Date().getFullYear()} Miracle The G. All rights reserved.
            </p>
            <span className="hidden md:inline text-[11px] text-muted-foreground">•</span>
            <a
              href="https://www.stonefish.online"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-light tracking-wide text-muted-foreground hover:text-mystic-violet transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.4)] inline-block relative group"
            >
              Built by <span className="text-mystic-violet font-normal">Stonefish</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-mystic-violet group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>
          <div className="flex gap-8">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                scroll={true}
                className="text-[11px] text-muted-foreground hover:text-mystic-violet transition-colors duration-200 font-light"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
