'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { X, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import type { NavItem } from '@/types';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavItem[];
}

export function MobileNav({ isOpen, onClose, items }: MobileNavProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleExpand = (label: string) => {
    setExpandedItem((prev) => (prev === label ? null : label));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/40"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Slide-in panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className={cn(
              'fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col',
              'bg-surface-container-lowest shadow-xl'
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-outline-variant/30 px-6 py-4">
              <span className="gradient-primary bg-clip-text text-lg font-extrabold text-transparent font-[family-name:var(--font-heading)]">
                Unique Mentors
              </span>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-primary-light/40"
                aria-label="Close navigation menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 overflow-y-auto px-4 py-6">
              <ul className="space-y-1">
                {items.map((item, index) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                  >
                    {item.children ? (
                      <div>
                        <button
                          onClick={() => toggleExpand(item.label)}
                          className={cn(
                            'flex w-full items-center justify-between rounded-xl px-4 py-3.5',
                            'text-base font-semibold text-on-surface transition-colors',
                            'hover:bg-primary-light/40',
                            expandedItem === item.label && 'bg-primary-light/30'
                          )}
                          aria-expanded={expandedItem === item.label}
                        >
                          {item.label}
                          <ChevronDown
                            className={cn(
                              'h-4 w-4 transition-transform duration-200',
                              expandedItem === item.label && 'rotate-180'
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {expandedItem === item.label && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden pl-4"
                            >
                              {item.children.map((child) => (
                                <li key={child.label}>
                                  <Link
                                    href={child.href}
                                    onClick={onClose}
                                    className={cn(
                                      'block rounded-lg px-4 py-3 text-sm font-medium text-on-surface-variant',
                                      'transition-colors hover:bg-primary-light/40 hover:text-on-surface'
                                    )}
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          'block rounded-xl px-4 py-3.5 text-base font-semibold text-on-surface',
                          'transition-colors hover:bg-primary-light/40'
                        )}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* CTA */}
            <div className="border-t border-outline-variant/30 p-6">
              <Link
                href="/enroll"
                onClick={onClose}
                className={cn(
                  'block w-full rounded-lg py-3.5 text-center text-base font-semibold text-on-primary',
                  'gradient-primary transition-opacity hover:opacity-90'
                )}
              >
                Enroll Now
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
