'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import { MobileNav } from './MobileNav';
import { BrandLogo } from './BrandLogo';
import NavHeader from '@/components/ui/nav-header';
import type { NavItem } from '@/types';

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Courses', href: '/courses' },
  {
    label: 'Programs',
    href: '/programs',
    children: [
      { label: 'School Programs', href: '/programs/schools' },
      { label: 'College Programs', href: '/programs/colleges' },
      { label: 'Healthcare Careers', href: '/programs/healthcare' },
      {
        label: 'Professional Development',
        href: '/programs/professional-development',
      },
    ],
  },
  { label: 'Blog', href: '/blog' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Placements', href: '/placements' },
  { label: 'Contact', href: '/contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const lastScrollY = useRef(0);
  const stopTimer = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      setScrolled(currentY > 20);

      if (currentY < 12 || delta < -4) {
        setNavVisible(true);
      } else if (delta > 4 && currentY > 96) {
        setNavVisible(false);
        setDropdownOpen(null);
      }

      if (stopTimer.current) {
        window.clearTimeout(stopTimer.current);
      }

      stopTimer.current = window.setTimeout(() => {
        setNavVisible(true);
      }, 90);

      lastScrollY.current = currentY;
    };

    lastScrollY.current = window.scrollY;
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (stopTimer.current) {
        window.clearTimeout(stopTimer.current);
      }
    };
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 will-change-transform',
          navVisible || mobileOpen ? 'translate-y-0' : '-translate-y-full',
          scrolled
            ? 'glass shadow-md border-b border-outline-variant/30'
            : 'bg-transparent'
        )}
      >
        <div className="container-main">
          <nav className="flex h-16 items-center justify-between lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <BrandLogo 
                className={cn(
                  "h-9 w-auto md:h-11 transition-all duration-300", 
                  !scrolled && "brightness-0 invert"
                )} 
              />
            </Link>

            {/* Desktop Navigation */}
            <NavHeader
              items={navItems}
              dropdownOpen={dropdownOpen}
              onDropdownOpen={setDropdownOpen}
            />

            {/* Desktop CTA + Mobile Hamburger */}
            <div className="flex items-center gap-3">
              <Link
                href="/enroll"
                className={cn(
                  'hidden rounded-full px-5 py-2.5 text-sm font-semibold text-on-primary shadow-md shadow-primary/20 lg:block',
                  'gradient-primary transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25'
                )}
              >
                Enroll Now
              </Link>

              <button
                onClick={() => setMobileOpen(true)}
                className="rounded-lg p-2 text-on-surface transition-colors hover:bg-primary-light/40 lg:hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        items={navItems}
      />
    </>
  );
}
