"use client"

import { useState, useEffect } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { soundManager } from "@/lib/sounds"

interface SoundToggleProps {
  showLabel?: boolean
}

export function SoundToggle({ showLabel = false }: SoundToggleProps) {
  const [enabled, setEnabled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setEnabled(soundManager.isEnabled())
  }, [])

  const toggle = () => {
    const newState = !enabled
    setEnabled(newState)
    soundManager.setEnabled(newState)

    if (newState) {
      soundManager.initialize()
      soundManager.play("select")
    }
  }

  if (!mounted) return null

  return (
    <button
      onClick={toggle}
      className={`flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer ${showLabel ? "py-2 px-3 -mx-3" : "p-2"}`}
      aria-label={enabled ? "Mute sounds" : "Enable sounds"}
      title={enabled ? "Mute sounds" : "Enable sounds"}
    >
      {enabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      {showLabel && <span className="text-xs tracking-[0.2em] uppercase text-foreground/60">Sound</span>}
    </button>
  )
}
