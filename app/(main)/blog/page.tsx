"use client";

import { useState, useEffect } from "react";
import { buildBreadcrumbSchema } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { BlogCardData } from "@/types";

/* ── High-Fidelity Mock Blog Posts Fallback ── */
const mockPosts: BlogCardData[] = [
  {
    id: "1",
    title: "5 Public Speaking Tips That Actually Work",
    slug: "5-public-speaking-tips",
    excerpt:
      "Struggling with stage fright? These five practical tips from our trainers will help you speak confidently in any setting.",
    category: "Communication",
    publishedAt: "2026-05-15",
    coverImage: { url: "https://images.unsplash.com/photo-1475721028070-20516f1a8e94?auto=format&fit=crop&q=80&w=800", alt: "Public speaking tips" },
    author: { name: "Dr. Ananya Rao" },
    tags: ["communication", "public-speaking", "confidence"],
  },
  {
    id: "2",
    title: "Why Every 20-Something Needs Financial Literacy",
    slug: "financial-literacy-for-20s",
    excerpt:
      "Starting your career? Here's why understanding personal finance in your 20s can set you up for decades of financial freedom.",
    category: "Finance",
    publishedAt: "2026-05-10",
    coverImage: { url: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&q=80&w=800", alt: "Financial literacy" },
    author: { name: "Rajesh Kumar" },
    tags: ["finance", "investing", "career"],
  },
  {
    id: "3",
    title: "The Ultimate Guide to Cracking Campus Placements",
    slug: "cracking-campus-placements",
    excerpt:
      "A step-by-step guide covering resume building, mock interviews, and body language tips to ace your campus placement.",
    category: "Career",
    publishedAt: "2026-05-05",
    coverImage: { url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800", alt: "Campus placements guide" },
    author: { name: "Meera Iyer" },
    tags: ["interview", "placement", "career"],
  },
  {
    id: "4",
    title: "How Schools Are Adopting Finishing School Programs",
    slug: "schools-adopting-finishing-school",
    excerpt:
      "A look at how progressive schools across India are integrating life skills training into their curriculum.",
    category: "Education",
    publishedAt: "2026-04-28",
    coverImage: { url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800", alt: "Schools finishing programs" },
    author: { name: "Dr. Ananya Rao" },
    tags: ["education", "schools", "life-skills"],
  },
  {
    id: "5",
    title: "Dress to Impress: Professional Grooming 101",
    slug: "professional-grooming-101",
    excerpt:
      "First impressions matter. Learn the fundamentals of professional dressing, grooming, and body language for the workplace.",
    category: "Grooming",
    publishedAt: "2026-04-20",
    coverImage: { url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800", alt: "Professional grooming" },
    author: { name: "Meera Iyer" },
    tags: ["grooming", "professional", "workplace"],
  },
  {
    id: "6",
    title: "Building Emotional Intelligence in Students",
    slug: "emotional-intelligence-students",
    excerpt:
      "Why EQ matters more than IQ in the modern workplace, and how we can build it from a young age.",
    category: "Personal Development",
    publishedAt: "2026-04-15",
    coverImage: { url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800", alt: "Emotional intelligence" },
    author: { name: "Rajesh Kumar" },
    tags: ["emotional-intelligence", "students", "development"],
  },
];

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogCardData[]>(mockPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      if (!isSupabaseConfigured || !supabase) {
        console.info("[BLOG LAYER] Supabase unconfigured. Operating in mock fallback mode.");
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .order("published_at", { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          const mappedPosts: BlogCardData[] = data.map((item: any) => ({
            id: item.id,
            title: item.title,
            slug: item.slug,
            excerpt: item.excerpt,
            category: item.category,
            publishedAt: new Date(item.published_at).toISOString().split("T")[0],
            coverImage: { url: item.image_url, alt: item.title },
            author: { name: item.author_name, avatar: item.author_avatar ? { url: item.author_avatar } : undefined },
            tags: item.tags || [],
          }));
          setPosts(mappedPosts);
        } else {
          console.info("[BLOG LAYER] Supabase query returned 0 active blog posts. Retaining mock data.");
        }
      } catch (err) {
        console.error("[BLOG FETCH ERROR] Failed to fetch from Supabase:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <section className="section-padding bg-surface">
        <div className="container-main max-w-7xl mx-auto px-4 py-12 md:py-20">
          <div className="text-center">
            <span className="chip mb-4">OUR BLOG</span>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-on-surface md:text-5xl">
              Insights & <span className="text-primary">Resources</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-on-surface-variant">
              Expert advice on communication, career growth, financial literacy,
              and personal development from the Unique Mentors team.
            </p>
          </div>

          <div className="mt-12">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                <p className="mt-4 text-sm text-on-surface-variant font-semibold">Loading insights...</p>
              </div>
            ) : (
              <BlogGrid posts={posts} />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
