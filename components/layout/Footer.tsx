import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Instagram, Facebook, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { NewsletterForm } from '@/components/forms/NewsletterForm';
import { BrandLogo } from './BrandLogo';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'All Courses', href: '/courses' },
  { label: 'Blog', href: '/blog' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];

const programs = [
  { label: 'School Programs', href: '/programs/schools' },
  { label: 'College Programs', href: '/programs/colleges' },
  { label: 'Healthcare Career Programs', href: '/programs/healthcare' },
  {
    label: 'Professional Development',
    href: '/programs/professional-development',
  },
];

const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/UniqueMentors/', icon: Facebook },
  { label: 'Instagram', href: 'https://www.instagram.com/unique_mentors/', icon: Instagram },
  { label: 'YouTube', href: 'https://www.youtube.com/@UniqueMentors', icon: Youtube },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/uniquementors/', icon: Linkedin },
];

export function Footer() {
  return (
    <footer className="bg-inverse-surface text-inverse-on-surface">
      {/* Main Footer */}
      <div className="container-main section-padding">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <BrandLogo className="h-9 w-auto brightness-0 invert" />
            </Link>
            <p className="text-sm leading-relaxed text-inverse-on-surface/70">
              Colorful finishing school programs for students, graduates, healthcare aspirants, and professionals who want confidence, communication, career clarity, and workplace readiness.
            </p>
            <div className="space-y-3 pt-2 text-sm text-inverse-on-surface/70">
              <div className="flex items-start gap-2">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-inverse-primary" />
                <a
                  href="https://www.google.com/maps/place/Unique+Mentors/data=!4m2!3m1!1s0x0:0xc8f58c36b4233897?sa=X&ved=1t:2428&ictx=111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-inverse-primary hover:underline leading-relaxed"
                >
                  1st Floor, Jyothy, 62/6284A, Ernakulathappan Temple Road, near IMA blood bank, Pallimukku, Kochi, Ernakulam, Kerala 682011
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <a href="tel:+919876543210" className="transition-colors hover:text-inverse-primary">
                  +91 09544774599
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <a href="mailto:info@uniquementors.com" className="transition-colors hover:text-inverse-primary">
                  info@uniquementors.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-inverse-on-surface/50">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-inverse-on-surface/70 transition-colors hover:text-inverse-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-inverse-on-surface/50">
              Programs
            </h3>
            <ul className="space-y-2.5">
              {programs.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-inverse-on-surface/70 transition-colors hover:text-inverse-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-inverse-on-surface/50">
              Connect
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-lg',
                    'bg-white/10 text-inverse-on-surface/70',
                    'transition-all hover:bg-inverse-primary/20 hover:text-inverse-primary'
                  )}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-semibold text-inverse-on-surface">
                Subscribe to our newsletter
              </h3>
              <p className="mt-1 text-xs text-inverse-on-surface/60">
                Stay updated with our latest courses and tips.
              </p>
            </div>
            <NewsletterForm variant="dark" />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container-main flex flex-col items-center justify-between gap-2 py-4 text-xs text-inverse-on-surface/50 sm:flex-row">
          <span>© {new Date().getFullYear()} Unique Mentors. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="transition-colors hover:text-inverse-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-inverse-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
