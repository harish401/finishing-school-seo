import { Metadata } from "next";
import { generateSeoMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = generateSeoMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy explaining how we collect, store, and process your personal information at Unique Mentors.",
  path: "/legal/privacy",
});

export default function PrivacyPage() {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Privacy Policy", href: "/legal/privacy" },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      
      <main className="min-h-screen bg-background font-[family-name:var(--font-body)] py-12 md:py-20">
        <div className="container-main max-w-4xl mx-auto px-4">
          
          <div className="space-y-4 mb-10 text-center md:text-left">
            <span className="chip">LEGAL DOCUMENT</span>
            <h1 className="font-[family-name:var(--font-heading)] font-extrabold text-4xl text-on-surface tracking-tight leading-tight">
              Privacy Policy
            </h1>
            <p className="text-on-surface-variant text-sm font-medium">Last Updated: May 26, 2026</p>
          </div>

          <div className="bg-surface-container-lowest p-6 sm:p-10 rounded-2xl border border-outline-variant/20 shadow-md prose prose-slate max-w-none text-on-surface-variant space-y-6">
            
            <section className="space-y-3">
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-on-surface">
                1. Information We Collect
              </h2>
              <p className="leading-relaxed">
                Unique Mentors values your privacy. We collect personal data necessary to provide a high-quality educational experience:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Contact details:</strong> Name, email address, phone number, and mailing address.</li>
                <li><strong>Educational background:</strong> Current school, college, degree program, and career aspirations.</li>
                <li><strong>Payment data:</strong> Billing information and transaction histories processed securely by Razorpay.</li>
                <li><strong>Platform usage data:</strong> Browsing activity, cookies, and interactions with our web portal.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-on-surface">
                2. How We Use Your Information
              </h2>
              <p className="leading-relaxed">
                We use collected information to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Register you in requested courses and manage your student portal account.</li>
                <li>Customize mentorship programs and communicate schedules.</li>
                <li>Send important updates, receipts, certificates, and marketing newsletters (which you can opt out of).</li>
                <li>Monitor and enhance website security and performance.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-on-surface">
                3. Information Sharing &amp; Protection
              </h2>
              <p className="leading-relaxed">
                We do not sell your personal data. We only share details with trusted third parties as required to deliver our service:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Payment gateway providers (Razorpay) for secure fee transaction processing.</li>
                <li>Email service systems (Resend) for transactional alerts.</li>
                <li>Regulatory/legal bodies if required by law.</li>
              </ul>
              <p className="leading-relaxed">
                All data is encrypted in transit using industry-standard SSL and stored behind secure firewalls with database access tokens.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-on-surface">
                4. Your Rights
              </h2>
              <p className="leading-relaxed">
                You have the right to access, edit, or request the deletion of your personal data stored with us. To execute these rights, email us at <a href="mailto:privacy@uniquementors.com" className="text-primary font-semibold hover:underline">privacy@uniquementors.com</a>.
              </p>
            </section>

          </div>

        </div>
      </main>
    </>
  );
}
