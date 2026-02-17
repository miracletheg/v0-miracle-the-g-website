"use client"

import { useRef, useMemo } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface GeometricBackdropProps {
  variant?: "hero" | "section" | "full"
  density?: "low" | "medium" | "high"
}

export function GeometricBackdrop({ variant = "section", density = "medium" }: GeometricBackdropProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  // Parallax transforms for different layers
  const layer1Y = useTransform(scrollYProgress, [0, 1], [0, -300])
  const layer2Y = useTransform(scrollYProgress, [0, 1], [0, -150])
  const layer3Y = useTransform(scrollYProgress, [0, 1], [0, -450])
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 15])

  const shapeCount = density === "low" ? 8 : density === "medium" ? 14 : 20

  // Generate random shapes
  const shapes = useMemo(
    () =>
      Array.from({ length: shapeCount }, (_, i) => ({
        id: i,
        type: ["shard", "circle", "line", "arc"][Math.floor(Math.random() * 4)] as "shard" | "circle" | "line" | "arc",
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 20 + Math.random() * 80,
        rotation: Math.random() * 360,
        opacity: 0.03 + Math.random() * 0.08,
        layer: Math.floor(Math.random() * 3),
      })),
    [shapeCount],
  )

  const layerTransforms = [layer1Y, layer2Y, layer3Y]

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${variant === "full" ? "fixed" : "absolute"}`}
      style={{ zIndex: -1 }}
    >
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />

      {/* Geometric shapes */}
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          style={{
            y: layerTransforms[shape.layer],
            rotate: shape.layer === 0 ? rotation : 0,
          }}
          className="absolute"
        >
          {shape.type === "shard" && (
            <div
              className="border border-foreground/10"
              style={{
                position: "absolute",
                left: `${shape.x}%`,
                top: `${shape.y}%`,
                width: shape.size,
                height: shape.size * 1.5,
                transform: `rotate(${shape.rotation}deg)`,
                opacity: shape.opacity,
                clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
              }}
            />
          )}

          {shape.type === "circle" && (
            <div
              className="rounded-full border border-foreground/10"
              style={{
                position: "absolute",
                left: `${shape.x}%`,
                top: `${shape.y}%`,
                width: shape.size,
                height: shape.size,
                opacity: shape.opacity,
              }}
            />
          )}

          {shape.type === "line" && (
            <div
              className="bg-foreground/10"
              style={{
                position: "absolute",
                left: `${shape.x}%`,
                top: `${shape.y}%`,
                width: 1,
                height: shape.size * 2,
                transform: `rotate(${shape.rotation}deg)`,
                opacity: shape.opacity,
              }}
            />
          )}

          {shape.type === "arc" && (
            <svg
              className="absolute"
              style={{
                left: `${shape.x}%`,
                top: `${shape.y}%`,
                width: shape.size,
                height: shape.size,
                opacity: shape.opacity,
              }}
              viewBox="0 0 100 100"
            >
              <path
                d="M 10 50 Q 50 10 90 50"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-foreground"
              />
            </svg>
          )}
        </motion.div>
      ))}

      {/* Subtle radial gradients for depth */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-mystic-violet/5 blur-[100px] animate-float-slow" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-mystic-indigo/5 blur-[120px] animate-float-medium" />
    </div>
  )
}
