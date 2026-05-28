"use client";

import { useState, useEffect, use } from "react";
import { buildArticleSchema, buildBreadcrumbSchema } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { formatDate } from "@/lib/utils";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { BlogCardData } from "@/types";
import { ArrowLeft, Clock, User, Tag } from "lucide-react";
import Link from "next/link";

interface BlogPostFull {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  coverImage?: { url: string; alt: string };
  author?: { name: string; avatar?: { url: string } };
  tags?: string[];
  content: string; // HTML content
}

const mockBlogPosts: Record<string, BlogPostFull> = {
  "5-public-speaking-tips": {
    title: "5 Public Speaking Tips That Actually Work",
    slug: "5-public-speaking-tips",
    excerpt:
      "Struggling with stage fright? These five practical tips from our trainers will help you speak confidently in any setting.",
    category: "Communication",
    publishedAt: "2026-05-15",
    coverImage: { url: "https://images.unsplash.com/photo-1475721028070-20516f1a8e94?auto=format&fit=crop&q=80&w=800", alt: "Public speaking tips" },
    author: { name: "Dr. Ananya Rao" },
    tags: ["communication", "public-speaking", "confidence"],
    content: `
      <p>Public speaking is consistently rated as one of the most common fears — often ranking above the fear of death. But it doesn't have to be that way. With the right techniques and practice, anyone can become a confident speaker.</p>

      <h2>1. Start Small, Build Up</h2>
      <p>Don't try to address a 500-person auditorium on day one. Start by speaking up more in meetings, then progress to small group presentations, and gradually work your way up. Each small win builds neural pathways for confidence.</p>

      <h2>2. Know Your Material Cold</h2>
      <p>The number one cause of nervousness is lack of preparation. When you know your material inside and out, your brain can focus on delivery instead of recall. Aim to rehearse at least 5 times before any important presentation.</p>

      <h2>3. Use the Power Pose</h2>
      <p>Research shows that standing in a confident posture — feet shoulder-width apart, chest open, hands on hips — for just two minutes before speaking can reduce cortisol levels and increase testosterone. Try it backstage before your next talk.</p>

      <h2>4. Connect with Your Audience</h2>
      <p>Great speakers don't talk <em>at</em> their audience — they talk <em>with</em> them. Ask questions, make eye contact with different sections of the room, and use stories that your audience can relate to.</p>

      <h2>5. Embrace the Pause</h2>
      <p>Nervous speakers tend to rush and fill silence with "um" and "uh." Instead, embrace strategic pauses. They give your audience time to absorb what you've said and make you appear more authoritative and composed.</p>

      <h2>Start Your Journey Today</h2>
      <p>At Unique Mentors, our Communication Mastery program includes live mock presentation sessions where you practice these techniques with real-time feedback from expert trainers. <a href="/courses/communication-mastery">Learn more about the program →</a></p>
    `,
  },
};

