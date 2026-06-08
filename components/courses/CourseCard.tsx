import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ArrowRight, BookOpenCheck, Clock, Globe, MessageCircle } from 'lucide-react';
import type { CourseCardData } from '@/types';
import { motion } from 'framer-motion';

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

const categoryStyles: Record<CourseCardData['category'], string> = {
  school: 'bg-[#fff1e5] text-[#c90d1f] border-[#ffb7a8]',
  college: 'bg-[#e5fbf6] text-[#006f66] border-[#9be7dc]',
  healthcare: 'bg-[#e8f6ff] text-[#0b5f99] border-[#9bd7ff]',
  professional: 'bg-[#fff0fa] text-[#981173] border-[#f0addd]',
};

function formatFee(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
    style: 'currency',
    currency: 'INR',
  }).format(amount);
}

export function CourseCard({ course }: CourseCardProps) {
  // Construct a pre-filled professional WhatsApp inquiry text
  const encodedText = encodeURIComponent(
    `Hello! I would like to enquire about the "${course.title}" course at Unique Mentors and know about the upcoming batches.`
  );
  const whatsappUrl = `https://wa.me/919544774599?text=${encodedText}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full flex"
    >
      <article className="group relative flex min-h-[30rem] w-full overflow-hidden rounded-[8px] border border-[#eadbea] bg-[#251324] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#e21b2f]/35 hover:shadow-xl hover:shadow-[#251324]/10">
        <Link
          href={`/courses/${course.slug}`}
          className="absolute inset-0"
          aria-label={`View ${course.title}`}
        >
          {course.thumbnail ? (
            <motion.div
              className="relative h-full w-full"
              whileHover={{ scale: 1.045 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <Image
                src={course.thumbnail.url}
                alt={course.thumbnail.alt || course.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </motion.div>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#251324] to-[#0b5f99]">
              <span className="font-heading text-7xl font-black text-white/20">
                {course.title.charAt(0)}
              </span>
            </div>
          )}
        </Link>

        <div className="absolute inset-0 bg-gradient-to-t from-[#130813] via-[#251324]/72 to-transparent opacity-95 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] opacity-[0.07] [background-size:14px_14px]" />

        <div className="absolute left-4 right-4 top-4 z-20 flex items-start justify-between gap-3">
          <span
            className={cn(
              'rounded-[8px] border px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] shadow-sm backdrop-blur',
              categoryStyles[course.category]
            )}
          >
            {categoryLabels[course.category]}
          </span>
          {course.featured ? (
            <span className="rounded-[8px] border border-white/20 bg-white/16 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-white backdrop-blur">
              Featured
            </span>
          ) : null}
        </div>

        <div className="relative z-20 mt-auto flex w-full flex-col p-5 text-white sm:p-6">
          <BookOpenCheck className="mb-4 h-8 w-8 text-white/42" aria-hidden="true" />

          <div className="mb-4 flex flex-wrap items-center gap-3 text-[10px] font-black uppercase tracking-[0.13em] text-white/72">
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[#ffcf72]" />
              <span>{course.duration}</span>
            </div>
            <span className="text-white/28">/</span>
            <div className="flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-[#9bd7ff]" />
              <span>{modeLabels[course.mode]}</span>
            </div>
          </div>

          <Link href={`/courses/${course.slug}`} className="block">
            <h3 className="font-heading text-2xl font-black leading-tight tracking-tight text-white transition-colors group-hover:text-[#ffcf72]">
              {course.title}
            </h3>
          </Link>

          <p className="mt-3 line-clamp-3 text-sm font-semibold leading-relaxed text-white/78">
            {course.description}
          </p>

          <div className="mt-5 flex items-end justify-between gap-4 border-t border-white/16 pt-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.13em] text-white/48">
                Fee
              </p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-heading text-xl font-black text-white">
                  {formatFee(course.fee)}
                </span>
                {course.originalFee ? (
                  <span className="text-xs font-bold text-white/42 line-through">
                    {formatFee(course.originalFee)}
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <Link
              href={`/courses/${course.slug}`}
              className={cn(
                'inline-flex min-h-11 items-center justify-center gap-1.5 rounded-[8px] border border-white/22 bg-white/12 px-3 py-2.5',
                'text-[10px] font-extrabold uppercase tracking-[0.14em] text-white backdrop-blur transition-colors hover:bg-white/20 group/btn'
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
                'inline-flex min-h-11 items-center justify-center gap-1.5 rounded-[8px] bg-success px-3 py-2.5',
                'text-[10px] font-extrabold uppercase tracking-[0.14em] text-white shadow-md shadow-success/10 transition-all hover:bg-success/90 active:scale-[0.98]'
              )}
            >
              <MessageCircle className="h-3 w-3 fill-current" />
              Enquire
            </a>
          </div>
        </div>
      </article>
    </motion.div>
  );
}
