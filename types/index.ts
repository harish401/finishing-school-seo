// types/index.ts
// Re-export all types used across the application

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface CourseCardData {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: "school" | "college" | "healthcare" | "professional";
  fee: number;
  originalFee?: number;
  duration: string;
  mode: "online" | "offline" | "hybrid";
  thumbnail?: { url: string; alt: string };
  featured?: boolean;
}

export interface BlogCardData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  coverImage?: { url: string; alt: string };
  author?: { name: string; avatar?: { url: string } };
  tags?: string[];
}

export interface TestimonialData {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar?: { url: string; alt: string };
  rating?: number;
}

export interface TrainerData {
  id: string;
  name: string;
  title: string;
  bio: string;
  photo?: { url: string; alt: string };
  specialties?: string[];
}

export interface GalleryItemData {
  id: string;
  title: string;
  image: { url: string; alt: string };
  category: "workshops" | "events" | "campus" | "certificates";
  description?: string;
  date?: string;
}

export interface SiteSettingsData {
  siteName: string;
  tagline?: string;
  logo?: { url: string };
  email?: string;
  phone?: string;
  whatsappNumber?: string;
  address?: string;
  googleMapsEmbed?: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  youtube?: string;
}
