"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqCategories = [
  {
    title: "General Questions",
    faqs: [
      {
        question: "What should I expect during my first session?",
        answer:
          "Your first session will begin with a brief consultation where we discuss your intentions, any concerns, and what you hope to achieve. I'll explain the process, answer any questions, and create a comfortable environment for your healing experience. Whether it's Reiki, a reading, or another service, you'll be guided every step of the way.",
      },
      {
        question: "Do I need to prepare anything before my appointment?",
        answer:
          "For most sessions, simply come with an open mind and comfortable clothing. Avoid heavy meals or alcohol beforehand. For plant medicine ceremonies, there are specific dietary and lifestyle preparations we'll discuss during your consultation. I'll send detailed instructions before your appointment.",
      },
      {
        question: "How many sessions will I need?",
        answer:
          "This varies depending on your goals and what you're working through. Some clients experience significant shifts in a single session, while others benefit from ongoing work. After your first session, I'll provide personalized recommendations. There's never any pressure to book additional sessions.",
      },
      {
        question: "Do you offer virtual/distance sessions?",
        answer:
          "Yes! Many services including Reiki, tarot readings, and consultations can be done effectively at a distance. Energy is not limited by physical space. Virtual sessions are conducted via video call, and many clients report equally powerful experiences.",
      },
    ],
  },
  {
    title: "Reiki & Energy Healing",
    faqs: [
      {
        question: "What is Reiki and how does it work?",
        answer:
          "Reiki is a Japanese energy healing technique that promotes relaxation and healing by channeling universal life force energy through the practitioner's hands. It works on the physical, emotional, mental, and spiritual levels to restore balance and activate your body's natural healing abilities.",
      },
      {
        question: "Will I feel anything during a Reiki session?",
        answer:
          "Experiences vary from person to person. Common sensations include warmth, tingling, waves of relaxation, or emotional release. Some people see colors or have vivid imagery. Others simply feel deeply peaceful. There's no 'right' way to experience Reiki — trust whatever arises for you.",
      },
      {
        question: "Is Reiki a religious practice?",
        answer:
          "No, Reiki is not affiliated with any religion. It's a spiritual practice that can complement any belief system. People of all faiths (and no faith) can benefit from and practice Reiki. It simply works with the universal life force energy that flows through all living things.",
      },
      {
        question: "Can Reiki help with physical ailments?",
        answer:
          "Reiki is a complementary practice that can support physical healing by reducing stress, promoting relaxation, and supporting your body's natural healing processes. While it's not a replacement for medical treatment, many clients report reduced pain, faster recovery, and improved overall well-being.",
      },
    ],
  },
  {
    title: "Readings & Intuitive Services",
    faqs: [
      {
        question: "How accurate are your readings?",
        answer:
          "While no reader can claim 100% accuracy, my readings are known for their specificity and relevance. I provide information as I receive it and encourage you to take what resonates and leave what doesn't. The most valuable readings are those that empower you to make your own decisions.",
      },
      {
        question: "Can you predict the future?",
        answer:
          "I can see potential paths and likely outcomes based on current energies, but the future is not fixed. You have free will, and your choices shape your path. Readings are best used as guidance tools to help you make informed decisions, not as absolute predictions.",
      },
      {
        question: "What if I receive information I don't want to hear?",
        answer:
          "I always deliver messages with compassion and care. If challenging information comes through, it's shared as guidance, not doom. Remember, awareness of potential challenges gives you the power to navigate them wisely. I'm here to empower, not frighten.",
      },
    ],
  },
  {
    title: "Medicine Ceremonies",
    faqs: [
      {
        question: "Are plant medicine ceremonies legal?",
        answer:
          "The legal status of plant medicines varies by location and substance. I only facilitate ceremonies that comply with local laws and regulations. During our consultation, we'll discuss all legal and safety considerations specific to your situation and location.",
      },
      {
        question: "How do I know if I'm ready for a ceremony?",
        answer:
          "Readiness involves mental, physical, and spiritual preparation. During our required pre-ceremony consultation, we'll assess your readiness together. Not everyone is a candidate for this work, and I take responsibility for ensuring participants are truly prepared.",
      },
      {
        question: "What support is available after the ceremony?",
        answer:
          "Integration is a crucial part of the ceremonial experience. I offer integration sessions to help you process insights and ground your experience. You'll also receive resources and ongoing support as you integrate the wisdom received during ceremony.",
      },
    ],
  },
  {
    title: "Booking & Policies",
    faqs: [
      {
        question: "What is your cancellation policy?",
        answer:
          "I understand that life happens. Cancellations made 48+ hours in advance receive a full refund or credit. Cancellations within 48 hours may be subject to a 50% fee. No-shows forfeit the full session fee. For ceremonies, special policies apply due to the extensive preparation involved.",
      },
      {
        question: "Do you offer payment plans?",
        answer:
          "Yes, payment plans are available for packages and training programs. Please inquire during booking, and we'll find an arrangement that works for your situation. Healing should be accessible, and I'm committed to working with those who are genuinely called to this work.",
      },
      {
        question: "How do I book a session?",
        answer:
          "You can book directly through our online scheduling system (SimplyBook.me), or reach out via the contact form for custom arrangements. For medicine ceremonies and training programs, please contact us first for a consultation before booking.",
      },
    ],
  },
]

export function FAQContent() {
  return (
    <section className="py-12 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {faqCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
            >
              <h2 className="font-serif text-2xl text-gold mb-6">{category.title}</h2>

              <Accordion type="single" collapsible className="space-y-3">
                {category.faqs.map((faq, faqIndex) => (
                  <AccordionItem
                    key={faqIndex}
                    value={`${categoryIndex}-${faqIndex}`}
                    className="bg-card/50 backdrop-blur-sm border border-border rounded-xl px-6 data-[state=open]:border-gold/50"
                  >
                    <AccordionTrigger className="text-left text-foreground hover:text-gold hover:no-underline py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
