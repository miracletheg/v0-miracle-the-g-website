"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { TarotShowcase } from "@/components/home/tarot-showcase"
import { SacredGeometryBG } from "@/components/sacred-geometry-bg"

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <SacredGeometryBG />
      <div className="relative z-10">
        <Navigation />
        <main className="pt-28 md:pt-32">
          <TarotShowcase />
        </main>
        <Footer />
      </div>
    </div>
  )
}
