"use client"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useState } from "react"
import { Check, Copy, Download } from "lucide-react"

export default function StyleguidePage() {
  const [copiedItem, setCopiedItem] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedItem(id)
    setTimeout(() => setCopiedItem(null), 2000)
  }

  const exportStyleguide = () => {
    const tarotCards = [
      {
        title: "THE HEALER",
        image: "/images/snake-healer1.jpg",
        description: "Reiki sessions and energy healing for deep restoration, pain relief, and chakra balancing.",
        href: "/services/healer",
        color: "#8B5CF6",
        archetype: "Snake Medicine",
        medicine: "Energy Healing & Restoration",
      },
      {
        title: "THE SHAMAN",
        image: "/images/jaguar-shaman1.jpg",
        description:
          "Sacred plant medicine ceremonies and shamanic rituals for profound transformation and spiritual awakening.",
        href: "/services/shaman",
        color: "#6366F1",
        archetype: "Jaguar Medicine",
        medicine: "Sacred Ceremonies & Transformation",
      },
      {
        title: "THE ORACLE",
        image: "/images/peacock-oracle1.jpg",
        description: "Psychic readings, tarot consultations, and intuitive guidance to illuminate your path forward.",
        href: "/services/oracle",
        color: "#EC4899",
        archetype: "Peacock Medicine",
        medicine: "Intuitive Guidance & Psychic Readings",
      },
      {
        title: "THE TEACHER",
        image: "/images/fox-teacher1.jpg",
        description: "Medicine packages combining multiple healing modalities and Reiki training to awaken your gifts.",
        href: "/services/teacher",
        color: "#F59E0B",
        archetype: "Fox Medicine",
        medicine: "Medicine Packages & Training",
      },
    ]

    const styleguideData = {
      version: "1.0",
      brand: "Miracle The G",
      description: "Complete design system and brand guidelines",
      typography: {
        display: "Playfair Display",
        body: "Inter",
        mono: "JetBrains Mono",
        sizes: {
          hero: "text-6xl md:text-7xl",
          h1: "text-3xl font-serif",
          h2: "text-2xl font-serif",
          bodyLarge: "text-lg",
          body: "text-base",
          small: "text-sm",
          label: "text-[10px] tracking-[0.3em] uppercase",
        },
      },
      colors: {
        monochrome: {
          ink: "#1a1a1a",
          paper: "#f8f6f3",
          warmPaper: "#f5f2ed",
          ash: "#a8a29e",
          mist: "#e7e5e4",
        },
        mystical: {
          violet: "#7c5cbf",
          magenta: "#a855a1",
          gold: "#c9a227",
          teal: "#2d8a8a",
          indigo: "#5b5ea6",
        },
      },
      buttons: {
        reveal: "btn-reveal px-10 py-4 text-[10px] tracking-[0.25em] uppercase",
        ghost: "px-6 py-2 text-sm hover:bg-accent hover:text-foreground transition-all duration-300 rounded-md",
        textLink:
          "text-sm text-muted-foreground hover:text-tarot-violet transition-all border-b border-transparent hover:border-tarot-violet",
      },
      frames: {
        tarotCard: "aspect-[2/3] bg-card border-2 border-[color]/50 overflow-hidden relative",
        dottedFrame: "border-2 border-dashed border-border rounded-lg bg-card/20",
      },
      motion: {
        intentionalPace: "duration-[800ms] cubic-bezier(0.34, 1.56, 0.64, 1)",
        hover: "hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(124,92,191,0.3)]",
        ripple: "transition-all will-change-transform",
      },
      tarotArchetypes: tarotCards,
    }

    const dataStr = JSON.stringify(styleguideData, null, 2)
    const blob = new Blob([dataStr], { type: "application/json; charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "miracle-the-g-styleguide.json"
    link.click()
    URL.revokeObjectURL(url)
  }

  const exportSection = (sectionName: string, sectionData: any) => {
    const dataStr = JSON.stringify(
      {
        version: "1.0",
        brand: "Miracle The G",
        section: sectionName,
        exportedAt: new Date().toISOString(),
        data: sectionData,
      },
      null,
      2,
    )
    const blob = new Blob([dataStr], { type: "application/json; charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${sectionName.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const CopyButton = ({ code, id }: { code: string; id: string }) => (
    <button
      onClick={() => copyToClipboard(code, id)}
      className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur border border-border rounded-md hover:bg-accent transition-all duration-300 opacity-0 group-hover:opacity-100"
      title="Copy code"
    >
      {copiedItem === id ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
    </button>
  )

  return (
    <div className="relative">
      <Navigation />
      <main className="relative z-10 min-h-screen">
        <section className="container mx-auto px-4 md:px-6 max-w-4xl pt-28 md:pt-32 pb-20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-12">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl mb-2 text-balance">Brand Styleguide</h1>
              <p className="text-sm md:text-base text-foreground/60">Miracle The G Design System</p>
            </div>
            <button
              onClick={exportStyleguide}
              className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 text-xs md:text-sm bg-accent text-foreground rounded-lg hover:bg-accent/90 transition-colors whitespace-nowrap"
            >
              <Download size={16} />
              Export
            </button>
          </div>

          <section className="mb-16">
            <h2 className="font-serif text-2xl md:text-3xl mb-8 text-balance">Typography</h2>
            <div className="space-y-8">
              <div>
                <div className="mb-8">
                  <h3 className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-2">Display</h3>
                  <p className="font-serif text-5xl mb-4">Playfair Display</p>
                  <p className="text-muted-foreground font-light">
                    Elegant serif for headings and emphasis. Brings gravitas and timeless sophistication.
                  </p>
                </div>
                <div className="space-y-6 p-8 bg-card/50 border border-border rounded-lg backdrop-blur relative group">
                  <CopyButton code='<h1 className="font-serif text-6xl leading-tight">Transform</h1>' id="typo-hero" />
                  <div>
                    <p className="font-serif text-6xl leading-tight">Transform</p>
                    <p className="text-xs text-muted-foreground mt-2">Hero / Display</p>
                  </div>
                  <div>
                    <p className="font-serif text-3xl">Sacred Journey</p>
                    <p className="text-xs text-muted-foreground mt-2">H1 / Page Title</p>
                  </div>
                  <div>
                    <p className="font-serif text-xl italic">The path reveals itself</p>
                    <p className="text-xs text-muted-foreground mt-2">Emphasis / Quote</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-8">
                  <h3 className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-2">Body</h3>
                  <p className="font-serif text-5xl mb-4">Inter</p>
                  <p className="text-muted-foreground font-light">
                    Clean sans-serif for body text. Readable, modern, and versatile.
                  </p>
                </div>
                <div className="space-y-6 p-8 bg-card/50 border border-border rounded-lg backdrop-blur relative group">
                  <CopyButton
                    code='<p className="text-lg">Body text brings clarity to complex spiritual concepts.</p>'
                    id="typo-body"
                  />
                  <div>
                    <p className="font-serif text-6xl leading-tight">Transform</p>
                    <p className="text-xs text-muted-foreground mt-2">Hero / Display</p>
                  </div>
                  <div>
                    <p className="text-lg">Body text brings clarity to complex spiritual concepts.</p>
                    <p className="text-xs text-muted-foreground mt-2">18px / Body Large</p>
                  </div>
                  <div>
                    <p className="text-base">Standard paragraph text for descriptions and content.</p>
                    <p className="text-xs text-muted-foreground mt-2">16px / Body</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Metadata, captions, and supporting details.</p>
                    <p className="text-xs text-muted-foreground mt-2">14px / Small</p>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.3em] uppercase">Section Labels</p>
                    <p className="text-xs text-muted-foreground mt-2">10px / Label</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-2xl md:text-3xl mb-8">Monochrome Palette</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mb-12">
              {[
                { color: "#1a1a1a", name: "Ink", desc: "Deep black for text and borders", id: "color-ink" },
                { color: "#f8f6f3", name: "Paper", desc: "Primary light background", id: "color-paper" },
                { color: "#f5f2ed", name: "Warm Paper", desc: "Aged card texture", id: "color-warm" },
                { color: "#a8a29e", name: "Ash", desc: "Subtle mid-tones", id: "color-ash" },
                { color: "#e7e5e4", name: "Mist", desc: "Light gray accents", id: "color-mist" },
              ].map((item) => (
                <div key={item.name} className="group relative">
                  <CopyButton code={item.color} id={item.id} />
                  <div
                    className="h-32 rounded-lg border-2 mb-4 transition-all duration-[800ms] cubic-bezier(0.34, 1.56, 0.64, 1) group-hover:scale-105 group-hover:shadow-lg cursor-pointer relative overflow-hidden"
                    style={{
                      backgroundColor: item.color,
                      borderColor: item.color,
                      boxShadow: `0 0 0 0 ${item.color}`,
                    }}
                    onClick={() => copyToClipboard(item.color, item.id)}
                  >
                    {copiedItem === item.id && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-sm animate-in fade-in zoom-in duration-200">
                        <div className="flex flex-col items-center gap-2">
                          <Check className="w-8 h-8 text-green-500" />
                          <p className="text-xs font-medium">Copied!</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="font-medium mb-1">{item.name}</p>
                  <p className="text-xs text-muted-foreground mb-2 font-mono">{item.color}</p>
                  <p className="text-xs text-muted-foreground font-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-2xl md:text-3xl mb-8">Mystical Spectrum</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
              {[
                { color: "#7c5cbf", name: "Violet", archetype: "The Oracle", id: "color-violet" },
                { color: "#a855a1", name: "Magenta", archetype: "The Shaman", id: "color-magenta" },
                { color: "#c9a227", name: "Gold", archetype: "The Teacher", id: "color-gold" },
                { color: "#2d8a8a", name: "Teal", archetype: "The Healer", id: "color-teal" },
                { color: "#5b5ea6", name: "Indigo", archetype: "Mystery", id: "color-indigo" },
              ].map((item) => (
                <div key={item.name} className="group relative">
                  <CopyButton code={item.color} id={item.id} />
                  <div
                    className="h-32 rounded-lg border-2 mb-4 transition-all duration-[800ms] cubic-bezier(0.34, 1.56, 0.64, 1) group-hover:scale-105 group-hover:shadow-xl cursor-pointer relative overflow-hidden"
                    style={{
                      backgroundColor: item.color,
                      borderColor: item.color,
                      boxShadow: `0 0 0 0 ${item.color}`,
                    }}
                    onClick={() => copyToClipboard(item.color, item.id)}
                  >
                    {copiedItem === item.id && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-sm animate-in fade-in zoom-in duration-200">
                        <div className="flex flex-col items-center gap-2">
                          <Check className="w-8 h-8 text-green-500" />
                          <p className="text-xs font-medium">Copied!</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="font-medium mb-1">{item.name}</p>
                  <p className="text-xs text-muted-foreground mb-2 font-mono">{item.color}</p>
                  <p className="text-xs text-muted-foreground font-light">{item.archetype}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
              <h2 className="font-serif text-2xl md:text-3xl">Buttons</h2>
              <button
                onClick={() => {
                  const buttonData = [
                    { name: "Reveal", className: "btn-reveal px-10 py-4 text-[10px] tracking-[0.25em] uppercase" },
                    {
                      name: "Ghost",
                      className: "px-6 py-2 text-sm hover:bg-accent transition-all duration-300 rounded-md",
                    },
                    {
                      name: "Text Link",
                      className:
                        "text-sm hover:text-tarot-violet transition-all border-b border-transparent hover:border-tarot-violet",
                    },
                  ]
                  exportSection("Buttons", buttonData)
                }}
                className="flex items-center gap-2 px-3 md:px-4 py-2 text-xs bg-muted rounded hover:bg-muted/80 transition-colors"
              >
                <Download size={14} />
                Export
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              <div className="group relative">
                <CopyButton
                  code='className="btn-reveal px-10 py-4 text-[10px] tracking-[0.25em] uppercase"'
                  id="btn-reveal"
                />
                <button className="btn-reveal px-10 py-4 text-[10px] tracking-[0.25em] uppercase">
                  Book a Session
                </button>
              </div>
              <div className="group relative">
                <CopyButton
                  code='className="px-6 py-2 text-sm hover:bg-accent hover:text-foreground transition-all duration-300 rounded-md"'
                  id="btn-ghost"
                />
                <button className="px-6 py-2 text-sm hover:bg-accent hover:text-foreground transition-all duration-300 rounded-md">
                  Browse Services
                </button>
              </div>
              <div className="group relative">
                <CopyButton
                  code='className="text-sm hover:text-tarot-violet transition-all border-b border-transparent hover:border-tarot-violet"'
                  id="btn-text-link"
                />
                <button className="text-sm hover:text-tarot-violet transition-all border-b border-transparent hover:border-tarot-violet">
                  Read More →
                </button>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
              <h2 className="font-serif text-2xl md:text-3xl">Motion Language</h2>
              <button
                onClick={() => {
                  const motionData = [
                    {
                      name: "Bounce Transition",
                      timing: "duration-[800ms] cubic-bezier(0.34, 1.56, 0.64, 1)",
                      description: "Intentional pacing. Smooth entrance, slight bounce on arrival.",
                    },
                    {
                      name: "Glow Shadow",
                      timing: "0 0 0 0 rgba(124, 92, 191, 0.5)",
                      description: "Violet aura at 0.5 opacity. Paired with bounce transition.",
                    },
                  ]
                  exportSection("Motion Language", motionData)
                }}
                className="flex items-center gap-2 px-3 md:px-4 py-2 text-xs bg-muted rounded hover:bg-muted/80 transition-colors"
              >
                <Download size={14} />
                Export
              </button>
            </div>
            <div className="space-y-6">
              <div className="group p-8 bg-card/50 border border-border rounded-lg relative hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(124,92,191,0.3)] transition-all duration-[800ms] cursor-pointer">
                <CopyButton
                  code='className="transition-all duration-[800ms] cubic-bezier(0.34, 1.56, 0.64, 1) hover:-translate-y-2"'
                  id="motion-bounce"
                />
                <h4 className="font-serif text-lg mb-2">The Bounce Transition</h4>
                <p className="text-sm text-muted-foreground mb-4">duration-[800ms] cubic-bezier(0.34, 1.56, 0.64, 1)</p>
                <p className="text-xs text-muted-foreground font-light">
                  Intentional pacing. Smooth entrance, slight bounce on arrival. Used for hovers, reveals, and focus
                  states.
                </p>
              </div>

              <div className="group p-8 bg-card/50 border border-border rounded-lg relative hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(124, 92, 191, 0.5)] transition-all duration-[800ms] cursor-pointer">
                <CopyButton code='style={{ boxShadow: "0 0 0 0 rgba(124, 92, 191, 0.5)" }}' id="motion-glow" />
                <h4 className="font-serif text-lg mb-2">The Glow Shadow</h4>
                <p className="text-sm text-muted-foreground mb-4">Violet aura at 0.5 opacity</p>
                <p className="text-xs text-muted-foreground font-light">
                  Paired with the bounce transition for interactive elements. Creates a soft halo effect.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-12">
              <h2 className="font-serif text-2xl md:text-3xl">Sacred Archetypes</h2>
              <button
                onClick={() => {
                  const archetypeData = [
                    {
                      title: "THE HEALER",
                      image: "/images/snake-healer1.jpg",
                      color: "#8B5CF6",
                      archetype: "Snake Medicine",
                      href: "/services/healer",
                    },
                    {
                      title: "THE SHAMAN",
                      image: "/images/jaguar-shaman1.jpg",
                      color: "#6366F1",
                      archetype: "Jaguar Medicine",
                      href: "/services/shaman",
                    },
                    {
                      title: "THE ORACLE",
                      image: "/images/peacock-oracle1.jpg",
                      color: "#EC4899",
                      archetype: "Peacock Medicine",
                      href: "/services/oracle",
                    },
                    {
                      title: "THE TEACHER",
                      image: "/images/fox-teacher1.jpg",
                      color: "#F59E0B",
                      archetype: "Fox Medicine",
                      href: "/services/teacher",
                    },
                  ]
                  exportSection("Sacred Archetypes", archetypeData)
                }}
                className="flex items-center gap-2 px-3 md:px-4 py-2 text-xs bg-muted rounded hover:bg-muted/80 transition-colors"
              >
                <Download size={14} />
                Export
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 md:gap-12">
              {[
                {
                  title: "THE HEALER",
                  image: "/images/snake-healer1.jpg",
                  color: "#8B5CF6",
                  archetype: "Snake Medicine",
                  href: "/services/healer",
                  code: `{
  title: "THE HEALER",
  image: "/images/snake-healer1.jpg",
  color: "#8B5CF6",
  archetype: "Snake Medicine",
  description: "Reiki sessions and energy healing for deep restoration, pain relief, and chakra balancing.",
  href: "/services/healer"
}`,
                },
                {
                  title: "THE SHAMAN",
                  image: "/images/jaguar-shaman1.jpg",
                  color: "#6366F1",
                  archetype: "Jaguar Medicine",
                  href: "/services/shaman",
                  code: `{
  title: "THE SHAMAN",
  image: "/images/jaguar-shaman1.jpg",
  color: "#6366F1",
  archetype: "Jaguar Medicine",
  description: "Sacred plant medicine ceremonies and shamanic rituals for profound transformation and spiritual awakening.",
  href: "/services/shaman"
}`,
                },
                {
                  title: "THE ORACLE",
                  image: "/images/peacock-oracle1.jpg",
                  color: "#EC4899",
                  archetype: "Peacock Medicine",
                  href: "/services/oracle",
                  code: `{
  title: "THE ORACLE",
  image: "/images/peacock-oracle1.jpg",
  color: "#EC4899",
  archetype: "Peacock Medicine",
  description: "Psychic readings, tarot consultations, and intuitive guidance to illuminate your path forward.",
  href: "/services/oracle"
}`,
                },
                {
                  title: "THE TEACHER",
                  image: "/images/fox-teacher1.jpg",
                  color: "#F59E0B",
                  archetype: "Fox Medicine",
                  href: "/services/teacher",
                  code: `{
  title: "THE TEACHER",
  image: "/images/fox-teacher1.jpg",
  color: "#F59E0B",
  archetype: "Fox Medicine",
  description: "Medicine packages combining multiple healing modalities and Reiki training to awaken your gifts.",
  href: "/services/teacher"
}`,
                },
              ].map((card, idx) => (
                <div key={card.title} className="group">
                  <div className="mb-8 flex items-start justify-between">
                    <div>
                      <h3 className="font-serif text-2xl mb-2">{card.title}</h3>
                      <p className="text-muted-foreground font-light">{card.archetype}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(card.code, `card-${idx}`)}
                      className="p-2 bg-background/80 backdrop-blur border border-border rounded-md hover:bg-accent transition-all duration-300 opacity-0 group-hover:opacity-100"
                      title="Copy card metadata"
                    >
                      {copiedItem === `card-${idx}` ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div
                    className="relative w-full aspect-[2/3] mb-6 bg-card border-2 rounded-lg overflow-hidden"
                    style={{ borderColor: card.color }}
                  >
                    <img
                      src={card.image || "/placeholder.svg"}
                      alt={card.title}
                      className="w-full h-full object-cover opacity-60"
                      style={{
                        objectPosition: "center 45%",
                        transform: "scale(1.05)",
                      }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(to top, ${card.color}, transparent)`,
                        opacity: 0.3,
                      }}
                    />
                    <div className="absolute inset-0 flex items-end p-4">
                      <p className="font-serif text-lg" style={{ color: card.color }}>
                        {card.title}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 bg-card/50 border border-border rounded-lg font-mono text-xs overflow-auto">
                    <pre className="text-muted-foreground whitespace-pre-wrap break-words">{card.code}</pre>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </div>
  )
}
