import type { Metadata } from "next";
import { generateSeoMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { HealthcareProgramsClient } from "@/components/sections/HealthcareProgramsClient";

export function generateMetadata(): Metadata {
  return generateSeoMetadata({
    title: "Healthcare Finishing School & Licensure Programs | Unique Mentors",
    description:
      "Unlock global opportunities. Our healthcare finishing school offers medical licensure prep, Dataflow verification, global relocation pathways, and clinical communication workshops.",
    path: "/programs/healthcare",
    keywords: [
      "healthcare finishing school",
      "medical licensure preparation",
      "prometric exam coaching",
      "dataflow credentials verification"
    ]
  });
}

export default function HealthcareProgramsPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Programs", href: "#" },
    { name: "Healthcare Career Programs", href: "/programs/healthcare" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <HealthcareProgramsClient />
    </>
  );
}
