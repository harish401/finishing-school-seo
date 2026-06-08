import { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "./constants";

interface SeoProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
  keywords?: string | string[];
}

/**
 * Generate SEO metadata for any page.
 * Handles title, OG tags, Twitter card, canonical URL, and robots directives.
 */
export function generateSeoMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  noIndex = false,
  keywords,
}: SeoProps): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage =
    image ?? `${SITE_URL}/api/og?title=${encodeURIComponent(title)}`;

  const defaultKeywords = [
    "finishing school",
    "finishing school program",
    "finishing school in India",
    "finishing school in Kerala",
    "finishing school in UAE",
    "personality development",
    "career readiness",
    "corporate etiquette",
    "communication skills",
    "confidence building",
    "public speaking",
    "leadership development"
  ];

  const mergedKeywords = keywords
    ? Array.isArray(keywords)
      ? [...new Set([...keywords, ...defaultKeywords])]
      : [...new Set([keywords, ...defaultKeywords])]
    : defaultKeywords;

  return {
    title,
    description,
    keywords: mergedKeywords,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(publishedTime && { publishedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true },
        },
  };
}
