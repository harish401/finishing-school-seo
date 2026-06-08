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
      <div className="flex flex-col justify-between gap-4 border-b border-[#eadbea] pb-5 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-[#9a849a]" />
          <input
            type="text"
            placeholder="Search courses by title or description..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-[8px] border border-[#eadbea] bg-white py-3 pl-11 pr-10 text-sm font-semibold text-[#251324] shadow-sm transition-all duration-300 placeholder:text-[#9a849a] focus:border-[#e21b2f] focus:outline-none focus:ring-4 focus:ring-[#e21b2f]/8"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-1/2 flex h-5 w-5 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#eadbea] text-[#6c5a6c] transition-colors hover:bg-[#e21b2f] hover:text-white"
              aria-label="Clear search"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>

        <span className="select-none text-[10px] font-black uppercase tracking-[0.16em] text-[#7b697b]">
          Showing {courses.length} Active Modules
        </span>
      </div>

      {/* 2. Category & Mode Tab Arrays */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Categories */}
        <div>
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.16em] text-[#7b697b]">
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
                    'flex cursor-pointer items-center gap-1.5 rounded-[8px] border px-3.5 py-2 text-xs font-extrabold transition-all duration-200',
                    isActive
                      ? 'border-[#e21b2f] bg-[#e21b2f] text-white shadow-sm shadow-[#e21b2f]/10'
                      : 'border-[#eadbea] bg-white text-[#6c5a6c] hover:border-[#e21b2f]/30 hover:bg-[#fff8ef] hover:text-[#251324]'
                  )}
                >
                  {cat.label}
                  <span className={cn(
                    'rounded-md px-1.5 py-0.5 text-[9px] font-extrabold leading-none',
                    isActive ? 'bg-white/20 text-white' : 'bg-[#f3e8f3] text-[#7b697b]'
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
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.16em] text-[#7b697b]">
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
                    'flex cursor-pointer items-center gap-1.5 rounded-[8px] border px-3.5 py-2 text-xs font-extrabold transition-all duration-200',
                    isActive
                      ? 'border-[#0b5f99] bg-[#0b5f99] text-white shadow-sm shadow-[#0b5f99]/10'
                      : 'border-[#d9e8f2] bg-white text-[#536272] hover:border-[#0b5f99]/30 hover:bg-[#f6fbff] hover:text-[#16212a]'
                  )}
                >
                  {mode.label}
                  <span className={cn(
                    'rounded-md px-1.5 py-0.5 text-[9px] font-extrabold leading-none',
                    isActive ? 'bg-white/20 text-white' : 'bg-[#e8f6ff] text-[#536272]'
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
