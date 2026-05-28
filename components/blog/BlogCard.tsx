import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import type { BlogCardData } from "@/types";
import { Clock } from "lucide-react";

interface BlogCardProps {
  post: BlogCardData;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group block rounded-xl overflow-hidden",
        "bg-surface-container-lowest",
        "shadow-sm card-lift"
      )}
    >
      {/* Cover Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {post.coverImage ? (
          <Image
            src={post.coverImage.url}
            alt={post.coverImage.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-surface-container flex items-center justify-center">
            <span className="text-on-surface-variant/40 text-4xl">📝</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category chip */}
        {post.category && (
          <span className="chip text-xs mb-3">
            {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
          </span>
        )}

        {/* Title */}
        <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-on-surface mb-2 line-clamp-2 group-hover:text-primary-container transition-colors">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-on-surface-variant line-clamp-2 mb-4 font-[family-name:var(--font-body)]">
          {post.excerpt}
        </p>

        {/* Author & Date */}
        <div className="flex items-center justify-between pt-3 border-t border-outline-variant/15">
          <div className="flex items-center gap-2">
            {post.author?.avatar ? (
              <Image
                src={post.author.avatar.url}
                alt={post.author.name}
                width={24}
                height={24}
                className="rounded-full"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-primary-light flex items-center justify-center">
                <span className="text-xs font-bold text-primary">
                  {post.author?.name?.charAt(0) ?? "U"}
                </span>
              </div>
            )}
            <span className="text-xs font-medium text-on-surface-variant">
              {post.author?.name ?? "Unique Mentors"}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-on-surface-variant/70">
            <Clock className="w-3 h-3" />
            {formatDate(post.publishedAt)}
          </div>
        </div>
      </div>
    </Link>
  );
}
