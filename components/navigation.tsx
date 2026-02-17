"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SoundToggle } from "@/components/sound-toggle"
import { soundManager } from "@/lib/sounds"

const navLinks = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/services", label: "services" },
  { href: "/shop", label: "shop" },
  { href: "/blog", label: "blog" },
  { href: "/contact", label: "contact" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [quizActive, setQuizActive] = useState(false)
  const lastScrollY = useRef(0)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      setScrolled(currentScrollY > 20)

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHidden(true)
      } else if (currentScrollY < lastScrollY.current) {
        setHidden(false)
      }

      lastScrollY.current = currentScrollY
    }

    const handleQuizStarted = () => setQuizActive(true)
    const handleQuizEnded = () => setQuizActive(false)

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("quiz-started", handleQuizStarted)
    window.addEventListener("quiz-ended", handleQuizEnded)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("quiz-started", handleQuizStarted)
      window.removeEventListener("quiz-ended", handleQuizEnded)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    soundManager.play("select")

    if (pathname === href) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  if (quizActive) {
    return null
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: hidden && !isOpen ? -100 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-0 ${
          scrolled || isOpen ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto px-6 py-5 leading-9">
          <div className="flex justify-between flex-row items-stretch my-0 py-0">
            <Link href="/" className="group relative z-[60] flex items-center" onClick={(e) => handleNavClick(e, "/")}>
              <span className="font-serif text-lg md:text-xl tracking-wide text-foreground group-hover:text-tarot-violet transition-colors duration-300">
                Miracle<span className="italic font-light">TheG</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="link-reveal text-[10px] tracking-[0.2em] uppercase"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </Link>
              ))}
              <SoundToggle />
            </div>

            <div className="hidden lg:block">
              <Button
                asChild
                className="btn-reveal px-8 py-5 text-[10px] tracking-[0.2em] uppercase text-left mx-[21px]"
              >
                <a href="https://thegoddessofmiraclesschedule.as.me/" target="_blank" rel="noopener noreferrer">
                  Book Now
                </a>
              </Button>
            </div>

            <button
              className="lg:hidden text-foreground p-2 hover:text-tarot-violet transition-colors relative z-[60]"
              onClick={() => {
                soundManager.play("select")
                setIsOpen(!isOpen)
              }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden bg-background/98 backdrop-blur-lg"
          >
            {/* Decorative corner accents */}
            <div className="absolute top-20 left-6 w-16 h-16 border-l border-t border-foreground/10" />
            <div className="absolute top-20 right-6 w-16 h-16 border-r border-t border-foreground/10" />
            <div className="absolute bottom-6 left-6 w-16 h-16 border-l border-b border-foreground/10" />
            <div className="absolute bottom-6 right-6 w-16 h-16 border-r border-b border-foreground/10" />

            {/* Menu content */}
            <div className="flex flex-col items-center justify-center h-full px-6">
              <nav className="flex flex-col my-[15px] py-0 items-center leading-[0rem] font-extralight gap-[21px]">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, delay: index * 0.08 }}
                  >
                    <Link
                      href={link.href}
                      className={`text-2xl font-serif tracking-wide transition-colors duration-300 ${
                        pathname === link.href ? "text-tarot-violet" : "text-foreground/70 hover:text-foreground"
                      }`}
                      onClick={(e) => {
                        handleNavClick(e, link.href)
                        setIsOpen(false)
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="w-24 h-px bg-foreground/20 my-10"
              />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="mb-8"
              >
                <SoundToggle showLabel />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <Button
                  asChild
                  className="px-10 py-6 text-xs tracking-[0.3em] uppercase border-2 border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                >
                  <a
                    href="https://thegoddessofmiraclesschedule.as.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                  >
                    Book Now
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
