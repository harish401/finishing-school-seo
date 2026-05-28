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
}: SeoProps): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage =
    image ?? `${SITE_URL}/api/og?title=${encodeURIComponent(title)}`;

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
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
