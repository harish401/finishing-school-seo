'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Menu, ChevronDown } from 'lucide-react';
import { MobileNav } from './MobileNav';
import { BrandLogo } from './BrandLogo';
import type { NavItem } from '@/types';

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Courses', href: '/courses' },
  {
    label: 'Programs',
    href: '/programs',
    children: [
      { label: 'Schools', href: '/programs/schools' },
      { label: 'Colleges', href: '/programs/colleges' },
      { label: 'Healthcare & Medical', href: '/programs/healthcare' },
    ],
  },
  { label: 'Blog', href: '/blog' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Placements', href: '/placements' },
  { label: 'Contact', href: '/contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'glass shadow-md border-b border-outline-variant/30'
            : 'bg-transparent'
        )}
      >
        <div className="container-main">
          <nav className="flex h-16 items-center justify-between lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <BrandLogo className="h-9 w-auto md:h-11" />
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={() =>
                    item.children && setDropdownOpen(item.label)
                  }
                  onMouseLeave={() =>
                    item.children && setDropdownOpen(null)
                  }
                >
                  {item.children ? (
                    <>
                      <button
                        className={cn(
                          'flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-on-surface-variant',
                          'transition-colors hover:bg-primary-light/40 hover:text-on-surface'
                        )}
                        aria-expanded={dropdownOpen === item.label}
                        aria-haspopup="true"
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            'h-3.5 w-3.5 transition-transform duration-200',
                            dropdownOpen === item.label && 'rotate-180'
                          )}
                        />
                      </button>
                      {dropdownOpen === item.label && (
                        <div className="absolute left-0 top-full pt-1">
                          <ul className="glass min-w-[180px] rounded-xl border border-outline-variant/30 p-2 shadow-lg">
                            {item.children.map((child) => (
                              <li key={child.label}>
                                <Link
                                  href={child.href}
                                  className={cn(
                                    'block rounded-lg px-3 py-2 text-sm text-on-surface-variant',
                                    'transition-colors hover:bg-primary-light/40 hover:text-on-surface'
                                  )}
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        'block rounded-lg px-3 py-2 text-sm font-medium text-on-surface-variant',
                        'transition-colors hover:bg-primary-light/40 hover:text-on-surface'
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Desktop CTA + Mobile Hamburger */}
            <div className="flex items-center gap-3">
              <Link
                href="/enroll"
                className={cn(
                  'hidden rounded-lg px-5 py-2.5 text-sm font-semibold text-on-primary lg:block',
                  'gradient-primary transition-opacity hover:opacity-90'
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
