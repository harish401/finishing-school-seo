import type { Metadata } from "next";
import { generateSeoMetadata } from "@/lib/seo";
import { buildOrganizationSchema } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { ProgramShowcase } from "@/components/sections/ProgramShowcase";
import { TrainingExperienceCarousel } from "@/components/sections/TrainingExperienceCarousel";
import { AboutSection } from "@/components/sections/AboutSection";
import { WhyFinishingSchool } from "@/components/sections/WhyFinishingSchool";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTASection } from "@/components/sections/CTASection";
import type { TestimonialData } from "@/types";

export const revalidate = 3600;

export function generateMetadata(): Metadata {
  return generateSeoMetadata({
    title: "Finishing School for Students & Professionals | Unique Mentors",
    description:
      "Unique Mentors is a premium finishing school offering activity-led programs for school students, college graduates, healthcare aspirants, and young professionals to build confidence and career readiness.",
    path: "/",
    keywords: [
      "best finishing school",
      "finishing school india",
      "finishing school kerala",
      "finishing school bangalore",
      "youth finishing school",
      "finishing school courses"
    ]
  });
}

const mockTestimonials: TestimonialData[] = [
  {
    id: "1",
    name: "Priya Sharma",
    role: "MBA Student, IIM Lucknow",
    content:
      "The finishing school program transformed my confidence. Within weeks, I was acing mock interviews and presenting in front of 200 people with ease.",
    rating: 5,
  },
  {
    id: "2",
    name: "Arjun Mehta",
    role: "Software Engineer, Infosys",
    content:
      "Financial literacy changed the way I think about money. I started investing at 23 and already see the compounding effect. Best decision ever.",
    rating: 5,
  },
  {
    id: "3",
    name: "Sneha Patel",
    role: "Class 12, DPS Bangalore",
    content:
      "I was so shy before joining the school program. Now my teachers say I'm one of the most articulate students in class. Thank you, Unique Mentors!",
    rating: 5,
  },
];

export default function HomePage() {
  const orgSchema = buildOrganizationSchema();

  return (
    <>
      <JsonLd data={orgSchema} />
      <HeroBanner />
      <ProgramShowcase />
      <TrainingExperienceCarousel />
      <AboutSection />
      <WhyFinishingSchool />
      <ProblemSection />
      <Testimonials testimonials={mockTestimonials} />
      <CTASection />
    </>
  );
}
