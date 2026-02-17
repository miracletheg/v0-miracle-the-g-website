// Minimalist, perceptual sound design using Web Audio API
// All sounds are synthesized - no audio file downloads needed

type SoundType = "hover" | "select" | "reveal" | "transition" | "success"

class SoundManager {
  private context: AudioContext | null = null
  private enabled = true
  private initialized = false

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null

    if (!this.context) {
      try {
        this.context = new (window.AudioContext || (window as any).webkitAudioContext)()
      } catch (e) {
        console.warn("Web Audio API not supported")
        return null
      }
    }

    // Resume if suspended (browser autoplay policy)
    if (this.context.state === "suspended") {
      this.context.resume()
    }

    return this.context
  }

  initialize() {
    if (this.initialized) return
    this.getContext()
    this.initialized = true
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled
    if (typeof window !== "undefined") {
      localStorage.setItem("soundEnabled", String(enabled))
    }
  }

  isEnabled(): boolean {
    if (typeof window !== "undefined" && !this.initialized) {
      const stored = localStorage.getItem("soundEnabled")
      if (stored !== null) {
        this.enabled = stored === "true"
      }
    }
    return this.enabled
  }

  play(type: SoundType) {
    if (!this.enabled) return

    const ctx = this.getContext()
    if (!ctx) return

    switch (type) {
      case "hover":
        this.playHover(ctx)
        break
      case "select":
        this.playSelect(ctx)
        break
      case "reveal":
        this.playReveal(ctx)
        break
      case "transition":
        this.playTransition(ctx)
        break
      case "success":
        this.playSuccess(ctx)
        break
    }
  }

  // Soft, breathy hover sound - very subtle
  private playHover(ctx: AudioContext) {
    const oscillator = ctx.createOscillator()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    oscillator.type = "sine"
    oscillator.frequency.setValueAtTime(800 + Math.random() * 100, ctx.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.05)

    filter.type = "lowpass"
    filter.frequency.setValueAtTime(1200, ctx.currentTime)

    gain.gain.setValueAtTime(0, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)

    oscillator.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.05)
  }

  // Gentle click/tap sound
  private playSelect(ctx: AudioContext) {
    const oscillator = ctx.createOscillator()
    const gain = ctx.createGain()

    oscillator.type = "sine"
    oscillator.frequency.setValueAtTime(440, ctx.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.08)

    gain.gain.setValueAtTime(0.08, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)

    oscillator.connect(gain)
    gain.connect(ctx.destination)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.08)
  }

  // Mystical chime/bell for reveals - more prominent
  private playReveal(ctx: AudioContext) {
    const frequencies = [523.25, 659.25, 783.99] // C5, E5, G5 chord

    frequencies.forEach((freq, i) => {
      const oscillator = ctx.createOscillator()
      const gain = ctx.createGain()
      const filter = ctx.createBiquadFilter()

      oscillator.type = "sine"
      oscillator.frequency.setValueAtTime(freq, ctx.currentTime)

      filter.type = "lowpass"
      filter.frequency.setValueAtTime(2000, ctx.currentTime)
      filter.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.8)

      const delay = i * 0.05
      gain.gain.setValueAtTime(0, ctx.currentTime + delay)
      gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + delay + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.6)

      oscillator.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)

      oscillator.start(ctx.currentTime + delay)
      oscillator.stop(ctx.currentTime + delay + 0.6)
    })
  }

  // Subtle whoosh for transitions
  private playTransition(ctx: AudioContext) {
    const bufferSize = ctx.sampleRate * 0.15
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize)
    }

    const source = ctx.createBufferSource()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    source.buffer = buffer

    filter.type = "bandpass"
    filter.frequency.setValueAtTime(1000, ctx.currentTime)
    filter.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.15)
    filter.Q.setValueAtTime(1, ctx.currentTime)

    gain.gain.setValueAtTime(0.04, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15)

    source.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    source.start(ctx.currentTime)
  }

  // Warm resonant success tone
  private playSuccess(ctx: AudioContext) {
    const frequencies = [261.63, 329.63, 392, 523.25] // C4, E4, G4, C5

    frequencies.forEach((freq, i) => {
      const oscillator = ctx.createOscillator()
      const gain = ctx.createGain()

      oscillator.type = "sine"
      oscillator.frequency.setValueAtTime(freq, ctx.currentTime)

      const delay = i * 0.08
      gain.gain.setValueAtTime(0, ctx.currentTime + delay)
      gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + delay + 0.03)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.4)

      oscillator.connect(gain)
      gain.connect(ctx.destination)

      oscillator.start(ctx.currentTime + delay)
      oscillator.stop(ctx.currentTime + delay + 0.4)
    })
  }
}

// Singleton instance
export const soundManager = new SoundManager()