const mockRelatedPosts: BlogCardData[] = [
  {
    id: "2",
    title: "Why Every 20-Something Needs Financial Literacy",
    slug: "financial-literacy-for-20s",
    excerpt: "Starting your career? Here's why understanding personal finance matters.",
    category: "Finance",
    publishedAt: "2026-05-10",
    coverImage: { url: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&q=80&w=800", alt: "Financial literacy" },
    author: { name: "Rajesh Kumar" },
  },
  {
    id: "3",
    title: "The Ultimate Guide to Cracking Campus Placements",
    slug: "cracking-campus-placements",
    excerpt: "A step-by-step guide to ace your campus placement.",
    category: "Career",
    publishedAt: "2026-05-05",
    coverImage: { url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800", alt: "Campus placements guide" },
    author: { name: "Meera Iyer" },
  },
];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPostPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [post, setPost] = useState<BlogPostFull | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogCardData[]>(mockRelatedPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPostDetail() {
      // If Supabase not configured, load directly from mock list
      if (!isSupabaseConfigured || !supabase) {
        const localPost = mockBlogPosts[slug];
        if (localPost) {
          setPost(localPost);
        }
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .eq("slug", slug)
          .single();

        if (error) throw error;

        if (data) {
          setPost({
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt,
            category: data.category,
            publishedAt: new Date(data.published_at).toISOString().split("T")[0],
            coverImage: { url: data.image_url, alt: data.title },
            author: { name: data.author_name, avatar: data.author_avatar ? { url: data.author_avatar } : undefined },
            tags: data.tags || [],
            content: data.content,
          });

          // Fetch related posts dynamically
          const { data: related } = await supabase
            .from("blogs")
            .select("*")
            .neq("slug", slug)
            .limit(2);

          if (related && related.length > 0) {
            const mappedRelated = related.map((r: any) => ({
              id: r.id,
              title: r.title,
              slug: r.slug,
              excerpt: r.excerpt,
              category: r.category,
              publishedAt: new Date(r.published_at).toISOString().split("T")[0],
              coverImage: { url: r.image_url, alt: r.title },
              author: { name: r.author_name },
            }));
            setRelatedPosts(mappedRelated);
          }
        } else {
          // Check local mock as secondary fallback
          const localPost = mockBlogPosts[slug];
          if (localPost) setPost(localPost);
        }
      } catch (err) {
        console.error("[BLOG SLUG FETCH ERROR] Falling back to mock parameters:", err);
        const localPost = mockBlogPosts[slug];
        if (localPost) setPost(localPost);
      } finally {
        setLoading(false);
      }
    }

    fetchPostDetail();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-surface">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        <p className="mt-4 text-sm text-on-surface-variant font-semibold">Loading article details...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-surface p-4">
        <h2 className="text-2xl font-extrabold text-on-surface font-heading">Post Not Found</h2>
        <p className="text-on-surface-variant text-sm mt-2 mb-6">The requested blog article could not be located in our system.</p>
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Back to Insights
        </Link>
      </div>
    );
  }

  const articleSchema = buildArticleSchema({
    title: post.title,
    excerpt: post.excerpt,
    slug: post.slug,
    publishedAt: post.publishedAt,
    author: post.author,
    coverImage: post.coverImage,
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: post.title, href: `/blog/${post.slug}` },
  ]);

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />

      <article className="section-padding bg-surface">
        <div className="container-main max-w-7xl mx-auto px-4 py-12">
          
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs font-extrabold text-primary uppercase tracking-wider mb-8 hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Back to Insights
          </Link>

          <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
            {/* Main Content */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 md:p-10 shadow-md">
              {/* Cover Image */}
              {post.coverImage && (
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-outline-variant/30 bg-surface-container mb-8">
                  <img
                    src={post.coverImage.url}
                    alt={post.coverImage.alt || post.title}
                    className="object-cover h-full w-full"
                  />
                </div>
              )}

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-4">
                <span className="chip bg-primary/5 text-primary border border-primary/10 px-2.5 py-0.5 rounded-full">{post.category}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {formatDate(post.publishedAt)}
                </span>
                {post.author && (
                  <span className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    By {post.author.name}
                  </span>
                )}
              </div>

              <h1 className="font-heading text-3xl font-extrabold tracking-tight text-on-surface md:text-4xl leading-tight mb-6">
                {post.title}
              </h1>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8 border-b border-outline-variant/20 pb-6">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-full bg-surface-container px-3 py-1 text-xs font-bold text-on-surface-variant border"
                    >
                      <Tag className="h-3 w-3 text-primary" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Article Body */}
              <div
                className="prose prose-lg max-w-none text-on-surface prose-headings:font-heading prose-headings:font-extrabold prose-headings:text-on-surface prose-a:text-primary prose-a:font-semibold hover:prose-a:underline leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Author Card */}
              {post.author && (
                <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-6 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full border border-primary/20 bg-primary/5 text-primary font-bold flex items-center justify-center text-sm font-heading">
                      {post.author.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-heading font-extrabold text-on-surface text-base">
                        {post.author.name}
                      </p>
                      <p className="text-xs text-on-surface-variant font-bold uppercase tracking-wider mt-0.5">Verified Coach</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Related Posts */}
              <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-6 shadow-sm">
                <h3 className="font-heading text-base font-extrabold text-on-surface border-b pb-3 mb-4 uppercase tracking-wider">
                  Related Insights
                </h3>
                <div className="space-y-5">
                  {relatedPosts.map((rp) => (
                    <Link
                      key={rp.id}
                      href={`/blog/${rp.slug}`}
                      className="block group"
                    >
                      <p className="font-bold text-sm text-on-surface group-hover:text-primary transition-colors leading-snug line-clamp-2">
                        {rp.title}
                      </p>
                      <p className="mt-1.5 text-xs text-on-surface-variant font-semibold">
                        {formatDate(rp.publishedAt)}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
