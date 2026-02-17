import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { SacredGeometryBG } from "@/components/sacred-geometry-bg"
import { ShopProducts } from "@/components/shop/shop-products"

export const metadata = {
  title: "Shop Digital Products | Miracle The G",
  description: "Explore spiritual resources including Reiki manuals, live readings, and more from Miracle The G.",
}

export default function ShopPage() {
  return (
    <main className="min-h-screen">
      <SacredGeometryBG />
      <Navigation />
      <div className="pt-28 md:pt-32">
        <ShopProducts />
      </div>
      <Footer />
    </main>
  )
}
