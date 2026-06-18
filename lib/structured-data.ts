import type {
  Thing,
  WithContext,
  Course as CourseSD,
  Article,
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

const PHONE_NUMBER = "+919544774599";
const ADDRESS = {
  streetAddress:
    "1st Floor, Jyothy, 62/6284A, Ernakulathappan Temple Road, near IMA Blood Bank, Pallimukku",
  addressLocality: "Kochi",
  addressRegion: "Kerala",
  postalCode: "682011",
  addressCountry: "IN",
};

const MAIN_NAVIGATION = [
  { name: "Contact Us", href: "/contact" },
  { name: "About Us", href: "/about" },
  { name: "Courses", href: "/courses" },
  { name: "School Programs", href: "/programs/schools" },
  { name: "College Programs", href: "/programs/colleges" },
  { name: "Healthcare Programs", href: "/programs/healthcare" },
  { name: "Placements", href: "/placements" },
  { name: "Gallery", href: "/gallery" },
];

/**
 * Organization schema for homepage — Google Knowledge Panel
 */
export function buildOrganizationSchema(): WithContext<Thing> {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: [
      "Unique Mentors Finishing School",
      "Unique Mentors Kochi",
      "Unique Mentors Kerala",
    ],
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    image: `${SITE_URL}/logo.svg`,
    description:
      "Unique Mentors is a finishing school and coaching centre in Kochi, Kerala offering activity-led training in communication, interview preparation, grooming, financial literacy, etiquette, leadership, and career readiness.",
    telephone: PHONE_NUMBER,
    email: "info@uniquementors.org",
    address: {
      "@type": "PostalAddress",
      ...ADDRESS,
    },
    areaServed: [
      { "@type": "City", name: "Kochi" },
      { "@type": "AdministrativeArea", name: "Kerala" },
      { "@type": "Country", name: "India" },
    ],
    sameAs: [
      "https://www.instagram.com/unique_mentors/",
      "https://www.facebook.com/uniquementors",
      "https://www.linkedin.com/company/uniquementors",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: PHONE_NUMBER,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi", "Malayalam"],
    },
  } as WithContext<Thing>;
}

/**
 * Homepage graph schema that connects brand, local entity, website, and
 * navigation links for stronger branded search and sitelink signals.
 */
export function buildHomepageSchema(): WithContext<Thing> {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["EducationalOrganization", "LocalBusiness"],
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        alternateName: [
          "Unique Mentors Finishing School",
          "Unique Mentors Kochi",
          "Unique Mentors Kerala",
        ],
        url: SITE_URL,
        logo: `${SITE_URL}/logo.svg`,
        image: `${SITE_URL}/logo.svg`,
        description:
          "Unique Mentors is a finishing school and coaching centre in Kochi, Kerala offering activity-led training in communication, interview preparation, grooming, financial literacy, etiquette, leadership, and career readiness.",
        telephone: PHONE_NUMBER,
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          ...ADDRESS,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 9.9677,
          longitude: 76.2882,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            opens: "09:00",
            closes: "17:00",
          },
        ],
        areaServed: [
          { "@type": "City", name: "Kochi" },
          { "@type": "AdministrativeArea", name: "Kerala" },
          { "@type": "Country", name: "India" },
        ],
        knowsAbout: [
          "Finishing school programs",
          "Communication skills",
          "Interview preparation",
          "Professional grooming",
          "Financial literacy",
          "Personality development",
          "Career readiness",
          "Healthcare licensing exam training",
        ],
        sameAs: [
          "https://www.instagram.com/unique_mentors/",
          "https://www.facebook.com/uniquementors",
          "https://www.linkedin.com/company/uniquementors",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        alternateName: "Unique Mentors Finishing School",
        url: SITE_URL,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-IN",
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: "Unique Mentors - Finishing School in Kochi, Kerala",
        description:
          "Activity-led finishing school programs for school students, college graduates, healthcare aspirants, and professionals.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-IN",
      },
      ...MAIN_NAVIGATION.map((item, index) => ({
        "@type": "SiteNavigationElement",
        position: index + 1,
        name: item.name,
        url: `${SITE_URL}${item.href}`,
      })),
    ],
  } as unknown as WithContext<Thing>;
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
