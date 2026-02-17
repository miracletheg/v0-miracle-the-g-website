import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ServicesPricing } from "@/components/services/services-pricing"
import { SacredGeometryBG } from "@/components/sacred-geometry-bg"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Services & Pricing | Miracle The G",
  description:
    "Explore healing services and pricing for online sessions, in-person sessions, and sacred medicine ceremonies with Miracle The G.",
}

export default function ServicesPricingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <SacredGeometryBG />
      <div className="relative z-10">
        <Navigation />
        <main className="pt-28 md:pt-32">
          <ServicesPricing />
        </main>
        <Footer />
      </div>
    </div>
  )
}
