import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CosmicBackground } from "@/components/cosmic-background"

export const metadata = {
  title: "Terms of Service | Miracle The G",
  description: "Terms of Service for Miracle The G's healing and spiritual services.",
}

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <CosmicBackground />
      <Navigation />

      <div className="relative z-10 pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-background/80 backdrop-blur-sm border border-border rounded-lg p-8 md:p-12">
            <h1 className="font-serif text-4xl md:text-5xl text-center mb-4">Terms of Service</h1>
            <p className="text-center text-muted-foreground mb-12">Last Updated: December 28, 2025</p>

            <div className="prose prose-invert prose-mystic max-w-none space-y-8">
              <section>
                <h2 className="font-serif text-2xl mb-4 text-foreground">1. Agreement to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using this website, you accept and agree to be bound by the terms and provision of
                  this agreement. This website is owned and operated by Samira Miracle, professionally known as Miracle
                  The G. The website was designed and developed by Aly Soliman of Stonefish (www.stonefish.online).
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl mb-4 text-foreground">2. Services Offered</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Miracle The G provides spiritual healing, oracle readings, shamanic work, energy healing, and
                  educational services. All services are provided for spiritual guidance and personal growth purposes.
                  These services are not a substitute for professional medical, psychological, or legal advice.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl mb-4 text-foreground">3. Use of Website</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You agree to use this website only for lawful purposes and in a way that does not infringe the rights
                  of, restrict, or inhibit anyone else's use and enjoyment of the website. Prohibited behavior includes:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Harassing or causing distress or inconvenience to any person</li>
                  <li>Transmitting obscene or offensive content</li>
                  <li>Disrupting the normal flow of dialogue within the website</li>
                  <li>Attempting to gain unauthorized access to any portion of the website</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl mb-4 text-foreground">4. Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All content on this website, including but not limited to text, graphics, logos, images, audio clips,
                  and software, is the property of Miracle The G or its content suppliers and is protected by
                  international copyright laws. The website design and development are the property of Stonefish and Aly
                  Soliman. Unauthorized use of any materials may violate copyright, trademark, and other laws.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl mb-4 text-foreground">5. Booking and Payment</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All bookings are subject to availability and confirmation. Payment terms, cancellation policies, and
                  refund policies will be communicated at the time of booking. Miracle The G reserves the right to
                  cancel or reschedule appointments with reasonable notice.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl mb-4 text-foreground">6. Disclaimer of Warranties</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The services and information provided on this website are offered "as is" without any warranty or
                  guarantee. Miracle The G makes no representations about the suitability, reliability, availability,
                  timeliness, or accuracy of the services or information provided. Spiritual and healing services are
                  highly personal and results may vary by individual.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl mb-4 text-foreground">7. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Miracle The G, Samira Miracle, Stonefish, and Aly Soliman shall not be liable for any indirect,
                  incidental, special, consequential, or punitive damages resulting from your access to or use of, or
                  inability to access or use, the services or website. You expressly agree that your use of the services
                  is at your sole risk.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl mb-4 text-foreground">8. Privacy and Data Protection</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Any personal information collected through this website will be handled in accordance with applicable
                  privacy laws. Information shared during sessions is treated as confidential. We do not sell or share
                  your personal information with third parties except as required by law.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl mb-4 text-foreground">9. External Links</h2>
                <p className="text-muted-foreground leading-relaxed">
                  This website may contain links to external websites. Miracle The G is not responsible for the content,
                  accuracy, or practices of external sites. Links are provided for convenience and do not constitute an
                  endorsement.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl mb-4 text-foreground">10. Modifications to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Miracle The G reserves the right to modify these terms at any time. Changes will be effective
                  immediately upon posting to the website. Your continued use of the website following the posting of
                  changes constitutes your acceptance of such changes.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl mb-4 text-foreground">11. Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These terms shall be governed by and construed in accordance with the laws applicable in the
                  jurisdiction where services are provided, without regard to its conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl mb-4 text-foreground">12. Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For questions about these Terms of Service, please contact Miracle The G through the contact form on
                  this website.
                </p>
              </section>

              <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
                <p>Website designed and developed by Aly Soliman of Stonefish</p>
                <a
                  href="https://www.stonefish.online"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mystic-violet hover:text-mystic-blue transition-colors"
                >
                  www.stonefish.online
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
