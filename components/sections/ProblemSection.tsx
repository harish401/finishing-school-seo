"use client";

import { cn } from '@/lib/utils';
import { CheckCircle2, ArrowRight, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const problems = [
  { 
    stat: 80, 
    label: '80%', 
    title: 'Soft Skills Gap', 
    text: 'of graduates lack essential soft skills like teamwork, agility, and empathy.' 
  },
  { 
    stat: 65, 
    label: '65%', 
    title: 'Interview Anxiety', 
    text: 'struggle with interview confidence and structured self-presentation.' 
  },
  { 
    stat: 70, 
    label: '70%', 
    title: 'Workplace Unpreparedness', 
    text: 'feel entirely unprepared to tackle real-world job responsibilities.' 
  },
  { 
    stat: 55, 
    label: '55%', 
    title: 'Communication Deficit', 
    text: 'lack effective verbal and written communication required in professional settings.' 
  },
];

const solutions = [
  'Interactive public speaking & business communication bootcamps',
  'Realistic corporate mock interviews with live panel feedback',
  '1-on-1 industry mentorship and career trajectory mapping',
  'Sophisticated professional grooming and workplace etiquette training',
  'Modern digital footprint optimization & personal brand building',
];

export function ProblemSection() {
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const cardEntrance = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="section-padding bg-surface-container-low/60 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 rounded-full bg-error-container/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="container-main relative z-10">
        {/* Headline */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <span className="chip bg-error-container/20 text-error font-semibold mb-4 border border-error/10 uppercase tracking-wider text-xs">
              The Employability Crisis
            </span>
          </motion.div>
          
          <motion.h2 
            className="font-heading text-3xl font-extrabold text-on-surface sm:text-4xl lg:text-5xl leading-tight tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            The Gap Between Education &amp; Employability
          </motion.h2>
          
          <motion.p 
            className="mt-4 text-base sm:text-lg text-on-surface-variant leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Despite years of rigorous academic training, most students enter the workforce
            without the practical skills modern global employers demand. We are here to change that.
          </motion.p>
        </div>

        {/* Comparison Layout */}
        <div className="mt-16 grid gap-8 lg:grid-cols-12 lg:gap-12 items-stretch">
          {/* Left: The Problem statistics cards */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <motion.div 
                className="flex items-center gap-3 mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <AlertTriangle className="h-6 w-6 text-error shrink-0" />
                <h3 className="text-xl font-bold text-on-surface font-[family-name:var(--font-heading)]">
                  Critical Skills Deficit in India
                </h3>
              </motion.div>
              
              <motion.div 
                className="grid gap-6 sm:grid-cols-2"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                {problems.map((item) => {
                  const radius = 24;
                  const circumference = 2 * Math.PI * radius;
                  const strokeDashoffset = circumference - (item.stat / 100) * circumference;

                  return (
                    <motion.div 
                      key={item.title} 
                      className={cn(
                        "group rounded-2xl bg-surface-container-lowest p-6 border border-outline-variant/15",
                        "transition-all duration-300 hover:shadow-md hover:border-error/20 flex flex-col justify-between"
                      )}
                      variants={cardEntrance}
                      whileHover={{ y: -4 }}
                    >
                      <div className="flex items-start gap-4">
                        {/* Circular Progress SVG */}
                        <div className="relative h-14 w-14 shrink-0 flex items-center justify-center">
                          <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 60 60">
                            {/* Track circle */}
                            <circle
                              className="text-error/10"
                              strokeWidth="4"
                              stroke="currentColor"
                              fill="transparent"
                              r={radius}
                              cx="30"
                              cy="30"
                            />
                            {/* Progress circle animates dynamically when in view */}
                            <motion.circle
                              className="text-error transition-colors duration-300"
                              strokeWidth="5"
                              strokeDasharray={circumference}
                              initial={{ strokeDashoffset: circumference }}
                              whileInView={{ strokeDashoffset: strokeDashoffset }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                              strokeLinecap="round"
                              stroke="currentColor"
                              fill="transparent"
                              r={radius}
                              cx="30"
                              cy="30"
                            />
                          </svg>
                          <span className="absolute text-xs font-bold text-on-surface font-mono">
                            {item.label}
                          </span>
                        </div>
                        
                        <div>
                          <h4 className="font-bold text-on-surface text-sm font-[family-name:var(--font-heading)] group-hover:text-error transition-colors">
                            {item.title}
                          </h4>
                          <p className="mt-1 text-xs text-on-surface-variant leading-relaxed">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>

          {/* Right: The Solution card */}
          <motion.div 
            className="lg:col-span-5 rounded-2xl bg-gradient-to-b from-surface-container-lowest to-surface-container-low p-8 border border-outline-variant/15 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300"
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div>
              <div className="mb-6 flex justify-between items-center">
                <span className="chip bg-primary/10 text-primary font-semibold border border-primary/10 uppercase tracking-wider text-xs">
                  Our Ecosystem
                </span>
                <span className="text-xs font-medium text-success bg-success/10 px-2.5 py-1 rounded-md border border-success/10">
                  Ready Solutions
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-on-surface font-[family-name:var(--font-heading)] mb-6">
                How We Bridge The Gap
              </h3>
              
              <div className="space-y-4">
                {solutions.map((solution, idx) => (
                  <motion.div 
                    key={idx} 
                    className="flex items-start gap-3 group"
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success transition-transform group-hover:scale-110" />
                    <p className="text-sm leading-relaxed text-on-surface-variant font-medium">
                      {solution}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-outline-variant/30 flex items-center justify-between">
              <Link
                href="/about"
                className={cn(
                  'inline-flex items-center gap-2 text-sm font-semibold text-primary',
                  'transition-all duration-300 hover:gap-3 hover:text-primary-container'
                )}
              >
                Learn more about our methodology
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Divider accent */}
        <div className="mx-auto mt-16 h-1 w-24 rounded-full bg-gradient-to-r from-primary to-primary-container opacity-30" />
      </div>
    </section>
  );
}
