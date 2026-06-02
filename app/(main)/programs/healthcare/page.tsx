import type { Metadata } from "next";
import { generateSeoMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { HealthcareProgramsClient } from "@/components/sections/HealthcareProgramsClient";

export function generateMetadata(): Metadata {
  return generateSeoMetadata({
    title: "Overseas Medical Licensing Exam Prep & Dataflow Support",
    description:
      "Expert coaching for DHA, MOH, HAAD/DOH, and Prometric exams under founders Dr. Deepa Seira Babu & Dr. Praveena Prathapachandran. Complete Dataflow verification support.",
    path: "/programs/healthcare",
  });
}

export default function HealthcareProgramsPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Programs", href: "#" },
    { name: "Healthcare & Medical", href: "/programs/healthcare" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <HealthcareProgramsClient />
    </>
  );
}
