import type { Metadata } from "next";
import { generateSeoMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { CollegeProgramsClient } from "@/components/sections/CollegeProgramsClient";

export function generateMetadata(): Metadata {
  return generateSeoMetadata({
    title: "College Graduate Finishing School Programs | Unique Mentors",
    description:
      "Bridge the gap from campus to corporate life with finishing school courses in interview preparation, professional etiquette, resume writing, and personal financial literacy.",
    path: "/programs/colleges",
    keywords: [
      "finishing school for graduates",
      "finishing school for college students",
      "campus to corporate training",
      "employability skills program"
    ]
  });
}

export default function CollegeProgramsPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Programs", href: "#" },
    { name: "College Programs", href: "/programs/colleges" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <CollegeProgramsClient />
    </>
  );
}
