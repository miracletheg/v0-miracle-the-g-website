"use client";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const healingSessions = [
  {
    title: "Just For You",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Just%20For%20You-Rj5g3s6pG6g5K7eeoXcVotCM4fFwLm.png",
  },
  {
    title: "Third Eye Clearing",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Third%20Eye%20Clearing-t1GyCbwl1ucWuFNw7zlenNNqPpvrAF.png",
  },
  {
    title: "Womb Healing",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Womb%20Healing-aPSwmCtglVTXCIpbahhYUjUYepWUe9.png",
  },
  {
    title: "Root Work",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Root%20Work-68TdhnkXm6QLqQtfWZ2iT1WU2ICxkl.png",
  },
  {
    title: "The Other Side",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Other%20Side-1uMJb6dghw1hZ6UvoGcGCO7v1iKp2M.png",
  },
  {
    title: "Heart Activation",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Heart%20Activation-fu1UpbiN8Xh8SUYhxvngFvNk3hLW1c.png",
  },
  {
    title: "The Exterminator",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Exterminator-HjWyq6tXLuxuxLgvzDIPXwTXg4cRJp.png",
  },
  {
    title: "Shadow Work",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Shadow%20Work-DhiDJPfhhdaKup51AM0VCmjiJfipcb.png",
  },
  {
    title: "The Purge",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Purge-jjkfyjbkYPdiXKFxTWFBZLMnjBHYeB.png",
  },
  {
    title: "Phoenix Rising",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Phoenix%20Rising-9MTiTI3AVlkEcf0uIEHCcukbB8y0YP.jpg",
  },
];

export function HealingSessionsCarousel() {
  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-sans text-center mb-12 text-[hsl(var(--primary))]">
          Energy Healing Sessions
        </h2>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 4000,
              stopOnInteraction: true,
            }),
          ]}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {healingSessions.map((session) => (
              <CarouselItem
                key={session.title}
                className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div className="group relative overflow-hidden rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] transition-all duration-300 hover:border-[hsl(var(--primary))] hover:shadow-[0_0_20px_rgba(200,170,110,0.2)]">
                  <div className="aspect-[2/3] relative">
                    <Image
                      src={session.image}
                      alt={session.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12 bg-[hsl(var(--card))] border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--primary))]" />
          <CarouselNext className="hidden md:flex -right-12 bg-[hsl(var(--card))] border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--primary))]" />
        </Carousel>

        <div className="flex justify-center gap-2 mt-8">
          <p className="text-sm text-[hsl(var(--muted-foreground))] font-serif italic">
            Swipe or use arrows to explore all sessions
          </p>
        </div>
      </div>
    </section>
  );
}
