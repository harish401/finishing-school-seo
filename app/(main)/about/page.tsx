import type { Metadata } from "next";
import { generateSeoMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { AboutPageClient } from "@/components/sections/AboutPageClient";

export function generateMetadata(): Metadata {
  return generateSeoMetadata({
    title: "About Us",
    description:
      "Your trusted partner in transforming careers through expert training, personalized guidance, and global opportunities. Founded by Dr. Deepa Seira Babu & Dr. Praveena Prathapachandran.",
    path: "/about",
  });
}

export default function AboutPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <AboutPageClient />
    </>
  );
}
