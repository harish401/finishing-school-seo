import { Metadata } from "next";
import { generateSeoMetadata } from "@/lib/seo";
import { EnrollForm } from "@/components/forms/EnrollForm";
import { Check, ShieldCheck, Clock, Award, Users } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

// Mock courses for preview/fallback
const mockCourses: Record<string, { title: string; category: string; fee: number; originalFee: number; duration: string; highlights: string[] }> = {
  "corporate-readiness": {
    title: "Corporate Readiness Program",
    category: "Professional",
    fee: 15000,
    originalFee: 25000,
    duration: "6 Weeks",
    highlights: ["Business Communication", "Corporate Etiquette", "Mock Interviews", "Resume Workshops"],
  },
  "campus-to-career": {
    title: "Campus to Career Transformation",
    category: "College",
    fee: 12000,
    originalFee: 20000,
    duration: "8 Weeks",
    highlights: ["Personality Development", "Aptitude Coaching", "Group Discussion", "Presentation Skills"],
  },
  "youth-leadership": {
    title: "Youth Leadership Accelerator",
    category: "School",
    fee: 8000,
    originalFee: 15000,
    duration: "4 Weeks",
    highlights: ["Confidence Booster", "Public Speaking", "Creative Thinking", "Time Management"],
  },
};

interface EnrollPageProps {
  params: Promise<{ courseSlug: string }>;
}

export async function generateMetadata({ params }: EnrollPageProps): Promise<Metadata> {
  const { courseSlug } = await params;
  const course = mockCourses[courseSlug] || { title: "Finishing Program" };
  
  return generateSeoMetadata({
    title: `Enroll in ${course.title}`,
    description: `Complete your enrollment for ${course.title} at Unique Mentors Finishing School.`,
    path: `/enroll/${courseSlug}`,
    noIndex: true, // Do not index enrollment pages
  });
}

export default async function EnrollPage({ params }: EnrollPageProps) {
  const { courseSlug } = await params;
  const course = mockCourses[courseSlug] || {
    title: decodeURIComponent(courseSlug).replace(/-/g, " "),
    category: "Premium",
    fee: 15000,
    originalFee: 25000,
    duration: "6 Weeks",
    highlights: ["Personalized Mentorship", "Experiential Learning", "Modern Finishing Curriculum", "Certification"],
  };

  return (
    <main className="min-h-screen bg-background font-[family-name:var(--font-body)] py-12 md:py-20">
      <div className="container-main max-w-6xl mx-auto px-4">
        
        {/* Navigation link back */}
        <div className="mb-8">
          <Link href="/courses" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
            &larr; Back to Courses
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-surface-container-lowest p-6 sm:p-10 rounded-2xl border border-outline-variant/20 shadow-lg relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-3xl -z-0" />
            <div className="relative z-10 space-y-6">
              <div>
                <span className="chip mb-2 inline-block">SECURE ENROLLMENT</span>
                <h1 className="font-[family-name:var(--font-heading)] font-extrabold text-3xl text-on-surface tracking-tight">
                  Register For Your Course
                </h1>
                <p className="text-on-surface-variant text-sm mt-1">
                  Fill in your details below to register. Our counselor will reach out to you within 24 hours to confirm your schedule.
                </p>
              </div>

              <EnrollForm courseSlug={courseSlug} courseTitle={course.title} />
            </div>
          </div>

          {/* Right Column: Course Summary Card & Trust Seals */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Course Summary Card */}
            <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-md space-y-6">
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-2.5 py-1 rounded-full">
                  {course.category}
                </span>
                <h2 className="font-[family-name:var(--font-heading)] font-extrabold text-xl text-on-surface mt-3">
                  {course.title}
                </h2>
                <div className="flex items-center gap-2 text-sm text-on-surface-variant mt-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>Duration: {course.duration}</span>
                </div>
              </div>

              <hr className="border-outline-variant/30" />

              {/* Price Details */}
              <div className="space-y-2">
                <p className="text-sm font-semibold text-on-surface-variant">Investment Details</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-on-surface">
                    {formatCurrency(course.fee)}
                  </span>
                  {course.originalFee && (
                    <span className="text-base text-on-surface-variant/60 line-through">
                      {formatCurrency(course.originalFee)}
                    </span>
                  )}
                </div>
                <p className="text-xs text-success font-medium">✓ Inclusive of all training materials and certification</p>
              </div>

              <hr className="border-outline-variant/30" />

              {/* Highlights */}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-on-surface-variant">What you get in this course:</p>
                <ul className="space-y-2.5 text-sm text-on-surface-variant">
                  {course.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary-container mt-0.5 flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Trust Seals */}
            <div className="space-y-4">
              <div className="flex gap-4 p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/20 shadow-sm">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-heading)] font-bold text-sm text-on-surface">
                    Secure Processing
                  </h3>
                  <p className="text-on-surface-variant text-xs mt-0.5">
                    Your details are safe. We support standard flexible payment plans upon onboarding.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/20 shadow-sm">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-heading)] font-bold text-sm text-on-surface">
                    Finishing School Certification
                  </h3>
                  <p className="text-on-surface-variant text-xs mt-0.5">
                    Receive a verified industry-aligned finishing school certificate upon successful completion.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/20 shadow-sm">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-heading)] font-bold text-sm text-on-surface">
                    Personalized Mentor Allocation
                  </h3>
                  <p className="text-on-surface-variant text-xs mt-0.5">
                    Assigned 1-on-1 expert mentor matching your career aspirations.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}
