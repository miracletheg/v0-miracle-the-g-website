import { HealingSessionsCarousel } from "@/components/healing-sessions-carousel";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-sans mb-6 text-[hsl(var(--primary))]">
            Miracle The G
          </h1>
          <p className="text-xl md:text-2xl font-serif text-[hsl(var(--muted-foreground))] mb-8">
            Transformative Energy Healing for Mind, Body &amp; Spirit
          </p>
          <div className="w-24 h-px bg-[hsl(var(--primary))] mx-auto opacity-60" />
        </div>
      </section>

      {/* Energy Healing Sessions Carousel */}
      <HealingSessionsCarousel />

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-[hsl(var(--border))]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            &copy; {new Date().getFullYear()} Miracle The G. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
