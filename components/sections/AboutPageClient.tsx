"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function AboutPageClient() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const values = [
    {
      num: "01",
      title: "Impact-Driven Growth",
      tagline: "Tangible Student Outcomes First",
      desc: "We measure our success strictly by the progression of our students. Our curriculum is constantly audited to align with real placement success metrics, soft skills competence, and lasting professional transformation.",
      accent: "from-blue-500 to-indigo-500"
    },
    {
      num: "02",
      title: "Deliberate Inclusivity",
      tagline: "High-Caliber Education for All",
      desc: "Premium finishing school programs should not be exclusive. We design our training methodologies and pricing scales so that students from diverse backgrounds across India can master executive-level confidence.",
      accent: "from-purple-500 to-pink-500"
    },
    {
      num: "03",
      title: "Pedagogical Innovation",
      tagline: "Moving Beyond Passive Lectures",
      desc: "Textbooks don't teach real-world agility. We blend modern behavioral sciences, intensive video feedback loops, and peer-to-peer communication battles to simulate high-pressure corporate situations.",
      accent: "from-orange-500 to-red-500"
    },
    {
      num: "04",
      title: "Active Lifelong Mentorship",
      tagline: "Belief in Unlocked Human Potential",
      desc: "Skill acquisition is only half the journey. Every student is paired with industry leaders who provide constructive criticism, emotional grounding, and lifetime career trajectory mapping.",
      accent: "from-teal-500 to-emerald-500"
    }
  ];

  const milestones = [
    {
      year: "2016",
      title: "The Genesis",
      desc: "Unique Mentors was founded with a single classroom and a massive goal: to systematically eliminate the employability deficit in local graduates."
    },
    {
      year: "2019",
      title: "Academic Partnerships",
      desc: "Integrated custom modules within major state universities and colleges, training over 10,000+ students within academic schedules."
    },
    {
      year: "2022",
      title: "Corporate Integrations",
      desc: "Partnered with mid-market IT and financial enterprises to train first-year hires, perfecting the transition from campus to corporate desk."
    },
    {
      year: "2026",
      title: "The Digital Leap",
      desc: "Launched our state-of-the-art hybrid portal, delivering customized personality, grooming, and financial literacy to students nationwide."
    }
  ];

  const mentors = [
    {
      name: "Dr. Ananya Rao",
      title: "Founder & Lead Mentor",
      specialty: "Communication & Executive Leadership",
      bio: "Former corporate HR director with 15+ years in talent acquisition. Ananya founded Unique Mentors to directly fix the behavioral deficits she observed in thousands of job applicants.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Rajesh Kumar",
      title: "Financial Literacy Coach",
      specialty: "Personal Finance & Strategic Investing",
      bio: "Ex-investment banker and certified wealth manager. Rajesh is dedicated to teaching early-career professionals how to negotiate salaries, structure tax frameworks, and build compound wealth.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Meera Iyer",
      title: "Grooming & Corporate Etiquette Expert",
      specialty: "Professional Branding & Decorum",
      bio: "International corporate trainer specialized in presentation dynamics and body language. Meera coaches students in non-verbal storytelling, corporate dressing, and social poise.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400"
    }
  ];

  return (
    <div className="bg-background overflow-hidden">
      
      {/* 1. Typography-Driven Editorial Hero Section */}
      <section className="section-padding bg-surface relative min-h-[70vh] flex items-center justify-center border-b border-outline-variant/15">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#2563eb_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-10 left-1/4 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        
        <div className="container-main relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="chip bg-primary/10 text-primary border border-primary/10 uppercase tracking-widest text-xs font-bold px-4 py-1.5 rounded-full mb-6">
              Who We Are
            </span>
          </motion.div>
          
          <motion.h1 
            className="font-heading text-4xl font-extrabold text-on-surface sm:text-6xl lg:text-7xl leading-tight tracking-tight mt-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Crafting the Next Generation of{" "}
            <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent">
              Standout Professionals
            </span>
          </motion.h1>
          
          <motion.p 
            className="mx-auto mt-8 max-w-2xl text-base sm:text-xl text-on-surface-variant leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Unique Mentors is not just an academy—it is a launchpad. We replace standard textbooks with dynamic workshops to transform raw graduates into polish-ready executives.
          </motion.p>
        </div>
      </section>

      {/* 2. "The Spark" - Editorial Two-Column Story Spread */}
      <section className="section-padding relative border-b border-outline-variant/15">
        <div className="container-main">
          <div className="grid gap-16 lg:grid-cols-12 items-start">
            
            {/* Left Column: Asymmetric Narrative */}
            <motion.div 
              className="lg:col-span-7 space-y-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <span className="text-xs uppercase tracking-widest font-black text-primary/70">
                The Narrative
              </span>
              <h2 className="text-3xl font-extrabold text-on-surface sm:text-4xl lg:text-5xl font-[family-name:var(--font-heading)] leading-tight tracking-tight">
                How We Started: The Employability Deficit
              </h2>
              <div className="space-y-6 text-base sm:text-lg leading-relaxed text-on-surface-variant">
                <p>
                  Every year, millions of bright young minds graduate from India&apos;s educational institutions. Yet, HR departments and corporate recruiters share a silent frustration: the majority of these graduates lack the soft communication, situational agility, and basic professional grooming required to contribute on day one.
                </p>
                <p>
                  We saw this systemic divide as a profound loss of national potential. Our founder, Dr. Ananya Rao, decided to establish a finishing school modeled not after academic lectures, but after executive coaching spaces.
                </p>
                <p>
                  Today, Unique Mentors functions as a bridge. We address the unspoken rules of the corporate landscape, ensuring every student acquires the self-assured demeanor that opens doors.
                </p>
              </div>
            </motion.div>

            {/* Right Column: Premium Human-Crafted Quote Spread */}
            <motion.div 
              className="lg:col-span-5 lg:sticky lg:top-28"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="rounded-3xl border border-outline-variant/20 bg-surface-container-low p-8 sm:p-10 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full pointer-events-none" />
                
                <span className="text-6xl font-serif text-primary/20 absolute -top-2 left-6 select-none">
                  &ldquo;
                </span>
                
                <p className="text-base sm:text-lg font-medium italic text-on-surface leading-relaxed relative z-10 pt-4">
                  Traditional education awards degrees, but finishing schools award access. We make sure our students never have to hide their talent behind a lack of confidence.
                </p>
                
                <div className="mt-8 border-t border-outline-variant/30 pt-6 flex items-center gap-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden border border-primary/20">
                    <Image
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120"
                      alt="Dr. Ananya Rao Portrait"
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-on-surface">Dr. Ananya Rao</h4>
                    <p className="text-xs text-on-surface-variant font-medium">Founder, Unique Mentors</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. "Our Core Philosophy" - Pure Typographic Focus (No Icons) */}
      <section className="section-padding bg-surface-container-low/30 border-b border-outline-variant/15">
        <div className="container-main text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="chip mb-4 bg-primary/10 text-primary border border-primary/10 uppercase tracking-wider text-xs font-semibold">
              OUR PILLARS
            </span>
            <h2 className="font-heading text-3xl font-extrabold text-on-surface md:text-4xl lg:text-5xl">
              Our Core Philosophy
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-base text-on-surface-variant">
              We reject generic templates. Our operations are governed by four meticulous, human-centric principles that guarantee real transformation.
            </p>
          </motion.div>

          <motion.div 
            className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-left"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {values.map((v) => (
              <motion.div
                key={v.num}
                className="group rounded-2xl border border-outline-variant/15 bg-surface-container-lowest p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                variants={fadeInUp}
                whileHover={{ y: -6 }}
              >
                <div>
                  {/* Clean Accent Number instead of an AI icon */}
                  <span className={`inline-block font-mono text-3xl font-black mb-6 bg-gradient-to-r ${v.accent} bg-clip-text text-transparent`}>
                    {v.num}
                  </span>
                  
                  <h3 className="font-heading text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                    {v.title}
                  </h3>
                  
                  <p className="text-[10px] font-bold text-primary uppercase tracking-wider mt-1.5">
                    {v.tagline}
                  </p>
                  
                  <p className="mt-4 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. "Our Timeline" - Fully Animated Experience Track */}
      <section className="section-padding border-b border-outline-variant/15 relative">
        <div className="container-main">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="chip mb-4 bg-primary/10 text-primary border border-primary/10 uppercase tracking-wider text-xs font-semibold">
              OUR JOURNEY
            </span>
            <h2 className="font-heading text-3xl font-extrabold text-on-surface sm:text-4xl">
              Decade of Impact
            </h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline center line */}
            <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/10 via-primary/30 to-primary/10 pointer-events-none" />

            <div className="space-y-12">
              {milestones.map((m, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                  <motion.div
                    key={m.year}
                    className={`flex flex-col lg:flex-row items-start relative ${
                      isLeft ? "lg:flex-row-reverse" : ""
                    }`}
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    {/* Circle Indicator */}
                    <div className="absolute left-8 lg:left-1/2 -translate-x-[15px] h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary-container border-4 border-white shadow-md flex items-center justify-center z-10">
                      <div className="h-2.5 w-2.5 rounded-full bg-white animate-pulse" />
                    </div>

                    {/* Timeline Card */}
                    <div className="pl-16 lg:pl-0 lg:w-[45%]">
                      <div className="rounded-2xl border border-outline-variant/15 bg-surface-container-lowest p-6 shadow-sm hover:shadow-md transition-all duration-300">
                        <span className="font-mono text-xl font-black text-primary mb-2 block">
                          {m.year}
                        </span>
                        <h4 className="text-base font-bold text-on-surface font-[family-name:var(--font-heading)]">
                          {m.title}
                        </h4>
                        <p className="mt-2 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                          {m.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. "Meet the Mentors" - Hover Bio Revealing Cards */}
      <section className="section-padding">
        <div className="container-main text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="chip mb-4 bg-primary/10 text-primary border border-primary/10 uppercase tracking-wider text-xs font-semibold">
              ACADEMIC EXPERTS
            </span>
            <h2 className="font-heading text-3xl font-extrabold text-on-surface md:text-4xl">
              Meet the Mentors
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-on-surface-variant">
              Every Unique Mentors educator is an active business consultant or a retired recruitment director. No theorists—only practitioners.
            </p>
          </motion.div>
          
          <motion.div 
            className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {mentors.map((m) => (
              <motion.div
                key={m.name}
                className="group rounded-3xl border border-outline-variant/15 bg-surface-container-lowest p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden relative"
                variants={fadeInUp}
                whileHover={{ y: -8 }}
              >
                <div className="flex flex-col items-center">
                  {/* Portrait container */}
                  <div className="relative h-32 w-32 rounded-full overflow-hidden border-2 border-primary/10 group-hover:border-primary/40 transition-all duration-300 shadow-inner">
                    <Image
                      src={m.image}
                      alt={m.name}
                      fill
                      sizes="128px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  
                  <h3 className="font-heading mt-6 text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                    {m.name}
                  </h3>
                  
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider mt-1">
                    {m.title}
                  </p>
                  
                  <div className="mt-2.5 inline-flex items-center rounded-md bg-surface-container px-2.5 py-0.5 text-xs font-medium text-on-surface-variant">
                    {m.specialty}
                  </div>

                  {/* Divider */}
                  <div className="my-5 border-t border-outline-variant/20 w-full" />
                  
                  {/* Detailed Portrait Bio - making the card feel "human crafted" */}
                  <p className="text-xs text-on-surface-variant leading-relaxed text-left">
                    {m.bio}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-outline-variant/20 flex items-center justify-between w-full">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant">
                    Specialist Profile
                  </span>
                  <div className="text-primary hover:text-primary-container p-1 shrink-0 rounded-full hover:bg-primary/5 transition-colors">
                    <ArrowUpRight className="h-4.5 w-4.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
}
