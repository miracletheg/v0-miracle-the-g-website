"use client"

import { useEffect, useRef, useState, memo } from "react"
import { usePathname } from "next/navigation"
import { PLAYSTATION_LIKE_PRESET, type ParticleIntroConfig } from "@/lib/particle-config"

interface Particle {
  x: number
  y: number
  z: number
  scatterX: number
  scatterY: number
  scatterZ: number
  convergeX: number
  convergeY: number
  convergeZ: number
  ambientX: number
  ambientY: number
  size: number
  baseSize: number // Store original size for scaling
  baseOpacity: number
  opacity: number
  twinkleSpeed: number
  twinklePhase: number
  driftSpeed: number
  driftPhase: number
  driftRadius: number
  velocityX: number
  velocityY: number
  type: number
  spiralAngle: number
  spiralRadius: number
  layer: number // 0 = back, 1 = mid, 2 = front
  pulsePhase: number
  convergeDelay: number // Staggered convergence
}

interface GeometricNode {
  x: number
  y: number
  baseX: number
  baseY: number
  targetX: number
  targetY: number
  phase: number
  speed: number
  radius: number
  convergeX: number
  convergeY: number
}

interface ShootingStar {
  x: number
  y: number
  length: number
  speed: number
  angle: number
  opacity: number
  life: number
  maxLife: number
}

type AnimationPhase = "idle" | "converge" | "reveal" | "transition" | "ambient"

const easings = {
  easeInOutCubic: (t: number): number => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  easeOutQuart: (t: number): number => 1 - Math.pow(1 - t, 4),
  easeInOutQuint: (t: number): number => (t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2),
  easeOutExpo: (t: number): number => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  easeOutBack: (t: number): number => {
    const c1 = 1.70158
    const c3 = c1 + 1
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
  },
  easeInOutSine: (t: number): number => -(Math.cos(Math.PI * t) - 1) / 2,
  smoothStep: (t: number): number => t * t * (3 - 2 * t),
  smootherStep: (t: number): number => t * t * t * (t * (t * 6 - 15) + 10),
}

