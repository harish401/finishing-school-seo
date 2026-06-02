import type { Metadata } from "next";
import { generateSeoMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { CollegeProgramsClient } from "@/components/sections/CollegeProgramsClient";

export function generateMetadata(): Metadata {
  return generateSeoMetadata({
    title: "Colleges Finishing School Program",
    description:
      "Cultivating executive presence, corporate grooming, professional body language, dining etiquette, and interview preparation for collegiate young graduates and seniors.",
    path: "/programs/colleges",
  });
}

export default function CollegeProgramsPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Programs", href: "#" },
    { name: "Colleges", href: "/programs/colleges" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <CollegeProgramsClient />
    </>
  );
}
