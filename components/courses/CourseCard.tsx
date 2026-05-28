import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Clock, MapPin, ArrowRight, MessageCircle } from 'lucide-react';
import type { CourseCardData } from '@/types';

interface CourseCardProps {
  course: CourseCardData;
}

const modeLabels: Record<CourseCardData['mode'], string> = {
  online: 'Online',
  offline: 'Offline',
  hybrid: 'Hybrid',
};

const modeStyles: Record<CourseCardData['mode'], string> = {
  online: 'bg-info/10 text-info',
  offline: 'bg-success/10 text-success',
  hybrid: 'bg-warning/10 text-warning',
};

const categoryLabels: Record<CourseCardData['category'], string> = {
  school: 'School',
  college: 'College',
  healthcare: 'Healthcare',
  professional: 'Professional',
};

export function CourseCard({ course }: CourseCardProps) {
  // Construct a pre-filled professional WhatsApp inquiry text
  const encodedText = encodeURIComponent(
    `Hello! I would like to enquire about the "${course.title}" course at Unique Mentors and know about the upcoming batches.`
  );
  const whatsappUrl = `https://wa.me/919544774599?text=${encodedText}`;

  return (
    <div
      className={cn(
        'group flex flex-col overflow-hidden rounded-2xl bg-surface-container-lowest border border-outline-variant/30',
        'shadow-md hover:shadow-xl transition-all duration-300 card-lift'
      )}
    >
      {/* Thumbnail and category */}
      <Link href={`/courses/${course.slug}`} className="relative aspect-[16/10] overflow-hidden block">
        {course.thumbnail ? (
          <Image
            src={course.thumbnail.url}
            alt={course.thumbnail.alt || course.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-surface-container">
            <span className="text-4xl font-bold text-outline-variant/50 font-[family-name:var(--font-heading)]">
              {course.title.charAt(0)}
            </span>
          </div>
        )}

        <span className="absolute left-3 top-3 chip bg-white/95 text-primary text-xs font-bold shadow-sm backdrop-blur-sm px-2.5 py-0.5 rounded-full">
          {categoryLabels[course.category]}
        </span>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Meta badges */}
        <div className="mb-3 flex items-center gap-3 text-xs font-semibold">
          <span className="flex items-center gap-1 text-on-surface-variant">
            <Clock className="h-3.5 w-3.5" />
            {course.duration}
          </span>
          <span
            className={cn(
              'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
              modeStyles[course.mode]
            )}
          >
            <MapPin className="h-3 w-3" />
            {modeLabels[course.mode]}
          </span>
        </div>

        {/* Title */}
        <Link href={`/courses/${course.slug}`} className="block group-hover:text-primary transition-colors">
          <h3 className="text-lg font-extrabold text-on-surface font-[family-name:var(--font-heading)] line-clamp-2 leading-snug">
            {course.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="mt-2 flex-1 text-sm leading-relaxed text-on-surface-variant line-clamp-2">
          {course.description}
        </p>

        {/* Action CTAs */}
        <div className="mt-5 pt-4 border-t border-outline-variant/30 flex items-center gap-3">
          <Link
            href={`/courses/${course.slug}`}
            className={cn(
              'flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl text-xs font-bold text-primary bg-primary/5',
              'hover:bg-primary/10 transition-colors border border-primary/15'
            )}
          >
            Learn Details
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white bg-success',
              'hover:bg-success/90 transition-colors border border-transparent shadow-sm'
            )}
          >
            <MessageCircle className="h-3.5 w-3.5 fill-current" />
            Enquire Now
          </a>
        </div>
      </div>
    </div>
  );
}
