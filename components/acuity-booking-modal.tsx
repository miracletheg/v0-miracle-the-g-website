"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

interface AcuityBookingModalProps {
  isOpen: boolean
  onClose: () => void
  acuityUrl: string | { inPerson?: string; online?: string }
  serviceTitle?: string
}

export function AcuityBookingModal({ isOpen, onClose, acuityUrl, serviceTitle }: AcuityBookingModalProps) {
  const [mounted, setMounted] = useState(false)
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null)
  const [showSelection, setShowSelection] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"

      // If acuityUrl is a string, show it directly
      if (typeof acuityUrl === "string") {
        setSelectedUrl(acuityUrl)
        setShowSelection(false)
      }
      // If acuityUrl is an object, determine if we need selection screen
      else {
        const hasInPerson = !!acuityUrl.inPerson
        const hasOnline = !!acuityUrl.online

        if (hasInPerson && hasOnline) {
          setShowSelection(true)
          setSelectedUrl(null)
        } else if (hasInPerson) {
          setSelectedUrl(acuityUrl.inPerson || null)
          setShowSelection(false)
        } else if (hasOnline) {
          setSelectedUrl(acuityUrl.online || null)
          setShowSelection(false)
        }
      }
    } else {
      document.body.style.overflow = ""
      setSelectedUrl(null)
      setShowSelection(false)
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen, acuityUrl])

  const handleSelection = (type: "inPerson" | "online") => {
    if (typeof acuityUrl === "object") {
      const url = type === "inPerson" ? acuityUrl.inPerson : acuityUrl.online
      if (url) {
        setSelectedUrl(url)
        setShowSelection(false)
      }
    }
  }

  if (!mounted) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{
              duration: 0.5,
              ease: [0.19, 1, 0.22, 1],
            }}
            className="relative w-full max-w-4xl h-[85vh] bg-background border border-border rounded-lg overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 border-b border-border py-[5px] my-3">
              <div className="flex items-center gap-4">
                {selectedUrl && showSelection === false && typeof acuityUrl === "object" && (
                  <button
                    onClick={() => {
                      setShowSelection(true)
                      setSelectedUrl(null)
                    }}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    ← Back
                  </button>
                )}
                <h2 className="font-serif text-lg tracking-wider text-foreground uppercase">
                  {showSelection ? "Choose Your Session Type" : "Book a Session"}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                aria-label="Close booking modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 relative bg-card">
              {showSelection ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="max-w-md w-full space-y-6 px-8">
                    {serviceTitle && (
                      <p className="text-center text-muted-foreground text-sm mb-8">
                        Select how you'd like to experience {serviceTitle}
                      </p>
                    )}

                    <div className="grid gap-4">
                      {typeof acuityUrl === "object" && acuityUrl.inPerson && (
                        <Button
                          onClick={() => handleSelection("inPerson")}
                          size="lg"
                          className="w-full h-auto py-6 px-6 flex flex-col items-center gap-2 bg-card border-2 border-border hover:border-foreground/50 hover:bg-card/80 text-foreground transition-all duration-300"
                        >
                          <span className="font-serif text-xl tracking-wider">In-Person Session</span>
                          <span className="text-xs text-muted-foreground font-normal tracking-normal">
                            Experience hands-on healing in our sacred space
                          </span>
                        </Button>
                      )}

                      {typeof acuityUrl === "object" && acuityUrl.online && (
                        <Button
                          onClick={() => handleSelection("online")}
                          size="lg"
                          className="w-full h-auto py-6 px-6 flex flex-col items-center gap-2 bg-card border-2 border-border hover:border-foreground/50 hover:bg-card/80 text-foreground transition-all duration-300"
                        >
                          <span className="font-serif text-xl tracking-wider">Online Session</span>
                          <span className="text-xs text-muted-foreground font-normal tracking-normal">
                            Connect remotely from the comfort of your space
                          </span>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                    <div className="w-6 h-6 border border-border border-t-foreground rounded-full animate-spin" />
                  </div>
                  {selectedUrl && (
                    <iframe
                      src={selectedUrl}
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      title="Acuity Scheduling"
                      className="w-full h-full relative z-10 opacity-0 transition-opacity duration-700"
                      onLoad={(e) => (e.currentTarget.style.opacity = "1")}
                    />
                  )}
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
