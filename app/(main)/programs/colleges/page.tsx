"use client";

import type { Metadata } from "next";
import { 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  Award, 
  MessageSquare, 
  Wallet, 
  UserCheck, 
  Rocket, 
  MapPin, 
  CheckCircle,
  ArrowRight 
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CollegeProgramsPage() {
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
      icon: Award,
      title: "Placement Readiness",
      desc: "Mock interviews, GD practice, and resume building that directly improve placement percentages.",
      color: "text-primary bg-primary/10 border-primary/20",
    },
    {
      icon: MessageSquare,
      title: "Corporate Communication",
      desc: "Business email writing, presentation skills, and meeting etiquette for the corporate world.",
      color: "text-purple-600 bg-purple-50 border-purple-100",
    },
    {
      icon: Wallet,
      title: "Financial Literacy",
      desc: "Investing, tax planning, and personal finance — essential skills for first-time earners.",
      color: "text-success bg-success/10 border-success/20",
    },
    {
      icon: UserCheck,
      title: "Professional Grooming",
      desc: "Corporate dressing, personal branding, and professional behaviour training.",
      color: "text-secondary bg-secondary/15 border-secondary/20",
    },
    {
      icon: Rocket,
      title: "Entrepreneurship Basics",
      desc: "Business model canvas, pitch decks, and startup ecosystem awareness for aspiring founders.",
      color: "text-warning bg-warning/10 border-warning/20",
    },
    {
      icon: MapPin,
      title: "Career Counselling",
      desc: "Psychometric assessments and one-on-one career guidance sessions with industry mentors.",
      color: "text-error bg-error/10 border-error/20",
    },
  ];

  const steps = [
    { step: "01", title: "Consult", desc: "We meet with your placement cell and department heads to understand specific requirements." },
    { step: "02", title: "Design", desc: "A custom syllabus is created based on industry demands, student feedback, and college goals." },
    { step: "03", title: "Execute", desc: "Intensive workshops and bootcamps delivered on-campus or via our online platform." },
    { step: "04", title: "Measure", desc: "Pre & post assessments, placement tracking, and detailed impact reports for administration." },
  ];

  const tiers = [
    { 
      title: "Pre-Placement", 
      subtitle: "3rd Year", 
      icon: Sparkles,
      desc: "Foundation in communication, aptitude, and group discussion skills before the placement season.",
      features: ["Advanced GD Simulators", "Quantitative & Logical Aptitude", "Professional Email Writing", "Body Language & Voice Tone"],
      color: "from-blue-500 to-indigo-500"
    },
    { 
      title: "Placement Bootcamp", 
      subtitle: "Final Year", 
      icon: BookOpen,
      desc: "Intensive mock interviews, resume polishing, and corporate etiquette training.",
      features: ["1-on-1 Panel Mock Interviews", "ATS-Optimized Resumes", "LinkedIn Profile Auditing", "Corporate Behavior Protocols"],
      color: "from-purple-500 to-pink-500"
    },
    { 
      title: "Career Launchpad", 
      subtitle: "Post-Graduation", 
      icon: GraduationCap,
      desc: "Financial planning, workplace readiness, and first-90-days corporate survival guide.",
      features: ["Salary Negotiation Tactics", "Tax Planning & Investments", "Workplace Conflict Management", "90-Day Execution Playbooks"],
      color: "from-orange-500 to-red-500"
    },
  ];

  return (
    <div className="overflow-hidden bg-background">
      
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-primary via-primary-container to-secondary text-white relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        
        <div className="container-main text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm border border-white/10">
              FOR COLLEGES
            </span>
          </motion.div>
          
          <motion.h1 
            className="mt-6 font-heading text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl text-balance leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Campus-Ready Programs <br className="hidden md:inline" />
            <span className="bg-gradient-to-r from-primary-dim to-white bg-clip-text text-transparent">
              for High-Yield Placements
            </span>
          </motion.h1>
          
          <motion.p 
            className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-white/80 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Bridge the gap between academics and high-end industries. Empower your batches with placement survival metrics, professional behaviors, and strong self-presentations.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-primary shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              Partner With Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Program Overview / Tiers */}
      <section className="section-padding">
        <div className="container-main">
          <div className="text-center max-w-3xl mx-auto">
            <span className="chip mb-4 bg-primary/10 text-primary border border-primary/10 uppercase tracking-wider text-xs font-semibold">
              ACADEMIC PATHWAYS
            </span>
            <h2 className="font-heading text-3xl font-extrabold text-on-surface sm:text-4xl leading-tight">
              Industry-Aligned Corporate Training
            </h2>
            <p className="mt-4 text-base text-on-surface-variant leading-relaxed">
              Our campus integrations align with academic calendars to groom students as they progress towards graduation, ensuring high-conversion employment readiness.
            </p>
          </div>
          
          <motion.div 
            className="mt-16 grid gap-8 lg:grid-cols-3 items-stretch"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {tiers.map((tier) => {
              const TierIcon = tier.icon;
              return (
                <motion.div
                  key={tier.title}
                  className="rounded-3xl border border-outline-variant/15 bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group card-lift"
                  variants={cardEntrance}
                  whileHover={{ y: -6 }}
                >
                  <div>
                    {/* Top Accent Gradient Bar */}
                    <div className={`h-2 bg-gradient-to-r ${tier.color}`} />
                    
                    <div className="p-8">
                      <div className="flex justify-between items-center mb-6">
                        <span className="chip text-xs bg-surface-container text-on-surface-variant font-bold border border-outline-variant/10 uppercase tracking-wide px-3 py-1">
                          {tier.subtitle}
                        </span>
                        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${tier.color} text-white`}>
                          <TierIcon className="h-5 w-5" />
                        </div>
                      </div>

                      <h3 className="font-heading text-2xl font-bold text-on-surface group-hover:text-primary transition-colors">
                        {tier.title}
                      </h3>
                      
                      <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">
                        {tier.desc}
                      </p>

                      {/* Divider */}
                      <div className="my-6 border-t border-outline-variant/20" />

                      {/* Features checklist */}
                      <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider mb-4">
                        Key Focus Areas
                      </h4>
                      <ul className="space-y-3">
                        {tier.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-2.5">
                            <CheckCircle className="h-4.5 w-4.5 text-success shrink-0 mt-0.5" />
                            <span className="text-sm text-on-surface-variant font-medium">
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

      {/* Benefits */}
      <section className="section-padding bg-surface-container-low/60 border-t border-b border-outline-variant/20 relative">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        
        <div className="container-main relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="chip mb-4 bg-primary/10 text-primary border border-primary/10 uppercase tracking-wider text-xs font-semibold">
              ADVANTAGES
            </span>
            <h2 className="font-heading text-3xl font-extrabold text-on-surface sm:text-4xl leading-tight">
              Why Top Institutions Partner With Us
            </h2>
          </div>
          
          <motion.div 
            className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {benefits.map((b) => {
              const BenefitIcon = b.icon;
              return (
                <motion.div
                  key={b.title}
                  className="rounded-2xl border border-outline-variant/15 bg-surface-container-lowest p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-start"
                  variants={cardEntrance}
                  whileHover={{ y: -4 }}
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl border mb-5 ${b.color}`}>
                    <BenefitIcon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-on-surface">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-on-surface-variant leading-relaxed">{b.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* How It Works (Timeline) */}
      <section className="section-padding relative">
        <div className="container-main">
          <div className="text-center max-w-2xl mx-auto">
            <span className="chip mb-4 bg-primary/10 text-primary border border-primary/10 uppercase tracking-wider text-xs font-semibold">
              ECOSYSTEM PIPELINE
            </span>
            <h2 className="font-heading text-3xl font-extrabold text-on-surface sm:text-4xl">
              Integration Process
            </h2>
          </div>
          
          <div className="mt-16 relative">
            <div className="absolute top-8 left-16 right-16 h-0.5 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 hidden lg:block pointer-events-none z-0" />
            
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
                  className="flex flex-col items-center text-center group"
                  variants={cardEntrance}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-container text-xl font-black text-white shadow-md border-2 border-white transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg">
                    {s.step}
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-on-surface-variant leading-relaxed max-w-[240px]">
                    {s.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-surface-container-low border-t border-b border-outline-variant/20 relative">
        <div className="container-main">
          <motion.div 
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {[
              { value: "100+", label: "College Partners" },
              { value: "25,000+", label: "Students Trained" },
              { value: "85%", label: "Placement Improvement" },
              { value: "4.8/5", label: "Student Rating" },
            ].map((stat) => (
              <motion.div 
                key={stat.label} 
                className="p-4"
                variants={cardEntrance}
              >
                <p className="font-heading text-4xl font-black text-primary">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs uppercase tracking-wider font-bold text-on-surface-variant">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-inverse-surface text-inverse-on-surface relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        
        <div className="container-main text-center relative z-10 max-w-3xl mx-auto">
          <motion.h2 
            className="font-heading text-3xl font-extrabold md:text-4xl tracking-tight leading-tight"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Ready to Boost Your Campus Placements?
          </motion.h2>
          
          <motion.p 
            className="mx-auto mt-4 text-sm sm:text-base text-inverse-on-surface/85 leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Partner with Unique Mentors today. Arm your students with the absolute competitive edge they need to stand out in today&apos;s hyper-selective placement cycle.
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
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-bold text-on-primary shadow-lg transition-transform duration-300 hover:scale-105"
            >
              Schedule a Campus Visit
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
