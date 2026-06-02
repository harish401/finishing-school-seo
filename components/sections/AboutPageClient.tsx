"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, Pause, MapPin, Mail, Phone } from "lucide-react";

/* ─── Team Data (Real) ─── */
const founders = [
  {
    name: "Dr. Deepa Seira Babu",
    role: "Founder & Coach Teacher",
    image: "/team/Dr. Deepa Seira Babu.png",
    tier: "founder" as const,
  },
  {
    name: "Dr. Praveena Prathapachandran",
    role: "Founder & Coach Teacher",
    image: "/team/Dr. Praveena Prathapachandran.png",
    tier: "founder" as const,
  },
];

const leadership = [
  {
    name: "Ms. Kavitha R Nair",
    role: "Academic Head",
    image: "/team/Ms. Kavitha R Nair.png",
    tier: "leader" as const,
  },
  {
    name: "Ms. Amritha Santhosh",
    role: "Business Development Manager",
    image: "/team/Ms. Amritha Santhosh.png",
    tier: "leader" as const,
  },
];

const teamMembers = [
  {
    name: "Ms. Abhirami Suresh",
    role: "Senior Executive - Marketing & Sales",
    image: "/team/Ms. Abhirami Suresh.png",
    tier: "member" as const,
  },
  {
    name: "Ms. Linu Sukumaran",
    role: "Senior Executive - Marketing & Sales",
    image: "/team/Ms. Linu Sukumaran.png",
    tier: "member" as const,
  },
  {
    name: "Ms. Linu Roy",
    role: "Senior Executive - Operations",
    image: "/team/Ms. Linu Roy.png",
    tier: "member" as const,
  },
  {
    name: "Ms. Jomol Benny",
    role: "Senior Executive - Operations",
    image: "/team/Ms. Jomol Benny.png",
    tier: "member" as const,
  },
  {
    name: "Ms. Aiswarya A",
    role: "Junior Executive - Marketing & Sales",
    image: "/team/Ms. Aiswarya A.png",
    tier: "member" as const,
  },
  {
    name: "Ms. Aiswarya Binu",
    role: "Junior Executive - Operations",
    image: "/team/Ms. Aiswarya Binu.png",
    tier: "member" as const,
  },
];

/* ─── Pillar Data (From Live Site) ─── */
const pillars = [
  {
    num: "01",
    title: "Our Vision",
    desc: "To be a global leader in career transformation and skill development by empowering individuals with exceptional training, guidance, and opportunities, shaping future-ready professionals and leaders.",
    accent: "from-primary to-primary-dim",
  },
  {
    num: "02",
    title: "Our Mission",
    desc: "To provide innovative, high-quality training and comprehensive support services for medical and healthcare professionals to excel in licensure exams and secure international opportunities, while also nurturing young minds through our Finishing School.",
    accent: "from-emerald-500 to-teal-500",
  },
  {
    num: "03",
    title: "A Decade of Transformation",
    desc: "Celebrating over 11 years of impactful service, we take pride in having guided countless professionals at every stage of their journey. This milestone marks our unwavering commitment to empowering the next generation of globally minded professionals.",
    accent: "from-indigo-500 to-violet-500",
  },
];

/* ─── Counter Animation Hook ─── */
function useCountUp(end: number, duration: number = 2000, startCounting: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!startCounting) return;
    let startTime: number | null = null;
    let animationFrame: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };
    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, startCounting]);
  return count;
}

function CounterCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const count = useCountUp(value, 2000, isVisible);

  return (
    <motion.div
      ref={ref}
      className="p-6 sm:p-8 text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <p className="font-heading text-4xl lg:text-6xl font-black text-primary tabular-nums">
        {count}{suffix}
      </p>
      <p className="mt-3 text-[11px] font-extrabold uppercase tracking-widest text-on-surface-variant">
        {label}
      </p>
    </motion.div>
  );
}

