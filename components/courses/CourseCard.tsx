import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ArrowRight, MessageCircle } from 'lucide-react';
import type { CourseCardData } from '@/types';

interface CourseCardProps {
  course: CourseCardData;
}

const modeLabels: Record<CourseCardData['mode'], string> = {
  online: 'ONLINE',
  offline: 'CAMPUS',
  hybrid: 'HYBRID',
};

const categoryLabels: Record<CourseCardData['category'], string> = {
  school: 'SCHOOLS',
  college: 'COLLEGES',
  healthcare: 'HEALTHCARE',
  professional: 'PROFESSIONAL',
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
        'group flex flex-col overflow-hidden rounded-3xl bg-surface-container-lowest border border-outline-variant/15',
        'hover:border-primary/20 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5'
      )}
    >
      {/* Thumbnail and category */}
      <Link href={`/courses/${course.slug}`} className="relative aspect-[16/10] overflow-hidden block bg-black">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px] z-10 pointer-events-none" />
        
        {/* Gradient shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity" />

        {course.thumbnail ? (
          <Image
            src={course.thumbnail.url}
            alt={course.thumbnail.alt || course.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-surface-container-low">
            <span className="text-3xl font-bold text-outline-variant/50 font-[family-name:var(--font-heading)]">
              {course.title.charAt(0)}
            </span>
          </div>
        )}

        {/* Category Badge */}
        <span className="absolute left-4 top-4 z-25 text-[8px] font-black uppercase tracking-widest bg-white/95 text-primary border border-primary/5 shadow-md backdrop-blur-sm px-2.5 py-1 rounded-lg">
          {categoryLabels[course.category]}
        </span>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        
        {/* Minimal Meta Row (No heavy Lucide icons, clean typography-driven tags) */}
        <div className="mb-3.5 flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-widest text-on-surface-variant/80">
          <span>{course.duration}</span>
          <span className="text-primary/45">•</span>
          <span className="text-primary">{modeLabels[course.mode]}</span>
        </div>

        {/* Title */}
        <Link href={`/courses/${course.slug}`} className="block group-hover:text-primary transition-colors">
          <h3 className="text-lg font-bold text-on-surface font-heading line-clamp-2 leading-snug">
            {course.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="mt-2.5 flex-1 text-xs leading-relaxed text-on-surface-variant font-medium line-clamp-2">
          {course.description}
        </p>

        {/* Professional Custom CTAs */}
        <div className="mt-6 pt-5 border-t border-outline-variant/15 flex items-center gap-3">
          <Link
            href={`/courses/${course.slug}`}
            className={cn(
              'flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-2xl text-[10px] font-extrabold tracking-wider uppercase text-primary bg-primary/5',
              'hover:bg-primary/10 transition-colors border border-primary/10 group/btn'
            )}
          >
            Syllabus
            <ArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-0.5" />
          </Link>
          
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-2xl text-[10px] font-extrabold tracking-wider uppercase text-white bg-success',
              'hover:bg-success/90 transition-all shadow-md shadow-success/10 hover:shadow-success/20 cursor-pointer active:scale-[0.98]'
            )}
          >
            <MessageCircle className="h-3 w-3 fill-current" />
            Enquire
          </a>
        </div>
      </div>
    </div>
  );
}
