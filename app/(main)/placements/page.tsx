"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import {
  CheckCircle, Award, Building, Briefcase, GraduationCap,
  Star, Send, ChevronLeft, ChevronRight, Quote, Users,
  TrendingUp, MapPin, Sparkles, ArrowUpRight, Loader2, Search
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PlacedStudent {
  id: string;
  name: string;
  company: string;
  designation: string;
  package?: string;
  image: string;
  testimonial?: string;
}

const mockPlacedStudents: PlacedStudent[] = [
  {
    id: "1",
    name: "Arya Nair",
    company: "Tata Consultancy Services",
    designation: "Systems Engineer",
    package: "4.5 LPA",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    testimonial: "The finishing school program completely shifted my communication style. I cleared both technical and HR panels on my very first attempt.",
  },
  {
    id: "2",
    name: "Rahul Krishnan",
    company: "Federal Bank",
    designation: "Associate Officer",
    package: "5.8 LPA",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    testimonial: "The personality development and banking interview prep gave me the confidence to present myself naturally before senior executives.",
  },
  {
    id: "3",
    name: "Sneha Joseph",
    company: "Cognizant",
    designation: "Programmer Analyst",
    package: "4.2 LPA",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    testimonial: "From resume writing to mock group discussions, every detail was covered. The tough mock reviews were incredibly accurate to real interviews.",
  },
  {
    id: "4",
    name: "Devansh Pillai",
    company: "Infosys",
    designation: "Technology Analyst",
    package: "6.5 LPA",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    testimonial: "Unique Mentors gave me a structured path from confusion to clarity. My aptitude scores improved drastically within 3 weeks of joining.",
  },
  {
    id: "5",
    name: "Priya Menon",
    company: "HDFC Bank",
    designation: "Relationship Manager",
    package: "5.2 LPA",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=80",
    testimonial: "The GD and interview simulation sessions were very real. I felt fully prepared walking into the final round — completely calm and focused.",
  },
];

const STATS = [
  {
    label: "Placement Success Rate",
    value: "95%",
    icon: TrendingUp,
    accent: "text-success",
    bgGlow: "bg-success/5",
    borderStyle: "border-l-success",
    description: "Certified career readiness outcomes"
  },
  {
    label: "Active Hiring Partners",
    value: "120+",
    icon: Building,
    accent: "text-primary",
    bgGlow: "bg-primary/5",
    borderStyle: "border-l-primary",
    description: "Corporate recruitment network"
  },
  {
    label: "Average Package",
    value: "6.2 LPA",
    icon: Briefcase,
    accent: "text-info",
    bgGlow: "bg-info/5",
    borderStyle: "border-l-info",
    description: "Industry-competitive starting wage"
  },
  {
    label: "Highest Package",
    value: "15 LPA",
    icon: Award,
    accent: "text-warning",
    bgGlow: "bg-warning/5",
    borderStyle: "border-l-warning",
    description: "Peak individual valuation"
  },
];

const COMPANIES = [
  "TCS", "Infosys", "Wipro", "Accenture", "Federal Bank",
  "HDFC Bank", "Cognizant", "L&T", "HCL Technologies", "Capgemini",
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function AnimatedNumber({ value, inView }: { value: string; inView: boolean }) {
  const numericPart = parseFloat(value.replace(/[^0-9.]/g, ""));
  const suffix = value.replace(/[0-9.]/g, "");
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = numericPart;
    const duration = 1400;
    const step = (end / duration) * 16;
    const interval = setInterval(() => {
      start += step;
      if (start >= end) { setDisplay(end); clearInterval(interval); }
      else setDisplay(start);
    }, 16);
    return () => clearInterval(interval);
  }, [inView, numericPart]);
  const formatted = Number.isInteger(numericPart)
    ? Math.round(display).toString()
    : display.toFixed(1);
  return <>{formatted}{suffix}</>;
}

