import { Metadata } from "next";
import { generateSeoMetadata } from "@/lib/seo";
import { BookOpen, Calendar, CheckCircle2, PlayCircle, Star } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = generateSeoMetadata({
  title: "My Courses",
  description: "View all your registered and completed courses.",
  path: "/student/my-courses",
  noIndex: true,
});

export default function StudentCoursesPage() {
  const courses = [
    {
      title: "Campus to Career Transformation",
      category: "College",
      progress: 80,
      totalLessons: 12,
      completedLessons: 9,
      mentor: "Dr. Ananya Roy",
      duration: "8 Weeks",
      status: "In Progress",
    },
    {
      title: "Corporate Readiness Program",
      category: "Professional",
      progress: 35,
      totalLessons: 15,
      completedLessons: 5,
      mentor: "Mr. Vasant Sen",
      duration: "6 Weeks",
      status: "In Progress",
    },
    {
      title: "Youth Leadership Accelerator",
      category: "School",
      progress: 100,
      totalLessons: 8,
      completedLessons: 8,
      mentor: "Ms. Shalini Iyer",
      duration: "4 Weeks",
      status: "Completed",
    },
  ];

  return (
    <div className="space-y-8 font-[family-name:var(--font-body)]">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] font-extrabold text-2xl sm:text-3xl text-on-surface">
            My Enrolled Programs
          </h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Access your finishing school modules, tracking stats, and lesson videos.
          </p>
        </div>
      </div>

      {/* Courses Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, idx) => (
          <div key={idx} className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 shadow-md overflow-hidden flex flex-col justify-between hover:border-primary-container/30 transition-all">
            
            {/* Header portion */}
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-primary bg-primary/5 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {course.category}
                </span>
                
                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                  course.status === "Completed" ? "bg-success/10 text-success" : "bg-primary-container/10 text-primary-container"
                }`}>
                  {course.status}
                </span>
              </div>

              <h2 className="font-[family-name:var(--font-heading)] font-bold text-lg text-on-surface line-clamp-2">
                {course.title}
              </h2>

              {/* Mentor profile */}
              <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                <Star className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>Mentor: <strong className="text-on-surface font-semibold">{course.mentor}</strong></span>
              </div>

              <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Program length: {course.duration}</span>
              </div>
            </div>

            {/* Progress & Bottom Actions */}
            <div className="p-5 bg-surface-container-low border-t border-outline-variant/20 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-on-surface-variant">
                  <span>Progress ({course.completedLessons}/{course.totalLessons} modules)</span>
                  <span className="font-bold text-on-surface">{course.progress}%</span>
                </div>
                <div className="w-full bg-surface-container-lowest h-2 rounded-full overflow-hidden">
                  <div
                    className="gradient-primary h-full rounded-full transition-all duration-500"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              {course.status === "Completed" ? (
                <Link
                  href="/student/certificates"
                  className="w-full py-2.5 bg-success/10 hover:bg-success text-success hover:text-on-primary text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  View Certificate
                </Link>
              ) : (
                <button className="w-full py-2.5 gradient-primary hover:opacity-90 text-on-primary text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5">
                  <PlayCircle className="w-4 h-4" />
                  Resume Learning
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
