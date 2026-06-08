import type { Metadata } from "next";
import { generateSeoMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProfessionalProgramsClient } from "@/components/sections/ProfessionalProgramsClient";

export function generateMetadata(): Metadata {
  return generateSeoMetadata({
    title: "Professional Development Finishing School | Unique Mentors",
    description:
      "Accelerate corporate growth. Executive coaching in leadership, management, public speaking, grooming, professional etiquette, and personal branding.",
    path: "/programs/professional-development",
    keywords: [
      "professional finishing school",
      "executive grooming program",
      "leadership and management training",
      "personal branding workshops"
    ]
  });
}

export default function ProfessionalProgramsPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Programs", href: "#" },
    {
      name: "Professional Development",
      href: "/programs/professional-development",
    },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <ProfessionalProgramsClient />
    </>
  );
}
