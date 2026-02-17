import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ServicePageContent } from "@/components/services/service-page-content"
import { GalaxyCarousel } from "@/components/services/galaxy-carousel"

export const metadata = {
  title: "THE ORACLE - Psychic Readings & Tarot | Miracle The G",
  description:
    "Receive intuitive guidance, tarot readings, and psychic insights to illuminate your path and empower your decisions.",
}

const oracleData = {
  title: "THE ORACLE",
  subtitle: "Psychic Readings & Intuitive Guidance",
  image: "/images/peacock-oracle1.jpg",
  practitionerImage: "/images/tarot-reading.jpeg",
  backgroundPattern: "",
  description:
    "The Oracle sees beyond the veil, bringing messages from spirit and insight into the unseen forces shaping your life. Through tarot, mediumship, and pure intuition, clarity emerges from confusion.",
  longDescription: `From childhood, Samira has possessed the gift of sight — the ability to perceive information beyond the five senses. Over the years, she has honed this natural ability through dedicated practice and spiritual development.

Whether you're seeking guidance on a specific situation, hoping to connect with loved ones who have passed, or simply curious about what the cards reveal, Samira's readings offer profound insight delivered with compassion and clarity. Her accuracy has left countless clients amazed and empowered.`,
  benefits: [
    "Gain clarity on confusing situations or decisions",
    "Receive messages from loved ones in spirit",
    "Understand the energies influencing your life",
    "Uncover hidden opportunities and challenges",
    "Validate your own intuitive knowing",
    "Feel empowered to move forward with confidence",
  ],
  offerings: [
    {
      name: "Mini Reading",
      duration: "30 minutes",
      price: "$65",
      bookingUrl:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/9252796/calendar/2793889",
      description: "Quick tarot reading focused on a single question or immediate guidance.",
    },
    {
      name: "Deep Dive Reading",
      duration: "1 hour",
      price: "$90",
      bookingUrl:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/9252799/calendar/2793889",
      description: "In-depth card reading focused on your questions and current life circumstances.",
    },
    {
      name: "Year Ahead Reading",
      duration: "90 minutes",
      price: "$175",
      bookingUrl:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/55705395/calendar/2793889",
      description: "Comprehensive look at the themes, opportunities, and guidance for your coming year.",
    },
    {
      name: "Past Life Reading",
      duration: "1 hour",
      price: "$111",
      bookingUrl:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/55705484/calendar/2793889",
      description: "Explore past life connections and karmic patterns influencing your current journey.",
    },
    {
      name: "Mediumship Reading",
      duration: "90 minutes",
      price: "$150",
      bookingUrl:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/84369450/calendar/2793889",
      description: "Connect with loved ones in spirit and receive their messages of love and guidance.",
    },
    {
      name: "Bundle Pack",
      duration: "12 sessions (45 min each)",
      price: "$780",
      bookingUrl:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/75678788/calendar/2793889",
      description: "Ongoing guidance and support with significant savings for committed seekers.",
    },
  ],
  testimonial: {
    text: "I was skeptical about tarot, but Samira's accuracy left me speechless. She described situations she couldn't have known about. Her insights helped me make a major life decision with confidence.",
    author: "Jennifer L.",
    location: "Austin, TX",
  },
  bookingUrl:
    "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/9252796/calendar/2793889",
}

export default function OraclePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <GalaxyCarousel>
        <ServicePageContent {...oracleData} />
      </GalaxyCarousel>
      <Footer />
    </main>
  )
}
