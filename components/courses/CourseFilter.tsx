'use client';

import { cn } from '@/lib/utils';

const categories = [
  { value: 'all', label: 'All' },
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
}

export function CourseFilter({
  activeCategory,
  activeMode,
  onCategoryChange,
  onModeChange,
}: CourseFilterProps) {
  return (
    <div className="space-y-6">
      
      {/* Category Filters */}
      <div>
        <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-on-surface-variant">
          Category
        </p>
        <div className="flex flex-wrap gap-2.5">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => onCategoryChange(cat.value)}
                className={cn(
                  'px-4 py-2 text-xs font-semibold rounded-full border transition-all duration-200 cursor-pointer',
                  isActive
                    ? 'bg-primary text-white border-primary shadow-sm hover:bg-primary-container'
                    : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant/30 hover:bg-surface-container hover:text-on-surface'
                )}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mode Filters */}
      <div>
        <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-on-surface-variant">
          Mode
        </p>
        <div className="flex flex-wrap gap-2.5">
          {modes.map((mode) => {
            const isActive = activeMode === mode.value;
            return (
              <button
                key={mode.value}
                onClick={() => onModeChange(mode.value)}
                className={cn(
                  'px-4 py-2 text-xs font-semibold rounded-full border transition-all duration-200 cursor-pointer',
                  isActive
                    ? 'bg-primary text-white border-primary shadow-sm hover:bg-primary-container'
                    : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant/30 hover:bg-surface-container hover:text-on-surface'
                )}
              >
                {mode.label}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
