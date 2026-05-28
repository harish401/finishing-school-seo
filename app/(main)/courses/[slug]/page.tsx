import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { generateSeoMetadata } from "@/lib/seo";
import {
  buildCourseSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { formatCurrency } from "@/lib/utils";
import { CourseGrid } from "@/components/courses/CourseGrid";
import type { CourseCardData, TrainerData } from "@/types";
import { 
  Calendar, 
  MapPin, 
  Award, 
  CheckCircle2, 
  Clock, 
  Star, 
  Users, 
  ShieldCheck, 
  UserCheck 
} from "lucide-react";

interface CurriculumStage {
  week: string;
  title: string;
  description: string;
  deliverable: string;
}

interface CourseDetail {
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  category: "school" | "college" | "healthcare" | "professional";
  fee: number;
  originalFee?: number;
  duration: string;
  mode: "online" | "offline" | "hybrid";
  thumbnail?: { url: string; alt: string };
  learningOutcomes: string[];
  highlights: string[];
  faqs: { question: string; answer: string }[];
  trainer: TrainerData;
  curriculum: CurriculumStage[];
}

const mockCourseDetails: Record<string, CourseDetail> = {
  "communication-mastery": {
    title: "Communication Mastery",
    slug: "communication-mastery",
    description:
      "Master public speaking, business communication, and interpersonal skills to stand out in any setting.",
    longDescription:
      "This comprehensive 8-week program is designed to transform you into a confident communicator. Whether you struggle with stage fright, boardroom presentations, or everyday conversations — our expert trainers will guide you through practical, hands-on sessions that build real-world skills. You'll practice with mock presentations, group discussions, and one-on-one coaching.",
    category: "professional",
    fee: 4999,
    originalFee: 7999,
    duration: "8 weeks",
    mode: "hybrid",
    thumbnail: { url: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800", alt: "Communication Mastery" },
    learningOutcomes: [
      "Deliver confident public speeches and presentations with zero anxiety",
      "Master micro-gestures, body alignment, and executive non-verbal subtext",
      "Draft high-impact professional emails, proposals, and briefs",
      "Engage effectively in high-pressure group debates and client pitches",
      "Build deep conversational rapport through dynamic active listening",
      "Overcome stage fright and speak clearly under high executive pressure",
    ],
    highlights: [
      "Mock presentation evaluation reports",
      "1-on-1 coaching with B2B experts",
      "Verified finishing school certificate",
      "Lifetime access to syllabus archives",
      "Direct placement advisory support",
    ],
    faqs: [
      {
        question: "Who is this course for?",
        answer:
          "This course is designed for college students, fresh graduates, and working professionals who want to improve their communication skills for career advancement.",
      },
      {
        question: "Is prior experience required?",
        answer:
          "No prior experience is needed. We welcome beginners and intermediate learners alike.",
      },
      {
        question: "What is the schedule?",
        answer:
          "Classes are held on weekends (Saturday & Sunday) from 10 AM to 1 PM IST, for 8 weeks.",
      },
      {
        question: "Will I get a certificate?",
        answer:
          "Yes, all students who complete the program receive a verified digital certificate.",
      },
    ],
    trainer: {
      id: "t1",
      name: "Dr. Ananya Rao",
      title: "Communication & Leadership Coach",
      bio: "With 15+ years of experience training professionals at Fortune 500 companies, Dr. Rao brings a unique blend of academic rigor and practical wisdom to every session.",
      specialties: ["Public Speaking", "Business Communication", "Leadership Presence"],
    },
    curriculum: [
      {
        week: "Weeks 1 - 2",
        title: "Foundation: Anxiety & Vocal Presence",
        description: "Overcome communication anxiety, master vocal warmups, and build baseline confidence for speaking.",
        deliverable: "Deliverable: Baseline speech recording & personal posture audit scorecard."
      },
      {
        week: "Weeks 3 - 4",
        title: "Structure: Logic & PREP Message Framing",
        description: "Structure professional explanations and arguments using the PREP (Point, Reason, Example, Point) framework.",
        deliverable: "Deliverable: Standard 2-minute executive brief writing & mock presentation."
      },
      {
        week: "Weeks 5 - 6",
        title: "Non-Verbal: Body Language & Decorum",
        description: "Align micro-expressions, open postures, micro-gestures, and professional dress codes to match B2B leadership standards.",
        deliverable: "Deliverable: Personal brand alignment audit & non-verbal video review."
      },
      {
        week: "Weeks 7 - 8",
        title: "Capstone: Boardrooms & Live Interviews",
        description: "Simulate high-stakes boardroom Q&A, handle objections, and master corporate placement interview cycles.",
        deliverable: "Deliverable: Capstone boardroom speech evaluation & verified course certificate."
      }
    ]
  },
};

const mockRelatedCourses: CourseCardData[] = [
  {
    id: "2",
    title: "Financial Literacy Fundamentals",
    slug: "financial-literacy-fundamentals",
    description: "Learn budgeting, investing basics, and personal finance management.",
    category: "college",
    fee: 3499,
    duration: "6 weeks",
    mode: "online",
    thumbnail: { url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800", alt: "Financial Literacy" },
  },
  {
    id: "3",
    title: "Interview Prep Bootcamp",
    slug: "interview-prep-bootcamp",
    description: "Crack any interview with mock sessions and resume building.",
    category: "college",
    fee: 2999,
    duration: "4 weeks",
    mode: "online",
    thumbnail: { url: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=800", alt: "Interview Prep" },
  },
];

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = mockCourseDetails[slug];

  if (!course) {
    return generateSeoMetadata({
      title: "Course Not Found",
      description: "The requested course could not be found.",
      path: `/courses/${slug}`,
    });
  }

  return generateSeoMetadata({
    title: course.title,
    description: course.description,
    path: `/courses/${slug}`,
  });
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = mockCourseDetails[slug];

  if (!course) {
    notFound();
  }

  const courseSchema = buildCourseSchema({
    title: course.title,
    description: course.description,
    slug: course.slug,
    fee: course.fee,
    mode: course.mode,
    duration: course.duration,
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: course.title, href: `/courses/${course.slug}` },
  ]);

  const faqSchema = buildFaqSchema(course.faqs);

  const defaultThumbnailUrl = "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800";

  return (
    <>
      <JsonLd data={courseSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-surface-container-low border-b border-outline-variant/20 py-20 lg:py-24">
        {/* Dynamic ambient glowing backing meshes */}
        <div className="absolute -right-40 -top-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -left-40 bottom-0 w-[400px] h-[400px] bg-primary-container/3 rounded-full blur-3xl" />

        <div className="container-main relative z-10">
          {/* Breadcrumbs link path */}
          <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant/75 mb-6 uppercase tracking-wider select-none">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/courses" className="hover:text-primary transition-colors">Courses</Link>
            <span>/</span>
            <span className="text-primary font-bold">{course.title}</span>
          </div>

          <div className="grid gap-12 lg:grid-cols-12 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-7 text-left">
              <span className="inline-flex items-center rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-primary backdrop-blur-sm select-none">
                {course.category} program
              </span>
              <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-on-surface md:text-5xl lg:text-6xl leading-[1.1]">
                {course.title}
              </h1>
              <p className="mt-6 text-base sm:text-lg text-on-surface-variant leading-relaxed font-normal">
                {course.longDescription}
              </p>

              {/* Mode & Duration Cards */}
              <div className="flex flex-wrap gap-4 mt-8 select-none">
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/20 shadow-sm text-sm font-semibold text-on-surface">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/20 shadow-sm text-sm font-semibold text-on-surface">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="capitalize">{course.mode} delivery</span>
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="mt-10 flex flex-wrap items-center gap-8">
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-on-surface-variant/80 uppercase tracking-widest mb-1 select-none">Tuition Fee</span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-black text-on-surface font-sans">
                      {formatCurrency(course.fee)}
                    </span>
                    {course.originalFee && (
                      <span className="text-lg text-on-surface-variant/65 line-through font-medium">
                        {formatCurrency(course.originalFee)}
                      </span>
                    )}
                  </div>
                </div>
                <Link
                  href={`/enroll/${course.slug}`}
                  className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold text-on-primary gradient-primary shadow-lg shadow-primary/25 transition-all duration-300 hover:opacity-95 hover:-translate-y-0.5"
                >
                  Enroll In Program
                </Link>
              </div>
            </div>

            {/* Right overlapping visual column */}
            <div className="lg:col-span-5 relative w-full h-[320px] sm:h-[380px] hidden lg:flex items-center justify-center select-none">
              {/* Decorative 3D-like floating layout backing card */}
              <div className="absolute inset-0 bg-primary/5 rounded-3xl border border-outline-variant/30 transform rotate-2 translate-x-4 translate-y-4" />
              
              <div className="relative w-full h-full rounded-3xl overflow-hidden border border-outline-variant/40 shadow-2xl bg-surface-container-lowest">
                <Image 
                  src={course.thumbnail?.url || defaultThumbnailUrl} 
                  alt={course.title} 
                  fill
                  className="object-cover opacity-95 transition-transform duration-700 hover:scale-105"
                  priority
                />
                {/* Visual mesh overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#151c27]/75 via-[#151c27]/20 to-transparent" />
                
                {/* Floating Rating Tag */}
                <div className="absolute bottom-6 left-6 right-6 z-10 flex items-center justify-between p-4 rounded-2xl bg-surface/90 backdrop-blur-md border border-white/20 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                      <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-black text-on-surface">4.9 / 5.0 Rating</p>
                      <p className="text-[10px] text-on-surface-variant">Verified student reviews</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-black text-primary">
                    <Users className="w-4 h-4" />
                    <span>500+ Graduated</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn Outcomes Grid */}
      <section className="section-padding bg-background text-on-surface">
        <div className="container-main max-w-7xl mx-auto px-4 text-center">
          <span className="chip bg-primary/10 text-primary border border-primary/20 select-none">SYLLABUS FOCUS</span>
          <h2 className="mt-4 font-heading text-3xl font-extrabold text-on-surface sm:text-4xl tracking-tight leading-tight">
            What You&apos;ll Learn
          </h2>
          <p className="mt-3 text-sm sm:text-base text-on-surface-variant max-w-xl mx-auto">
            Our learn-by-doing modules bridge the gap between classroom theory and real-world career performance.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {course.learningOutcomes.map((outcome, i) => (
              <div
                key={i}
                className="flex gap-4 rounded-2xl border border-outline-variant/15 bg-surface-container-lowest p-6 text-left transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              >
                {/* Custom list number badge */}
                <span className="text-2xl font-black font-mono tracking-tighter text-primary/30 w-8 shrink-0 mt-0.5 select-none">
                  {(i + 1).toString().padStart(2, '0')}
                </span>
                <span className="text-sm font-semibold leading-relaxed text-on-surface-variant">
                  {outcome}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Week-by-Week Curriculum Timeline */}
      {course.curriculum && course.curriculum.length > 0 && (
        <section className="section-padding bg-surface-container-low/50 border-t border-b border-outline-variant/20">
          <div className="container-main max-w-4xl mx-auto px-4 text-center">
            <span className="chip bg-primary/10 text-primary border border-primary/20 select-none">ROADMAP</span>
            <h2 className="mt-4 font-heading text-3xl font-extrabold text-on-surface sm:text-4xl tracking-tight leading-tight">
              Weekly Curriculum Details
            </h2>
            <p className="mt-3 text-sm sm:text-base text-on-surface-variant max-w-xl mx-auto">
              An 8-week structured roadmap built to systematically escalate your corporate poise and presence.
            </p>

            <div className="mt-14 relative pl-8 border-l-2 border-outline-variant/30 flex flex-col gap-8 max-w-2xl mx-auto">
              {course.curriculum.map((stage, idx) => (
                <div key={stage.week} className="relative text-left">
                  {/* Timeline bullet dot */}
                  <span className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center z-10 select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </span>

                  <div className="p-6 rounded-2xl border border-outline-variant/15 bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-mono font-black uppercase tracking-wider text-primary">
                        {stage.week}
                      </span>
                      <span className="flex items-center gap-1 text-[8px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full select-none">
                        Active Stage
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-on-surface font-[family-name:var(--font-heading)]">
                      {stage.title}
                    </h3>
                    <p className="text-xs text-on-surface-variant leading-relaxed mt-2">
                      {stage.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-on-surface-variant/80 bg-surface-container-low border border-outline-variant/10 px-3.5 py-2.5 rounded-xl">
                      <Award className="w-4 h-4 text-primary shrink-0" />
                      <span>{stage.deliverable}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Course Highlights */}
      <section className="section-padding bg-background text-on-surface">
        <div className="container-main max-w-7xl mx-auto px-4 text-center">
          <span className="chip bg-primary/10 text-primary border border-primary/20 select-none">BENEFITS</span>
          <h2 className="mt-4 font-heading text-3xl font-extrabold text-on-surface sm:text-4xl tracking-tight leading-tight">
            Program Highlights
          </h2>
          <p className="mt-3 text-sm sm:text-base text-on-surface-variant max-w-xl mx-auto">
            Beyond standard coursework — we support your personal integration with coaching, placements, and community.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-center">
            {course.highlights.map((highlight, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/15 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 text-left"
              >
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 select-none">
                  <span className="text-base font-black font-mono text-primary">{(i + 1).toString().padStart(2, '0')}</span>
                </div>
                <span className="text-sm font-bold text-on-surface-variant">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Elite Faculty Showcase Card */}
      <section className="section-padding bg-surface-container-low/50 border-t border-b border-outline-variant/20">
        <div className="container-main max-w-4xl mx-auto px-4 text-center">
          <span className="chip bg-primary/10 text-primary border border-primary/20 select-none">FACULTY</span>
          <h2 className="mt-4 font-heading text-3xl font-extrabold text-on-surface sm:text-4xl tracking-tight leading-tight">
            Faculty Spotlight
          </h2>
          <p className="mt-3 text-sm sm:text-base text-on-surface-variant max-w-xl mx-auto mb-10">
            Learn directly from seasoned corporate consultants and verified executive communication directors.
          </p>

          <div className="mt-8 flex flex-col items-start gap-8 rounded-3xl border border-outline-variant bg-surface-container-lowest p-8 md:p-10 shadow-lg md:flex-row relative overflow-hidden select-none">
            {/* Background design elements */}
            <div className="absolute right-0 top-0 w-24 h-24 bg-primary/5 rounded-bl-3xl" />

            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-outline-variant/35 shadow-md flex-shrink-0 mx-auto md:mx-0">
              <Image 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" 
                alt={course.trainer.name} 
                fill
                className="object-cover"
              />
            </div>
            
            <div className="text-center md:text-left flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mb-2">
                <h3 className="font-heading text-xl md:text-2xl font-black text-on-surface leading-tight">
                  {course.trainer.name}
                </h3>
                <span className="flex items-center gap-1 text-[8px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  <UserCheck className="w-3 h-3" />
                  Verified Lead Coach
                </span>
              </div>
              <p className="text-sm font-semibold text-primary">
                {course.trainer.title}
              </p>
              <p className="mt-4 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                {course.trainer.bio}
              </p>
              {course.trainer.specialties && (
                <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-2">
                  {course.trainer.specialties.map((s) => (
                    <span key={s} className="chip bg-surface-container-low text-on-surface-variant/80 border-outline-variant/25 text-xs font-bold font-mono px-3 py-1 rounded-md">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Details Accordion */}
      <section className="section-padding bg-background text-on-surface">
        <div className="container-main max-w-3xl mx-auto px-4">
          <span className="chip bg-primary/10 text-primary border border-primary/20 block w-fit mx-auto select-none">FAQ</span>
          <h2 className="mt-4 font-heading text-center text-3xl font-extrabold text-on-surface sm:text-4xl tracking-tight leading-tight mb-10">
            Frequently Asked Questions
          </h2>
          <div className="mt-8 space-y-4">
            {course.faqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-outline-variant/20 bg-surface-container-lowest shadow-sm overflow-hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between p-5 font-heading font-extrabold text-on-surface select-none hover:bg-surface-container-low/40 transition-colors">
                  {faq.question}
                  <svg
                    className="h-4 w-4 flex-shrink-0 text-on-surface-variant transition-transform duration-300 group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 pt-1 text-sm text-on-surface-variant leading-relaxed text-left">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related Courses */}
      <section className="section-padding bg-surface-container-low/30 border-t border-outline-variant/20">
        <div className="container-main max-w-7xl mx-auto px-4 text-center">
          <span className="chip bg-primary/10 text-primary border border-primary/20 select-none">RECOMMENDATIONS</span>
          <h2 className="mt-4 font-heading text-3xl font-extrabold text-on-surface sm:text-4xl tracking-tight leading-tight">
            You May Also Like
          </h2>
          <p className="mt-3 text-sm sm:text-base text-on-surface-variant max-w-xl mx-auto mb-12">
            Explore other dynamic career acceleration and finishing school pathways.
          </p>

          <div className="mt-8">
            <CourseGrid courses={mockRelatedCourses} />
          </div>
        </div>
      </section>
    </>
  );
}
