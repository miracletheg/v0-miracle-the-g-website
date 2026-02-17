import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CosmicBackground } from "@/components/cosmic-background"
import { AboutHero } from "@/components/about/about-hero"
import { AboutStory } from "@/components/about/about-story"
import { AboutCredentials } from "@/components/about/about-credentials"
import { AboutCTA } from "@/components/about/about-cta"
import { ServicesImageCarousel } from "@/components/services/services-image-carousel"

export const metadata = {
  title: "About Samira | Miracle The G",
  description:
    "Meet Samira Maharaj, also known as Samiracle or The Goddess of Miracles. A psychic medium and shamanic medicine practitioner connecting with beautiful souls from all over the world.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <CosmicBackground />
      <Navigation />
      <AboutHero />
      <AboutStory />
      <ServicesImageCarousel />
      <AboutCredentials />
      <AboutCTA />
      <Footer />
    </main>
  )
}