const parseColor = (color: string): { r: number; g: number; b: number; a: number } => {
  const match = color.match(/rgba?$$(\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?$$/)
  if (match) {
    return {
      r: Number.parseInt(match[1]),
      g: Number.parseInt(match[2]),
      b: Number.parseInt(match[3]),
      a: match[4] ? Number.parseFloat(match[4]) : 1,
    }
  }
  return { r: 180, g: 160, b: 220, a: 1 }
}

export const SpaceBackground = memo(function SpaceBackground({
  config = PLAYSTATION_LIKE_PRESET,
}: {
  config?: ParticleIntroConfig
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const [isBlurred, setIsBlurred] = useState(false)
  const pathname = usePathname()
  const isStyleguide = pathname === "/styleguide"

  useEffect(() => {
    const handleBlur = () => setIsBlurred(true)
    const handleUnblur = () => setIsBlurred(false)

    window.addEventListener("quiz-started", handleBlur)
    window.addEventListener("quiz-ended", handleUnblur)

    return () => {
      window.removeEventListener("quiz-started", handleBlur)
      window.removeEventListener("quiz-ended", handleUnblur)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const hasSeenIntro = sessionStorage.getItem("miracletheg_hasSeenIntro") === "true"
    const skipIntro = prefersReducedMotion || hasSeenIntro

    let animationId: number
    let width = window.innerWidth
    let height = window.innerHeight

    let phase: AnimationPhase = skipIntro ? "ambient" : "idle"
    let phaseStartTime = performance.now()
    let globalTime = 0

    let cameraZoom = 1
    let targetCameraZoom = 1

    let globalPulse = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)

    const isMobile = window.innerWidth < 768
    const particleCount = isMobile ? config.mobileParticles : config.maxParticles
    const nodeCount = isMobile ? 12 : config.maxNodes
    const connectionDistance = isMobile ? 180 : 280

    let particles: Particle[] = []
    let nodes: GeometricNode[] = []
    let shootingStars: ShootingStar[] = []
    let lastShootingStarTime = 0

    const baseColor = parseColor(config.baseColor)
    const accentColor = parseColor(config.accentColor)
    const highlightColor = parseColor(config.highlightColor)
    const glowColor = parseColor(config.glowColor || config.accentColor)

    const getCenterX = () => width / 2
    const getCenterY = () => height / 2

    const initParticles = () => {
      particles = []
      const centerX = getCenterX()
      const centerY = getCenterY()

      for (let i = 0; i < particleCount; i++) {
        const layer = i < particleCount * 0.2 ? 2 : i < particleCount * 0.5 ? 1 : 0
        const scatterSpread = 1.5 + layer * 0.3

        const scatterX = centerX + (Math.random() - 0.5) * width * scatterSpread
        const scatterY = centerY + (Math.random() - 0.5) * height * scatterSpread
        const scatterZ = layer * 30 + Math.random() * 30

        const spiralAngle = Math.random() * Math.PI * 2
        const spiralRadius = 20 + Math.random() * Math.min(width, height) * 0.12
        const convergeX = centerX + Math.cos(spiralAngle) * spiralRadius * 0.3
        const convergeY = centerY + Math.sin(spiralAngle) * spiralRadius * 0.3
        const convergeZ = 40 + Math.random() * 20

        const ambientX = Math.random() * width
        const ambientY = Math.random() * height

        const typeRoll = Math.random()
        const type = typeRoll < 0.03 ? 1 : typeRoll < 0.15 ? 2 : 0

        const baseSize =
          type === 1
            ? 2.5 + Math.random() * 2
            : type === 2
              ? 1 + Math.random() * 1.5
              : 0.4 + Math.random() * 1.2 + layer * 0.3

        particles.push({
          x: skipIntro ? ambientX : scatterX,
          y: skipIntro ? ambientY : scatterY,
          z: skipIntro ? 50 : scatterZ,
          scatterX,
          scatterY,
          scatterZ,
          convergeX,
          convergeY,
          convergeZ,
          ambientX,
          ambientY,
          size: baseSize,
          baseSize,
          baseOpacity: type === 1 ? 0.9 : type === 2 ? 0.5 : 0.2 + Math.random() * 0.35,
          opacity: skipIntro ? 0.3 + Math.random() * 0.3 : 0.05,
          twinkleSpeed: 0.008 + Math.random() * 0.015,
          twinklePhase: Math.random() * Math.PI * 2,
          driftSpeed: 0.0003 + Math.random() * 0.0007,
          driftPhase: Math.random() * Math.PI * 2,
          driftRadius: 8 + Math.random() * 16,
          velocityX: 0,
          velocityY: 0,
          type,
          spiralAngle,
          spiralRadius,
          layer,
          pulsePhase: Math.random() * Math.PI * 2,
          convergeDelay: Math.random() * 0.4, // Staggered convergence
        })
      }
    }

    const initNodes = () => {
      nodes = []
      const cols = Math.ceil(Math.sqrt(nodeCount * (width / height)))
      const rows = Math.ceil(nodeCount / cols)
      const cellWidth = width / cols
      const cellHeight = height / rows
      const centerX = getCenterX()
      const centerY = getCenterY()

      for (let i = 0; i < nodeCount; i++) {
        const col = i % cols
        const row = Math.floor(i / cols)
        const offsetX = row % 2 === 0 ? 0 : cellWidth / 2
        const baseX = col * cellWidth + cellWidth / 2 + offsetX + (Math.random() - 0.5) * cellWidth * 0.4
        const baseY = row * cellHeight + cellHeight / 2 + (Math.random() - 0.5) * cellHeight * 0.4

        const convergeAngle = Math.random() * Math.PI * 2
        const convergeRadius = Math.random() * 60

        nodes.push({
          x: skipIntro ? baseX : centerX + (Math.random() - 0.5) * 100,
          y: skipIntro ? baseY : centerY + (Math.random() - 0.5) * 100,
          baseX,
          baseY,
          targetX: baseX,
          targetY: baseY,
          phase: Math.random() * Math.PI * 2,
          speed: 0.0008 + Math.random() * 0.0015,
          radius: Math.random() * 1.2 + 0.4,
          convergeX: centerX + Math.cos(convergeAngle) * convergeRadius,
          convergeY: centerY + Math.sin(convergeAngle) * convergeRadius,
        })
      }
    }

    const spawnShootingStar = () => {
      const startX = Math.random() * width * 0.8
      const startY = Math.random() * height * 0.3
      const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.3

      shootingStars.push({
        x: startX,
        y: startY,
        length: 80 + Math.random() * 100,
        speed: 6 + Math.random() * 4,
        angle,
        opacity: 0.85,
        life: 0,
        maxLife: 80 + Math.random() * 50,
      })
    }

    const resizeCanvas = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
      initParticles()
      initNodes()
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const mouseInfluenceRadius = 140
    const mouseInfluenceStrength = 25

    const ease = easings[config.convergeEasing] || easings.easeInOutSine

    const animate = (currentTime: number) => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.02)"
      ctx.fillRect(0, 0, width, height)
      ctx.clearRect(0, 0, width, height)

      globalTime++
      globalPulse = Math.sin(globalTime * 0.015) * 0.5 + 0.5

      const mouse = mouseRef.current
      const elapsed = currentTime - phaseStartTime
      const centerX = getCenterX()
      const centerY = getCenterY()

      // Phase transitions
      if (phase === "idle" && elapsed > config.idleDriftDuration) {
        phase = "converge"
        phaseStartTime = currentTime
        if (config.cameraDolly) targetCameraZoom = 1.08
      } else if (phase === "converge" && elapsed > config.convergeDuration) {
        phase = "reveal"
        phaseStartTime = currentTime
      } else if (phase === "reveal" && elapsed > config.logoRevealDuration) {
        phase = "transition"
        phaseStartTime = currentTime
        targetCameraZoom = 1
        sessionStorage.setItem("miracletheg_hasSeenIntro", "true")
      } else if (phase === "transition" && elapsed > config.transitionDuration) {
        phase = "ambient"
        phaseStartTime = currentTime
      }

      cameraZoom += (targetCameraZoom - cameraZoom) * 0.015

      let phaseProgress = 0
      if (phase === "idle") phaseProgress = elapsed / config.idleDriftDuration
      else if (phase === "converge") phaseProgress = elapsed / config.convergeDuration
      else if (phase === "reveal") phaseProgress = elapsed / config.logoRevealDuration
      else if (phase === "transition") phaseProgress = elapsed / config.transitionDuration
      else phaseProgress = 1

      phaseProgress = Math.min(1, Math.max(0, phaseProgress))

      if ((phase === "converge" || phase === "reveal") && config.layeredGlow) {
        const glowIntensity =
          phase === "reveal" ? 0.15 + Math.sin(phaseProgress * Math.PI * 4) * 0.08 : phaseProgress * 0.1

        const glowSize = Math.min(width, height) * 0.4
        const centerGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, glowSize)
        centerGlow.addColorStop(0, `rgba(${glowColor.r}, ${glowColor.g}, ${glowColor.b}, ${glowIntensity})`)
        centerGlow.addColorStop(0.3, `rgba(${glowColor.r}, ${glowColor.g}, ${glowColor.b}, ${glowIntensity * 0.4})`)
        centerGlow.addColorStop(0.6, `rgba(${glowColor.r}, ${glowColor.g}, ${glowColor.b}, ${glowIntensity * 0.1})`)
        centerGlow.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.beginPath()
        ctx.arc(centerX, centerY, glowSize, 0, Math.PI * 2)
        ctx.fillStyle = centerGlow
        ctx.fill()
      }

      const sortedParticles = [...particles].sort((a, b) => a.layer - b.layer)

      sortedParticles.forEach((particle) => {
        let targetX = particle.x
        let targetY = particle.y
        let targetOpacity = particle.baseOpacity
        let drawSize = particle.size

        const adjustedProgress = Math.max(0, (phaseProgress - particle.convergeDelay) / (1 - particle.convergeDelay))
        const smoothProgress = easings.smootherStep(adjustedProgress)

        if (phase === "idle") {
          const breathe = config.breathingEffect ? Math.sin(globalTime * 0.01 + particle.pulsePhase) * 0.15 + 1 : 1

          const driftX = Math.sin(globalTime * particle.driftSpeed + particle.driftPhase) * particle.driftRadius * 0.6
          const driftY =
            Math.cos(globalTime * particle.driftSpeed * 0.8 + particle.driftPhase) * particle.driftRadius * 0.6

          targetX = particle.scatterX + driftX
          targetY = particle.scatterY + driftY
          targetOpacity = particle.baseOpacity * 0.25 * breathe * (0.6 + phaseProgress * 0.4)
          drawSize = particle.baseSize * breathe
        } else if (phase === "converge") {
          if (config.spiralConverge) {
            const spiralProgress = smoothProgress
            const currentSpiralRadius = particle.spiralRadius * (1 - spiralProgress)
            const spiralRotation = spiralProgress * Math.PI * 1.5

            const spiralX = Math.cos(particle.spiralAngle + spiralRotation) * currentSpiralRadius
            const spiralY = Math.sin(particle.spiralAngle + spiralRotation) * currentSpiralRadius

            targetX = particle.scatterX + (particle.convergeX + spiralX - particle.scatterX) * smoothProgress
            targetY = particle.scatterY + (particle.convergeY + spiralY - particle.scatterY) * smoothProgress
          } else {
            targetX = particle.scatterX + (particle.convergeX - particle.scatterX) * smoothProgress
            targetY = particle.scatterY + (particle.convergeY - particle.scatterY) * smoothProgress
          }

          particle.z = particle.scatterZ + (particle.convergeZ - particle.scatterZ) * smoothProgress
          targetOpacity = particle.baseOpacity * (0.25 + smoothProgress * 0.6)

          // Camera dolly parallax
          if (config.cameraDolly) {
            const depthFactor = (particle.z - 50) / 50
            const dollyOffset = (cameraZoom - 1) * 80 * depthFactor
            targetX += (targetX - centerX) * dollyOffset * 0.01
            targetY += (targetY - centerY) * dollyOffset * 0.01
          }
        } else if (phase === "reveal") {
          const pulseSpeed = 2.5 + particle.layer * 0.5
          const pulse = Math.sin(phaseProgress * Math.PI * pulseSpeed + particle.pulsePhase) * 0.25 + 1

          targetX = particle.convergeX
          targetY = particle.convergeY
          targetOpacity = Math.min(1, particle.baseOpacity * pulse * (1 + particle.layer * 0.2))

          if (particle.type === 1) {
            targetOpacity = Math.min(1, targetOpacity * 1.4)
            drawSize = particle.baseSize * (1 + Math.sin(phaseProgress * Math.PI) * 0.4)
          }

          if (config.motionBlur && particle.type === 1 && phaseProgress > 0.4 && phaseProgress < 0.8) {
            const streakAngle = Math.atan2(targetY - centerY, targetX - centerX)
            const streakSpeed = 3 + (phaseProgress - 0.4) * 10
            particle.velocityX = Math.cos(streakAngle) * streakSpeed
            particle.velocityY = Math.sin(streakAngle) * streakSpeed
          }
        } else if (phase === "transition") {
          const transProgress = easings.smootherStep(phaseProgress)
          targetX = particle.convergeX + (particle.ambientX - particle.convergeX) * transProgress
          targetY = particle.convergeY + (particle.ambientY - particle.convergeY) * transProgress
          targetOpacity = particle.baseOpacity * (0.85 - transProgress * 0.35)
        } else {
          // ambient - existing behavior
          const gentleDriftX =
            Math.sin(globalTime * particle.driftSpeed * 0.3 + particle.driftPhase) * particle.driftRadius * 0.4
          const gentleDriftY =
            Math.cos(globalTime * particle.driftSpeed * 0.25 + particle.driftPhase) * particle.driftRadius * 0.4

          targetX = particle.ambientX + gentleDriftX
          targetY = particle.ambientY + gentleDriftY
          targetOpacity = particle.baseOpacity * 0.5
          drawSize = particle.baseSize * 0.8
        }

        // Apply velocity for motion blur
        if (config.motionBlur) {
          targetX += particle.velocityX
          targetY += particle.velocityY
          particle.velocityX *= 0.92
          particle.velocityY *= 0.92
        }

        const smoothFactor = phase === "ambient" ? 0.04 : 0.025
        particle.x += (targetX - particle.x) * smoothFactor
        particle.y += (targetY - particle.y) * smoothFactor
        particle.opacity += (targetOpacity - particle.opacity) * 0.08

        // Twinkle
        const twinkle = Math.sin(globalTime * particle.twinkleSpeed + particle.twinklePhase)
        const currentOpacity = particle.opacity * (0.75 + twinkle * 0.25)

        // Depth of field
        let depthScale = 1
        if (config.depthOfField && phase !== "ambient") {
          const depthFactor = Math.abs(particle.z - 50) / 50
          depthScale = 1 - depthFactor * 0.25
        }

        const finalSize = drawSize * depthScale

        let color = baseColor
        if (particle.type === 1) color = highlightColor
        else if (particle.type === 2) color = accentColor

        if (finalSize > 1 && config.layeredGlow) {
          // Outer glow
          const outerGlow = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, finalSize * 6)
          outerGlow.addColorStop(0, `rgba(${glowColor.r}, ${glowColor.g}, ${glowColor.b}, ${currentOpacity * 0.3})`)
          outerGlow.addColorStop(0.5, `rgba(${glowColor.r}, ${glowColor.g}, ${glowColor.b}, ${currentOpacity * 0.1})`)
          outerGlow.addColorStop(1, "rgba(0, 0, 0, 0)")

          ctx.beginPath()
          ctx.arc(particle.x, particle.y, finalSize * 6, 0, Math.PI * 2)
          ctx.fillStyle = outerGlow
          ctx.fill()

          // Inner glow
          const innerGlow = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, finalSize * 3)
          innerGlow.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${currentOpacity * 0.6})`)
          innerGlow.addColorStop(0.6, `rgba(${color.r}, ${color.g}, ${color.b}, ${currentOpacity * 0.2})`)
          innerGlow.addColorStop(1, "rgba(0, 0, 0, 0)")

          ctx.beginPath()
          ctx.arc(particle.x, particle.y, finalSize * 3, 0, Math.PI * 2)
          ctx.fillStyle = innerGlow
          ctx.fill()
        }

        if (config.motionBlur && (phase === "converge" || phase === "reveal")) {
          const speed = Math.sqrt(particle.velocityX ** 2 + particle.velocityY ** 2)
          if (speed > 0.3) {
            const trailLength = Math.min(speed * 4, 30)
            const trailAngle = Math.atan2(particle.velocityY, particle.velocityX)

            const trailGradient = ctx.createLinearGradient(
              particle.x - Math.cos(trailAngle) * trailLength,
              particle.y - Math.sin(trailAngle) * trailLength,
              particle.x,
              particle.y,
            )
            trailGradient.addColorStop(0, "rgba(0, 0, 0, 0)")
            trailGradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${currentOpacity * 0.2})`)
            trailGradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, ${currentOpacity * 0.5})`)

            ctx.beginPath()
            ctx.moveTo(particle.x - Math.cos(trailAngle) * trailLength, particle.y - Math.sin(trailAngle) * trailLength)
            ctx.lineTo(particle.x, particle.y)
            ctx.strokeStyle = trailGradient
            ctx.lineWidth = finalSize * 1.5
            ctx.lineCap = "round"
            ctx.stroke()
          }
        }

        // Core particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, finalSize, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${currentOpacity})`
        ctx.fill()
      })

      // Geometric nodes and connections (ambient/late phases only)
      const nodeOpacity =
        phase === "ambient"
          ? 1
          : phase === "transition"
            ? easings.smoothStep(phaseProgress)
            : phase === "reveal" && phaseProgress > 0.75
              ? easings.smoothStep((phaseProgress - 0.75) / 0.25)
              : 0

      if (nodeOpacity > 0) {
        nodes.forEach((node) => {
          if (phase === "ambient") {
            node.x = node.baseX
            node.y = node.baseY
          } else if (phase === "transition") {
            const transProgress = easings.smootherStep(phaseProgress)
            node.targetX = node.convergeX + (node.baseX - node.convergeX) * transProgress
            node.targetY = node.convergeY + (node.baseY - node.convergeY) * transProgress
            node.x += (node.targetX - node.x) * 0.025
            node.y += (node.targetY - node.y) * 0.025
          } else {
            node.targetX = node.convergeX
            node.targetY = node.convergeY
            node.x += (node.targetX - node.x) * 0.025
            node.y += (node.targetY - node.y) * 0.025
          }
        })

        // Draw connections
        if (phase !== "ambient") {
          const connections: { i: number; j: number; distance: number }[] = []

          for (let i = 0; i < nodes.length; i++) {
            const nodeConnections: { j: number; distance: number }[] = []

            for (let j = 0; j < nodes.length; j++) {
              if (i === j) continue
              const dx = nodes[i].x - nodes[j].x
              const dy = nodes[i].y - nodes[j].y
              const distance = Math.sqrt(dx * dx + dy * dy)

              if (distance < connectionDistance) {
                nodeConnections.push({ j, distance })
              }
            }

            nodeConnections.sort((a, b) => a.distance - b.distance)
            nodeConnections.slice(0, 2).forEach(({ j, distance }) => {
              if (i < j) {
                connections.push({ i, j, distance })
              }
            })
          }

          ctx.lineWidth = 0.5

          connections.forEach(({ i, j, distance }) => {
            const opacity = Math.pow(1 - distance / connectionDistance, 2) * 0.12 * nodeOpacity

            const midX = (nodes[i].x + nodes[j].x) / 2
            const midY = (nodes[i].y + nodes[j].y) / 2
            const mouseDist = Math.sqrt(Math.pow(mouse.x - midX, 2) + Math.pow(mouse.y - midY, 2))
            const highlight = mouseDist < 100 ? 1 + (1 - mouseDist / 100) * 0.6 : 1

            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(140, 120, 180, ${opacity * highlight})`
            ctx.stroke()
          })
        }

        // Draw nodes
        nodes.forEach((node) => {
          const dx = mouse.x - node.x
          const dy = mouse.y - node.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const highlight = distance < 100 ? 1 + (1 - distance / 100) * 0.6 : 1

          ctx.beginPath()
          ctx.arc(node.x, node.y, node.radius * highlight, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(160, 140, 200, ${0.2 * highlight * nodeOpacity})`
          ctx.fill()
        })
      }

      // Shooting stars (ambient only)
      if (phase === "ambient") {
        if (currentTime - lastShootingStarTime > 10000 + Math.random() * 8000) {
          spawnShootingStar()
          lastShootingStarTime = currentTime
        }

        shootingStars = shootingStars.filter((star) => {
          star.life++
          star.x += Math.cos(star.angle) * star.speed
          star.y += Math.sin(star.angle) * star.speed

          const lifeProgress = star.life / star.maxLife
          let currentOpacity = star.opacity
          if (lifeProgress < 0.1) {
            currentOpacity *= lifeProgress / 0.1
          } else if (lifeProgress > 0.7) {
            currentOpacity *= 1 - (lifeProgress - 0.7) / 0.3
          }

          const tailX = star.x - Math.cos(star.angle) * star.length
          const tailY = star.y - Math.sin(star.angle) * star.length

          const gradient = ctx.createLinearGradient(tailX, tailY, star.x, star.y)
          gradient.addColorStop(0, "rgba(255, 255, 255, 0)")
          gradient.addColorStop(0.7, `rgba(200, 190, 240, ${currentOpacity * 0.4})`)
          gradient.addColorStop(1, `rgba(255, 255, 255, ${currentOpacity})`)

          ctx.beginPath()
          ctx.moveTo(tailX, tailY)
          ctx.lineTo(star.x, star.y)
          ctx.strokeStyle = gradient
          ctx.lineWidth = 1.5
          ctx.lineCap = "round"
          ctx.stroke()

          const headGradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, 3)
          headGradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity})`)
          headGradient.addColorStop(0.5, `rgba(200, 190, 240, ${currentOpacity * 0.4})`)
          headGradient.addColorStop(1, "rgba(200, 190, 240, 0)")

          ctx.beginPath()
          ctx.arc(star.x, star.y, 3, 0, Math.PI * 2)
          ctx.fillStyle = headGradient
          ctx.fill()

          return star.life < star.maxLife && star.x < width + 100 && star.y < height + 100
        })
      }

      animationId = requestAnimationFrame(animate)
    }

    animate(performance.now())

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animationId)
    }
  }, [config])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none transition-all duration-700 ${
        isBlurred ? "blur-md opacity-20" : isStyleguide ? "blur-[2.5px] opacity-90" : "blur-0 opacity-100"
      }`}
      style={{ zIndex: -10 }}
      aria-hidden="true"
    />
  )
})
