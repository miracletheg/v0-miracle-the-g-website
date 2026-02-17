"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Quote } from "lucide-react"

const allTestimonials = [
  {
    name: "Randolph",
    location: "London, UK",
    text: "I'm just going to share a quick testimony about my experience with Samira. So it was the very first time for me to do a Reiki session and this Reiki session with Samira was informative, it was eye opening and it really showed me a lot about myself. And not only that, she also shared with me ways to improve on areas that she found that really need improving on and for that I am forever grateful. So I encourage you, if you're looking to bare yourself from the inside out, Samira is the real deal.",
    service: "Reiki Healing",
  },
  {
    name: "Latoya",
    location: "Toronto, ON",
    text: "If you believe that the universe conspires to bring certain people into your life then you know exactly what I'm talking about! I met Samira at a time when I was sort of looking for a bit of direction in my life and trust me! From the moment that I messaged her inquiring about her services, to the day of my session she made it such a smooth and easy process. The day of my session she welcomed me with the biggest warmest hug of a lifetime. She had me within that moment! The warmth, the genuineness, the sincerity, everything emanating from this girl was just so pure! Moving on to the session, the atmosphere, the sunlight the crystals, the vegetation, the whole set up was a vibe! It was a vibe and I was able to be so open and ready to let go and to allow her to work her healing magic on me. It was beautiful! Now if you're ever in need of a Reiki session hit up my girl! The most beautiful, genuine, loving soul you'll ever meet!",
    service: "Reiki Healing",
  },
  {
    name: "Gabriel",
    location: "Toronto, ON",
    text: "I would definitely recommend Samira, I found her session was very relaxing and insightful. There's nothing to lose in trying it so you might as well try it, because you never know what it could do for you!",
    service: "Reiki Session",
  },
  {
    name: "Temi",
    location: "Toronto, ON",
    text: "Samira is a one of a kind being spiritual therapist. A session with her can be easily described as gentle, warm, intense, honest and very grounding. She has been a friend and a trusted spiritual advisor of mine for at least 6 yrs now, every session I've had with her up to date has immaculately manifested itself. I always remain open and able to receive authentic powerful messages/downloads with her assistance. Sessions with her is truly spiritual therapy for me. It reminds me that that the truth isn't always pretty but its damn sure crucial to our spiritual growth. Thank you.",
    service: "Spiritual Therapy",
  },
  {
    name: "Omie",
    location: "Costa Rica",
    text: "I was very fortunate to have Samira, her beautiful presence and energy grace my home, and the work we did together left me feeling really wonderful and clear and open and shining. She gave me some incredible information too, that allowed me to take that energy and keep with me and at the same time protect myself. She truly activated the healer within me and it was a great experience. And when she left my home, it was a clearing energy that I had in my house as well. It wasn't just something that I felt within me but it was also something I felt within my home. Keep doing this beautiful wonderful work! I love you!",
    service: "Healing Session",
  },
  {
    name: "Rebecca",
    location: "Montreal, QC",
    text: 'Samira knew where certain things in my life had caused the most pain. Without divulging any fine details about my life, Samira just knew the certain "themes" that surrounded my pain. She went in depth about the healing work she had done on all seven of my chakras. Further, she also gave me advice and other things I could do to heal the chakras that were so blocked. Overall, it was truly a magical experience – life-changing I would say! After my session, I found the strength and courage to do certain things in my life that I wouldn\'t have known otherwise I needed to do!',
    service: "Reiki Healing",
  },
  {
    name: "Francesca",
    location: "New York",
    text: "Hi everyone! I just wanted to share a little bit about my experience with Samira and doing distance Reiki healing. There may be some skepticism about doing things in a distance capacity but for me, I have reaped all of the benefits that I would feel in person. I leave every single session feeling lighter, more clear, and more connected to my body. And I have a bigger and clearer understand about things that I need to change in order to make a larger shift in my life. We started working at a distance capacity because at the time I was caring for my mom in New York. So it was too difficult for me to arrange anything in person because I wasn't in the country and since then I've maintained I guess our distance relationship and it's been wonderful! The shift that I've noticed in my life and the gifts that she's given me just keep on giving! So if you're hesitant, take this as your sign to try and see what opens up for you.",
    service: "Distance Reiki",
  },
]

const services = [
  "All Services",
  "Reiki Healing",
  "Reiki Session",
  "Spiritual Therapy",
  "Healing Session",
  "Distance Reiki",
]

export function TestimonialsGrid() {
  const [filter, setFilter] = useState("All Services")

  const filteredTestimonials =
    filter === "All Services" ? allTestimonials : allTestimonials.filter((t) => t.service === filter)

  return (
    <section className="py-12 relative">
      <div className="container mx-auto px-6 md:px-4">
        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mb-12 px-2 md:px-0"
        >
          {services.map((service) => (
            <button
              key={service}
              onClick={() => setFilter(service)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                filter === service
                  ? "bg-gold text-cosmic-deep font-medium"
                  : "bg-card/50 text-muted-foreground hover:text-foreground border border-border hover:border-gold/50"
              }`}
            >
              {service}
            </button>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-2 md:px-0">
          {filteredTestimonials.map((testimonial, index) => (
            <motion.div
              key={`${testimonial.name}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-5 md:p-6 hover:border-gold/30 transition-colors"
            >
              <Quote className="h-8 w-8 text-gold/30 mb-4" />

              <p className="text-foreground mb-4 leading-relaxed">&ldquo;{testimonial.text}&rdquo;</p>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
                <span className="text-xs text-gold bg-gold/10 px-2 py-1 rounded-full">{testimonial.service}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
