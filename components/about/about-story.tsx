"use client"

import { motion } from "framer-motion"

export function AboutStory() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* My Calling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              It is my inherited connection to the psychic realm that always guided me along my own healing journey.
              After many years of experiencing and witnessing miraculous events transpire in my own life and in the
              lives of others, I knew this was my calling.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The guidance I now offer is a combination of many natural healing modalities with ancient healing
              medicines. This work is not always easy, but I&apos;ve seen it set so many people free in mind, body,
              spirit and soul. There&apos;s no way I can imagine my life without the blessing to share what I do with
              the world as needed.
            </p>
          </motion.div>

          {/* Why I Do What I Do */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
              Why I Do <span className="text-gold">What I Do</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Experience has made it clear to me that we all have our own divine mission to fulfill here on earth if we
              should choose to. It was that realization that made my personal mission quite clear to me and has been the
              fuel to my fire ever since.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Witnessing the consciousness of an individual&apos;s mind, heart and soul expand as they blossom into
              their true identity is the most beautiful aspect of the work that I do. With each connection, my devotion
              to my work deepens.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              By having the gift to be the mirror reflection for those seeking to truly see and embrace themselves, I
              intend to shift collective consciousness into vibrations of global harmony, higher levels of conscious
              awareness, holistic integrity, and genuine community.
            </p>
          </motion.div>

          {/* Ancestral Gifts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
              Ancestral <span className="text-gold">Gifts</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              As far back as we can remember, the women in my family have all had the gift of sight along with a few
              variations of healing modalities specific to each of us individually. So far I have connected the most to
              the natural gifts of my grandmothers from both my maternal and paternal lineages, which includes my
              ability to work very intuitively with essential oils, herbs, healing touch, foresight and dream
              interpretation.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              This leaves me with a cultured mix of Indo-Caribbean and South American healing arts and practices passed
              down for many generations.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              After many moons of healing deep ancestral trauma, these gifts become more available to me, which has led
              me down the path of teaching others how to naturally reclaim their own magickal ancestral inheritances.
              Learning for myself was only the beginning, I intend to teach these modalities with honor and integrity
              for many generations to come.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
