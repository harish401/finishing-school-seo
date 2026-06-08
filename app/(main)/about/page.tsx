import type { Metadata } from "next";
import { generateSeoMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { AboutPageClient } from "@/components/sections/AboutPageClient";

export function generateMetadata(): Metadata {
  return generateSeoMetadata({
    title: "About Our Finishing School | Unique Mentors",
    description:
      "Learn about Unique Mentors, a premier finishing school and medical licensure guidance center founded by Dr. Deepa Seira Babu & Dr. Praveena Prathapachandran.",
    path: "/about",
    keywords: [
      "about unique mentors",
      "finishing school founders",
      "finishing school vision",
      "career guidance institute"
    ]
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
