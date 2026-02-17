import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ServicePageContent } from "@/components/services/service-page-content"
import { GalaxyCarousel } from "@/components/services/galaxy-carousel"

export const metadata = {
  title: "THE TEACHER - Reiki Training & Education | Miracle The G",
  description: "Learn Reiki healing and spiritual practices through certification courses taught by Master Samira.",
}

const teacherData = {
  title: "THE TEACHER",
  subtitle: "Reiki Training & Spiritual Education",
  image: "/images/fox-teacher1.jpg",
  description:
    "The Teacher illuminates the path for others, sharing sacred knowledge and empowering students to develop their own healing gifts. This path is for those called to learn, grow, and eventually share with others.",
  longDescription: `Samira is passionate about passing on the healing arts to the next generation of practitioners. Her teaching style blends traditional Usui Reiki lineage with practical, modern application.

Whether you're seeking personal development or preparing to become a professional practitioner, Samira's courses provide comprehensive training, hands-on practice, and ongoing mentorship. Many of her students have gone on to build thriving healing practices of their own.

Stay tuned for upcoming online and in-person group classes where you can learn alongside a community of like-minded seekers. Group sessions offer a powerful collective energy and make sacred teachings more accessible.`,
  benefits: [
    "Learn to heal yourself and others",
    "Receive official Reiki certification",
    "Develop your intuitive abilities",
    "Join a supportive community of practitioners",
    "Access ongoing mentorship and guidance",
    "Build a foundation for a healing practice",
  ],
  offerings: [
    {
      name: "Reiki Level One - Private Class - Online",
      duration: "2-day intensive",
      price: "$250",
      bookingUrl:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/84369782/calendar/2793889",
      description: "Foundation training in Reiki healing, self-practice, and basic techniques via online class.",
    },
    {
      name: "Reiki Level Two - Private Class - Online",
      duration: "2-day intensive",
      price: "$350",
      bookingUrl:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/84369818/calendar/2793889",
      description: "Advanced symbols, distance healing, and preparation for professional practice online.",
    },
    {
      name: "Reiki Level Three - Private Class - Online",
      duration: "3-day intensive",
      price: "$700",
      bookingUrl:
        "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c/category/X19hbGxfXw%3D%3D/appointment/84369850/calendar/2793889",
      description: "Master-level training, attunement process, and teaching certification conducted online.",
    },
  ],
  testimonial: {
    text: "The Reiki training I received from Samira was exceptional. She's not only a master healer but an incredible teacher. I now practice daily and have started offering sessions to others.",
    author: "David K.",
    location: "Miami, FL",
  },
  bookingUrl: "https://thegoddessofmiraclesschedule.as.me/schedule/8d3e856c",
}

export default function TeacherPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <GalaxyCarousel>
        <ServicePageContent {...teacherData} />
      </GalaxyCarousel>
      <Footer />
    </main>
  )
}
