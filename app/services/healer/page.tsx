import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ServicePageContent } from "@/components/services/service-page-content"
import { GalaxyCarousel } from "@/components/services/galaxy-carousel"
import { EnergyWorkCarousel } from "@/components/services/energy-work-carousel"
import { ServicesImageCarousel } from "@/components/services/services-image-carousel"

export const metadata = {
  title: "THE HEALER - In-Person Healing Services | Miracle The G",
  description:
    "Experience transformative in-person Reiki sessions, energy healing, and chakra balancing with certified Reiki Master Samira.",
}

const healerData = {
  title: "THE HEALER",
  subtitle: "In-Person Healing Services",
  image: "/images/snake-healer1.jpg",
  practitionerImage: "/images/samira-portrait.png",
  backgroundPattern: "",
  description:
    "The Healer represents the gentle yet powerful art of hands-on energy work. Through Reiki and intuitive healing touch, blockages are released, pain is eased, and your body's natural healing abilities are activated.",
  longDescription: `As a certified Reiki Master with over 10 years of experience, Samira channels universal life force energy to restore balance and harmony to your physical, emotional, and spiritual bodies.

Each session is tailored to your unique needs, whether you're seeking relief from chronic pain, emotional release, stress reduction, or simply a deeper connection to your inner peace. The healing room is a sacred sanctuary where transformation happens naturally.`,
  benefits: [
    "Release physical tension and chronic pain",
    "Clear energetic blockages in your chakras",
    "Reduce stress, anxiety, and emotional overwhelm",
    "Accelerate recovery from illness or surgery",
    "Deepen your connection to spiritual guidance",
    "Experience profound relaxation and peace",
  ],
  offerings: [
    {
      name: "First Timer",
      duration: "In-Person: 2 hrs | Online: 1.5 hrs",
      price: "In-Person: $185 | Online: $150",
      bookingUrl: {
        inPerson:
          "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/55705100/calendar/2793889",
        online:
          "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/41922605/calendar/2793889",
      },
      description: "Extended initial session to understand your needs and provide comprehensive healing.",
    },
    {
      name: "Follow Up",
      duration: "In-Person: 1.5 hrs | Online: 1.5 hrs",
      price: "In-Person: $135 | Online: $115",
      bookingUrl: {
        inPerson:
          "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/84367980/calendar/2793889",
        online:
          "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/84367946/calendar/2793889",
      },
      description: "Continued healing work building on your previous session.",
    },
    {
      name: "Referral",
      duration: "In-Person: 1.5 hrs | Online: 1.5 hrs",
      price: "In-Person: $135 | Online: $125",
      bookingUrl: {
        inPerson:
          "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/84368259/calendar/2793889",
        online:
          "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/84368240/calendar/2793889",
      },
      description: "Special rate for clients referred by existing clients.",
    },
    {
      name: "Friends & Family",
      duration: "In-Person: 1.5 hrs | Online: 1.5 hrs",
      price: "In-Person: $120 | Online: $88",
      bookingUrl: {
        inPerson:
          "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/75678482/calendar/2793889",
        online:
          "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/75678573/calendar/2793889",
      },
      description: "Discounted rate for close friends and family members.",
    },
    {
      name: "Bundle Pack of 3",
      duration: "In-Person: 2.5 hrs | Online: 2.5 hrs",
      price: "In-Person: $500 | Online: $375",
      bookingUrl: {
        inPerson:
          "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/75678293/calendar/2793889",
        online:
          "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/12316131/calendar/2793889",
      },
      description: "A transformative series for sustained healing with significant savings.",
    },
  ],
  testimonial: {
    text: "After just one session with Samira, the chronic back pain I'd had for years began to dissolve. Her energy is warm, nurturing, and incredibly powerful. I've never experienced anything like it.",
    author: "Sarah M.",
    location: "Los Angeles, CA",
  },
  bookingUrl: {
    inPerson:
      "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/55705100/calendar/2793889",
    online:
      "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/41922605/calendar/2793889",
  },
}

export default function HealerPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <GalaxyCarousel>
        <ServicePageContent {...healerData} />
        <ServicesImageCarousel />
        <EnergyWorkCarousel />
      </GalaxyCarousel>
      <Footer />
    </main>
  )
}
