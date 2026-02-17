"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sparkles, Check, Loader2 } from "lucide-react"

export function EmailCapture() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus("loading")

    // Simulate form submission - replace with actual ConvertKit integration
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setStatus("success")
      setEmail("")
      setName("")
    } catch {
      setStatus("error")
    }
  }

  return (
    null
  )
}
