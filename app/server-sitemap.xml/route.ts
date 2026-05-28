import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";
import { SITE_URL } from "@/lib/constants";

export async function GET() {
  let courses: { slug: string; updatedAt?: string }[] = [];
  let posts: { slug: string; updatedAt?: string }[] = [];

  try {
    const payload = await getPayloadClient();
    
    // Fetch courses from Payload database
    const coursesRes = await payload.find({
      collection: "courses",
      where: { status: { equals: "published" } },
      limit: 100,
    });
    courses = coursesRes.docs.map((d: any) => ({
      slug: d.slug,
      updatedAt: d.updatedAt || d.createdAt,
    }));

    // Fetch blog posts
    const blogRes = await payload.find({
      collection: "blog-posts",
      where: { status: { equals: "published" } },
      limit: 100,
    });
    posts = blogRes.docs.map((d: any) => ({
      slug: d.slug,
      updatedAt: d.updatedAt || d.createdAt,
    }));
  } catch (error) {
    console.warn("Sitemap dynamically fetched skipped due to database fallback:", error);
    // Standard static fallbacks so the build doesn't break
    courses = [
      { slug: "campus-to-career" },
      { slug: "corporate-readiness" },
      { slug: "youth-leadership" },
    ];
    posts = [
      { slug: "mastering-presentation-skills" },
      { slug: "how-to-crack-hr-interview" },
      { slug: "importance-of-finishing-school" },
    ];
  }

  // Build the XML sitemap
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${courses
    .map(
      (course) => `
  <url>
    <loc>${SITE_URL}/courses/${course.slug}</loc>
    <lastmod>${course.updatedAt || new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join("")}
  ${posts
    .map(
      (post) => `
  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${post.updatedAt || new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`
    )
    .join("")}
</urlset>`;

  return new Response(sitemapXml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200",
    },
  });
}
