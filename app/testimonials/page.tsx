import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CosmicBackground } from "@/components/cosmic-background"
import { TestimonialsHero } from "@/components/testimonials/testimonials-hero"
import { TestimonialsGrid } from "@/components/testimonials/testimonials-grid"
import { TestimonialsCTA } from "@/components/testimonials/testimonials-cta"

export const metadata = {
  title: "Testimonials | Miracle The G",
  description:
    "Read real stories of transformation and healing from clients who have experienced our spiritual services.",
}

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen">
      <CosmicBackground />
      <Navigation />
      <TestimonialsHero />
      <TestimonialsGrid />
      <TestimonialsCTA />
      <Footer />
    </main>
  )
}
