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
        <div className="flex h-16 w-16 items-center justify-center rounded-[8px] border border-[#eadbea] bg-white shadow-sm">
          <BookOpen className="h-8 w-8 text-[#e21b2f]" />
        </div>
        <h3 className="mt-4 font-heading text-lg font-black text-[#251324]">
          No courses found
        </h3>
        <p className="mt-2 text-sm font-medium text-[#6c5a6c]">
          Try adjusting your filters to find what you&apos;re looking for.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid gap-5 sm:grid-cols-2 xl:grid-cols-3',
        className
      )}
    >
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
