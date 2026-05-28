import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ArrowRight, Phone } from 'lucide-react';

export function CTASection() {
  return (
    <section className="relative overflow-hidden">
      {/* Gradient Background */}
      <div className="gradient-primary">
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="container-main relative section-padding">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              className={cn(
                'font-[family-name:var(--font-heading)]',
                'text-3xl font-bold text-white sm:text-4xl lg:text-5xl'
              )}
            >
              Ready to Stand Out?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/80">
              Join hundreds of students who have transformed their careers with
              Unique Mentors. Take the first step toward becoming the best version
              of yourself.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/enroll"
                className={cn(
                  'inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3.5',
                  'text-sm font-semibold text-primary shadow-md',
                  'transition-all hover:bg-white/90 hover:shadow-lg'
                )}
              >
                Enroll Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className={cn(
                  'inline-flex items-center gap-2 rounded-lg border-2 border-white/40 px-6 py-3.5',
                  'text-sm font-semibold text-white',
                  'transition-all hover:border-white/80 hover:bg-white/10'
                )}
              >
                <Phone className="h-4 w-4" />
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
