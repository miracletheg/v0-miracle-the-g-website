"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"

/*
 * Sacred Geometry Background - Refined & Symmetrical
 *
 * Clean, intentional geometric patterns that:
 * - Are perfectly symmetrical and balanced
 * - Use minimal, elegant line work (never crowded)
 * - React smoothly to scroll with clear parallax
 * - Stay very low opacity for accessibility
 */

export function SacredGeometryBG() {
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 50, damping: 20 })

  // Clear parallax transforms at different speeds
  const y1 = useTransform(smooth, [0, 1], ["0%", "-30%"])
  const y2 = useTransform(smooth, [0, 1], ["0%", "-50%"])
  const y3 = useTransform(smooth, [0, 1], ["0%", "-20%"])
  const rotate1 = useTransform(smooth, [0, 1], [0, 15])
  const rotate2 = useTransform(smooth, [0, 1], [0, -10])

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none select-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* ═══════════════════════════════════════════════════════════════════
          CENTER: Large centered Flower of Life - main focal pattern
          Perfectly symmetrical, anchored to center
          ═══════════════════════════════════════════════════════════════════ */}
      <motion.div
        style={{ y: y1, rotate: rotate1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] max-w-[1400px] max-h-[1400px]"
      >
        <svg viewBox="0 0 400 400" className="w-full h-full opacity-[0.04]" fill="none">
          {/* Central seed of life - 7 circles */}
          <circle cx="200" cy="200" r="40" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <circle
              key={`seed-${angle}`}
              cx={200 + 40 * Math.cos((angle * Math.PI) / 180)}
              cy={200 + 40 * Math.sin((angle * Math.PI) / 180)}
              r="40"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-foreground"
            />
          ))}
          {/* Outer ring - 12 circles */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
            <circle
              key={`outer-${angle}`}
              cx={200 + 69 * Math.cos((angle * Math.PI) / 180)}
              cy={200 + 69 * Math.sin((angle * Math.PI) / 180)}
              r="40"
              stroke="currentColor"
              strokeWidth="0.3"
              className="text-foreground"
            />
          ))}
          {/* Containing circles */}
          <circle cx="200" cy="200" r="110" stroke="currentColor" strokeWidth="0.3" className="text-foreground" />
          <circle cx="200" cy="200" r="150" stroke="currentColor" strokeWidth="0.2" className="text-foreground" />
        </svg>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════════════
          TOP LEFT: Simple concentric circles
          ═══════════════════════════════════════════════════════════════════ */}
      <motion.div style={{ y: y2 }} className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px]">
        <svg viewBox="0 0 200 200" className="w-full h-full opacity-[0.03]" fill="none">
          {[20, 40, 60, 80].map((r) => (
            <circle
              key={r}
              cx="100"
              cy="100"
              r={r}
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-foreground"
            />
          ))}
        </svg>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════════════
          BOTTOM RIGHT: Radiating lines from corner
          ═══════════════════════════════════════════════════════════════════ */}
      <motion.div
        style={{ y: y3, rotate: rotate2 }}
        className="absolute -bottom-[15%] -right-[15%] w-[600px] h-[600px]"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full opacity-[0.03]" fill="none">
          {/* Radiating lines */}
          {[0, 15, 30, 45, 60, 75, 90].map((angle) => (
            <line
              key={`ray-${angle}`}
              x1="200"
              y1="200"
              x2={200 - 180 * Math.cos((angle * Math.PI) / 180)}
              y2={200 - 180 * Math.sin((angle * Math.PI) / 180)}
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-foreground"
            />
          ))}
          {/* Arc segments */}
          {[60, 100, 140].map((r) => (
            <path
              key={`arc-${r}`}
              d={`M ${200 - r} 200 A ${r} ${r} 0 0 1 200 ${200 - r}`}
              stroke="currentColor"
              strokeWidth="0.4"
              className="text-foreground"
            />
          ))}
        </svg>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════════════
          FLOATING ELEMENTS: Small diamonds and stars scattered
          ═══════════════════════════════════════════════════════════════════ */}
      <motion.div style={{ y: y2 }} className="absolute inset-0 opacity-[0.05]">
        {/* Positioned symmetrically */}
        {[
          { x: "15%", y: "20%" },
          { x: "85%", y: "20%" },
          { x: "10%", y: "70%" },
          { x: "90%", y: "70%" },
        ].map((pos, i) => (
          <div
            key={`diamond-${i}`}
            className="absolute w-3 h-3 border border-foreground rotate-45"
            style={{ left: pos.x, top: pos.y }}
          />
        ))}

        {/* Four-pointed stars */}
        {[
          { x: "25%", y: "45%" },
          { x: "75%", y: "45%" },
          { x: "50%", y: "85%" },
        ].map((pos, i) => (
          <svg
            key={`star-${i}`}
            className="absolute w-4 h-4 text-foreground"
            style={{ left: pos.x, top: pos.y }}
            viewBox="0 0 16 16"
            fill="none"
          >
            <path d="M8 0L9 7L16 8L9 9L8 16L7 9L0 8L7 7L8 0Z" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        ))}
      </motion.div>

      {/* Subtle gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background opacity-60" />
    </div>
  )
}
