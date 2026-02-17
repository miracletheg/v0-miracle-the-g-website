import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CosmicBackground } from "@/components/cosmic-background"
import { ContactHero } from "@/components/contact/contact-hero"
import { ContactContent } from "@/components/contact/contact-content"

export const metadata = {
  title: "Contact | Miracle The G",
  description:
    "Get in touch with Samira for questions about services, bookings, or to begin your healing journey. We'd love to hear from you.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <CosmicBackground />
      <Navigation />
      <ContactHero />
      <ContactContent />
      <Footer />
    </main>
  )
}
