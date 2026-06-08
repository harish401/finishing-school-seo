import { Metadata } from "next";
import { generateSeoMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import ContactClient from "./ContactClient";

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
        <ContactClient />
      </main>
    </>
  );
}
