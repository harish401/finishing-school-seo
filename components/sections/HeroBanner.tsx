'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const stats = [
  { value: '500+', label: 'Students Trained' },
  { value: '50+', label: 'Courses' },
  { value: '98%', label: 'Satisfaction' },
];

const cycleSteps = [
  {
    title: 'Discover Potential',
    description: 'Identify your unique strengths and areas for growth.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Expert Mentorship',
    description: 'Learn from industry professionals with real-world experience.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Practical Application',
    description: 'Apply your knowledge through hands-on projects and scenarios.',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Career Success',
    description: 'Step into your future career with confidence and readiness.',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
};

export function HeroBanner() {
  const [currentStep, setCurrentStep] = useState(0);

  // Typewriter Hook Logic
  const words = ["Unique Mentors", "Medical Licensure", "Finishing School", "Dataflow Support", "Career Readiness"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(120);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % cycleSteps.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const handleType = () => {
      const fullWord = words[currentWordIndex];
      if (!isDeleting) {
        // Typing
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        setTypingSpeed(100);

        if (currentText === fullWord) {
          // Pause before deleting
          timer = setTimeout(() => setIsDeleting(true), 2200);
          return;
        }
      } else {
        // Deleting
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        setTypingSpeed(45);

        if (currentText === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
      
      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* Decorative gradient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -left-20 top-1/2 h-[400px] w-[400px] rounded-full bg-primary-container/8 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-secondary-container/10 blur-3xl" />
      </div>

      <div className="container-main relative flex min-h-screen items-center py-20">
        <div className="grid w-full gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Content */}
          <div className="flex flex-col justify-center pt-16 lg:pt-0 z-10">
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mb-6"
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-widest text-primary backdrop-blur-sm select-none">
                Medical Licensure &amp; Finishing School
              </span>
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className={cn(
                'text-balance font-[family-name:var(--font-heading)]',
                'text-5xl font-extrabold leading-[1.1] tracking-tight text-on-surface',
                'sm:text-6xl lg:text-7xl min-h-[160px] sm:min-h-[auto]'
              )}
            >
              Transform Your Future with{' '}
              <span className="relative block sm:inline-block">
                <span className="gradient-primary bg-clip-text text-transparent pb-2">
                  {currentText}
                </span>
                <span className="inline-block w-1.5 h-10 sm:h-12 ml-1.5 bg-primary animate-pulse align-middle rounded-sm" />
              </span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-6 max-w-lg text-lg sm:text-xl leading-relaxed text-on-surface-variant"
            >
              Bridge the gap to international careers. We offer expert coaching for
              Overseas Medical Licensing Exams (DHA, MOH, Prometric, HAAD), comprehensive
              Dataflow verification support, and professional Finishing School programs.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                href="/courses"
                className={cn(
                  'inline-flex items-center gap-2 rounded-xl px-7 py-4 text-base font-semibold text-on-primary',
                  'gradient-primary shadow-lg shadow-primary/25 transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5'
                )}
              >
                Explore Courses
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/contact?demo=true"
                className={cn(
                  'inline-flex items-center gap-2 rounded-xl border-2 border-outline-variant/60 px-7 py-4',
                  'text-base font-semibold text-on-surface transition-all duration-300 bg-surface/50 backdrop-blur-sm',
                  'hover:border-primary-container hover:bg-primary-light/20'
                )}
              >
                <Play className="h-5 w-5 text-primary animate-pulse" />
                Book a Free Demo
              </Link>
            </motion.div>

            {/* Floating Stats */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-14 flex flex-wrap gap-6"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col animate-fade-in">
                  <div className="text-3xl font-extrabold text-on-surface font-[family-name:var(--font-heading)] tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-on-surface-variant mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Decorative Visualization */}
          <div className="hidden lg:flex items-center justify-center relative w-full h-[600px]">
            <div className="absolute inset-0 bg-primary/5 rounded-[2.5rem] overflow-hidden shadow-2xl border border-outline-variant/30">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={cycleSteps[currentStep].image}
                    alt={cycleSteps[currentStep].title}
                    fill
                    className="object-cover opacity-90"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151c27]/90 via-[#151c27]/40 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Step Content */}
              <div className="absolute bottom-0 left-0 right-0 p-10 z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold text-lg shadow-lg">
                        {currentStep + 1}
                      </span>
                      <h3 className="text-3xl font-bold text-white font-[family-name:var(--font-heading)]">
                        {cycleSteps[currentStep].title}
                      </h3>
                    </div>
                    <p className="text-white/80 text-xl ml-14 max-w-sm leading-relaxed">
                      {cycleSteps[currentStep].description}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Progress Indicators */}
                <div className="flex gap-3 mt-10 ml-14">
                  {cycleSteps.map((_, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-500",
                        idx === currentStep ? "w-10 bg-primary" : "w-3 bg-white/30"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute -right-8 top-32 glass-dark p-5 rounded-2xl shadow-xl border border-white/10 z-20 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-white font-bold text-sm tracking-wide">Ready to Enroll</p>
                <p className="text-white/70 text-xs mt-0.5">Join our next batch</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
