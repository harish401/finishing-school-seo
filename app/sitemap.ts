import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { supabase } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Base static routes
  const staticRoutes = [
    "",
    "/about",
    "/courses",
    "/programs/schools",
    "/programs/colleges",
    "/programs/healthcare",
    "/programs/professional-development",
    "/placements",
    "/gallery",
    "/blog",
    "/contact",
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Fetch dynamic blog routes from Supabase
  let blogRoutes: any[] = [];
  try {
    if (supabase) {
      const { data: posts } = await supabase
        .from("blogs")
        .select("slug, updated_at");
        
      if (posts) {
        blogRoutes = posts.map((post: any) => ({
          url: `${SITE_URL}/blog/${post.slug}`,
          lastModified: new Date(post.updated_at || new Date()),
          changeFrequency: "weekly" as const,
          priority: 0.6,
        }));
      }
    }
  } catch (error) {
    console.error("Sitemap failed to fetch blog routes from Supabase:", error);
  }

  return [...staticRoutes, ...blogRoutes];
}
