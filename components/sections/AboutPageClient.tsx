"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, Pause, MapPin, Mail, Phone } from "lucide-react";
import { PillarShuffleHero } from "@/components/ui/suffle-hero";

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
    tags: ["Global Excellence", "Career Growth", "Empowering Talent", "Leadership Goals"],
  },
  {
    num: "02",
    title: "Our Mission",
    desc: "To provide innovative, high-quality training and comprehensive support services for medical and healthcare professionals to excel in licensure exams and secure international opportunities, while also nurturing young minds through our Finishing School.",
    accent: "from-emerald-500 to-teal-500",
    tags: ["Healthcare Support", "Finishing School", "Exam Prep", "Personal Mentorship"],
  },
  {
    num: "03",
    title: "A Decade of Transformation",
    desc: "Celebrating over 11 years of impactful service, we take pride in having guided countless professionals at every stage of their journey. This milestone marks our unwavering commitment to empowering the next generation of globally minded professionals.",
    accent: "from-indigo-500 to-violet-500",
    tags: ["11+ Years", "10,000+ Students", "Proven Results", "Trusted Guidance"],
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

      {/* ═══════════ 3. VISION / MISSION / DECADE (SHUFFLE PILLARS) ═══════════ */}
      <section className="section-padding relative overflow-hidden border-b border-outline-variant/15 bg-white">
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,rgba(37,99,235,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.05)_1px,transparent_1px)] [background-size:28px_28px]" />

        <div className="container-main relative z-10">
          <PillarShuffleHero
            pillars={pillars}
            activeIndex={activePillar}
            onActiveIndexChange={setActivePillar}
          />
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