/* ─── Team Card Component ─── */
function TeamCard({
  member,
  index,
  large = false,
}: {
  member: { name: string; role: string; image: string; tier: string };
  index: number;
  large?: boolean;
}) {
  return (
    <motion.div
      className={`group relative flex flex-col items-center text-center ${large ? "" : ""}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
    >
      <div
        className={`relative overflow-hidden rounded-3xl border border-outline-variant/15 bg-surface-container-lowest shadow-sm hover:shadow-xl transition-all duration-500 w-full ${large ? "aspect-[3/4]" : "aspect-[3/4]"
          }`}
      >
        {/* Photo */}
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes={large ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Founder Badge */}
        {member.tier === "founder" && (
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/90 text-white text-[9px] font-black uppercase tracking-wider backdrop-blur-sm">
              Co-Founder
            </span>
          </div>
        )}

        {/* Hover Info */}
        <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
          <h3 className="font-heading text-base font-bold text-white leading-tight">
            {member.name}
          </h3>
          <p className="text-xs text-white/80 font-medium mt-1">{member.role}</p>
        </div>
      </div>

      {/* Static Name Below Card */}
      <div className="mt-4 px-2">
        <h3 className="font-heading text-sm font-bold text-on-surface group-hover:text-primary transition-colors leading-tight">
          {member.name}
        </h3>
        <p className="text-[11px] text-on-surface-variant font-medium mt-1">{member.role}</p>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════ */
export function AboutPageClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [activeFounder, setActiveFounder] = useState(0);
  const [activePillar, setActivePillar] = useState(0);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsVideoPlaying(true);
    } else {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  return (
    <div className="bg-background overflow-hidden">

      {/* ═══════════ 1. CINEMATIC BACKGROUND VIDEO HERO ═══════════ */}
      <section ref={heroRef} className="relative w-full h-screen min-h-[550px] overflow-hidden bg-black flex items-center justify-center">
        {/* Absolute Background Video (Fully occupied) */}
        <motion.div className="absolute inset-0 z-0" style={{ scale: heroScale }}>
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="/team/team.png"
          >
            <source src="/team/about_video.mp4" type="video/mp4" />
          </video>
          {/* Ambient overlay mask to keep text legible and hide double text clashing */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/40 to-black/85 z-10" />
        </motion.div>

        {/* Foreground Title overlay */}
        <motion.div
          className="container-main max-w-5xl mx-auto text-center px-6 relative z-20"
          style={{ opacity: heroOpacity }}
        >
          <motion.span
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 text-white border border-white/20 text-xs font-extrabold uppercase tracking-widest mb-6 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            About Us
          </motion.span>

          <motion.h1
            className="font-heading text-4xl font-black text-white sm:text-5xl lg:text-7xl leading-[1.1] tracking-tight max-w-4xl mx-auto text-balance"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            Your Trusted Partner in{" "}
            <span className="bg-gradient-to-r from-primary-container via-blue-300 to-indigo-200 bg-clip-text text-transparent">
              Transforming Careers
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-2xl mx-auto text-sm sm:text-lg text-white/80 leading-relaxed font-semibold text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Expert training, personalized guidance, and global opportunities — since 2015.
          </motion.p>
        </motion.div>

        {/* Video Toggle Button */}
        <button
          onClick={toggleVideo}
          className="absolute bottom-8 right-8 z-30 flex items-center justify-center h-12 w-12 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-md hover:bg-white/20 transition-all duration-300 cursor-pointer"
          aria-label={isVideoPlaying ? "Pause video" : "Play video"}
        >
          {isVideoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
        </button>
      </section>

      {/* ═══════════ 2. FOUNDERS STORY ═══════════ */}
      <section className="section-padding relative border-b border-outline-variant/15">
        <div className="container-main">
          <div className="grid gap-12 lg:gap-20 lg:grid-cols-12 items-center">

            {/* Left: Founder Photos */}
            <motion.div
              className="lg:col-span-5 relative"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative">
                {/* Glow */}
                <div className="absolute -inset-6 bg-gradient-to-br from-primary/8 to-indigo-500/8 rounded-[40px] blur-2xl pointer-events-none" />

                {/* Main Photo */}
                <div className="relative rounded-[32px] overflow-hidden border border-outline-variant/20 shadow-xl aspect-[4/5] bg-surface">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeFounder}
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={founders[activeFounder].image}
                        alt={founders[activeFounder].name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover object-top"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Name Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 z-10">
                    <h3 className="font-heading text-xl font-bold text-white">
                      {founders[activeFounder].name}
                    </h3>
                    <p className="text-sm text-white/80 font-medium mt-1">
                      {founders[activeFounder].role}
                    </p>
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="flex gap-3 mt-4 justify-center">
                  {founders.map((f, i) => (
                    <button
                      key={f.name}
                      onClick={() => setActiveFounder(i)}
                      className={`relative h-16 w-16 rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${activeFounder === i
                          ? "border-primary shadow-lg shadow-primary/20 scale-105"
                          : "border-outline-variant/20 opacity-60 hover:opacity-100"
                        }`}
                    >
                      <Image src={f.image} alt={f.name} fill sizes="64px" className="object-cover object-top" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: Story Content */}
            <motion.div
              className="lg:col-span-7 space-y-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <span className="text-xs uppercase tracking-widest font-black text-primary/70">
                About Unique Mentors
              </span>
              <h2 className="text-3xl font-extrabold text-on-surface sm:text-4xl lg:text-5xl font-heading leading-tight tracking-tight">
                Empowering <span className="bg-gradient-to-r from-primary to-primary-dim bg-clip-text text-transparent">Global Careers</span>
              </h2>
              <div className="space-y-5 text-base leading-relaxed text-on-surface-variant">
                <p>
                  At Unique Mentors, our name reflects our essence—a one-of-a-kind initiative founded by two visionary women, Dr. Deepa Seira Babu and Dr. Praveena Prathapachandran. With a shared passion for empowering medical professionals, we embarked on this journey to address the unique challenges faced by individuals aspiring to build careers abroad.
                </p>
                <p>
                  Our mission is clear: to guide healthcare professionals through the complexities of medical licensure exams, dataflow processes, and exam registrations. By providing expert training and personalized mentorship, we ensure that every candidate is equipped with the knowledge and confidence to meet international standards.
                </p>
                <p>
                  Over the years, Unique Mentors has evolved into a trusted name in healthcare education, offering specialized courses with a mix of live sessions and streaming classes. Our experienced faculty, with over a decade of expertise, has been instrumental in helping candidates achieve their goals and excel in their professional journeys.
                </p>
              </div>

              {/* Contact Quick Links */}
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="tel:+919846905789"
                  className="inline-flex items-center gap-2 text-sm font-bold text-on-surface-variant hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4" /> +91 9846905789
                </a>
                <a
                  href="mailto:info@uniquementors.com"
                  className="inline-flex items-center gap-2 text-sm font-bold text-on-surface-variant hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4" /> info@uniquementors.com
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ 3. VISION / MISSION / DECADE (INTERACTIVE ORBIT REVAMP) ═══════════ */}
      <section className="section-padding bg-surface-container-low/30 border-b border-outline-variant/15 relative overflow-hidden">
        {/* Decorative background grid lines */}
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[30rem] h-[30rem] bg-primary/3 rounded-full blur-3xl pointer-events-none" />

        <div className="container-main relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold uppercase tracking-wider mb-4">
              Our Pillars
            </span>
            <h2 className="font-heading text-3xl font-extrabold text-on-surface md:text-4xl lg:text-5xl">
              What Drives Us Forward
            </h2>
            <p className="mt-4 text-sm text-on-surface-variant leading-relaxed">
              Click or hover on each pillar node below to explore our values, vision, and decade-long commitment.
            </p>
          </div>

          <div className="grid gap-12 lg:gap-16 lg:grid-cols-12 items-center max-w-5xl mx-auto">
            {/* Left: Interactive Radial Orbit Visualizer */}
            <div className="lg:col-span-5 flex justify-center items-center py-6">
              <div className="relative w-80 h-80 flex items-center justify-center bg-surface-container-lowest/40 rounded-full border border-outline-variant/10 p-8 shadow-inner">
                {/* Dashed outer orbit rings */}
                <div className="absolute inset-4 border border-dashed border-outline-variant/20 rounded-full animate-[spin_60s_linear_infinite]" />
                <div className="absolute inset-16 border border-dashed border-primary/10 rounded-full animate-[spin_30s_linear_infinite_reverse]" />

                {/* Ambient glow behind core */}
                <div className="absolute h-32 w-32 rounded-full bg-primary/5 blur-xl animate-pulse" />

                {/* Central Brand Core Ring */}
                <div className="absolute h-28 w-28 rounded-full bg-surface-container-lowest border border-outline-variant/15 flex flex-col items-center justify-center text-center shadow-md z-10">
                  <div className="h-10 w-10 relative mb-1 opacity-80 flex items-center justify-center">
                    {/* Core Icon Fallback */}
                    <div className="absolute inset-0 bg-primary/10 rounded-full flex items-center justify-center">
                      <div className="h-3 w-3 rounded-full bg-primary animate-ping absolute" />
                      <div className="h-3.5 w-3.5 rounded-full bg-primary/30 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      </div>
                    </div>
                  </div>
                  <span className="text-[8px] font-black uppercase tracking-widest text-primary leading-none mt-1">Unique Core</span>
                  <span className="text-[7px] font-bold text-on-surface-variant mt-0.5">Est. 2015</span>
                </div>

                {/* Orbital Nodes mapping */}
                {pillars.map((p, i) => {
                  const angle = (i * 2 * Math.PI) / pillars.length - Math.PI / 2;
                  const radius = 108; // Orbit radius
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  const isActive = activePillar === i;

                  // CSS gradients based on active state
                  const activeColorClass = i === 0 
                    ? "bg-primary border-primary shadow-primary/25" 
                    : i === 1 
                      ? "bg-emerald-500 border-emerald-500 shadow-emerald-500/25" 
                      : "bg-indigo-500 border-indigo-500 shadow-indigo-500/25";

                  return (
                    <div key={p.num} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      {/* Connection SVG Path */}
                      <svg className="absolute inset-0 w-full h-full">
                        <line
                          x1="160"
                          y1="160"
                          x2={160 + x}
                          y2={160 + y}
                          className={`stroke-2 transition-all duration-700 ${
                            isActive ? "stroke-primary animate-[dash_2s_linear_infinite]" : "stroke-outline-variant/20"
                          }`}
                          strokeDasharray={isActive ? "none" : "5 5"}
                        />
                      </svg>

                      {/* Interactive Button Node */}
                      <motion.button
                        onClick={() => setActivePillar(i)}
                        onMouseEnter={() => setActivePillar(i)}
                        className={`absolute pointer-events-auto flex flex-col items-center justify-center h-16 w-16 rounded-full border shadow-sm transition-all duration-500 cursor-pointer ${
                          isActive
                            ? `${activeColorClass} text-white scale-110 shadow-lg`
                            : "bg-surface-container-lowest border-outline-variant/30 text-on-surface-variant hover:border-primary/50 hover:text-primary"
                        }`}
                        style={{ x, y }}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="font-heading text-lg font-black leading-none">{p.num}</span>
                        <span className="text-[7px] font-extrabold uppercase tracking-widest leading-none mt-1">
                          {p.title.split(" ")[1] || "Pillar"}
                        </span>
                      </motion.button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Active Detail Drawer */}
            <div className="lg:col-span-7">
              <div className="relative min-h-[300px] rounded-3xl border border-outline-variant/15 bg-surface-container-lowest p-8 sm:p-10 shadow-sm overflow-hidden flex flex-col justify-center">
                {/* Floating Big Watermark Number inside details card */}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`watermark-${activePillar}`}
                    className="absolute -top-6 -right-4 text-[130px] font-black text-outline-variant/[0.04] leading-none select-none pointer-events-none font-heading"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                  >
                    {pillars[activePillar].num}
                  </motion.span>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePillar}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative z-10"
                  >
                    <span
                      className={`inline-block font-mono text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-6 border ${
                        activePillar === 0 
                          ? "bg-primary/10 border-primary/20 text-primary" 
                          : activePillar === 1 
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600" 
                            : "bg-indigo-500/10 border-indigo-500/20 text-indigo-600"
                      }`}
                    >
                      Pillar {pillars[activePillar].num}
                    </span>

                    <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-on-surface leading-tight">
                      {pillars[activePillar].title}
                    </h3>

                    <p className="mt-5 text-base text-on-surface-variant leading-relaxed font-medium">
                      {pillars[activePillar].desc}
                    </p>

                    <div className="mt-8 border-t border-outline-variant/15 pt-6 flex items-center gap-4">
                      {/* Sub-features highlight depending on the active pillar */}
                      {activePillar === 0 && (
                        <div className="flex flex-wrap gap-2.5">
                          {["Global Excellence", "Career Growth", "Empowering Talent", "Leadership Goals"].map((tag) => (
                            <span key={tag} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-primary/5 text-primary border border-primary/10">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      {activePillar === 1 && (
                        <div className="flex flex-wrap gap-2.5">
                          {["Healthcare Support", "Finishing School Mastery", "Comprehensive Prep", "Syllabi Alignment"].map((tag) => (
                            <span key={tag} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/5 text-emerald-700 border border-emerald-500/10">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      {activePillar === 2 && (
                        <div className="flex flex-wrap gap-2.5">
                          {["11+ Years Experience", "10,000+ Students Guided", "Proven Results", "Decade of Trust"].map((tag) => (
                            <span key={tag} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-500/5 text-indigo-700 border border-indigo-500/10">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 4. ABOUT FINISHING SCHOOL ═══════════ */}
      <section className="section-padding border-b border-outline-variant/15 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/4" />

        <div className="container-main relative z-10">
          <div className="grid gap-16 lg:grid-cols-12 items-center">

            {/* Left: Content */}
            <motion.div
              className="lg:col-span-7 space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <span className="text-xs uppercase tracking-widest font-black text-emerald-600">
                About Our Finishing School
              </span>
              <h2 className="text-3xl font-extrabold text-on-surface sm:text-4xl lg:text-5xl font-heading leading-tight tracking-tight">
                Shaping Future-Ready{" "}
                <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                  Leaders & Professionals
                </span>
              </h2>
              <div className="space-y-5 text-base leading-relaxed text-on-surface-variant">
                <p>
                  With over 11 years of experience in transforming careers through medical licensure exam training, we are now bringing our expertise to shape the leaders and innovators of tomorrow.
                </p>
                <p>
                  Our Finishing School empowers students aged 10 to 22+ with essential life skills, career readiness, and personal development training. Our program focuses on 360-degree personal growth, covering everything from dinner table etiquette to leadership development, time management to productivity enhancement, conflict resolution to negotiation skills, and personal financial management—all taught from a global perspective.
                </p>
              </div>

              {/* Module Chips */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                {[
                  "Confidence Building",
                  "Communication Skills",
                  "Interview Preparation",
                  "Grooming & Etiquette",
                  "Financial Literacy",
                  "Time Management",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-xs font-bold border border-emerald-500/20 bg-emerald-500/5 text-emerald-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href="/programs/colleges"
                className="inline-flex items-center gap-2 rounded-2xl bg-primary px-7 py-3.5 text-sm font-extrabold text-on-primary shadow-lg shadow-primary/25 transition-transform hover:-translate-y-0.5 hover:bg-primary-hover active:translate-y-0 mt-4"
              >
                Explore Programs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            {/* Right: Image Grid */}
            <motion.div
              className="lg:col-span-5 grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <div className="col-span-2 rounded-2xl overflow-hidden border border-outline-variant/10 shadow-sm aspect-[16/10] bg-surface relative">
                <Image
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600"
                  alt="Finishing School Classroom"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              <div className="rounded-2xl overflow-hidden border border-outline-variant/10 shadow-sm aspect-square bg-surface relative">
                <Image
                  src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=400"
                  alt="Student Development"
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-cover hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              <div className="rounded-2xl overflow-hidden border border-outline-variant/10 shadow-sm aspect-square bg-surface relative">
                <Image
                  src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=400"
                  alt="Group Training"
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-cover hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ 5. TEAM GROUP PHOTO ═══════════ */}
      <section className="relative overflow-hidden">
        <div className="relative w-full aspect-[21/9] sm:aspect-[21/7] lg:aspect-[21/6]">
          <Image
            src="/team/team.png"
            alt="The Unique Mentors Team"
            fill
            sizes="100vw"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 to-transparent" />
        </div>
      </section>

      {/* ═══════════ 6. TEAM GRID ═══════════ */}
      <section className="section-padding border-b border-outline-variant/15">
        <div className="container-main">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold uppercase tracking-wider mb-4">
              Our People
            </span>
            <h2 className="font-heading text-3xl font-extrabold text-on-surface md:text-4xl lg:text-5xl">
              Meet the Team
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-on-surface-variant">
              At Unique Mentors, our expert team offers personalized guidance in medical licensure, Dataflow processing, finishing school programs, and career development.
            </p>
          </motion.div>

          {/* Founders - 2 Large Cards */}
          <div className="grid gap-8 sm:grid-cols-2 max-w-2xl mx-auto mb-12">
            {founders.map((m, i) => (
              <TeamCard key={m.name} member={m} index={i} large />
            ))}
          </div>

          {/* Leadership - 2 Cards */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto mb-12">
            {leadership.map((m, i) => (
              <TeamCard key={m.name} member={m} index={i} />
            ))}
          </div>

          {/* Team Members - 6 Cards */}
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {teamMembers.map((m, i) => (
              <TeamCard key={m.name} member={m} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 7. IMPACT COUNTERS ═══════════ */}
      <section className="section-padding bg-surface-container-low/30 border-b border-outline-variant/15">
        <div className="container-main">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold uppercase tracking-wider mb-4">
              Our Impact
            </span>
            <h2 className="font-heading text-3xl font-extrabold text-on-surface md:text-4xl">
              11+ Years of Transforming Careers
            </h2>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            <CounterCard value={500} suffix="+" label="Completed Batches" />
            <CounterCard value={10000} suffix="+" label="Students Trained" />
            <CounterCard value={20} suffix="+" label="Specialized Courses" />
            <CounterCard value={11} suffix="+" label="Years of Excellence" />
          </div>
        </div>
      </section>

      {/* ═══════════ 8. LOCATION & CTA ═══════════ */}
      <section className="section-padding bg-inverse-surface text-inverse-on-surface relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55rem] h-[55rem] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

        <div className="container-main relative z-10 max-w-4xl mx-auto">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-white text-3xl font-extrabold md:text-4xl tracking-tight leading-tight">
                Visit Us in Kochi
              </h2>
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-inverse-on-surface/80 leading-relaxed">
                    1st Floor, Jyothy, Near IMA Blood Bank, Ernakulathappan Temple Road, Kochi, Kerala 682016
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary shrink-0" />
                  <a href="tel:+919846905789" className="text-sm text-inverse-on-surface/80 hover:text-primary transition-colors">
                    +91 9846905789
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary shrink-0" />
                  <a href="mailto:info@uniquementors.com" className="text-sm text-inverse-on-surface/80 hover:text-primary transition-colors">
                    info@uniquementors.com
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="text-center lg:text-right"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <p className="text-sm text-inverse-on-surface/70 mb-6 leading-relaxed">
                Take the first step towards building confidence, character, and career clarity. Partner with Unique Mentors today.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 text-sm font-extrabold text-on-primary shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 active:translate-y-0 hover:bg-primary-hover"
              >
                Get In Touch
                <ArrowRight className="h-4.5 w-4.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
