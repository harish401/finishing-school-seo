"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, GraduationCap, Sparkles } from "lucide-react";
import { buildBreadcrumbSchema } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { CourseFilter } from "@/components/courses/CourseFilter";
import { CourseGrid } from "@/components/courses/CourseGrid";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { CourseCardData } from "@/types";

/* ── High-Fidelity Mock Courses Fallback ── */
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
    thumbnail: { url: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800", alt: "Communication Mastery" },
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
    thumbnail: { url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800", alt: "Financial Literacy" },
  },
  {
    id: "3",
    title: "Interview Prep Bootcamp",
    slug: "interview-prep-bootcamp",
    description:
      "Crack any interview with mock sessions, resume building, and body language coaching.",
    category: "college",
    fee: 2999,
    originalFee: 4999,
    duration: "4 weeks",
    mode: "online",
    featured: true,
    thumbnail: { url: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=800", alt: "Interview Prep" },
  },
  {
    id: "4",
    title: "Personality Development for Schools",
    slug: "personality-development-schools",
    description:
      "A holistic program covering confidence building, etiquette, and leadership for school students.",
    category: "school",
    fee: 1999,
    duration: "4 weeks",
    mode: "offline",
    thumbnail: { url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800", alt: "Personality Development" },
  },
  {
    id: "5",
    title: "Professional Grooming & Etiquette",
    slug: "professional-grooming-etiquette",
    description:
      "Learn corporate dressing, dining etiquette, and professional behaviour from industry experts.",
    category: "professional",
    fee: 3999,
    originalFee: 5999,
    duration: "3 weeks",
    mode: "offline",
    thumbnail: { url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800", alt: "Professional Grooming" },
  },
  {
    id: "6",
    title: "Healthcare Communication Skills",
    slug: "healthcare-communication-skills",
    description:
      "Specialized communication training for healthcare professionals — patient interaction, empathy building, and clinical communication.",
    category: "healthcare",
    fee: 5999,
    duration: "6 weeks",
    mode: "hybrid",
    thumbnail: { url: "https://images.unsplash.com/photo-1576091160550-2173ff9e5eb4?auto=format&fit=crop&q=80&w=800", alt: "Healthcare Communication" },
  },
  {
    id: "7",
    title: "Future Leaders Program",
    slug: "future-leaders-program",
    description: "A transformational program designed to develop confidence, leadership abilities, communication skills, and a growth mindset among school students.",
    category: "school",
    fee: 1999,
    originalFee: 2999,
    duration: "4 weeks",
    mode: "offline",
    thumbnail: { url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800", alt: "Future Leaders Program" },
  },
  {
    id: "8",
    title: "Career Awareness Program",
    slug: "career-awareness-program",
    description: "Helps students explore career opportunities and make informed educational and professional choices.",
    category: "school",
    fee: 1499,
    originalFee: 2499,
    duration: "3 weeks",
    mode: "online",
    thumbnail: { url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800", alt: "Career Awareness Program" },
  },
  {
    id: "9",
    title: "Study Skills & Productivity Program",
    slug: "study-skills-productivity-program",
    description: "Designed to help students improve academic performance through effective learning techniques.",
    category: "school",
    fee: 1299,
    originalFee: 1999,
    duration: "3 weeks",
    mode: "online",
    thumbnail: { url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800", alt: "Study Skills & Productivity Program" },
  },
  {
    id: "10",
    title: "Communication & Confidence Building Program",
    slug: "communication-confidence-building-program",
    description: "Enhances communication skills and self-confidence for academic and personal success.",
    category: "school",
    fee: 1799,
    originalFee: 2799,
    duration: "4 weeks",
    mode: "hybrid",
    thumbnail: { url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800", alt: "Communication & Confidence Building Program" },
  },
  {
    id: "11",
    title: "Campus to Corporate Program",
    slug: "campus-to-corporate-program",
    description: "Prepares students to transition successfully from academic life to professional careers.",
    category: "college",
    fee: 3499,
    originalFee: 4999,
    duration: "6 weeks",
    mode: "hybrid",
    thumbnail: { url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800", alt: "Campus to Corporate Program" },
  },
  {
    id: "12",
    title: "Financial Literacy Program",
    slug: "financial-literacy-program",
    description: "Provides practical knowledge for managing personal finances and building financial security.",
    category: "college",
    fee: 2499,
    originalFee: 3999,
    duration: "4 weeks",
    mode: "online",
    thumbnail: { url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800", alt: "Financial Literacy Program" },
  },
  {
    id: "13",
    title: "Resume & Interview Preparation Program",
    slug: "resume-interview-preparation-program",
    description: "Equips students with essential skills to secure internships and employment opportunities.",
    category: "college",
    fee: 1999,
    originalFee: 2999,
    duration: "4 weeks",
    mode: "online",
    thumbnail: { url: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=800", alt: "Resume & Interview Preparation Program" },
  },
  {
    id: "14",
    title: "Leadership Development Program",
    slug: "leadership-development-program",
    description: "Develops leadership qualities necessary for academic, professional, and personal growth.",
    category: "college",
    fee: 2999,
    originalFee: 4500,
    duration: "5 weeks",
    mode: "hybrid",
    thumbnail: { url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800", alt: "Leadership Development Program" },
  },
  {
    id: "15",
    title: "Healthcare Career Discovery Program",
    slug: "healthcare-career-discovery-program",
    description: "Introduces students and graduates to diverse healthcare career opportunities.",
    category: "healthcare",
    fee: 3999,
    originalFee: 5999,
    duration: "4 weeks",
    mode: "online",
    thumbnail: { url: "https://images.unsplash.com/photo-1576091160550-2173ff9e5eb4?auto=format&fit=crop&q=80&w=800", alt: "Healthcare Career Discovery Program" },
  },
  {
    id: "16",
    title: "Global Healthcare Career Program",
    slug: "global-healthcare-career-program",
    description: "Provides guidance on international healthcare careers and migration pathways.",
    category: "healthcare",
    fee: 6999,
    originalFee: 9999,
    duration: "8 weeks",
    mode: "hybrid",
    thumbnail: { url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800", alt: "Global Healthcare Career Program" },
  },
  {
    id: "17",
    title: "Healthcare Licensure Exam Readiness Program",
    slug: "healthcare-licensure-exam-readiness-program",
    description: "Guides healthcare professionals through licensing examinations and registration processes.",
    category: "healthcare",
    fee: 7999,
    originalFee: 11999,
    duration: "10 weeks",
    mode: "online",
    thumbnail: { url: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800", alt: "Healthcare Licensure Exam Readiness Program" },
  },
  {
    id: "18",
    title: "Healthcare Employability Excellence Program",
    slug: "healthcare-employability-excellence-program",
    description: "Focuses on employability skills required for healthcare professionals.",
    category: "healthcare",
    fee: 4999,
    originalFee: 7499,
    duration: "6 weeks",
    mode: "hybrid",
    thumbnail: { url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800", alt: "Healthcare Employability Excellence Program" },
  },
  {
    id: "19",
    title: "International Healthcare Career Guidance",
    slug: "international-healthcare-career-guidance",
    description: "Provides personalized guidance for healthcare professionals planning international careers.",
    category: "healthcare",
    fee: 2999,
    originalFee: 4999,
    duration: "2 weeks",
    mode: "online",
    thumbnail: { url: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=800", alt: "International Healthcare Career Guidance" },
  },
  {
    id: "20",
    title: "Leadership & Management",
    slug: "leadership-management",
    description: "Develop effective leadership and managerial competencies.",
    category: "professional",
    fee: 5499,
    originalFee: 7999,
    duration: "6 weeks",
    mode: "hybrid",
    thumbnail: { url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800", alt: "Leadership & Management" },
  },
  {
    id: "21",
    title: "Communication Excellence",
    slug: "communication-excellence",
    description: "Communicate effectively in professional environments.",
    category: "professional",
    fee: 3999,
    originalFee: 5999,
    duration: "4 weeks",
    mode: "online",
    thumbnail: { url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800", alt: "Communication Excellence" },
  },
  {
    id: "22",
    title: "Grooming & Professional Etiquette",
    slug: "grooming-professional-etiquette",
    description: "Develop a polished and professional personal brand.",
    category: "professional",
    fee: 2999,
    originalFee: 4499,
    duration: "3 weeks",
    mode: "offline",
    thumbnail: { url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800", alt: "Grooming & Professional Etiquette" },
  },
  {
    id: "23",
    title: "Career Advancement Coaching",
    slug: "career-advancement-coaching",
    description: "Accelerate professional growth and career progression.",
    category: "professional",
    fee: 5999,
    originalFee: 8999,
    duration: "4 weeks",
    mode: "online",
    thumbnail: { url: "https://images.unsplash.com/photo-1521791136368-1a8682707636?auto=format&fit=crop&q=80&w=800", alt: "Career Advancement Coaching" },
  },
  {
    id: "24",
    title: "Personal Branding & Networking",
    slug: "personal-branding-networking",
    description: "Build a strong professional identity and network for long-term career success.",
    category: "professional",
    fee: 4499,
    originalFee: 6499,
    duration: "4 weeks",
    mode: "hybrid",
    thumbnail: { url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800", alt: "Personal Branding & Networking" },
  },
];

export default function CoursesPage() {
  const [courses, setCourses] = useState<CourseCardData[]>(mockCourses);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeMode, setActiveMode] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      if (!isSupabaseConfigured || !supabase) {
        console.info("[COURSES LAYER] Supabase unconfigured. Operating in mock fallback mode.");
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("courses")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          const mappedCourses: CourseCardData[] = data.map((item: any) => ({
            id: item.id,
            title: item.title,
            slug: item.slug,
            description: item.description,
            category: item.category,
            fee: Number(item.fee),
            originalFee: item.original_fee ? Number(item.original_fee) : undefined,
            duration: item.duration,
            mode: item.mode,
            thumbnail: { url: item.image_url, alt: item.title },
          }));
          setCourses(mappedCourses);
        } else {
          console.info("[COURSES LAYER] Supabase query returned 0 active courses. Retaining mock data.");
        }
      } catch (err) {
        console.error("[COURSES FETCH ERROR] Failed to fetch from Supabase:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
  ]);

  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      activeCategory === "all" || course.category === activeCategory;
    const matchesMode = activeMode === "all" || course.mode === activeMode;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesMode && matchesSearch;
  });
  const featuredCount = courses.filter((course) => course.featured).length;
  const categoryCount = new Set(courses.map((course) => course.category)).size;

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <section className="relative overflow-hidden bg-[#fffaf5]">
        <div className="absolute inset-0 bg-[radial-gradient(#e21b2f_1px,transparent_1px)] opacity-[0.06] [background-size:22px_22px] pointer-events-none" />
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#dbeafe]/80 blur-3xl pointer-events-none" />
        <div className="absolute -right-24 top-48 h-80 w-80 rounded-full bg-[#fff1e5] blur-3xl pointer-events-none" />

        <div className="container-main relative z-10 max-w-7xl py-12 md:py-20">
          <div className="grid gap-8 lg:grid-cols-[0.62fr_0.38fr] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-[8px] border border-[#f0c8bc] bg-white/86 px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-[#e21b2f] shadow-sm backdrop-blur">
                <Sparkles className="h-4 w-4" />
                Our Courses
              </span>
              <h1 className="mt-5 max-w-5xl font-heading text-4xl font-black leading-[1.03] tracking-tight text-[#251324] text-balance sm:text-5xl lg:text-7xl">
                Skill-building programs with a clear next step.
              </h1>
              <p className="mt-5 max-w-3xl text-base font-semibold leading-relaxed text-[#6c5a6c] sm:text-lg">
                Browse image-led program tracks for school students, college
                graduates, healthcare aspirants, and young professionals.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] bg-[#e21b2f] px-6 py-3 text-sm font-extrabold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#b91525]"
                >
                  Talk to an Advisor
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#course-list"
                  className="inline-flex min-h-12 items-center justify-center rounded-[8px] border border-[#f0c8bc] bg-white/90 px-6 py-3 text-sm font-extrabold text-[#251324] shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white"
                >
                  Explore Programs
                </a>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {[
                {
                  icon: BookOpenCheck,
                  value: courses.length,
                  label: "active modules",
                },
                {
                  icon: GraduationCap,
                  value: categoryCount,
                  label: "learner tracks",
                },
                {
                  icon: Sparkles,
                  value: featuredCount || 3,
                  label: "featured picks",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="rounded-[8px] border border-[#eadbea] bg-white/86 p-4 shadow-sm backdrop-blur"
                  >
                    <Icon className="h-5 w-5 text-[#e21b2f]" />
                    <p className="mt-3 font-heading text-3xl font-black leading-none text-[#251324]">
                      {item.value}
                    </p>
                    <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-[#7b697b]">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            id="course-list"
            className="mt-12 rounded-[8px] border border-[#eadbea] bg-white/88 p-4 shadow-sm backdrop-blur-md sm:p-6"
          >
            <CourseFilter
              activeCategory={activeCategory}
              activeMode={activeMode}
              onCategoryChange={setActiveCategory}
              onModeChange={setActiveMode}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              courses={courses}
            />
          </div>

          <div className="mt-10">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-[#e21b2f]" />
                <p className="mt-4 text-sm font-semibold text-[#6c5a6c]">Loading courses...</p>
              </div>
            ) : (
              <CourseGrid courses={filteredCourses} />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
