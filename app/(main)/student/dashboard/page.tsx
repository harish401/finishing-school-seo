import { Metadata } from "next";
import { generateSeoMetadata } from "@/lib/seo";
import { Award, BookOpen, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = generateSeoMetadata({
  title: "Student Dashboard",
  description: "View your student progress, stats, and courses.",
  path: "/student/dashboard",
  noIndex: true,
});

export default function StudentDashboardPage() {
  const stats = [
    { label: "Active Courses", value: "2", icon: BookOpen, color: "text-primary bg-primary/10" },
    { label: "Completed Steps", value: "12/15", icon: CheckCircle2, color: "text-success bg-success/10" },
    { label: "Certificates Earned", value: "1", icon: Award, color: "text-amber-500 bg-amber-500/10" },
    { label: "Hours Learned", value: "28 hrs", icon: Clock, color: "text-info bg-info/10" },
  ];

  const recentCourses = [
    {
      title: "Campus to Career Transformation",
      progress: 80,
      nextLesson: "Lesson 9: Advanced Presentation Skills",
      category: "College",
      slug: "campus-to-career",
    },
    {
      title: "Corporate Readiness Program",
      progress: 35,
      nextLesson: "Lesson 4: Business Writing and Emails",
      category: "Professional",
      slug: "corporate-readiness",
    },
  ];

  return (
    <div className="space-y-8 font-[family-name:var(--font-body)]">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-surface-container-low border border-outline-variant/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-0" />
        <div className="relative z-10 space-y-2">
          <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-2.5 py-1 rounded-full">
            Welcome Back
          </span>
          <h1 className="font-[family-name:var(--font-heading)] font-extrabold text-2xl sm:text-3xl text-on-surface">
            Hello, Aravind Sharma!
          </h1>
          <p className="text-on-surface-variant text-sm max-w-xl leading-relaxed">
            Your transformation progress is going exceptionally well. You have completed 80% of your primary program. Keep up the high standards!
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="p-4 sm:p-5 rounded-xl bg-surface-container-lowest border border-outline-variant/20 shadow-sm flex items-center gap-4">
              <div className={`w-10 sm:w-12 h-10 sm:h-12 rounded-lg flex items-center justify-center ${stat.color} flex-shrink-0`}>
                <Icon className="w-5 sm:w-6 h-5 sm:h-6" />
              </div>
              <div>
                <p className="text-xs font-medium text-on-surface-variant">{stat.label}</p>
                <p className="text-lg sm:text-2xl font-extrabold text-on-surface mt-0.5">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Primary Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Active Courses */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-xl text-on-surface">
              Enrolled Courses
            </h2>
            <Link href="/student/my-courses" className="text-xs font-bold text-primary hover:underline flex items-center gap-0.5">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-4">
            {recentCourses.map((course, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-surface-container-lowest border border-outline-variant/20 shadow-sm space-y-4 hover:border-primary-container/30 transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase bg-primary/5 px-2 py-0.5 rounded">
                      {course.category}
                    </span>
                    <h3 className="font-[family-name:var(--font-heading)] font-bold text-base sm:text-lg text-on-surface mt-2">
                      {course.title}
                    </h3>
                  </div>
                  <span className="text-sm font-extrabold text-primary">{course.progress}%</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-surface-container-low h-2 rounded-full overflow-hidden">
                  <div
                    className="gradient-primary h-full rounded-full transition-all duration-500"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  <p className="text-xs text-on-surface-variant font-medium">
                    Next Lesson: <span className="text-on-surface font-semibold">{course.nextLesson}</span>
                  </p>
                  <Link
                    href={`/student/my-courses?course=${course.slug}`}
                    className="px-4 py-2 bg-primary/10 hover:bg-primary text-primary hover:text-on-primary text-xs font-bold rounded-lg transition-all text-center"
                  >
                    Resume Class
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Tips and Announcements */}
        <div className="space-y-6">
          <h2 className="font-[family-name:var(--font-heading)] font-bold text-xl text-on-surface">
            Mentor Insights
          </h2>

          <div className="p-6 rounded-xl bg-surface-container-lowest border border-outline-variant/20 shadow-sm space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-12 h-12 bg-amber-500/5 rounded-bl-full" />
            <div className="flex items-center gap-2 text-amber-500">
              <Award className="w-5 h-5" />
              <h3 className="font-[family-name:var(--font-heading)] font-bold text-sm">Finishing Tip of the Week</h3>
            </div>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              &quot;First impressions are built within the first 7 seconds of an interaction. Ensure a firm handshake, steady eye contact, and a clear vocal tone when starting any interview or meeting.&quot;
            </p>
            <div className="text-right text-xs font-semibold text-primary">— Mentor Vasant</div>
          </div>

          <div className="p-6 rounded-xl bg-primary/5 border border-primary/10 space-y-3">
            <h3 className="font-[family-name:var(--font-heading)] font-bold text-sm text-on-surface">Upcoming Live Webinars</h3>
            <ul className="space-y-2.5 text-xs text-on-surface-variant">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-on-surface">Virtual Interview Etiquette</p>
                  <p className="text-[10px] text-on-surface-variant/70">Saturday, May 30th | 11:00 AM</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-on-surface">Modern Resume &amp; LinkedIn Branding</p>
                  <p className="text-[10px] text-on-surface-variant/70">Wednesday, June 3rd | 4:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
