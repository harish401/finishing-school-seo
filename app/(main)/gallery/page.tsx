"use client";

import { useState, useEffect, useMemo } from "react";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import InteractiveBentoGallery, {
  type MediaItemType,
} from "@/components/ui/interactive-bento-gallery";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

interface GalleryItem {
  id: string;
  title: string;
  category: "workshops" | "events" | "campus" | "certificates";
  aspect: "landscape" | "portrait" | "square";
  image: string;
}

// Mock gallery data fallback
const mockGalleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "Leadership Workshop 2024",
    category: "workshops",
    aspect: "landscape",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "2",
    title: "Campus Tour",
    category: "campus",
    aspect: "portrait",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "3",
    title: "Certificate Ceremony",
    category: "certificates",
    aspect: "landscape",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "4",
    title: "Communication Bootcamp",
    category: "workshops",
    aspect: "square",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "5",
    title: "Annual Day Event",
    category: "events",
    aspect: "landscape",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "6",
    title: "Interview Prep Session",
    category: "workshops",
    aspect: "portrait",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "7",
    title: "Guest Lecture Series",
    category: "events",
    aspect: "landscape",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "8",
    title: "Student Achievement Awards",
    category: "certificates",
    aspect: "square",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "9",
    title: "Group Discussion Training",
    category: "workshops",
    aspect: "landscape",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
  },
];

const categories = [
  { value: "all", label: "All" },
  { value: "workshops", label: "Workshops" },
  { value: "events", label: "Events" },
  { value: "campus", label: "Campus" },
  { value: "certificates", label: "Certificates" },
];

const categoryLabels = categories.reduce<Record<string, string>>(
  (labels, category) => {
    labels[category.value] = category.label;
    return labels;
  },
  {}
);

const bentoSpans = {
  landscape: [
    "row-span-2 sm:col-span-2 sm:row-span-3 lg:col-span-2 lg:row-span-3",
    "row-span-2 sm:col-span-1 sm:row-span-2 lg:col-span-2 lg:row-span-3",
    "row-span-2 sm:col-span-2 sm:row-span-2 lg:col-span-2 lg:row-span-3",
  ],
  portrait: [
    "row-span-3 sm:col-span-1 sm:row-span-3 lg:col-span-1 lg:row-span-4",
    "row-span-3 sm:col-span-2 sm:row-span-3 lg:col-span-1 lg:row-span-4",
  ],
  square: [
    "row-span-2 sm:col-span-1 sm:row-span-2 lg:col-span-1 lg:row-span-3",
    "row-span-2 sm:col-span-1 sm:row-span-2 lg:col-span-1 lg:row-span-2",
  ],
} satisfies Record<GalleryItem["aspect"], string[]>;

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(mockGalleryItems);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGallery() {
      if (!isSupabaseConfigured || !supabase) {
        console.info("[GALLERY LAYER] Supabase unconfigured. Operating in mock fallback mode.");
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("gallery")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          const mappedGallery: GalleryItem[] = data.map((item: any) => ({
            id: item.id,
            title: item.title,
            category: item.category,
            aspect: item.aspect || "landscape",
            image: item.image_url,
          }));
          setGalleryItems(mappedGallery);
        } else {
          console.info("[GALLERY LAYER] Supabase query returned 0 active images. Retaining mock data.");
        }
      } catch (err) {
        console.error("[GALLERY FETCH ERROR] Failed to fetch from Supabase:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchGallery();
  }, []);

  const filteredItems = useMemo(
    () =>
      galleryItems.filter((item) => {
        return activeCategory === "all" || item.category === activeCategory;
      }),
    [activeCategory, galleryItems]
  );

  const bentoItems = useMemo<MediaItemType[]>(
    () =>
      filteredItems.map((item, index) => {
        const spanOptions = bentoSpans[item.aspect] || bentoSpans.landscape;

        return {
          id: item.id,
          type: "image",
          title: item.title,
          desc: categoryLabels[item.category] ?? "Gallery",
          url: item.image,
          span: spanOptions[index % spanOptions.length],
        };
      }),
    [filteredItems]
  );

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Gallery", href: "/gallery" },
        ]}
      />

      <section className="section-padding">
        <div className="container-main max-w-7xl mx-auto px-4 py-12 md:py-20">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="chip mb-4">GALLERY</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface font-[family-name:var(--font-heading)] mb-4">
              Moments That Define Us
            </h1>
            <p className="text-lg text-on-surface-variant max-w-2xl mx-auto font-[family-name:var(--font-body)]">
              A glimpse into the transformative experiences at Unique Mentors.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`chip transition-colors cursor-pointer text-xs font-bold py-1.5 px-4 rounded-full border ${
                  activeCategory === cat.value
                    ? "bg-primary text-white border-primary"
                    : "bg-surface hover:bg-primary-container/20 text-on-surface border-outline-variant/30"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Gallery Grid Section */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
              <p className="mt-4 text-sm text-on-surface-variant font-semibold">Loading moments...</p>
            </div>
          ) : (
            <InteractiveBentoGallery mediaItems={bentoItems} />
          )}
        </div>
      </section>
    </>
  );
}
