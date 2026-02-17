import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CosmicBackground } from "@/components/cosmic-background"
import { FAQHero } from "@/components/faq/faq-hero"
import { FAQContent } from "@/components/faq/faq-content"
import { FAQCTA } from "@/components/faq/faq-cta"

export const metadata = {
  title: "FAQ | Miracle The G",
  description:
    "Find answers to common questions about Reiki healing, plant medicine ceremonies, psychic readings, and spiritual services.",
}

export default function FAQPage() {
  return (
    <main className="min-h-screen">
      <CosmicBackground />
      <Navigation />
      <FAQHero />
      <FAQContent />
      <FAQCTA />
      <Footer />
    </main>
  )
}
