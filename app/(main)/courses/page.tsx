"use client";

import { useState, useEffect } from "react";
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

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <section className="section-padding bg-surface relative overflow-hidden">
        {/* Abstract blueprint grid background decoration */}
        <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#2563eb_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-[30rem] h-[30rem] bg-primary/3 rounded-full blur-3xl pointer-events-none" />

        <div className="container-main max-w-7xl mx-auto px-4 py-12 md:py-20 relative z-10">
          <div className="text-center">
            <span className="chip mb-4">OUR COURSES</span>
            <h1 className="font-heading font-extrabold text-4xl tracking-tight text-on-surface md:text-5xl">
              Skill-Building Courses for{" "}
              <span className="bg-gradient-to-r from-primary to-primary-dim bg-clip-text text-transparent">Every Stage</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-on-surface-variant leading-relaxed">
              From school students to working professionals — choose the right
              course to accelerate your personal and professional growth.
            </p>
          </div>

          <div className="mt-12 bg-surface-container-lowest/80 backdrop-blur-md p-6 rounded-3xl border border-outline-variant/15 shadow-sm">
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
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                <p className="mt-4 text-sm text-on-surface-variant font-semibold">Loading courses...</p>
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

