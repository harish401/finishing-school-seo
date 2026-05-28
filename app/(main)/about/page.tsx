import type { Metadata } from "next";
import { generateSeoMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { AboutPageClient } from "@/components/sections/AboutPageClient";

export function generateMetadata(): Metadata {
  return generateSeoMetadata({
    title: "About Us",
    description:
      "Learn about Unique Mentors — our mission to bridge the skill gap and empower India's youth through practical finishing school education.",
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
