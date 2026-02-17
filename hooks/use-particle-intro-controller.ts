"use client"

import { useState, useEffect, useCallback } from "react"

export type ParticleMode = "intro" | "ambient"
export type IntroPhase = "idle" | "converge" | "reveal" | "transition" | "complete"

interface ParticleIntroState {
  mode: ParticleMode
  phase: IntroPhase
  progress: number // 0-1 progress through current phase
  totalProgress: number // 0-1 progress through entire intro
  shouldSkip: boolean // True if user prefers reduced motion
}

const STORAGE_KEY = "miracletheg_hasSeenIntro"

export function useParticleIntroController() {
  const [state, setState] = useState<ParticleIntroState>({
    mode: "intro",
    phase: "idle",
    progress: 0,
    totalProgress: 0,
    shouldSkip: false,
  })

  // Check if user has seen intro this session and respects reduced motion
  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem(STORAGE_KEY) === "true"
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (hasSeenIntro || prefersReducedMotion) {
      setState({
        mode: "ambient",
        phase: "complete",
        progress: 1,
        totalProgress: 1,
        shouldSkip: prefersReducedMotion,
      })
    }
  }, [])

  // Mark intro as complete
  const completeIntro = useCallback(() => {
    sessionStorage.setItem(STORAGE_KEY, "true")
    setState((prev) => ({
      ...prev,
      mode: "ambient",
      phase: "complete",
      progress: 1,
      totalProgress: 1,
    }))
  }, [])

  // Update phase and progress (called by animation loop)
  const updatePhase = useCallback((phase: IntroPhase, progress: number, totalProgress: number) => {
    setState((prev) => ({
      ...prev,
      phase,
      progress,
      totalProgress,
    }))
  }, [])

  // Skip intro manually
  const skipIntro = useCallback(() => {
    completeIntro()
  }, [completeIntro])

  return {
    ...state,
    completeIntro,
    updatePhase,
    skipIntro,
  }
}
