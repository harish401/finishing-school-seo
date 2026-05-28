import { Metadata } from "next";
import { generateSeoMetadata } from "@/lib/seo";
import Link from "next/link";
import { LayoutDashboard, BookOpen, Award, LogOut, GraduationCap, Home } from "lucide-react";

export const metadata: Metadata = generateSeoMetadata({
  title: "Student Portal",
  description: "Manage your courses, view progress, and download certificates at Unique Mentors.",
  path: "/student",
  noIndex: true, // Never index student portal pages
});

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  // Sidebar navigation configuration
  const navItems = [
    { label: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
    { label: "My Courses", href: "/student/my-courses", icon: BookOpen },
    { label: "Certificates", href: "/student/certificates", icon: Award },
  ];

  return (
    <div className="min-h-screen bg-background font-[family-name:var(--font-body)] flex flex-col md:flex-row">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-surface-container-lowest border-r border-outline-variant/30 flex flex-col justify-between shrink-0">
        <div>
          {/* Header/Branding */}
          <div className="p-6 border-b border-outline-variant/20 flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center text-on-primary">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <p className="font-[family-name:var(--font-heading)] font-extrabold text-base leading-none text-on-surface">
                Unique Mentors
              </p>
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest mt-1 inline-block">
                Student Portal
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={index}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-on-surface-variant hover:bg-primary/5 hover:text-primary transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Controls */}
        <div className="p-4 border-t border-outline-variant/20 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-on-surface-variant hover:bg-primary/5 hover:text-primary transition-all duration-200"
          >
            <Home className="w-4 h-4" />
            <span>Public Site</span>
          </Link>
          
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-error hover:bg-error/5 transition-all duration-200 text-left">
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <header className="h-16 border-b border-outline-variant/20 bg-surface-container-lowest px-6 flex items-center justify-between shrink-0">
          <h2 className="font-[family-name:var(--font-heading)] font-bold text-lg text-on-surface">
            Portal Workspace
          </h2>
          
          {/* User Profile Info */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-on-surface">Aravind Sharma</p>
              <p className="text-[10px] font-medium text-on-surface-variant uppercase">Student #UM-2026</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
              AS
            </div>
          </div>
        </header>

        {/* Dashboard Content Container */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>

    </div>
  );
}
