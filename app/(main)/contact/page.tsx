import { Metadata } from "next";
import Link from "next/link";
import { generateSeoMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { ContactForm } from "@/components/forms/ContactForm";
import { Phone, Mail, MapPin, Clock, Calendar, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = generateSeoMetadata({
  title: "Contact Us - Executive Consultation",
  description: "Connect with Unique Mentors Finishing School. Book a private career advisory session or visit our state-of-the-art Kochi campus.",
  path: "/contact",
});

export default function ContactPage() {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <main className="min-h-screen bg-background font-[family-name:var(--font-body)]">
        {/* Editorial Banner Header */}
        <section className="relative py-20 overflow-hidden bg-surface-container-low border-b border-outline-variant/20">
          {/* Dynamic ambient glowing backing meshes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-container/5 rounded-full blur-3xl" />

          <div className="container-main relative z-10 text-center max-w-4xl mx-auto px-4">
            {/* Breadcrumb Navigation Path */}
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-on-surface-variant/75 mb-6 uppercase tracking-wider select-none">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-primary font-bold">Contact Us</span>
            </div>

            <span className="chip mb-4 inline-block bg-primary/10 text-primary border border-primary/20 select-none">
              ADVISORY DESK
            </span>
            <h1 className="font-[family-name:var(--font-heading)] font-extrabold text-4xl md:text-5xl lg:text-6xl text-on-surface tracking-tight leading-[1.1]">
              Private Consultation <span className="gradient-primary bg-clip-text text-transparent">&amp; Campus Inquiries</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-on-surface-variant max-w-2xl mx-auto font-normal leading-relaxed">
              Ready to escalate your corporate poise and career readiness? Connect with our program advisors to schedule a private campus consultation or send a direct digital inquiry below.
            </p>
          </div>
        </section>

        {/* Contact Form & Info Grid */}
        <section className="section-padding container-main max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">

            {/* Left Column: Campus Directory & Operations */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-primary font-mono select-none">
                    Campus Directory
                  </span>
                  <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl md:text-3xl text-on-surface mt-2 mb-4">
                    Advisory Office
                  </h2>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    We support B2B corporate partnerships, college cohorts, and private individual career advisory consultations. Reach out through our direct lines or visit our Kochi campus.
                  </p>
                </div>

                {/* Highly Integrated Metadata Directory Panel */}
                <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6 space-y-5 shadow-sm">
                  {/* Map Address */}
                  <div className="flex gap-4 items-start text-left">
                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface select-none">Kochi Campus</h3>
                      <a
                        href="https://www.google.com/maps/place/Unique+Mentors/data=!4m2!3m1!1s0x0:0xc8f58c36b4233897?sa=X&ved=1t:2428&ictx=111"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-on-surface-variant text-xs sm:text-sm leading-relaxed hover:text-primary hover:underline transition-colors mt-1 block"
                      >
                        1st Floor, Jyothy, 62/6284A, Ernakulathappan Temple Road, near IMA blood bank, Pallimukku, Kochi, Ernakulam, Kerala 682011
                      </a>
                    </div>
                  </div>

                  <div className="h-px bg-outline-variant/10" />

                  {/* Phone & WhatsApp */}
                  <div className="flex gap-4 items-center text-left">
                    <Phone className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface select-none">Direct Advisory Line</h3>
                      <a href="tel:+9109544774599" className="text-on-surface-variant text-sm font-semibold hover:text-primary transition-colors block mt-0.5">
                        +91 09544774599
                      </a>
                    </div>
                  </div>

                  <div className="h-px bg-outline-variant/10" />

                  {/* Email */}
                  <div className="flex gap-4 items-center text-left">
                    <Mail className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface select-none">Email Inquiries</h3>
                      <a href="mailto:info@uniquementors.com" className="text-on-surface-variant text-sm font-semibold hover:text-primary transition-colors block mt-0.5">
                        info@uniquementors.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Weekly Operations Schedule Block */}
              <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6 space-y-4 shadow-sm text-left">
                <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface flex items-center gap-2 select-none">
                  <Clock className="w-4.5 h-4.5 text-primary" />
                  Office Operations
                </h4>
                <ul className="space-y-2.5 text-xs text-on-surface-variant">
                  <li className="flex justify-between items-center">
                    <span>Monday &ndash; Saturday</span>
                    <span className="font-semibold text-on-surface">9:00 AM &ndash; 6:00 PM</span>
                  </li>
                  <div className="h-px bg-outline-variant/10" />
                  <li className="flex justify-between items-center">
                    <span>Sundays &amp; Holidays</span>
                    <span className="font-bold text-primary">Closed</span>
                  </li>
                </ul>
              </div>

              {/* B2B Scheduling Instructions */}
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex gap-3 text-left">
                <Calendar className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed text-on-surface-variant">
                  <span className="font-bold text-on-surface">Appointment Scheduling:</span> Individual boardroom consultations, B2B training reviews, and student campus visits must be reserved at least 24 hours in advance.
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Inquiry Portal */}
            <div className="lg:col-span-7 bg-surface-container-lowest p-6 sm:p-10 rounded-3xl border border-outline-variant/15 shadow-xl relative overflow-hidden flex flex-col justify-between">
              {/* Background gradient design flares */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-3xl pointer-events-none" />
              
              <div className="space-y-6">
                <div className="text-left">
                  <span className="text-xs font-black uppercase tracking-widest text-primary font-mono select-none">
                    Digital Portal
                  </span>
                  <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl md:text-3xl text-on-surface mt-2 mb-2">
                    Send Us a Message
                  </h2>
                  <p className="text-on-surface-variant text-xs sm:text-sm leading-relaxed">
                    Fill out the consultation profile below. Our academic and corporate advisors typically process digital requests and reply within 24 business hours.
                  </p>
                </div>

                <div className="pt-2">
                  <ContactForm />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Kochi Map Coordinates Embed */}
        <section className="section-padding border-t border-outline-variant/20 bg-surface-container-low/60">
          <div className="container-main max-w-7xl mx-auto px-4 text-center">
            <span className="chip bg-primary/10 text-primary border border-primary/20 select-none">LOCATE US</span>
            <h2 className="mt-4 font-[family-name:var(--font-heading)] font-bold text-2xl md:text-3xl text-on-surface tracking-tight">
              Locate Our Kochi Campus
            </h2>
            <p className="text-on-surface-variant text-xs sm:text-sm mt-2 max-w-md mx-auto">
              Our campus is located in Pallimukku, Ernakulam, easily accessible from Pallimukku junction and the Ernakulam South Metro Station.
            </p>

            <div className="w-full h-[400px] rounded-3xl overflow-hidden border border-outline-variant/35 shadow-lg mt-10 relative bg-surface-container-lowest">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.6200236611086!2d76.2858852758117!3d9.965476173612803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d5b43cd77ff%3A0xc8f58c36b4233897!2sUnique%20Mentors!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Unique Mentors Kochi Campus Location"
                className="opacity-95"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
