import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { CourseCard } from '@/components/courses/CourseCard';
import type { CourseCardData } from '@/types';

interface FeaturedCoursesProps {
  courses: CourseCardData[];
}

export function FeaturedCourses({ courses }: FeaturedCoursesProps) {
  return (
    <section className="section-padding bg-background">
      <div className="container-main">
        {/* Label */}
        <div className="mb-4 text-center">
          <span className="chip">FEATURED COURSES</span>
        </div>

        {/* Headline */}
        <h2
          className={cn(
            'mx-auto max-w-2xl text-center font-[family-name:var(--font-heading)]',
            'text-3xl font-bold text-on-surface sm:text-4xl'
          )}
        >
          Popular Programs
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-on-surface-variant">
          Explore our most sought-after programs designed to equip you with the
          skills that matter.
        </p>

        {/* Course Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* View All */}
        <div className="mt-10 text-center">
          <Link
            href="/courses"
            className={cn(
              'inline-flex items-center gap-2 rounded-lg border-2 border-outline-variant px-6 py-3',
              'text-sm font-semibold text-on-surface transition-all',
              'hover:border-primary-container hover:bg-primary-light/20'
            )}
          >
            View All Courses
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
