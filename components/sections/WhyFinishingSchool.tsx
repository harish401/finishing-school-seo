'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const steps = [
  {
    id: '01',
    title: 'Confidence Building',
    description: 'Develop unshakeable self-confidence through public speaking, group activities, and personalized coaching.',
    color: 'border-blue-500 text-blue-500 bg-blue-500/10 shadow-blue-500/20',
    gradient: 'from-blue-500/20 via-indigo-500/10 to-transparent',
    glow: 'bg-blue-500',
    offsetZ: 0,
  },
  {
    id: '02',
    title: 'Communication Mastery',
    description: 'Master verbal and non-verbal communication skills essential for professional and personal success.',
    color: 'border-emerald-500 text-emerald-500 bg-emerald-500/10 shadow-emerald-500/20',
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    glow: 'bg-emerald-500',
    offsetZ: 60,
  },
  {
    id: '03',
    title: 'Career Readiness',
    description: 'Get interview-ready with resume building, mock interviews, and industry-specific preparation programs.',
    color: 'border-amber-500 text-amber-500 bg-amber-500/10 shadow-amber-500/20',
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    glow: 'bg-amber-500',
    offsetZ: 120,
  },
  {
    id: '04',
    title: 'Personal Branding',
    description: 'Learn grooming, etiquette, and digital presence skills to create a compelling personal brand that stands out.',
    color: 'border-violet-500 text-violet-500 bg-violet-500/10 shadow-violet-500/20',
    gradient: 'from-violet-500/20 via-purple-500/10 to-transparent',
    glow: 'bg-violet-500',
    offsetZ: 180,
  },
];

export function WhyFinishingSchool() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section className="section-padding bg-background/50 border-t border-b border-outline-variant/30 overflow-hidden">
      <div className="container-main">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          {/* Left Column: Title & Minimal List */}
          <div className="lg:col-span-5 text-left">
            <span className="chip mb-4 bg-primary/10 text-primary border border-primary/20">
              WHY A FINISHING SCHOOL?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-on-surface font-[family-name:var(--font-heading)] leading-tight tracking-tight">
              Skills That Education Alone Can&apos;t Teach
            </h2>
            <p className="mt-4 text-base text-on-surface-variant leading-relaxed">
              Traditional education focuses primarily on academic knowledge. A finishing school fills the
              critical gaps — building the crucial soft skills, confidence, and professional readiness that modern employers actively seek.
            </p>

            {/* Sleek, icon-free vertical process timeline list */}
            <div className="flex flex-col gap-2 mt-8">
              {steps.map((step, idx) => {
                const isActive = activeStep === idx;
                
                return (
                  <div
                    key={step.title}
                    onMouseEnter={() => setActiveStep(idx)}
                    onMouseLeave={() => setActiveStep(null)}
                    className={cn(
                      'p-4 rounded-xl border transition-all duration-300 cursor-pointer',
                      isActive
                        ? 'bg-surface-container-low border-outline-variant/40 shadow-sm translate-x-1'
                        : 'bg-transparent border-transparent'
                    )}
                  >
                    <div className="flex items-start gap-4">
                      {/* Minimal dynamic numbering */}
                      <span className={cn(
                        'text-xs font-mono font-black tracking-widest mt-0.5',
                        isActive ? step.color.split(' ')[1] : 'text-on-surface-variant/40'
                      )}>
                        {step.id}
                      </span>
                      <div>
                        <h3 className={cn(
                          'text-base font-extrabold font-[family-name:var(--font-heading)] transition-colors duration-300',
                          isActive ? 'text-primary' : 'text-on-surface'
                        )}>
                          {step.title}
                        </h3>
                        <p className="text-xs text-on-surface-variant leading-relaxed mt-1">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Did you know? block in minimal clean style */}
            <div className="mt-6 p-5 bg-surface-container-low/60 rounded-xl border border-outline-variant/15">
              <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Did you know?</p>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Studies show that 85% of job success comes from well-developed soft skills and people skills, while only 15% comes from technical skills (hard skills).
              </p>
            </div>
          </div>

          {/* Right Column: 3D Isometric Platform Stack Visualizer */}
          <div className="lg:col-span-7 relative flex items-center justify-center w-full h-[440px] sm:h-[540px] scale-90 sm:scale-100 origin-center">
            {/* 3D Perspective Isometric Grid Blueprint Backdrop */}
            <div 
              className="absolute inset-0 opacity-[0.07] pointer-events-none" 
              style={{
                backgroundImage: `
                  linear-gradient(to right, var(--color-outline-variant) 1px, transparent 1px),
                  linear-gradient(to bottom, var(--color-outline-variant) 1px, transparent 1px)
                `,
                backgroundSize: '28px 28px',
                transform: 'rotateX(60deg) rotateZ(-45deg) scale(1.5)',
                transformStyle: 'preserve-3d',
                transformOrigin: 'center center',
              }}
            />

            {/* 3D Stack Layer container */}
            <div 
              className="relative w-[340px] h-[340px] flex items-center justify-center"
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1200px',
              }}
            >
              {steps.map((step, idx) => {
                const isActive = activeStep === idx;
                
                return (
                  <motion.div
                    key={step.title}
                    onMouseEnter={() => setActiveStep(idx)}
                    onMouseLeave={() => setActiveStep(null)}
                    className={cn(
                      'absolute w-[280px] h-[130px] sm:w-[320px] sm:h-[150px] rounded-2xl border transition-all duration-500 flex flex-col justify-between p-5 cursor-pointer select-none',
                      isActive
                        ? 'bg-surface-container-low/95 border-primary/50 shadow-2xl scale-[1.02]'
                        : 'bg-surface-container-lowest/50 border-outline-variant/30 shadow-md backdrop-blur-[3px]'
                    )}
                    style={{
                      transform: `rotateX(55deg) rotateZ(-45deg) translateZ(${isActive ? step.offsetZ + 25 : step.offsetZ}px)`,
                      transformStyle: 'preserve-3d',
                      zIndex: idx * 10,
                    }}
                  >
                    {/* Glowing active edge light inside slab */}
                    <div className={cn(
                      'absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl transition-opacity duration-300',
                      isActive ? step.glow : 'bg-transparent opacity-0'
                    )} />

                    {/* Micro-technical grid line background inside card */}
                    <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] rounded-2xl" />

                    <div className="flex justify-between items-start">
                      <span className={cn(
                        'text-3xl font-black font-mono tracking-tighter opacity-10 transition-opacity duration-300',
                        isActive ? 'opacity-25' : ''
                      )}>
                        {step.id}
                      </span>
                      {isActive && (
                        <span className={cn(
                          'flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[8px] font-black uppercase tracking-widest animate-fade-in bg-primary/10 border-primary/20 text-primary'
                        )}>
                          Advantage Stack
                        </span>
                      )}
                    </div>

                    <div className="text-left">
                      <h4 className={cn(
                        'text-sm sm:text-base font-extrabold font-[family-name:var(--font-heading)] leading-tight transition-colors duration-300',
                        isActive ? 'text-primary' : 'text-on-surface'
                      )}>
                        {step.title}
                      </h4>
                      <p className="text-[10px] text-on-surface-variant mt-1.5 opacity-80 leading-normal line-clamp-1">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
