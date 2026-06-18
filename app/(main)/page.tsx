import type { Metadata } from "next";
import { generateSeoMetadata } from "@/lib/seo";
import { buildHomepageSchema } from "@/lib/structured-data";
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
    title: "Unique Mentors - Finishing School in Kochi, Kerala",
    description:
      "Unique Mentors is a finishing school in Kochi, Kerala offering communication, interview prep, grooming, financial literacy, etiquette, leadership, and career readiness programs.",
    path: "/",
    keywords: [
      "Unique Mentors Kochi",
      "Unique Mentors Kerala",
      "best finishing school",
      "finishing school india",
      "finishing school kerala",
      "finishing school kochi",
      "youth finishing school",
      "finishing school courses",
    ],
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
  const homepageSchema = buildHomepageSchema();

  return (
    <>
      <JsonLd data={homepageSchema} />
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
