// PlayStation-style particle intro configuration
export type ParticleIntroConfig = {
  // Colors
  baseColor: string // Primary particle color
  accentColor: string // Secondary glow color
  highlightColor: string // Bright highlight particles
  connectionColor: string // Geometric connection lines
  glowColor: string // Added dedicated glow color

  // Particle counts
  maxParticles: number // Max particles on desktop
  mobileParticles: number // Reduced count for mobile
  maxNodes: number // Geometric nodes count

  // Timing (in ms)
  idleDriftDuration: number // Phase 1: Initial scatter
  convergeDuration: number // Phase 2: Move toward center
  logoRevealDuration: number // Phase 3: Brighten at center
  transitionDuration: number // Phase 4: Settle into ambient

  // Animation settings
  convergeEasing: "easeInOutCubic" | "easeOutQuart" | "easeInOutQuint" | "easeOutBack" | "easeInOutSine"
  depthOfField: boolean // Enable depth blur effect
  motionBlur: boolean // Enable streak trails
  cameraDolly: boolean // Subtle zoom during converge
  spiralConverge: boolean // Spiral convergence pattern
  breathingEffect: boolean // Subtle pulsing during idle
  layeredGlow: boolean // Multi-layer bloom effect
}

export const PLAYSTATION_LIKE_PRESET: ParticleIntroConfig = {
  // Mystic violet palette - deeper, richer colors
  baseColor: "rgba(160, 140, 200, 1)",
  accentColor: "rgba(120, 80, 180, 1)",
  highlightColor: "rgba(255, 250, 255, 1)",
  connectionColor: "rgba(140, 120, 180, 1)",
  glowColor: "rgba(180, 150, 255, 1)",

  maxParticles: 350,
  mobileParticles: 150,
  maxNodes: 25,

  idleDriftDuration: 1800,
  convergeDuration: 2500,
  logoRevealDuration: 1800,
  transitionDuration: 800,

  // Animation settings
  convergeEasing: "easeInOutSine",
  depthOfField: true,
  motionBlur: true,
  cameraDolly: true,
  spiralConverge: true,
  breathingEffect: true,
  layeredGlow: true,
}

// Alternative presets for different moods
export const MINIMAL_PRESET: ParticleIntroConfig = {
  ...PLAYSTATION_LIKE_PRESET,
  maxParticles: 100,
  mobileParticles: 50,
  maxNodes: 15,
  idleDriftDuration: 1000,
  convergeDuration: 1500,
  logoRevealDuration: 1000,
  transitionDuration: 500,
  spiralConverge: false,
  breathingEffect: false,
  layeredGlow: false,
}

export const INTENSE_PRESET: ParticleIntroConfig = {
  ...PLAYSTATION_LIKE_PRESET,
  maxParticles: 300,
  mobileParticles: 150,
  maxNodes: 40,
  idleDriftDuration: 2000,
  convergeDuration: 2500,
  logoRevealDuration: 2000,
  transitionDuration: 800,
  spiralConverge: false,
  breathingEffect: false,
  layeredGlow: false,
}
