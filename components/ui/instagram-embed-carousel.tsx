"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process: () => void;
      };
    };
  }
}

interface InstagramEmbedCarouselProps {
  posts: string[];
  className?: string;
}

export function InstagramEmbedCarousel({
  posts,
  className,
}: InstagramEmbedCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const visiblePosts = useMemo(
    () => posts.filter((post) => post.includes("instagram.com/")),
    [posts]
  );
  const postsKey = visiblePosts.join("|");

  const updateScrollState = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const { scrollLeft, scrollWidth, clientWidth } = scroller;
    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 2);
  }, []);

  const handleScroll = (direction: 1 | -1) => {
    scrollerRef.current?.scrollBy({
      left: direction * 420,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    let cancelled = false;

    const processEmbeds = () => {
      if (cancelled) return;
      window.instgrm?.Embeds?.process();
    };

    if (window.instgrm?.Embeds) {
      processEmbeds();
      return () => {
        cancelled = true;
      };
    }

    let script = document.querySelector<HTMLScriptElement>(
      'script[src*="instagram.com/embed.js"]'
    );

    if (!script) {
      script = document.createElement("script");
      script.async = true;
      script.src = "https://www.instagram.com/embed.js";
      document.body.appendChild(script);
    }

    script.addEventListener("load", processEmbeds);
    const retry = window.setTimeout(processEmbeds, 1200);

    return () => {
      cancelled = true;
      script?.removeEventListener("load", processEmbeds);
      window.clearTimeout(retry);
    };
  }, [postsKey]);

  useEffect(() => {
    updateScrollState();

    const scroller = scrollerRef.current;
    if (!scroller) return;

    const observer = new ResizeObserver(updateScrollState);
    observer.observe(scroller);

    return () => observer.disconnect();
  }, [updateScrollState, visiblePosts.length]);

  if (visiblePosts.length === 0) {
    return null;
  }

  return (
    <div className={cn("relative mt-10", className)}>
      <div
        ref={scrollerRef}
        onScroll={updateScrollState}
        className="flex w-full overflow-x-auto overscroll-x-contain scroll-smooth py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex gap-5 px-1">
          {visiblePosts.map((url, index) => (
            <article
              key={url}
              className="w-[min(86vw,430px)] min-w-[300px] shrink-0 overflow-hidden rounded-[18px] border border-[#d9e8f2] bg-white shadow-xl shadow-[#0b5f99]/10"
            >
              <div className="flex items-center justify-between gap-3 border-b border-[#d9e8f2] bg-[#fffaf5] px-4 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#fff0fa] text-[#bd168e]">
                    <Instagram className="h-4.5 w-4.5" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-black uppercase tracking-[0.14em] text-[#251324]">
                      Placement post {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="truncate text-[11px] font-semibold text-[#6f5c6f]">
                      Live Instagram embed
                    </p>
                  </div>
                </div>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open placement post ${index + 1} on Instagram`}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-[#d9e8f2] bg-white text-[#0b5f99] transition-colors hover:border-[#bd168e] hover:text-[#bd168e]"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              <div className="min-h-[560px] bg-white px-0 py-4">
                <blockquote
                  className="instagram-media"
                  data-instgrm-captioned
                  data-instgrm-permalink={`${url}?utm_source=ig_embed&utm_campaign=loading`}
                  data-instgrm-version="14"
                  style={{
                    background: "#ffffff",
                    border: 0,
                    borderRadius: 12,
                    boxShadow: "none",
                    margin: "0 auto",
                    maxWidth: 540,
                    minWidth: 300,
                    padding: 0,
                    width: "100%",
                  }}
                >
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-6 py-16 text-center"
                  >
                    <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-[12px] bg-[#fff0fa] text-[#bd168e]">
                      <Instagram className="h-5 w-5" />
                    </span>
                    <span className="mt-4 block text-sm font-black text-[#251324]">
                      View this placement post on Instagram
                    </span>
                    <span className="mt-2 block text-xs font-semibold leading-relaxed text-[#6f5c6f]">
                      The original post photo and caption will load here when
                      Instagram embeds are available.
                    </span>
                  </a>
                </blockquote>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#251324] text-white transition-colors duration-200 hover:bg-[#0b5f99] disabled:opacity-35"
          onClick={() => handleScroll(-1)}
          disabled={!canScrollLeft}
          aria-label="Scroll Instagram posts left"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#251324] text-white transition-colors duration-200 hover:bg-[#0b5f99] disabled:opacity-35"
          onClick={() => handleScroll(1)}
          disabled={!canScrollRight}
          aria-label="Scroll Instagram posts right"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
