import type {
  WithContext,
  Course as CourseSD,
  Article,
  Organization,
  BreadcrumbList,
  FAQPage,
} from "schema-dts";
import { SITE_URL, SITE_NAME } from "./constants";

// --- Type helpers for our data ---
interface CourseData {
  title: string;
  description: string;
  slug: string;
  fee: number;
  mode: string;
  duration: string;
}

interface BlogPostData {
  title: string;
  excerpt: string;
  slug: string;
  publishedAt: string;
  author?: { name: string };
  coverImage?: { url: string };
}

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Organization schema for homepage — Google Knowledge Panel
 */
export function buildOrganizationSchema(): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icons/logo.png`,
    description:
      "Unique Mentors offers skill development courses in Financial Literacy, Communication, Interview Prep, Grooming & more.",
    sameAs: [
      "https://instagram.com/uniquementors",
      "https://facebook.com/uniquementors",
      "https://linkedin.com/company/uniquementors",
      "https://youtube.com/@uniquementors",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
    },
  };
}

/**
 * Course schema for Google's Course rich result
 */
export function buildCourseSchema(course: CourseData): WithContext<CourseSD> {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    url: `${SITE_URL}/courses/${course.slug}`,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      sameAs: SITE_URL,
    },
    offers: {
      "@type": "Offer",
      price: course.fee.toString(),
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: course.mode,
      courseSchedule: {
        "@type": "Schedule",
        duration: course.duration,
      },
    },
  };
}

/**
 * Article schema for blog posts
 */
export function buildArticleSchema(post: BlogPostData): WithContext<Article> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author?.name ?? SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icons/logo.png`,
      },
    },
    ...(post.coverImage && {
      image: post.coverImage.url,
    }),
  };
}

/**
 * BreadcrumbList schema
 */
export function buildBreadcrumbSchema(
  items: BreadcrumbItem[]
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}

/**
 * FAQPage schema for course detail FAQs
 */
export function buildFaqSchema(faqs: FaqItem[]): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
