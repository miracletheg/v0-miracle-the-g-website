"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, Check, AlertCircle, CheckCircle2, Loader2 } from "lucide-react"

const seekingOptions = [
  "Emotional Healing & Release",
  "Physical Wellness & Pain Relief",
  "Spiritual Awakening & Growth",
  "Guidance & Clarity",
  "Psychic Readings & Intuitive Insight",
  "Plant Medicine Ceremonies",
  "Learning Reiki / Energy Work",
  "Just Curious / Exploring",
]

interface LeadCaptureFormProps {
  variant?: "default" | "minimal" | "hero"
  title?: string
  subtitle?: string
}

export function LeadCaptureForm({
  variant = "default",
  title = "Begin Your Healing Journey",
  subtitle = "Join our community and receive guidance on your spiritual path",
}: LeadCaptureFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [shakeForm, setShakeForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    seeking: "",
  })

  const validateName = (name: string) => {
    if (!name.trim()) return "Name is required"
    if (name.trim().length < 2) return "Name must be at least 2 characters"
    return ""
  }

  const validateEmail = (email: string) => {
    if (!email.trim()) return "Email is required"
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return "Please enter a valid email address"
    return ""
  }

  const validatePhone = (phone: string) => {
    if (!phone.trim()) return ""
    const phoneRegex = /^[\d\s\-+$$$$]+$/
    if (!phoneRegex.test(phone)) return "Please enter a valid phone number"
    return ""
  }

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true })

    let error = ""
    if (field === "name") error = validateName(formData.name)
    else if (field === "email") error = validateEmail(formData.email)
    else if (field === "phone") error = validatePhone(formData.phone)

    setErrors({ ...errors, [field]: error })
  }

  const isFieldValid = (field: string) => {
    return touched[field] && !errors[field] && formData[field as keyof typeof formData]
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const nameError = validateName(formData.name)
    const emailError = validateEmail(formData.email)
    const phoneError = validatePhone(formData.phone)

    const newErrors = {
      name: nameError,
      email: emailError,
      phone: phoneError,
    }

    setErrors(newErrors)
    setTouched({ name: true, email: true, phone: true })

    if (nameError || emailError || phoneError) {
      setShakeForm(true)
      setTimeout(() => setShakeForm(false), 500)
      return
    }

    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <Check className="h-8 w-8 text-cream" />
        </motion.div>
        <h3 className="font-serif text-2xl text-foreground mb-2">Welcome to the Journey</h3>
        <p className="text-muted-foreground">
          Thank you for reaching out. The universe has aligned your path with ours.
          <br />
          We will be in touch soon.
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      animate={shakeForm ? { x: [-10, 10, -10, 10, 0] } : {}}
      className={
        variant === "hero"
          ? ""
          : "bg-card/50 backdrop-blur-sm border border-border rounded-xl px-5 py-6 md:p-8 mx-2 md:mx-0"
      }
    >
      {variant !== "minimal" && (
        <div className="text-center mb-6">
          <Sparkles className="h-8 w-8 text-cream mx-auto mb-3" />
          <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-2">{title}</h3>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">
              Name
            </Label>
            <div className="relative">
              <Input
                id="name"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value })
                  if (touched.name) {
                    setErrors({ ...errors, name: validateName(e.target.value) })
                  }
                }}
                onBlur={() => handleBlur("name")}
                required
                className={`bg-input border-border text-foreground placeholder:text-muted-foreground pr-10 transition-all ${
                  touched.name && errors.name ? "border-red-500 focus-visible:ring-red-500" : ""
                } ${isFieldValid("name") ? "border-green-500 focus-visible:ring-green-500" : ""}`}
              />
              <AnimatePresence>
                {isFieldValid("name") && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </motion.div>
                )}
                {touched.name && errors.name && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <AnimatePresence>
              {touched.name && errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-xs text-red-500"
                >
                  {errors.name}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">
              Email
            </Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value })
                  if (touched.email) {
                    setErrors({ ...errors, email: validateEmail(e.target.value) })
                  }
                }}
                onBlur={() => handleBlur("email")}
                required
                className={`bg-input border-border text-foreground placeholder:text-muted-foreground pr-10 transition-all ${
                  touched.email && errors.email ? "border-red-500 focus-visible:ring-red-500" : ""
                } ${isFieldValid("email") ? "border-green-500 focus-visible:ring-green-500" : ""}`}
              />
              <AnimatePresence>
                {isFieldValid("email") && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </motion.div>
                )}
                {touched.email && errors.email && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <AnimatePresence>
              {touched.email && errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-xs text-red-500"
                >
                  {errors.email}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-foreground">
            Phone (Optional)
          </Label>
          <div className="relative">
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (234) 567-890"
              value={formData.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value })
                if (touched.phone) {
                  setErrors({ ...errors, phone: validatePhone(e.target.value) })
                }
              }}
              onBlur={() => handleBlur("phone")}
              className={`bg-input border-border text-foreground placeholder:text-muted-foreground pr-10 transition-all ${
                touched.phone && errors.phone ? "border-red-500 focus-visible:ring-red-500" : ""
              } ${isFieldValid("phone") ? "border-green-500 focus-visible:ring-green-500" : ""}`}
            />
            <AnimatePresence>
              {isFieldValid("phone") && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </motion.div>
              )}
              {touched.phone && errors.phone && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <AlertCircle className="h-5 w-5 text-red-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {touched.phone && errors.phone && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-xs text-red-500"
              >
                {errors.phone}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-2">
          <Label htmlFor="seeking" className="text-foreground">
            What are you seeking?
          </Label>
          <Select value={formData.seeking} onValueChange={(value) => setFormData({ ...formData, seeking: value })}>
            <SelectTrigger className="bg-input border-border text-foreground">
              <SelectValue placeholder="Select your intention..." />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {seekingOptions.map((option) => (
                <SelectItem key={option} value={option} className="text-popover-foreground hover:bg-muted">
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-medium py-6 relative overflow-hidden group transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              Sending...
            </span>
          ) : (
            <>
              <span className="relative z-10">Start My Journey</span>
              <span className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
            </>
          )}
        </Button>
      </form>
    </motion.div>
  )
}
