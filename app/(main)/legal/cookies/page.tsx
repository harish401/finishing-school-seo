import { Metadata } from "next";
import { generateSeoMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = generateSeoMetadata({
  title: "Cookie Policy",
  description: "Cookie Policy detailing how we use cookies and tracking tools on the Unique Mentors educational platform.",
  path: "/legal/cookies",
});

export default function CookiesPage() {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Cookie Policy", href: "/legal/cookies" },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      
      <main className="min-h-screen bg-background font-[family-name:var(--font-body)] py-12 md:py-20">
        <div className="container-main max-w-4xl mx-auto px-4">
          
          <div className="space-y-4 mb-10 text-center md:text-left">
            <span className="chip">LEGAL DOCUMENT</span>
            <h1 className="font-[family-name:var(--font-heading)] font-extrabold text-4xl text-on-surface tracking-tight leading-tight">
              Cookie Policy
            </h1>
            <p className="text-on-surface-variant text-sm font-medium">Last Updated: May 26, 2026</p>
          </div>

          <div className="bg-surface-container-lowest p-6 sm:p-10 rounded-2xl border border-outline-variant/20 shadow-md prose prose-slate max-w-none text-on-surface-variant space-y-6">
            
            <section className="space-y-3">
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-on-surface">
                1. What Are Cookies?
              </h2>
              <p className="leading-relaxed">
                Cookies are small text files stored on your computer or mobile device when you visit websites. They are widely used to make websites work or perform more efficiently, as well as to provide reporting data.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-on-surface">
                2. How We Use Cookies
              </h2>
              <p className="leading-relaxed">
                We use both first-party and third-party cookies on our platform:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Essential Cookies:</strong> Necessary for the website to function. They handle authentication, access control, and database query transactions.</li>
                <li><strong>Performance/Analytics Cookies:</strong> Help us understand how visitors interact with our website, measuring bounce rates, pages visited, and traffic channels (e.g. Google Analytics).</li>
                <li><strong>Functionality Cookies:</strong> Remember your preferences (e.g., dark mode settings, form presets) for a personalized session.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-on-surface">
                3. Managing Preferences
              </h2>
              <p className="leading-relaxed">
                You can manage cookie settings directly using our cookie consent banner or by adjusting browser configurations. Most browsers allow you to reject all cookies or choose specific sites. Note that disabling essential cookies may impact platform features.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-on-surface">
                4. Policy Updates
              </h2>
              <p className="leading-relaxed">
                We may update this policy periodically to reflect operational, legislative, or administrative changes. Check back occasionally to stay informed.
              </p>
            </section>

          </div>

        </div>
      </main>
    </>
  );
}
