import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ServicePageContent } from "@/components/services/service-page-content"
import { GalaxyCarousel } from "@/components/services/galaxy-carousel"
import { MedicineList } from "@/components/services/medicine-list"

export const metadata = {
  title: "THE SHAMAN - Medicine Ceremonies | Miracle The G",
  description:
    "Experience sacred plant medicine ceremonies and shamanic healing rituals guided by experienced practitioner Samira.",
}

const shamanData = {
  title: "THE SHAMAN",
  subtitle: "Medicine Ceremonies & Shamanic Healing",
  image: "/images/jaguar-shaman1.jpg",
  practitionerImage: "/images/healing-session.png",
  backgroundPattern: "",
  description:
    "The Shaman walks between worlds, facilitating profound transformation through sacred plant medicine ceremonies and ancient healing rituals. This path is for those ready to face their shadows and emerge renewed.",
  longDescription: `Samira has trained extensively with indigenous healers and medicine keepers, earning the honor of facilitating sacred ceremonies that have been practiced for thousands of years.

These experiences are not for the faint of heart. They require courage, surrender, and a genuine desire for transformation. Under Samira's expert guidance, you will be held in a safe, sacred container as the medicine does its work, revealing what needs to be healed and illuminating your path forward.`,
  benefits: [
    "Release deep-seated trauma and emotional wounds",
    "Gain profound spiritual insights and clarity",
    "Connect with ancestral wisdom and guidance",
    "Break free from limiting patterns and beliefs",
    "Experience ego dissolution and rebirth",
    "Deepen your relationship with the sacred",
  ],
  offerings: [
    {
      name: "Free Consultation Call",
      duration: "30 minutes",
      price: "Free",
      bookingUrl:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/30723986/calendar/2793889",
      description: "Required pre-ceremony session to discuss intentions, preparation, and ensure you're ready.",
    },
    {
      name: "Bufo Journey",
      duration: "3 hours 30 minutes",
      price: "$350",
      bookingUrl:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/20195426/calendar/2793889",
      description: "One-on-one ceremony experience with full support and integration guidance tailored to your needs.",
    },
    {
      name: "Bufo Group Journey",
      duration: "3 hours 30 minutes",
      price: "$1,250",
      bookingUrl:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/20195523/calendar/2793889",
      description: "Shared ceremonial experience with a small, intimate group of seekers in sacred space.",
    },
    {
      name: "Kambo Journey",
      duration: "3 hours 30 minutes",
      price: "$260",
      bookingUrl:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/24449218/calendar/2793889",
      description: "Immersive healing retreats combining ceremonies, integration, and transformative practices.",
    },
    {
      name: "Kambo Group Journey",
      duration: "3 hours",
      price: "$888",
      bookingUrl:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/24449348/calendar/2793889",
      description: "Post-journey integration session to ground your insights.",
    },
    {
      name: "Integration Call",
      duration: "30 minutes",
      price: "$50", // Updated price to $50 as per latest menu
      bookingUrl:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/25682660/calendar/2793889",
      description: "Post-journey integration session to ground your insights.",
    },
  ],
  testimonial: {
    text: "The ceremony Samira facilitated was the most profound spiritual experience of my life. Her presence was grounding and her guidance was impeccable. I found healing I'd been seeking for decades.",
    author: "Michael R.",
    location: "New York, NY",
  },
  bookingUrl:
    "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/30723986/calendar/2793889",
}

export default function ShamanPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <GalaxyCarousel>
        <ServicePageContent {...shamanData} />
        <MedicineList />
      </GalaxyCarousel>
      <Footer />
    </main>
  )
}