export default function PlacementsPage() {
  const [placedStudents, setPlacedStudents] = useState<PlacedStudent[]>(mockPlacedStudents);
  const [loading, setLoading] = useState(true);
  const [activeCard, setActiveCard] = useState(0);
  const [activeTab, setActiveTab] = useState<"seeker" | "employer">("seeker");

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  const statsRef = useInView();
  const carouselRef = useInView(0.1);

  // Seeker form
  const [seekerForm, setSeekerForm] = useState({
    name: "", email: "", phone: "", qualification: "",
    experience: "fresher", skills: "", resumeText: "",
  });
  const [seekerSubmitting, setSeekerSubmitting] = useState(false);
  const [seekerSuccess, setSeekerSuccess] = useState<string | null>(null);
  const [seekerError, setSeekerError] = useState<string | null>(null);

  // Employer form
  const [employerForm, setEmployerForm] = useState({
    companyName: "", contactPerson: "", email: "", phone: "",
    designationsNeeded: "", locations: "", salaryRange: "",
  });
  const [employerSubmitting, setEmployerSubmitting] = useState(false);
  const [employerSuccess, setEmployerSuccess] = useState<string | null>(null);
  const [employerError, setEmployerError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlacedStudents() {
      if (!isSupabaseConfigured || !supabase) { setLoading(false); return; }
      try {
        const { data, error } = await supabase
          .from("placed_students")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        if (data && data.length > 0) {
          setPlacedStudents(data.map((item: any) => ({
            id: item.id,
            name: item.name,
            company: item.company,
            designation: item.designation,
            package: item.package || undefined,
            image: item.image_url,
            testimonial: item.testimonial || undefined,
          })));
        }
      } catch (err) {
        console.error("[PLACEMENTS FETCH ERROR]", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPlacedStudents();
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    if (loading || placedStudents.length === 0) return;
    const t = setInterval(() => {
      setActiveCard((c) => (c + 1) % placedStudents.length);
    }, 4500);
    return () => clearInterval(t);
  }, [loading, placedStudents.length]);

  const handleSeekerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSeekerSubmitting(true); setSeekerSuccess(null); setSeekerError(null);
    if (!isSupabaseConfigured || !supabase) {
      setTimeout(() => {
        setSeekerSubmitting(false);
        setSeekerSuccess("You're registered! Our placement coordinator will reach out shortly.");
        setSeekerForm({ name: "", email: "", phone: "", qualification: "", experience: "fresher", skills: "", resumeText: "" });
      }, 1000);
      return;
    }
    try {
      const { error } = await supabase.from("job_seekers").insert({
        name: seekerForm.name, email: seekerForm.email, phone: seekerForm.phone,
        qualification: seekerForm.qualification, experience: seekerForm.experience,
        skills: seekerForm.skills, resume_text: seekerForm.resumeText,
      });
      if (error) throw error;
      setSeekerSuccess("Congratulations! Your profile is submitted. Our team will reach out within 24 hours.");
      setSeekerForm({ name: "", email: "", phone: "", qualification: "", experience: "fresher", skills: "", resumeText: "" });
    } catch (err: any) {
      setSeekerError("Something went wrong. Please try again.");
    } finally {
      setSeekerSubmitting(false);
    }
  };

  const handleEmployerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmployerSubmitting(true); setEmployerSuccess(null); setEmployerError(null);
    if (!isSupabaseConfigured || !supabase) {
      setTimeout(() => {
        setEmployerSubmitting(false);
        setEmployerSuccess("Request received! Our campus placement team will contact you today.");
        setEmployerForm({ companyName: "", contactPerson: "", email: "", phone: "", designationsNeeded: "", locations: "", salaryRange: "" });
      }, 1000);
      return;
    }
    try {
      const { error } = await supabase.from("employers").insert({
        company_name: employerForm.companyName, contact_person: employerForm.contactPerson,
        email: employerForm.email, phone: employerForm.phone,
        designations_needed: employerForm.designationsNeeded,
        locations: employerForm.locations, salary_range: employerForm.salaryRange,
      });
      if (error) throw error;
      setEmployerSuccess("Thank you! Your talent request has been logged. We'll be in touch today.");
      setEmployerForm({ companyName: "", contactPerson: "", email: "", phone: "", designationsNeeded: "", locations: "", salaryRange: "" });
    } catch (err: any) {
      setEmployerError("Submission failed. Please try again.");
    } finally {
      setEmployerSubmitting(false);
    }
  };

  // Dynamically compute existing companies from the students list to offer filters
  const availableCompanies = ["All", ...Array.from(new Set(placedStudents.map(s => s.company)))];

  // Filter logic
  const filteredStudents = placedStudents.filter(s => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.testimonial || "").toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTag = selectedTag === "All" || s.company === selectedTag;

    return matchesSearch && matchesTag;
  });

  const inputClass = "w-full bg-surface-container border border-outline-variant/40 rounded-xl px-4 py-3.5 text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-200";
  const labelClass = "block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2";

  return (
    <section className="bg-surface min-h-screen">
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden border-b border-outline-variant/20 bg-gradient-to-b from-surface-container-low/40 to-surface">
        {/* Modern Mesh Radial Overlay */}
        <div className="pointer-events-none absolute -top-48 left-1/4 w-[800px] h-[500px] rounded-full bg-primary/8 blur-3xl opacity-60" />
        <div className="pointer-events-none absolute -top-48 right-1/4 w-[600px] h-[600px] rounded-full bg-secondary/5 blur-3xl opacity-50" />

        {/* Glowing grid background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(var(--color-outline) 1px, transparent 1px), linear-gradient(90deg, var(--color-outline) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 relative">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
            <div className="max-w-3xl space-y-6">
              {/* Pulsing Live Badge */}
              <div className="inline-flex items-center gap-2.5 bg-surface-container border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                </span>
                Placement Tracker: 2024–2025
              </div>

              <h1 className="font-heading font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-on-surface text-balance">
                Bridging Ambition<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">to Global Opportunities</span>
              </h1>

              <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-2xl font-light">
                Unique Mentors is Kerala's premium finishing school, empowering ambitious graduates with polished business communication, critical thinking, and recruiter-vetted professional skills.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#join-network"
                  className="gradient-primary text-white hover:shadow-lg transition-all duration-300 font-bold px-7 py-3.5 rounded-xl text-sm flex items-center gap-2"
                >
                  Register for Placements <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href="#all-graduates"
                  className="bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-on-surface hover:text-primary transition-all duration-200 font-bold px-7 py-3.5 rounded-xl text-sm"
                >
                  Explore Student Success
                </a>
              </div>
            </div>

            {/* Featured Metric Box */}
            <div className="relative shrink-0 w-full lg:w-96">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-3xl blur-xl opacity-50" />
              <div className="relative bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-8 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-bold text-primary uppercase tracking-widest">Active Intake Status</span>
                  <span className="text-xs font-extrabold text-success bg-success/8 border border-success/15 px-2.5 py-1 rounded-full">Open</span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-surface-container rounded-2xl border border-outline-variant/10">
                    <p className="text-xs text-on-surface-variant font-medium">Average Interview Turnaround</p>
                    <p className="text-xl font-bold text-on-surface mt-1">4.8 Working Days</p>
                  </div>

                  <div className="p-4 bg-surface-container rounded-2xl border border-outline-variant/10">
                    <p className="text-xs text-on-surface-variant font-medium">Recruitment Cost for Partners</p>
                    <p className="text-xl font-bold text-primary mt-1">0% Placement Fees</p>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-3 text-xs text-on-surface-variant font-medium leading-relaxed">

                  <span>Pre-screened candidates prepared with soft skills, banking certifications, and tech frameworks.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Infinite Logo Marquee Ticker */}
      <div className="bg-surface-container-low border-b border-outline-variant/20 py-10 overflow-hidden relative">
        <div className="pointer-events-none absolute left-0 inset-y-0 w-32 bg-gradient-to-r from-surface-container-low to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 inset-y-0 w-32 bg-gradient-to-l from-surface-container-low to-transparent z-10" />

        <div className="max-w-7xl mx-auto px-6 mb-4 flex items-center justify-between">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Empowering Careers at Elite Enterprises</p>
        </div>

        <div className="relative w-full flex items-center">
          <div className="animate-marquee flex gap-12 whitespace-nowrap">
            {/* Set of logos */}
            {COMPANIES.concat(COMPANIES).concat(COMPANIES).map((company, idx) => (
              <div
                key={`${company}-${idx}`}
                className="flex items-center gap-2.5 bg-surface-container-lowest border border-outline-variant/30 px-6 py-3 rounded-2xl shadow-sm hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-primary/20 group-hover:bg-primary transition-colors" />
                <span className="text-sm font-extrabold text-on-surface-variant group-hover:text-primary transition-colors">
                  {company}
                </span>
                <span className="text-xs font-medium text-on-surface-variant/40 bg-surface-container px-2 py-0.5 rounded-md group-hover:text-primary-container transition-colors">
                  Hiring Partner
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── STATS ────────────────────────────────────────────────────── */}
      <div ref={statsRef.ref} className="max-w-7xl mx-auto px-6 py-20 relative">
        <div className="relative overflow-hidden bg-slate-950 text-white rounded-[32px] p-8 md:p-12 lg:p-16 shadow-2xl border border-white/10">
          {/* Dynamic Background Glows */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] opacity-40 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-success/10 rounded-full blur-[100px] opacity-30 pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
            {/* Hero Stat Block (Left - 5 Cols) */}
            <div className="lg:col-span-5 space-y-6 lg:border-r lg:border-white/10 lg:pr-12">
              <div className="inline-flex items-center gap-2 bg-success/10 border border-success/30 text-success text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                Audited Career Metric
              </div>

              <div className="space-y-2">
                <div className="text-7xl md:text-8xl font-black font-heading tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-success to-primary">
                  {statsRef.inView ? <AnimatedNumber value="95%" inView={statsRef.inView} /> : "—"}
                </div>
                <h3 className="text-2xl font-extrabold tracking-tight text-white">Placement Success Rate</h3>
              </div>

              <p className="text-sm text-slate-400 leading-relaxed font-light">
                Our verified curriculum guarantees that 95% of enrolled candidates transition into formal corporate roles within 90 days of graduation. This audited success rate makes Unique Mentors Kerala’s highly reliable career bridge.
              </p>

              <div className="flex items-center gap-3 pt-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="relative w-8 h-8 rounded-full border-2 border-slate-950 overflow-hidden bg-slate-800">
                      <Image
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                        alt="Student Avatar"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <span className="text-xs font-semibold text-slate-400">Joined by 1,400+ placed alumni</span>
              </div>
            </div>

            {/* Grid Stats Block (Right - 7 Cols) */}
            <div className="lg:col-span-7 grid sm:grid-cols-3 gap-8 sm:gap-6 md:pl-4">
              {/* Metric 2: Active Hiring Partners */}
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 w-fit">

                </div>
                <div className="space-y-1">
                  <div className="text-4xl md:text-5xl font-black tracking-tight text-white font-heading">
                    {statsRef.inView ? <AnimatedNumber value="120+" inView={statsRef.inView} /> : "—"}
                  </div>
                  <h4 className="text-sm font-bold text-slate-200">Hiring Partners</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-light">Direct recruitment tie-ups spanning premier banks and tech MNCs.</p>
              </div>

              {/* Metric 3: Average Package */}
              <div className="space-y-4 sm:border-l sm:border-white/10 sm:pl-8">
                <div className="p-3 rounded-xl bg-info/10 border border-info/20 w-fit">

                </div>
                <div className="space-y-1">
                  <div className="text-4xl md:text-5xl font-black tracking-tight text-white font-heading">
                    {statsRef.inView ? <AnimatedNumber value="6.2 LPA" inView={statsRef.inView} /> : "—"}
                  </div>
                  <h4 className="text-sm font-bold text-slate-200">Average Package</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-light">Highly competitive salary standards for graduating freshers.</p>
              </div>

              {/* Metric 4: Highest Package */}
              <div className="space-y-4 sm:border-l sm:border-white/10 sm:pl-8">
                <div className="p-3 rounded-xl bg-warning/10 border border-warning/20 w-fit">

                </div>
                <div className="space-y-1">
                  <div className="text-4xl md:text-5xl font-black tracking-tight text-white font-heading">
                    {statsRef.inView ? <AnimatedNumber value="15 LPA" inView={statsRef.inView} /> : "—"}
                  </div>
                  <h4 className="text-sm font-bold text-slate-200">Highest Package</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-light">Peak individual salary logged by our top-ranking candidates.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── ALUMNI CAROUSEL ──────────────────────────────────────────── */}
      <div ref={carouselRef.ref} className="bg-surface-container-low border-y border-outline-variant/20 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
            <div>
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Success Stories</p>
              <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-on-surface tracking-tight">Our Placed Alumni</h2>
              <p className="text-sm text-on-surface-variant mt-2 max-w-lg">
                Read direct testimonies of our graduates and witness the direct impact of professional finishing school training.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setActiveCard((c) => (c - 1 + placedStudents.length) % placedStudents.length)}
                className="w-11 h-11 rounded-full border border-outline-variant/40 bg-surface-container-lowest flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary hover:shadow-sm transition-all"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setActiveCard((c) => (c + 1) % placedStudents.length)}
                className="w-11 h-11 rounded-full border border-outline-variant/40 bg-surface-container-lowest flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary hover:shadow-sm transition-all"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              {/* Featured card */}
              <div className="grid md:grid-cols-5 gap-8 mb-8 items-stretch">
                <div className="md:col-span-3 bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-8 md:p-12 flex flex-col justify-between relative overflow-hidden shadow-sm">
                  <div className="absolute top-8 right-10 text-primary/8 pointer-events-none">
                    <Quote className="h-24 w-24" />
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-1.5 text-warning mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4.5 w-4.5 fill-warning stroke-none" />
                      ))}
                    </div>

                    {placedStudents[activeCard]?.testimonial && (
                      <p className="text-lg md:text-xl text-on-surface leading-relaxed font-medium mb-8 italic">
                        &ldquo;{placedStudents[activeCard].testimonial}&rdquo;
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-outline-variant/20 relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="relative h-14 w-14 rounded-2xl overflow-hidden border-2 border-primary/20 shrink-0">
                        <Image
                          src={placedStudents[activeCard]?.image || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"}
                          alt={placedStudents[activeCard]?.name || "Student"}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-extrabold text-on-surface text-base">{placedStudents[activeCard]?.name}</p>
                        <p className="text-xs text-on-surface-variant font-medium">{placedStudents[activeCard]?.designation}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="inline-block text-xs font-bold text-primary bg-primary/8 border border-primary/15 px-3 py-1.5 rounded-xl mb-1.5">
                        {placedStudents[activeCard]?.company}
                      </span>
                      {placedStudents[activeCard]?.package && (
                        <p className="text-sm font-extrabold text-success">{placedStudents[activeCard].package}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Side stack */}
                <div className="md:col-span-2 flex flex-col gap-4">
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1 px-1">Other Success Spotlights</p>
                  {placedStudents
                    .filter((_, i) => i !== activeCard)
                    .slice(0, 2)
                    .map((s) => {
                      const originalIndex = placedStudents.indexOf(s);
                      return (
                        <button
                          key={s.id}
                          onClick={() => setActiveCard(originalIndex)}
                          className="text-left bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-5 hover:border-primary/40 hover:shadow-md transition-all duration-200 group flex flex-col justify-between h-full"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="relative h-10 w-10 rounded-xl overflow-hidden border border-outline-variant/30 shrink-0">
                              <Image src={s.image} alt={s.name} fill className="object-cover" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-extrabold text-sm text-on-surface truncate">{s.name}</p>
                              <p className="text-xs text-on-surface-variant truncate">{s.company}</p>
                            </div>
                            <ArrowUpRight className="h-4 w-4 text-on-surface-variant/40 group-hover:text-primary transition-colors shrink-0" />
                          </div>
                          {s.testimonial && (
                            <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed italic mb-2">
                              &ldquo;{s.testimonial}&rdquo;
                            </p>
                          )}
                          <div className="flex items-center justify-between pt-2.5 border-t border-outline-variant/10 text-[10px] font-bold text-primary uppercase tracking-wider">
                            <span>View Profile</span>
                            {s.package && <span className="text-success">{s.package}</span>}
                          </div>
                        </button>
                      );
                    })}
                </div>
              </div>

              {/* Dots */}
              <div className="flex items-center gap-2 justify-center mt-8">
                {placedStudents.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveCard(i)}
                    className={cn(
                      "rounded-full transition-all duration-300",
                      i === activeCard
                        ? "w-6 h-2 bg-primary"
                        : "w-2 h-2 bg-outline-variant hover:bg-primary/40"
                    )}
                    aria-label={`Go to student ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── ALL GRADUATES GRID WITH DYNAMIC FILTERS ─────────────────── */}
      <div id="all-graduates" className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div>
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Alumni Registry</p>
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-on-surface tracking-tight">Every Success, Counted</h2>
            <p className="text-sm text-on-surface-variant mt-2 max-w-xl font-light">
              Browse through our graduates who have launched successful careers at leading banks, software giants, and MNCs.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80 shrink-0">
            <Search className="absolute left-4 top-3.5 h-4.5 w-4.5 text-on-surface-variant/40" />
            <input
              type="text"
              placeholder="Search by student, designation, company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant/40 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2 mb-8 items-center">
          <span className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-wider mr-2">Filter by Partner:</span>
          {availableCompanies.slice(0, 8).map((comp) => (
            <button
              key={comp}
              onClick={() => setSelectedTag(comp)}
              className={cn(
                "text-xs font-bold px-4 py-2 rounded-xl border transition-all duration-200",
                selectedTag === comp
                  ? "bg-primary border-primary text-white shadow-sm"
                  : "bg-surface-container border-outline-variant/30 text-on-surface-variant hover:border-primary/40 hover:text-primary"
              )}
            >
              {comp}
            </button>
          ))}
          {availableCompanies.length > 8 && (
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="text-xs font-bold bg-surface-container border border-outline-variant/30 text-on-surface-variant px-3 py-2 rounded-xl focus:outline-none focus:border-primary"
            >
              <option value="All">More Companies...</option>
              {availableCompanies.slice(8).map((comp) => (
                <option key={comp} value={comp}>{comp}</option>
              ))}
            </select>
          )}
        </div>

        {/* Results Grid */}
        {filteredStudents.length === 0 ? (
          <div className="text-center py-16 bg-surface-container-low rounded-3xl border border-outline-variant/20">
            <Users className="h-12 w-12 text-on-surface-variant/30 mx-auto mb-4" />
            <p className="text-base font-bold text-on-surface">No records match your query</p>
            <p className="text-xs text-on-surface-variant mt-1.5">Try clearing filters or checking spelling.</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedTag("All"); }}
              className="mt-4 bg-primary/8 border border-primary/20 text-primary font-bold text-xs px-4 py-2 rounded-xl hover:bg-primary hover:text-white transition-all"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((s, i) => (
              <div
                key={s.id}
                className="group bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative h-12 w-12 rounded-xl overflow-hidden border border-outline-variant/30 shrink-0">
                      <Image
                        src={s.image || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"}
                        alt={s.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-extrabold text-on-surface text-base truncate">{s.name}</p>
                      <p className="text-xs text-on-surface-variant truncate font-medium">{s.designation}</p>
                    </div>
                  </div>
                  {s.testimonial && (
                    <p className="text-xs text-on-surface-variant leading-relaxed mb-4 italic font-medium">
                      &ldquo;{s.testimonial}&rdquo;
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-outline-variant/20 mt-2">
                  <span className="text-xs font-bold text-primary bg-primary/6 border border-primary/12 px-3 py-1 rounded-full truncate max-w-[65%]">
                    {s.company}
                  </span>
                  {s.package && (
                    <span className="text-xs font-extrabold text-success bg-success/6 border border-success/15 px-2.5 py-1 rounded-full">
                      {s.package}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── REGISTRATION FORMS ───────────────────────────────────────── */}
      <div id="join-network" className="bg-surface-container-low border-t border-outline-variant/20 py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Unique Mentors Network</p>
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-on-surface tracking-tight">Join Our Placement Desk</h2>
            <p className="mt-3 text-on-surface-variant text-base font-light">
              Whether you are a trained graduate looking for a career launchpad or an employer seeking pre-screened professionals, get connected here.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Sidebar Highlight Box */}
            <div className="lg:col-span-4 space-y-6">
              <div className="relative bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 shadow-sm overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full" />
                <h4 className="font-extrabold text-base text-on-surface mb-4 flex items-center gap-2">

                  Recruiter Benefits
                </h4>
                <ul className="space-y-3.5 text-xs text-on-surface-variant leading-relaxed font-medium">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    <span><strong>Pre-screened Talent:</strong> Candidates fully evaluated on domain skills, communications, and logical aptitude.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    <span><strong>Zero Recruitment Fees:</strong> No hidden charges for matching or listing corporate vacancies.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    <span><strong>Immediate Deployment:</strong> Graduates prepared for immediate onboarding in corporate functions.</span>
                  </li>
                </ul>
              </div>

              <div className="relative bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 shadow-sm overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-success/5 rounded-bl-full" />
                <h4 className="font-extrabold text-base text-on-surface mb-4 flex items-center gap-2">
                  <GraduationCap className="h-4.5 w-4.5 text-primary shrink-0" />
                  Candidate Perks
                </h4>
                <ul className="space-y-3.5 text-xs text-on-surface-variant leading-relaxed font-medium">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span><strong>Elite Partner Network:</strong> High-priority vacancy alerts from TCS, Federal Bank, HDFC, and more.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span><strong>Mock Interview Prep:</strong> Intense practice rounds coached directly by corporate hiring heads.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span><strong>Lifetime Support:</strong> Continuous career mentorship, CV engineering, and vacancy dispatches.</span>
                  </li>
                </ul>
              </div>

              {/* Coordinator Hotline Card */}
              <div className="gradient-primary text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
                <div className="absolute bottom-0 right-0 opacity-10">
                  <Send className="h-32 w-32 translate-x-8 translate-y-8" />
                </div>
                <h4 className="font-extrabold text-base mb-2">Need Immediate Hiring?</h4>
                <p className="text-xs text-white/80 leading-relaxed mb-4">Connect directly with our Campus Relations Coordinator on WhatsApp for rapid scheduling.</p>
                <a
                  href="https://wa.me/918137064888?text=Hello%20Unique%20Mentors%20Placement%20Desk%2C%20we%20want%20to%20hire%20from%20your%20campus."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-primary hover:bg-white/95 font-bold text-xs px-5 py-3 rounded-xl shadow-sm transition-all duration-300"
                >
                  WhatsApp Hiring Desk
                </a>
              </div>
            </div>

            {/* Forms Main Frame */}
            <div className="lg:col-span-8 space-y-6">
              {/* Tabs */}
              <div className="flex bg-surface-container border border-outline-variant/35 rounded-2xl p-1 shadow-sm">
                {(["seeker", "employer"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "flex-1 py-3.5 px-4 rounded-xl text-sm font-bold transition-all duration-300 relative",
                      activeTab === tab
                        ? "bg-surface-container-lowest text-primary shadow-sm"
                        : "text-on-surface-variant hover:text-on-surface"
                    )}
                  >
                    {tab === "seeker" ? (
                      <span className="flex items-center justify-center gap-2">
                        <Users className="h-4.5 w-4.5" /> Job Seeker Hub
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Building className="h-4.5 w-4.5" /> Recruiter Console
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Form Card */}
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-8 shadow-sm">
                {activeTab === "seeker" ? (
                  <form onSubmit={handleSeekerSubmit} className="space-y-6">
                    <div>
                      <h3 className="text-xl font-extrabold font-heading text-on-surface">Career Registration Desk</h3>
                      <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed font-light">
                        Join our pre-placement registration system. Once reviewed, our placement specialist will schedule a skills-mapping interview.
                      </p>
                    </div>

                    {seekerSuccess && (
                      <div className="flex items-start gap-3 p-4.5 bg-success/8 border border-success/25 text-success text-sm rounded-2xl">
                        <CheckCircle className="h-5 w-5 mt-0.5 shrink-0" />
                        <span className="font-semibold leading-relaxed">{seekerSuccess}</span>
                      </div>
                    )}
                    {seekerError && (
                      <div className="p-4.5 bg-error/8 border border-error/25 text-error text-sm rounded-2xl font-semibold">
                        {seekerError}
                      </div>
                    )}

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="E.g., Arya Nair"
                          value={seekerForm.name}
                          onChange={(e) => setSeekerForm({ ...seekerForm, name: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Email Address</label>
                        <input
                          type="email"
                          required
                          placeholder="E.g., arya@email.com"
                          value={seekerForm.email}
                          onChange={(e) => setSeekerForm({ ...seekerForm, email: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Contact Phone</label>
                        <input
                          type="tel"
                          required
                          placeholder="E.g., +91 98765 43210"
                          value={seekerForm.phone}
                          onChange={(e) => setSeekerForm({ ...seekerForm, phone: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Highest Qualification</label>
                        <input
                          type="text"
                          required
                          placeholder="E.g., B.Tech / MBA / MCA"
                          value={seekerForm.qualification}
                          onChange={(e) => setSeekerForm({ ...seekerForm, qualification: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Professional Experience</label>
                        <select
                          value={seekerForm.experience}
                          onChange={(e) => setSeekerForm({ ...seekerForm, experience: e.target.value })}
                          className={inputClass}
                        >
                          <option value="fresher">Fresher / Graduating Student</option>
                          <option value="1-2 years">1–2 Years Experience</option>
                          <option value="3+ years">3+ Years Experience</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Core Skills</label>
                        <input
                          type="text"
                          required
                          placeholder="E.g., Core Java, Financial Accounting, Excel..."
                          value={seekerForm.skills}
                          onChange={(e) => setSeekerForm({ ...seekerForm, skills: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Brief Profile Summary & Professional Links</label>
                      <textarea
                        rows={4}
                        placeholder="Tell us about your career goals, or paste your LinkedIn / GitHub profiles..."
                        value={seekerForm.resumeText}
                        onChange={(e) => setSeekerForm({ ...seekerForm, resumeText: e.target.value })}
                        className={cn(inputClass, "resize-none")}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={seekerSubmitting}
                      className="w-full bg-primary hover:bg-primary-container text-white py-4 px-6 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {seekerSubmitting ? (
                        <><Loader2 className="h-4.5 w-4.5 animate-spin" /> Submitting Profile...</>
                      ) : (
                        <><Send className="h-4.5 w-4.5" /> Submit to Placement Officer</>
                      )}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleEmployerSubmit} className="space-y-6">
                    <div>
                      <h3 className="text-xl font-extrabold font-heading text-on-surface">Campus Recruitment Request</h3>
                      <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed font-light">
                        Log your vacancy requirements in our placement console. Our Corporate Relations team will generate a pre-screened talent shortlist and send it to you within 1 business day.
                      </p>
                    </div>

                    {employerSuccess && (
                      <div className="flex items-start gap-3 p-4.5 bg-success/8 border border-success/25 text-success text-sm rounded-2xl">
                        <CheckCircle className="h-5 w-5 mt-0.5 shrink-0" />
                        <span className="font-semibold leading-relaxed">{employerSuccess}</span>
                      </div>
                    )}
                    {employerError && (
                      <div className="p-4.5 bg-error/8 border border-error/25 text-error text-sm rounded-2xl font-semibold">
                        {employerError}
                      </div>
                    )}

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Company Legal Name</label>
                        <input
                          type="text"
                          required
                          placeholder="E.g., Acme Corp Pvt Ltd"
                          value={employerForm.companyName}
                          onChange={(e) => setEmployerForm({ ...employerForm, companyName: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Contact Person / HR Representative</label>
                        <input
                          type="text"
                          required
                          placeholder="E.g., Priya Kumar"
                          value={employerForm.contactPerson}
                          onChange={(e) => setEmployerForm({ ...employerForm, contactPerson: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Official Corporate Email</label>
                        <input
                          type="email"
                          required
                          placeholder="E.g., priya@acme.com"
                          value={employerForm.email}
                          onChange={(e) => setEmployerForm({ ...employerForm, email: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Direct Phone / Mobile</label>
                        <input
                          type="tel"
                          required
                          placeholder="E.g., +91 98765 43210"
                          value={employerForm.phone}
                          onChange={(e) => setEmployerForm({ ...employerForm, phone: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Roles / Designations To Be Filled</label>
                      <input
                        type="text"
                        required
                        placeholder="E.g., Relationship Manager, Junior Software Engineer, Associate Officer"
                        value={employerForm.designationsNeeded}
                        onChange={(e) => setEmployerForm({ ...employerForm, designationsNeeded: e.target.value })}
                        className={inputClass}
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Job Vacancy Locations</label>
                        <input
                          type="text"
                          required
                          placeholder="E.g., Kochi / Bangalore / Hybrid"
                          value={employerForm.locations}
                          onChange={(e) => setEmployerForm({ ...employerForm, locations: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Offered CTC / Salary Range</label>
                        <input
                          type="text"
                          required
                          placeholder="E.g., 4.5 – 6.0 LPA"
                          value={employerForm.salaryRange}
                          onChange={(e) => setEmployerForm({ ...employerForm, salaryRange: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={employerSubmitting}
                      className="w-full bg-primary hover:bg-primary-container text-white py-4 px-6 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {employerSubmitting ? (
                        <><Loader2 className="h-4.5 w-4.5 animate-spin" /> Shortlisting Candidates...</>
                      ) : (
                        <><Send className="h-4.5 w-4.5" /> Submit Campus Hiring Request</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}