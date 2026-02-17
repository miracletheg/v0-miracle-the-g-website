"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { AboutPreview } from "@/components/home/about-preview"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { CTASection } from "@/components/home/cta-section"
import { SacredGeometryBG } from "@/components/sacred-geometry-bg"
import { ServicesImageCarousel } from "@/components/services/services-image-carousel"
import { EmailCapture } from "@/components/home/email-capture"

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <SacredGeometryBG />
      <div className="relative z-10">
        <Navigation />
        <main>
          <HeroSection />
          <AboutPreview />
          <ServicesImageCarousel />
          <EmailCapture />
          <TestimonialsSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </div>
  )
}
