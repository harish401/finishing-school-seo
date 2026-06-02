'use client';

import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CourseCardData } from '@/types';

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'school', label: 'School' },
  { value: 'college', label: 'College' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'professional', label: 'Professional' },
];

const modes = [
  { value: 'all', label: 'All Modes' },
  { value: 'online', label: 'Online' },
  { value: 'offline', label: 'Offline' },
  { value: 'hybrid', label: 'Hybrid' },
];

interface CourseFilterProps {
  activeCategory: string;
  activeMode: string;
  onCategoryChange: (category: string) => void;
  onModeChange: (mode: string) => void;
  searchQuery: string;
  onSearchChange: (search: string) => void;
  courses: CourseCardData[];
}

export function CourseFilter({
  activeCategory,
  activeMode,
  onCategoryChange,
  onModeChange,
  searchQuery,
  onSearchChange,
  courses,
}: CourseFilterProps) {
  
  // Calculate dynamic course count per category
  const getCategoryCount = (categoryValue: string) => {
    if (categoryValue === 'all') return courses.length;
    return courses.filter((c) => c.category === categoryValue).length;
  };

  // Calculate dynamic course count per delivery mode
  const getModeCount = (modeValue: string) => {
    if (modeValue === 'all') return courses.length;
    return courses.filter((c) => c.mode === modeValue).length;
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Real-Time Interactive Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/15 pb-5">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-on-surface-variant/60" />
          <input
            type="text"
            placeholder="Search courses by title or description..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-11 pr-10 py-3 bg-surface border border-outline-variant/25 rounded-2xl text-sm font-semibold text-on-surface placeholder-on-surface-variant/60 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all duration-300"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full flex items-center justify-center bg-outline-variant/10 text-on-surface-variant hover:bg-outline-variant/20 hover:text-on-surface transition-colors cursor-pointer"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>

        <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/80 select-none">
          Showing {courses.length} Active Modules
        </span>
      </div>

      {/* 2. Category & Mode Tab Arrays */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Categories */}
        <div>
          <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/80">
            Academy Category
          </p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.value;
              const count = getCategoryCount(cat.value);
              return (
                <button
                  key={cat.value}
                  onClick={() => onCategoryChange(cat.value)}
                  className={cn(
                    'px-3.5 py-2 text-xs font-bold rounded-xl border transition-all duration-200 cursor-pointer flex items-center gap-1.5',
                    isActive
                      ? 'bg-primary text-white border-primary shadow-sm hover:bg-primary-hover shadow-primary/10'
                      : 'bg-surface text-on-surface-variant border-outline-variant/20 hover:bg-surface-container-low hover:text-on-surface hover:border-outline-variant/30'
                  )}
                >
                  {cat.label}
                  <span className={cn(
                    'text-[9px] px-1.5 py-0.5 rounded-md font-extrabold leading-none',
                    isActive ? 'bg-white/20 text-white' : 'bg-outline-variant/20 text-on-surface-variant'
                  )}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Delivery Modes */}
        <div>
          <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/80">
            Delivery Mode
          </p>
          <div className="flex flex-wrap gap-2">
            {modes.map((mode) => {
              const isActive = activeMode === mode.value;
              const count = getModeCount(mode.value);
              return (
                <button
                  key={mode.value}
                  onClick={() => onModeChange(mode.value)}
                  className={cn(
                    'px-3.5 py-2 text-xs font-bold rounded-xl border transition-all duration-200 cursor-pointer flex items-center gap-1.5',
                    isActive
                      ? 'bg-primary text-white border-primary shadow-sm hover:bg-primary-hover shadow-primary/10'
                      : 'bg-surface text-on-surface-variant border-outline-variant/20 hover:bg-surface-container-low hover:text-on-surface hover:border-outline-variant/30'
                  )}
                >
                  {mode.label}
                  <span className={cn(
                    'text-[9px] px-1.5 py-0.5 rounded-md font-extrabold leading-none',
                    isActive ? 'bg-white/20 text-white' : 'bg-outline-variant/20 text-on-surface-variant'
                  )}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
