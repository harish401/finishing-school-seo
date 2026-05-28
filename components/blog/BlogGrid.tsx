import { BlogCard } from "./BlogCard";
import type { BlogCardData } from "@/types";

interface BlogGridProps {
  posts: BlogCardData[];
}

export function BlogGrid({ posts }: BlogGridProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-on-surface-variant text-lg font-[family-name:var(--font-body)]">
          No blog posts found.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}
