import type { Metadata } from "next";
import { generateSeoMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { SchoolProgramsClient } from "@/components/sections/SchoolProgramsClient";

export function generateMetadata(): Metadata {
  return generateSeoMetadata({
    title: "School Student Finishing School Programs | Unique Mentors",
    description:
      "Transformational finishing school training for school students. Boost confidence, leadership, public speaking, communication, and time management skills.",
    path: "/programs/schools",
    keywords: [
      "finishing school for kids",
      "finishing school for school students",
      "youth leadership program",
      "personality development for students"
    ]
  });
}

export default function SchoolProgramsPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Programs", href: "#" },
    { name: "School Programs", href: "/programs/schools" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <SchoolProgramsClient />
    </>
  );
}
