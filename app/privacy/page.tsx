import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CosmicBackground } from "@/components/cosmic-background"

export const metadata = {
  title: "Privacy Policy | Miracle The G",
  description: "Privacy Policy for Miracle The G's healing and spiritual services.",
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <CosmicBackground />
      <Navigation />

      <div className="relative z-10 pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-background/80 backdrop-blur-sm border border-border rounded-lg p-8 md:p-12">
            <h1 className="font-serif text-4xl md:text-5xl text-center mb-4">Privacy Policy</h1>
            <p className="text-center text-muted-foreground mb-12">Last Updated: December 28, 2025</p>

            <div className="prose prose-invert prose-mystic max-w-none space-y-8">
              <section>
                <h2 className="font-serif text-2xl mb-4 text-foreground">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  This Privacy Policy describes how Miracle The G (Samira Miracle) collects, uses, and protects your
                  personal information when you use our website and services. This website was designed and developed by
                  Aly Soliman of Stonefish (www.stonefish.online). We are committed to protecting your privacy and
                  handling your data in an open and transparent manner.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl mb-4 text-foreground">2. Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Name and contact information (email address, phone number)</li>
                  <li>Booking and appointment details</li>
                  <li>Information shared during consultation sessions</li>
                  <li>Payment and billing information</li>
                  <li>Communication preferences and correspondence with us</li>
                  <li>Any other information you choose to provide</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl mb-4 text-foreground">3. How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">We use the information we collect to:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process your bookings and appointments</li>
                  <li>Send you appointment confirmations and reminders</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Send you newsletters and updates (with your consent)</li>
                  <li>Comply with legal obligations and protect our rights</li>
                  <li>Detect, prevent, and address technical issues or fraudulent activity</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl mb-4 text-foreground">4. Cookies and Tracking Technologies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our website uses cookies and similar tracking technologies to enhance your browsing experience,
                  analyze site traffic, and understand where our visitors are coming from. You can control cookies
                  through your browser settings. Please note that disabling cookies may affect the functionality of
                  certain features on our website.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl mb-4 text-foreground">5. Third-Party Services</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use third-party services to help us operate our business, including:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>
                    <strong>Acuity Scheduling:</strong> For appointment booking and scheduling management
                  </li>
                  <li>
                    <strong>Notion:</strong> For content management and blog post storage
                  </li>
                  <li>
                    <strong>Payment Processors:</strong> For secure payment processing
                  </li>
                  <li>
                    <strong>Email Service Providers:</strong> For sending communications
                  </li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  These third parties have access to your personal information only to perform specific tasks on our
                  behalf and are obligated not to disclose or use it for any other purpose.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl mb-4 text-foreground">6. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We take reasonable measures to protect your personal information from unauthorized access, disclosure,
                  alteration, or destruction. However, no internet transmission is ever fully secure or error-free.
                  Please keep this in mind when disclosing any information online.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl mb-4 text-foreground">7. Confidentiality of Sessions</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Information shared during healing sessions, readings, and consultations is treated with the utmost
                  confidentiality. We do not share session content with third parties unless required by law or with
                  your explicit consent.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl mb-4 text-foreground">8. Data Retention</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We retain your personal information for as long as necessary to fulfill the purposes outlined in this
                  Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer
                  need your information, we will securely delete or anonymize it.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl mb-4 text-foreground">9. Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">You have the right to:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate or incomplete information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Object to or restrict certain processing of your information</li>
                  <li>Withdraw consent where we rely on consent to process your information</li>
                  <li>Opt-out of marketing communications at any time</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  To exercise any of these rights, please contact us through the contact form on this website.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl mb-4 text-foreground">10. Children's Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our services are not directed to individuals under the age of 18. We do not knowingly collect personal
                  information from children. If you believe we have collected information from a child, please contact
                  us immediately.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl mb-4 text-foreground">11. International Data Transfers</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your information may be transferred to and processed in countries other than your country of
                  residence. These countries may have data protection laws that are different from the laws of your
                  country. We ensure appropriate safeguards are in place to protect your information.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl mb-4 text-foreground">12. Changes to This Privacy Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                  new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this
                  Privacy Policy periodically for any changes.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl mb-4 text-foreground">13. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us
                  through the contact form on this website or at opalineopulenceinc@gmail.com.
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
