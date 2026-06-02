import type { Metadata } from "next";
import { generateSeoMetadata } from "@/lib/seo";
import { buildOrganizationSchema } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { AboutSection } from "@/components/sections/AboutSection";
import { WhyFinishingSchool } from "@/components/sections/WhyFinishingSchool";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { FeaturedCourses } from "@/components/sections/FeaturedCourses";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTASection } from "@/components/sections/CTASection";
import type { CourseCardData, TestimonialData } from "@/types";

export const revalidate = 3600;

export function generateMetadata(): Metadata {
  return generateSeoMetadata({
    title: "Overseas Medical Licensing, NEET Coaching & Dataflow Services",
    description:
      "Kerala's leading coaching center for Overseas Medical Licensing Exams (DHA, MOH, Prometric, HAAD), NEET exam preparation, Dataflow verification processing, and medical careers abroad.",
    path: "/",
  });
}

/* ── Mock data — will be replaced by Payload CMS queries ── */
const mockCourses: CourseCardData[] = [
  {
    id: "1",
    title: "Communication Mastery",
    slug: "communication-mastery",
    description:
      "Master public speaking, business communication, and interpersonal skills to stand out in any setting.",
    category: "professional",
    fee: 4999,
    originalFee: 7999,
    duration: "8 weeks",
    mode: "hybrid",
    featured: true,
    thumbnail: {
      url: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800",
      alt: "Communication Mastery course",
    },
  },
  {
    id: "2",
    title: "Financial Literacy Fundamentals",
    slug: "financial-literacy-fundamentals",
    description:
      "Learn budgeting, investing basics, and personal finance management to secure your future.",
    category: "college",
    fee: 3499,
    originalFee: 5999,
    duration: "6 weeks",
    mode: "online",
    featured: true,
    thumbnail: {
      url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800",
      alt: "Financial Literacy course",
    },
  },
  {
    id: "3",
    title: "Interview Prep Bootcamp",
    slug: "interview-prep-bootcamp",
    description:
      "Crack any interview with mock sessions, resume building, and body language coaching from industry experts.",
    category: "college",
    fee: 2999,
    originalFee: 4999,
    duration: "4 weeks",
    mode: "online",
    featured: true,
    thumbnail: {
      url: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=800",
      alt: "Interview Prep Bootcamp course",
    },
  },
];

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
      <AboutSection />
      <WhyFinishingSchool />
      <ProblemSection />
      <FeaturedCourses courses={mockCourses} />
      <Testimonials testimonials={mockTestimonials} />
      <CTASection />
    </>
  );
}
