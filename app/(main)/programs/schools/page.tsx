import type { Metadata } from "next";
import { generateSeoMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { SchoolProgramsClient } from "@/components/sections/SchoolProgramsClient";

export function generateMetadata(): Metadata {
  return generateSeoMetadata({
    title: "Schools Finishing School Program",
    description:
      "Integrating executive finishing, confidence building, emotional intelligence, financial literacy, and social etiquette directly into premier school academic curriculums.",
    path: "/programs/schools",
  });
}

export default function SchoolProgramsPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Programs", href: "#" },
    { name: "Schools", href: "/programs/schools" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <SchoolProgramsClient />
    </>
  );
}
