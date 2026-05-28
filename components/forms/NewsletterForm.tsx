'use client';

import { useState, useTransition } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface NewsletterFormProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export function NewsletterForm({ variant = 'light', className }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    startTransition(async () => {
      try {
        const res = await fetch('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        if (!res.ok) throw new Error('Failed to subscribe');

        setSuccess(true);
        setEmail('');
        setError('');
      } catch {
        setError('Something went wrong. Please try again.');
      }
    });
  };

  const isDark = variant === 'dark';

  if (success) {
    return (
      <div
        className={cn(
          'flex items-center gap-2 text-sm font-medium',
          isDark ? 'text-inverse-on-surface' : 'text-success',
          className
        )}
      >
        <CheckCircle className="h-5 w-5" />
        <span>You&apos;re subscribed! Check your inbox.</span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('flex w-full max-w-md gap-2', className)}
    >
      <div className="relative flex-1">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={cn(
            'w-full rounded-lg px-4 py-3 text-sm outline-none transition-colors',
            'focus:ring-2 focus:ring-primary-container',
            isDark
              ? 'bg-white/10 text-inverse-on-surface placeholder:text-inverse-on-surface/60 border border-white/20'
              : 'bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant border border-outline-variant'
          )}
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className={cn(
          'flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-all',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          isDark
            ? 'bg-white text-primary hover:bg-white/90'
            : 'gradient-primary text-on-primary hover:opacity-90'
        )}
      >
        {isPending ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <>
            Subscribe
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
      {error && (
        <p className={cn('mt-1 text-xs', isDark ? 'text-red-300' : 'text-error')}>
          {error}
        </p>
      )}
    </form>
  );
}
