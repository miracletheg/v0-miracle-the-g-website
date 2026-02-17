"use client"

import type React from "react"
import { useRef, useCallback } from "react"

interface SwipeHandlers {
  onTouchStart: (e: React.TouchEvent) => void
  onTouchMove: (e: React.TouchEvent) => void
  onTouchEnd: () => void
}

interface UseSwipeOptions {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  threshold?: number
}

export function useSwipe({ onSwipeLeft, onSwipeRight, threshold = 50 }: UseSwipeOptions): SwipeHandlers {
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)
  const isHorizontalSwipe = useRef<boolean | null>(null)

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    touchEndX.current = null
    isHorizontalSwipe.current = null
  }, [])

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return

    const currentX = e.touches[0].clientX
    const currentY = e.touches[0].clientY
    touchEndX.current = currentX

    if (isHorizontalSwipe.current === null) {
      const diffX = Math.abs(currentX - touchStartX.current)
      const diffY = Math.abs(currentY - touchStartY.current)

      // Only decide direction after some movement threshold
      if (diffX > 10 || diffY > 10) {
        isHorizontalSwipe.current = diffX > diffY
      }
    }

    if (isHorizontalSwipe.current) {
      e.preventDefault()
    }
  }, [])

  const onTouchEnd = useCallback(() => {
    if (touchStartX.current === null || touchEndX.current === null) {
      // Reset refs
      touchStartX.current = null
      touchStartY.current = null
      touchEndX.current = null
      isHorizontalSwipe.current = null
      return
    }

    if (isHorizontalSwipe.current) {
      const diff = touchStartX.current - touchEndX.current

      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          // Swiped left - go to next
          onSwipeLeft?.()
        } else {
          // Swiped right - go to previous
          onSwipeRight?.()
        }
      }
    }

    touchStartX.current = null
    touchStartY.current = null
    touchEndX.current = null
    isHorizontalSwipe.current = null
  }, [onSwipeLeft, onSwipeRight, threshold])

  return { onTouchStart, onTouchMove, onTouchEnd }
}
