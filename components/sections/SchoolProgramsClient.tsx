"use client";

import { useState } from "react";
import { 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  XCircle,
  FileSpreadsheet,
  Award,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function SchoolProgramsClient() {
  const [activeTier, setActiveTier] = useState(0);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

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

  const benefits = [
    {
      num: "01",
      title: "Confident Presentation",
      focus: "Structured Speech Labs & Public Speaking",
      desc: "Students learn to articulate ideas clearly through public speaking, mock debates, and structured speech labs.",
      color: "from-blue-500 to-indigo-500",
    },
    {
      num: "02",
      title: "Analytical Reasoning",
      focus: "Non-Linear Decision Modeling",
      desc: "Problem-solving challenges designed to prompt analytical thinking beyond typical rot-learning exercises.",
      color: "from-purple-500 to-pink-500",
    },
    {
      num: "03",
      title: "Interpersonal Agility",
      focus: "Social Etiquette & Group Alignment",
      desc: "Social etiquette, group alignment, and constructive active listening for collaborative teamwork.",
      color: "from-orange-500 to-red-500",
    },
    {
      num: "04",
      title: "Financial Basics",
      focus: "Saving, Compounding & Real Investments",
      desc: "Pragmatic, age-appropriate personal finance basics — understand values of saving, credit, and investments.",
      color: "from-teal-500 to-emerald-500",
    },
    {
      num: "05",
      title: "Proactive Leadership",
      focus: "Group Responsibility & Agility Tasks",
      desc: "Students take charge of miniature group assignments, managing deadlines and delegating with poise.",
      color: "from-yellow-500 to-amber-500",
    },
    {
      num: "06",
      title: "Future Direction",
      focus: "Psychometric Assessment & Trajectory Mapping",
      desc: "Early exposure to diverse professional choices, mapping passions to standard career routes.",
      color: "from-red-500 to-rose-500",
    },
  ];

  const steps = [
    { 
      step: "01", 
      title: "Institution Consultation", 
      desc: "We discuss specific administrative needs, school size, and existing student behavioral metrics.",
      deliverable: "Baseline Diagnostic Assessment"
    },
    { 
      step: "02", 
      title: "Curriculum Adaptation", 
      desc: "Syllabi are customized to complement regional educational boards (CBSE, ICSE, IB) seamlessly.",
      deliverable: "Custom Finishing Module Proposal"
    },
    { 
      step: "03", 
      title: "Experiential Sessions", 
      desc: "Interactive workshops are integrated into academic calendars, led by certified trainers.",
      deliverable: "Dynamic On-Campus Delivery"
    },
    { 
      step: "04", 
      title: "Diagnostic Reporting", 
      desc: "Granular feedback reports are delivered to administrators, tracking student behavioral shifts.",
      deliverable: "Final Competency Dossiers"
    },
  ];

  const tiers = [
    { 
      title: "Grade 6-8", 
      subtitle: "Foundation Stage", 
      icon: Sparkles,
      desc: "Focuses on fundamental communication ease, situational agility, and breaking down social hesitations.",
      deliverable: "Certificate of Social Confidence",
      features: ["Introductory Speech Delivery", "Basic Table & Phone Decorum", "Cooperative Task Projects", "Primary Financial Awareness"],
      color: "from-blue-500 to-indigo-500"
    },
    { 
      title: "Grade 9-10", 
      subtitle: "Growth Stage", 
      icon: BookOpen,
      desc: "Equips teens with critical reasoning, advanced speech structures, and initial leadership tasks.",
      deliverable: "Certificate of Communication Poise",
      features: ["Logical Debate & Refutation", "Social Presence & Grooming", "Task Scheduling Protocols", "Early Career Discovery Labs"],
      color: "from-purple-500 to-pink-500"
    },
    { 
      title: "Grade 11-12", 
      subtitle: "Mastery Stage", 
      icon: GraduationCap,
      desc: "Prepares senior students for collegiate transitions, comprehensive grooming, and financial literacy.",
      deliverable: "Diploma of Career Readiness",
      features: ["Academic Interview Mastery", "Sleek Self-Presentation", "Investing & Wealth Primers", "Executive Decorum Guidelines"],
      color: "from-orange-500 to-red-500"
    },
  ];

  const comparison = [
    {
      feature: "Pedagogical Focus",
      traditional: "Syllabus completion & examinations",
      finishing: "Executive presence & behavioral growth"
    },
    {
      feature: "Communication Mode",
      traditional: "Passive listening & written retention",
      finishing: "Active debates, speech labs & vocal poise"
    },
    {
      feature: "Financial Literacy",
      traditional: "Theoretical formulas (if present)",
      finishing: "Tax basics, compounding & real investments"
    },
    {
      feature: "Grooming & Decorum",
      traditional: "Standard uniform enforcement",
      finishing: "Personal branding, body language & table manners"
    },
    {
      feature: "Confidence Assessment",
      traditional: "Evaluated purely by grade performance",
      finishing: "Detailed behavioral progress dossiers"
    }
  ];

  return (
    <div className="overflow-hidden bg-background">
      
      {/* 1. Asymmetric Typography-Driven Hero Spread */}
      <section className="section-padding bg-surface border-b border-outline-variant/15 relative min-h-[65vh] flex items-center justify-center">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#2563eb_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-[35rem] h-[35rem] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        
        <div className="container-main relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="chip bg-primary/10 text-primary border border-primary/10 uppercase tracking-widest text-xs font-bold px-4 py-1.5 rounded-full mb-6">
              B2B Partnerships
            </span>
          </motion.div>
          
          <motion.h1 
            className="mt-6 font-heading text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl text-balance leading-tight text-on-surface"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Integrating Executive Finish in{" "}
            <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent">
              Academic Curriculums
            </span>
          </motion.h1>
          
          <motion.p 
            className="mx-auto mt-6 max-w-2xl text-base sm:text-xl text-on-surface-variant leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We partner with progressive schools across India to build communication confidence, emotional intelligence, and life-readiness directly into the student curriculum.
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
              Partner With Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. Program Overview / Tiers with Custom Deliverables (Syllabus Blueprint Revamp) */}
      <section className="section-padding border-b border-outline-variant/15 relative overflow-hidden bg-background">
        {/* Subtle decorative grid */}
        <div className="absolute inset-0 opacity-[0.01] bg-[radial-gradient(#2563eb_1.5px,transparent_1.5px)] [background-size:20px_20px] pointer-events-none" />

        <div className="container-main relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="chip mb-4 bg-primary/10 text-primary border border-primary/10 uppercase tracking-wider text-xs font-semibold">
              CURRICULUM BLUEPRINT
            </span>
            <h2 className="font-heading text-3xl font-extrabold text-on-surface sm:text-4xl leading-tight">
              Holistic Student Development Tiers
            </h2>
            <p className="mt-4 text-base text-on-surface-variant leading-relaxed">
              Explore our structured age-appropriate syllabus brackets, custom-fitted to stimulate long-term personal and academic poise.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-12 items-start max-w-5xl mx-auto">
            {/* Left: Typographic Syllabus Tab Selector */}
            <div className="lg:col-span-4 space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/80 block mb-2 px-1">
                Select Academic Level
              </span>
              
              <div className="flex flex-col gap-3 relative">
                {/* Active connecting line behind nodes */}
                <div className="absolute left-[31px] top-6 bottom-6 w-0.5 bg-outline-variant/20 hidden sm:block" />

                {tiers.map((t, idx) => {
                  const isActive = activeTier === idx;
                  return (
                    <button
                      key={t.title}
                      onClick={() => setActiveTier(idx)}
                      className={`w-full flex items-center gap-4 text-left p-4 rounded-2xl border transition-all duration-300 relative group cursor-pointer ${
                        isActive
                          ? "bg-surface-container-lowest border-primary shadow-sm"
                          : "bg-transparent border-transparent hover:bg-surface-container-low/40"
                      }`}
                    >
                      {/* Serif serial number */}
                      <span
                        className={`h-9 w-9 rounded-xl flex items-center justify-center font-mono text-sm font-black transition-all duration-300 border ${
                          isActive
                            ? "bg-primary border-primary text-white"
                            : "bg-surface-container-lowest border-outline-variant/30 text-on-surface-variant group-hover:text-primary group-hover:border-primary/40"
                        }`}
                      >
                        0{idx + 1}
                      </span>

                      <div>
                        <h3 className={`font-heading text-sm font-bold transition-colors ${
                          isActive ? "text-primary" : "text-on-surface group-hover:text-primary"
                        }`}>
                          {t.title}
                        </h3>
                        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mt-0.5 leading-none">
                          {t.subtitle}
                        </p>
                      </div>

                      {/* Small arrow indicator */}
                      <ChevronRight className={`h-4 w-4 ml-auto text-primary transition-all duration-300 ${
                        isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0"
                      }`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Dynamic Detailed Syllabus Drawer */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTier}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="rounded-3xl border border-outline-variant/15 bg-surface-container-lowest p-6 sm:p-8 shadow-sm relative overflow-hidden"
                >
                  {/* Glowing Top Accent Border matching the specific tier color */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${tiers[activeTier].color}`} />

                  <div className="flex flex-col gap-6 pt-4">
                    {/* Header */}
                    <div className="flex flex-wrap justify-between items-center gap-4 border-b border-outline-variant/15 pb-5">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant px-2.5 py-1 rounded-md bg-surface-container border border-outline-variant/10">
                          {tiers[activeTier].subtitle}
                        </span>
                        <h3 className="font-heading text-2xl font-extrabold text-on-surface mt-3">
                          {tiers[activeTier].title} Curriculum Blueprint
                        </h3>
                      </div>
                    </div>

                    {/* Outcome Focus Description */}
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-2">
                        Strategic Objective Focus
                      </h4>
                      <p className="text-sm text-on-surface-variant leading-relaxed font-medium">
                        {tiers[activeTier].desc}
                      </p>
                    </div>

                    {/* Features highlight chips (No sparkles/list checkmarks) */}
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-3">
                        Curriculum Subjects & Modules
                      </h4>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {tiers[activeTier].features.map((feat, fidx) => (
                          <div
                            key={feat}
                            className="flex items-center gap-3 p-3 rounded-xl border border-outline-variant/10 bg-surface-container-low/40 hover:bg-surface-container-low transition-colors duration-200"
                          >
                            <span className="h-5 w-5 rounded-md bg-primary/10 text-primary flex items-center justify-center font-mono text-[10px] font-black shrink-0 select-none">
                              {fidx + 1}
                            </span>
                            <span className="text-xs text-on-surface font-semibold leading-tight">
                              {feat}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Physical Mockup Credential Conferred Card */}
                    <div className="mt-4 p-5 rounded-2xl bg-gradient-to-br from-surface-container to-surface-container-low border border-outline-variant/15 flex flex-col sm:flex-row items-center gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${tiers[activeTier].color} text-white shrink-0`}>
                        <Award className="h-6 w-6" />
                      </div>
                      <div className="text-center sm:text-left space-y-1">
                        <span className="text-[8px] font-black uppercase tracking-widest text-on-surface-variant/80">
                          Official Credential Awarded Upon Term Completion:
                        </span>
                        <h4 className="text-sm font-bold text-on-surface font-heading">
                          {tiers[activeTier].deliverable}
                        </h4>
                        <p className="text-[10px] text-on-surface-variant font-medium">
                          Individually endorsed digital diploma verified by Unique Mentors Academics.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 3. High-End Curriculum Comparison Section */}
      <section className="section-padding bg-surface-container-low/30 border-b border-outline-variant/15">
        <div className="container-main">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="chip mb-4 bg-primary/10 text-primary border border-primary/10 uppercase tracking-wider text-xs font-semibold">
              THE CONTRAST
            </span>
            <h2 className="font-heading text-3xl font-extrabold text-on-surface sm:text-4xl leading-tight">
              Pedagogical Comparison
            </h2>
            <p className="mt-4 text-base text-on-surface-variant">
              See how our targeted finishing school modules supplement and expand standard academic focus areas.
            </p>
          </div>

          <motion.div 
            className="max-w-4xl mx-auto rounded-3xl border border-outline-variant/15 bg-surface-container-lowest overflow-hidden shadow-sm"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container border-b border-outline-variant/15">
                    <th className="p-5 font-heading text-sm font-bold text-on-surface">Curriculum Domain</th>
                    <th className="p-5 font-heading text-sm font-bold text-on-surface-variant flex items-center gap-2">
                      <XCircle className="h-4.5 w-4.5 text-error shrink-0" />
                      Traditional School Focus
                    </th>
                    <th className="p-5 font-heading text-sm font-bold text-primary">
                      <ShieldCheck className="h-4.5 w-4.5 text-primary shrink-0 inline-block mr-2" />
                      Unique Mentors Modules
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10 text-xs sm:text-sm">
                  {comparison.map((row, idx) => (
                    <tr key={idx} className="hover:bg-surface-container-low/20 transition-colors">
                      <td className="p-5 font-bold text-on-surface">{row.feature}</td>
                      <td className="p-5 text-on-surface-variant font-medium">{row.traditional}</td>
                      <td className="p-5 text-primary font-bold">{row.finishing}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. Asymmetric Advantages Section */}
      <section className="section-padding bg-surface-container-low/60 border-t border-b border-outline-variant/20 relative">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        
        <div className="container-main relative z-10">
          <div className="grid gap-16 lg:grid-cols-12 items-start">
            
            {/* Left Column */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <span className="chip mb-4 bg-primary/10 text-primary border border-primary/10 uppercase tracking-wider text-xs font-semibold">
                OUR EDGE
              </span>
              <h2 className="font-heading text-3xl font-extrabold text-on-surface sm:text-4xl lg:text-5xl leading-tight tracking-tight">
                Why Premier Schools Partner With Us
              </h2>
              <p className="mt-6 text-base sm:text-lg text-on-surface-variant leading-relaxed font-medium">
                We do not believe in standard boilerplate slides or filler templates. Our finishing school integrations represent a target-driven behavioral blueprint, constructed by industry consultants to cultivate genuine executive-level competence.
              </p>
              <div className="mt-8 p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/15 shadow-sm hidden lg:block">
                <p className="text-sm font-bold text-primary mb-2">Institutional Impact</p>
                <p className="text-xs text-on-surface-variant leading-relaxed font-medium">
                  Schools partnering with Unique Mentors record an average 40% improvement in student participation metrics, leadership initiative, and general interview readiness scores.
                </p>
              </div>
            </div>

            {/* Right Column */}
            <motion.div 
              className="lg:col-span-7 divide-y divide-outline-variant/20"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {benefits.map((b) => (
                <motion.div
                  key={b.title}
                  className="py-8 first:pt-0 last:pb-0 flex gap-6 sm:gap-8 items-start group"
                  variants={cardEntrance}
                >
                  <span className={`font-mono text-3xl font-black bg-gradient-to-r ${b.color} bg-clip-text text-transparent select-none pt-1 shrink-0`}>
                    {b.num}
                  </span>
                  
                  <div className="space-y-1">
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-on-surface group-hover:text-primary transition-colors">
                      {b.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-wider mt-0.5">
                      {b.focus}
                    </p>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed pt-2 font-medium">
                      {b.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* 5. Partnership Roadmap timeline */}
      <section className="section-padding relative">
        <div className="container-main">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="chip mb-4 bg-primary/10 text-primary border border-primary/10 uppercase tracking-wider text-xs font-semibold">
              PARTNERSHIP MAP
            </span>
            <h2 className="font-heading text-3xl font-extrabold text-on-surface sm:text-4xl">
              Integration Process Roadmap
            </h2>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/10 via-primary/30 to-primary/10 pointer-events-none" />

            <div className="space-y-12">
              {steps.map((s, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                  <motion.div
                    key={s.step}
                    className={`flex flex-col lg:flex-row items-start relative ${
                      isLeft ? "lg:flex-row-reverse" : ""
                    }`}
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <div className="absolute left-8 lg:left-1/2 -translate-x-[15px] h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary-container border-4 border-white shadow-md flex items-center justify-center z-10">
                      <span className="text-[10px] font-black text-white">{s.step}</span>
                    </div>

                    <div className="pl-16 lg:pl-0 lg:w-[45%]">
                      <div className="rounded-3xl border border-outline-variant/15 bg-surface-container-lowest p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[220px]">
                        <div>
                          <h4 className="text-base sm:text-lg font-bold text-on-surface font-[family-name:var(--font-heading)]">
                            {s.title}
                          </h4>
                          <p className="mt-2 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                            {s.desc}
                          </p>
                        </div>
                        <div className="mt-4 border-t border-outline-variant/10 pt-3 flex justify-between items-center">
                          <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider">
                            Key Deliverable:
                          </span>
                          <span className="text-[10px] font-semibold text-primary">
                            {s.deliverable}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
