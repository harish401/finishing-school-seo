import { cn } from '@/lib/utils';
import { BookOpen } from 'lucide-react';
import { CourseCard } from './CourseCard';
import type { CourseCardData } from '@/types';

interface CourseGridProps {
  courses: CourseCardData[];
  className?: string;
}

export function CourseGrid({ courses, className }: CourseGridProps) {
  if (courses.length === 0) {
    return (
      <div className={cn('flex flex-col items-center justify-center py-20', className)}>
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-container">
          <BookOpen className="h-8 w-8 text-outline" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-on-surface font-[family-name:var(--font-heading)]">
          No courses found
        </h3>
        <p className="mt-2 text-sm text-on-surface-variant">
          Try adjusting your filters to find what you&apos;re looking for.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid gap-6 sm:grid-cols-2 lg:grid-cols-3',
        className
      )}
    >
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
