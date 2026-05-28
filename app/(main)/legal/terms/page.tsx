import { Metadata } from "next";
import { generateSeoMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = generateSeoMetadata({
  title: "Terms and Conditions",
  description: "Terms and Conditions for using the Unique Mentors Finishing School website and educational platform.",
  path: "/legal/terms",
});

export default function TermsPage() {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Terms and Conditions", href: "/legal/terms" },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      
      <main className="min-h-screen bg-background font-[family-name:var(--font-body)] py-12 md:py-20">
        <div className="container-main max-w-4xl mx-auto px-4">
          
          <div className="space-y-4 mb-10 text-center md:text-left">
            <span className="chip">LEGAL DOCUMENT</span>
            <h1 className="font-[family-name:var(--font-heading)] font-extrabold text-4xl text-on-surface tracking-tight leading-tight">
              Terms &amp; Conditions
            </h1>
            <p className="text-on-surface-variant text-sm font-medium">Last Updated: May 26, 2026</p>
          </div>

          <div className="bg-surface-container-lowest p-6 sm:p-10 rounded-2xl border border-outline-variant/20 shadow-md prose prose-slate max-w-none text-on-surface-variant space-y-6">
            
            <section className="space-y-3">
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-on-surface">
                1. Acceptance of Terms
              </h2>
              <p className="leading-relaxed">
                Welcome to Unique Mentors (&quot;Finishing School&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;). By accessing our website, platform, courses, or services, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please do not use our services.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-on-surface">
                2. Use of Platform &amp; Intellectual Property
              </h2>
              <p className="leading-relaxed">
                All content, course materials, lectures, designs, videos, software, and proprietary learning methodologies provided by Unique Mentors are the intellectual property of Unique Mentors or its content providers.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You are granted a limited, personal, non-transferable license to access course materials for your educational growth.</li>
                <li>You may not copy, record, republish, distribute, or sell any of our proprietary educational materials without written authorization.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-on-surface">
                3. Enrollments, Fees &amp; Payments
              </h2>
              <p className="leading-relaxed">
                Enrollment in programs is subject to eligibility criteria. Course fees must be paid in advance or as per approved payment plans.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>All payments are processed securely through accredited gateways.</li>
                <li>Refund policies are course-specific and detailed in the respective enrollment contract. Generally, once a course starts, fees are non-refundable.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-on-surface">
                4. Student Code of Conduct
              </h2>
              <p className="leading-relaxed">
                As a finishing school aiming to breed professional leaders, we expect the highest standards of etiquette, academic integrity, and respectful behavior toward mentors, staff, and fellow students. Any harassment, academic dishonesty, or policy violations can lead to suspension from the program without refund.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-on-surface">
                5. Limitation of Liability
              </h2>
              <p className="leading-relaxed">
                While we strive to maximize student outcomes, professional readiness and finishing courses do not guarantee employment, placements, or specific income results. Unique Mentors will not be liable for any direct or indirect damages resulting from the use of our services.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-on-surface">
                6. Contact Information
              </h2>
              <p className="leading-relaxed">
                For questions regarding these terms, please contact us at <a href="mailto:legal@uniquementors.com" className="text-primary font-semibold hover:underline">legal@uniquementors.com</a>.
              </p>
            </section>

          </div>

        </div>
      </main>
    </>
  );
}
