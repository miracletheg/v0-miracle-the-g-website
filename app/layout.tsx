import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollToTop } from "@/components/scroll-to-top"
import { SpaceBackground } from "@/components/space-background"

import {
  Playfair_Display,
  Inter,
  JetBrains_Mono,
  DM_Sans as V0_Font_DM_Sans,
  Space_Mono as V0_Font_Space_Mono,
  Source_Serif_4 as V0_Font_Source_Serif_4,
} from "next/font/google"

// Initialize fonts
const _dmSans = V0_Font_DM_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900", "1000"],
})
const _spaceMono = V0_Font_Space_Mono({ subsets: ["latin"], weight: ["400", "700"] })
const _sourceSerif_4 = V0_Font_Source_Serif_4({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
})

export const metadata: Metadata = {
  title: "Miracle The G | Spiritual Healing & Psychic Services",
  description:
    "Discover your path with Samira - Certified Reiki Master, Shamanic Healer, and Psychic Medium. Experience transformative healing through Reiki, plant medicine ceremonies, tarot readings, and spiritual guidance.",
  keywords:
    "reiki, spiritual healing, tarot readings, shamanic healing, psychic medium, plant medicine, ayahuasca, energy healing",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${inter.variable} ${jetbrains.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange={false}>
          <SpaceBackground />
          <ScrollToTop />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
