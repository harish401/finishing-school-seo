"use client";

import { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Users,
  ShieldCheck,
  Check,
  Award,
  BookOpen,
  Briefcase,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function CollegeProgramsClient() {
  const [activeModule, setActiveModule] = useState<"personal" | "professional" | "etiquette">("personal");

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  const moduleData = {
    personal: {
      title: "Personal Development",
      desc: "Our personal development module focuses on core emotional intelligence, self-confidence, and mental resilience to navigate everyday social and academic environments.",
      skills: [
        { name: "Confidence Building", detail: "Developing strong self-belief, active body posture, and overcoming public stage apprehension." },
        { name: "Stress Relief Techniques", detail: "Practical methods and breathing exercises to manage exam anxiety and regulate emotions." },
        { name: "Time Management", detail: "Setting productive study schedules, daily routines, and building high-performance study habits." },
        { name: "Behavioral Training", detail: "Adapting positive behavioral frameworks to handle peer interactions and familial environments." },
        { name: "Peer Handling & Teen Support", detail: "Constructive peer-pressure management and personal guidance during critical transitional years." },
      ]
    },
    professional: {
      title: "Professional Grooming",
      desc: "Our professional grooming track shapes outward self-presentation, digital poise, and strategic personal branding key to transition to professional sectors.",
      skills: [
        { name: "Grooming & Hygiene", detail: "Comprehensive guidance on dress code decorum, hygiene guidelines, and premium personal appearance." },
        { name: "Body Language Coaching", detail: "Correcting standing/sitting posture, active spatial gestures, eye contact habits, and expressive ease." },
        { name: "First Impression Mastery", detail: "Strategies to command positive professional authority within the first critical seconds of interaction." },
        { name: "Digital Etiquette", detail: "Professional email formats, structured messaging protocols, online meetings decorum, and virtual presence." },
        { name: "LinkedIn & Resume Blueprint", detail: "Optimizing corporate social profiles, digital portfolio guidelines, and executive resume structural curation." },
      ]
    },
    etiquette: {
      title: "Social & Executive Etiquette",
      desc: "Our high-end etiquette syllabus covers complex interaction domains, cross-cultural manners, and formal dining codes to move comfortably in elite circles.",
      skills: [
        { name: "Dining Decorum", detail: "A complete walkthrough of table manners, cutlery handling, restaurant decorum, and standard glass hostings." },
        { name: "Cross-Cultural Communication", detail: "Manners guidelines to interact confidently across diverse international and national domains." },
        { name: "Active Verbal Agility", detail: "Vocal tone modulation, constructive small-talk, structural presentation skills, and debate posture." },
        { name: "Social Presence & Networking", detail: "Entering group conversations comfortably, exchanging contacts seamlessly, and social poise." },
        { name: "Conflict Mediation", detail: "Emotional maturity tools to navigate interpersonal friction, active negotiation, and collaborative teamwork." },
      ]
    }
  };

  const programs = [
    {
      title: "Collegiate Placement Prep",
      subtitle: "3-Month Extensive Bootcamps",
      desc: "An intensive career-focused track explicitly tailored to secure elite recruitment offers at premier institutional campuses.",
      features: [
        "Rigorous mock panel interviews",
        "Aptitude & logical reasoning labs",
        "Detailed portfolio assessments",
        "Corporate recruiter interaction slots"
      ],
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600",
      accent: "hover:border-primary/20",
      tagColor: "bg-primary/10 border-primary/10 text-primary"
    },
    {
      title: "Life Readiness Foundation",
      subtitle: "Annual Curriculum Integration",
      desc: "A progressive, academic term-aligned curriculum designed to foster emotional resilience and critical personal growth.",
      features: [
        "Weekly interactive speech labs",
        "Personalized behavioral counseling",
        "Pragmatic financial literacy modules",
        "Peer conflict mediation simulations"
      ],
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600",
      accent: "hover:border-indigo-500/20",
      tagColor: "bg-indigo-500/10 border-indigo-500/10 text-indigo-600"
    },
    {
      title: "Corporate Finishing School",
      subtitle: "High-Impact Weekend Intensive",
      desc: "A fast-track executive presentation, digital branding, and networking masterclass for seniors and young professionals.",
      features: [
        "High-end corporate dining labs",
        "LinkedIn executive styling audits",
        "Public pitch & speech labs",
        "Business negotiations challenges"
      ],
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600",
      accent: "hover:border-emerald-500/20",
      tagColor: "bg-emerald-500/10 border-emerald-500/10 text-emerald-700"
    }
  ];

  const benefits = [
    {
      title: "Rigorous Practical Assessment",
      metric: "90%",
      desc: "We prioritize experiential learning. Students engage in live speech labs, formal dining challenges, and actual role-plays.",
      textColor: "text-primary",
      accent: "hover:border-primary/20"
    },
    {
      title: "Elite Recruitment Placement Rate",
      metric: "92%",
      desc: "Partnering colleges report concrete improvements in corporate interview conversion rates and salary package values.",
      textColor: "text-indigo-600",
      accent: "hover:border-indigo-500/20"
    },
    {
      title: "Decade of Operational Trust",
      metric: "11+",
      desc: "Over 11 years of career transformation training across elite universities, professional organizations, and healthcare institutions.",
      textColor: "text-emerald-700",
      accent: "hover:border-emerald-500/20"
    }
  ];

  const steps = [
    { step: "01", title: "Institutional Sync", desc: "A comprehensive operational diagnostic to map academic curriculum gaps and student needs." },
    { step: "02", title: "Syllabus Curation", desc: "Tailoring finishing school schedules to fit collegiate calendar routines and credits maps." },
    { step: "03", title: "Dynamic Classes", desc: "Interactive, scenario-based classes led by corporate coaches and certified trainers." },
    { step: "04", title: "Competency Review", desc: "Granular student progress reports, performance feedback, and verified certification dispatches." }
  ];

  return (
    <div className="overflow-hidden bg-background">
      
      {/* 1. ASYMMETRIC TYPOGRAPHY HERO */}
      <section className="section-padding bg-surface border-b border-outline-variant/15 relative min-h-[65vh] flex items-center justify-center">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#2563eb_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute -top-32 -left-32 w-[35rem] h-[35rem] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

        <div className="container-main relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="chip bg-primary/10 text-primary border border-primary/10 uppercase tracking-widest text-xs font-bold px-4 py-1.5 rounded-full mb-6">
              Higher Education
            </span>
          </motion.div>

          <motion.h1
            className="mt-6 font-heading text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl text-balance leading-tight text-on-surface"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Cultivating Executive Presence in{" "}
            <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent">
              Young Graduates
            </span>
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 max-w-2xl text-base sm:text-xl text-on-surface-variant leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We collaborate with premier universities and colleges to refine corporate soft skills, advanced social etiquette, and professional grooming essential for global careers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-bold text-on-primary shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              Consult Our Academic Team
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. DYNAMIC SPLIT SYLLABUS DASHBOARD */}
      <section className="section-padding border-b border-outline-variant/15 relative overflow-hidden bg-background">
        <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#2563eb_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />
        
        <div className="container-main relative z-10">
          <div className="grid gap-16 lg:grid-cols-12 items-start">
            
            {/* Left: Sticky Selector Panels */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
              <span className="chip bg-primary/10 text-primary border border-primary/10 uppercase tracking-wider text-xs font-semibold">
                CURRICULUM MODULES
              </span>
              
              <h2 className="font-heading text-3xl font-extrabold text-on-surface sm:text-4xl leading-tight">
                Academic Curriculum Modules
              </h2>
              
              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed font-medium">
                Our dynamic college finishing program is segmented into three intensive modules, providing structured behavioral progress dossiers.
              </p>

              {/* Responsive Tabs buttons list */}
              <div className="flex flex-col gap-3 pt-4">
                {Object.keys(moduleData).map((key) => {
                  const data = moduleData[key as keyof typeof moduleData];
                  const isActive = activeModule === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveModule(key as any)}
                      className={`w-full flex items-center justify-between text-left px-5 py-4 rounded-2xl border transition-all duration-300 group cursor-pointer ${
                        isActive
                          ? "bg-surface-container-lowest border-primary shadow-sm"
                          : "bg-transparent border-transparent hover:bg-surface-container-low/40"
                      }`}
                    >
                      <div>
                        <h3 className={`font-heading text-base font-bold transition-colors ${
                          isActive ? "text-primary" : "text-on-surface group-hover:text-primary"
                        }`}>
                          {data.title}
                        </h3>
                        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-0.5">
                          Module Track
                        </p>
                      </div>
                      <ChevronRight className={`h-4 w-4 text-primary transition-all duration-300 ${
                        isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0"
                      }`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Dynamic Skills cards list */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeModule}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="rounded-3xl border border-outline-variant/15 bg-surface-container-lowest p-8 sm:p-10 shadow-sm relative overflow-hidden"
                >
                  {/* Visual Glow indicators matching active modules */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-indigo-500" />

                  <h3 className="font-heading text-2xl font-extrabold text-on-surface border-b border-outline-variant/10 pb-5">
                    {moduleData[activeModule].title} Track
                  </h3>
                  
                  <p className="mt-5 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {moduleData[activeModule].desc}
                  </p>

                  <div className="mt-8 space-y-4">
                    <h4 className="text-[10px] font-extrabold text-on-surface uppercase tracking-widest mb-2">
                      Core Outcomes & Modules
                    </h4>

                    {moduleData[activeModule].skills.map((skill, sIdx) => (
                      <div
                        key={skill.name}
                        className="p-4 rounded-2xl border border-outline-variant/10 bg-surface-container-low/30 hover:bg-surface-container-low transition-colors duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <span className="h-6 w-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-mono text-xs font-black shrink-0 select-none">
                            {sIdx + 1}
                          </span>
                          <h4 className="text-xs sm:text-sm font-bold text-on-surface leading-tight">
                            {skill.name}
                          </h4>
                        </div>
                        <p className="mt-2 text-xs text-on-surface-variant font-medium pl-9">
                          {skill.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* 3. EXPERENTIAL PROGRAM SLOTS */}
      <section className="section-padding bg-surface-container-low/30 border-b border-outline-variant/15 relative">
        <div className="container-main relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="chip bg-primary/10 text-primary border border-primary/10 uppercase tracking-wider text-xs font-semibold mb-4 block w-fit mx-auto">
              Our Programs
            </span>
            <h2 className="font-heading text-3xl font-extrabold text-on-surface sm:text-4xl">
              Targeted Collegiate Formats
            </h2>
            <p className="mt-4 text-xs sm:text-sm text-on-surface-variant leading-relaxed max-w-xl mx-auto">
              We offer structured, highly engaging programs designed to build self-confidence, time productivity, digital awareness, and real-world clarity.
            </p>
          </div>

          <motion.div
            className="grid gap-8 lg:grid-cols-3 items-stretch"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {programs.map((prog, index) => {
              const displayIndex = `0${index + 1}`;
              return (
                <motion.div
                  key={prog.title}
                  variants={cardEntrance}
                  whileHover={{ y: -6 }}
                  className={`rounded-3xl border border-outline-variant/15 bg-surface-container-lowest shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group relative ${prog.accent}`}
                >
                  <div className="absolute top-4 right-6 text-6xl font-black text-outline-variant/15 group-hover:text-primary/8 transition-colors select-none font-heading z-20">
                    {displayIndex}
                  </div>

                  <div>
                    <div className="relative aspect-[16/9] overflow-hidden border-b border-outline-variant/10 bg-surface">
                      <img
                        src={prog.image}
                        alt={prog.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 to-transparent pointer-events-none" />
                    </div>

                    <div className="p-8">
                      <div className="flex justify-between items-center mb-4">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${prog.tagColor}`}>
                          {prog.subtitle}
                        </span>
                      </div>

                      <h3 className="font-heading text-xl font-bold text-on-surface group-hover:text-primary transition-colors">
                        {prog.title}
                      </h3>

                      <p className="mt-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                        {prog.desc}
                      </p>

                      <div className="my-6 border-t border-outline-variant/10" />

                      <h4 className="text-[10px] font-extrabold text-on-surface uppercase tracking-widest mb-4">
                        What They Will Learn
                      </h4>
                      <ul className="space-y-3">
                        {prog.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-2.5">
                            <Check className="h-4.5 w-4.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="text-xs sm:text-sm text-on-surface-variant font-medium">
                              {feat}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 4. REAL-LIFE PHOTO TIMELINE & METRICS BENEFITS */}
      <section className="section-padding relative">
        <div className="container-main grid gap-16 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5 grid gap-4 grid-cols-2 relative">
            <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-3xl pointer-events-none" />

            <div className="col-span-2 rounded-2xl overflow-hidden border border-outline-variant/10 shadow-sm aspect-[16/10] bg-surface">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600"
                alt="Modern Collegiate Environment"
                className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
              />
            </div>

            <div className="rounded-2xl overflow-hidden border border-outline-variant/10 shadow-sm aspect-square bg-surface">
              <img
                src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=400"
                alt="Realistic Student Discussion"
                className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
              />
            </div>

            <div className="rounded-2xl overflow-hidden border border-outline-variant/10 shadow-sm aspect-square bg-surface">
              <img
                src="https://images.unsplash.com/photo-1521791136368-1a46827d0adb?q=80&w=400"
                alt="Grooming Sessions"
                className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
              />
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 border border-indigo-500/20 text-[10px] font-bold uppercase tracking-wider mb-4 w-fit">
              360-Degree Growth
            </span>

            <h2 className="font-heading text-3xl font-extrabold text-on-surface sm:text-4xl leading-tight">
              Why Prestigious Campuses <br />
              Trust Our Finishing Syllabus
            </h2>

            <p className="mt-4 text-sm sm:text-base text-on-surface-variant leading-relaxed">
              We do not provide standard flat templates. Our team integrates directly with academic operations, creating real-time professional conditioning cycles that secure concrete results.
            </p>

            <div className="mt-8 flex flex-col gap-6">
              {benefits.map((b) => {
                return (
                  <div
                    key={b.title}
                    className={`p-5 rounded-2xl border bg-surface-container-lowest transition-all duration-300 flex gap-5 items-center ${b.accent}`}
                  >
                    <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-outline-variant/10 font-heading text-lg font-black shadow-sm ${b.textColor}`}>
                      {b.metric}
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-bold text-on-surface">
                        {b.title}
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                        {b.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROCESS INTEGRATION TIMELINE */}
      <section className="section-padding bg-surface-container-low/40 border-t border-b border-outline-variant/10 relative">
        <div className="container-main">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold uppercase tracking-wider mb-4">
              Our Methodology
            </span>
            <h2 className="font-heading text-3xl font-extrabold text-on-surface sm:text-4xl">
              Systematic Training Path
            </h2>
          </div>

          <div className="relative">
            <div className="absolute top-8 left-16 right-16 h-0.5 bg-gradient-to-r from-primary/15 via-primary/25 to-primary/15 hidden lg:block pointer-events-none z-0" />

            <motion.div
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 relative z-10"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {steps.map((s) => (
                <motion.div
                  key={s.step}
                  variants={cardEntrance}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-dim text-lg font-black text-white shadow-md border-2 border-white/10 transition-transform duration-300 group-hover:scale-105">
                    {s.step}
                  </div>
                  <h3 className="mt-5 font-heading text-base font-bold text-on-surface group-hover:text-primary transition-colors">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-xs text-on-surface-variant leading-relaxed max-w-[220px]">
                    {s.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. CONCRETE CAMPUS KPI COUNTER */}
      <section className="section-padding border-b border-outline-variant/10">
        <div className="container-main">
          <motion.div
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {[
              { value: "11+", label: "Years of Excellence" },
              { value: "10,000+", label: "Students Trained" },
              { value: "500+", label: "Completed Batches" },
              { value: "20+", label: "Specialized Courses" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={cardEntrance}
                className="p-4"
              >
                <p className="font-heading text-4xl lg:text-5xl font-black text-primary">
                  {stat.value}
                </p>
                <p className="mt-2.5 text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7. EXECUTIVE CALL TO ACTION */}
      <section className="section-padding bg-inverse-surface text-inverse-on-surface relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55rem] h-[55rem] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

        <div className="container-main text-center relative z-10 max-w-3xl mx-auto">
          <motion.h2
            className="font-heading text-3xl font-extrabold md:text-4xl tracking-tight leading-tight"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Begin the Transformation Today
          </motion.h2>

          <motion.p
            className="mx-auto mt-4 text-xs sm:text-base text-inverse-on-surface/80 leading-relaxed max-w-xl"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Take the first step towards building confidence, character, and career clarity. Partner with Unique Mentors today.
          </motion.p>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 text-sm font-extrabold text-on-primary shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 active:translate-y-0 hover:bg-primary-hover"
            >
              Consult Our Coordinator
              <ArrowRight className="h-4.5 w-4.5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
