import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CosmicBackground } from "@/components/cosmic-background"
import { JourneyOptions } from "@/components/journey/journey-options"

export const metadata = {
  title: "Discover Your Path | Miracle The G",
  description:
    "Take our guided quiz or explore our tarot deck to find the perfect healing service for your spiritual journey.",
}

export default function JourneyPage() {
  return (
    <main className="min-h-screen">
      <CosmicBackground />
      <Navigation />
      <JourneyOptions />
      <Footer />
    </main>
  )
}
