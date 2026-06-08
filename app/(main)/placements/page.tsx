"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import {
  CheckCircle, Building, Send, Users,
  ArrowUpRight, Loader2, Search, PencilLine, Instagram
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PencilMascot } from "@/components/brand/PencilMascot";
import { motion } from "framer-motion";
import RotatingEarth from "@/components/ui/wireframe-dotted-globe";
import { InstagramEmbedCarousel } from "@/components/ui/instagram-embed-carousel";
interface PlacedStudent {
  id: string;
  name: string;
  company: string;
  designation: string;
  package?: string;
  image: string;
  testimonial?: string;
  instagramUrl?: string;
}

const instagramPlacementPosts = [
  "https://www.instagram.com/p/DZKYX1YktFS/",
  "https://www.instagram.com/p/DY6ieRlkkpq/",
  "https://www.instagram.com/p/DYlyqdSspSb/",
  "https://www.instagram.com/p/DYTx82bks6K/",
  "https://www.instagram.com/p/DYTxuqlEuMY/",
  "https://www.instagram.com/p/DXrZT9LkgVm/",
  "https://www.instagram.com/p/DXoz8pskobK/",
  "https://www.instagram.com/p/DXbjOANEqAU/",
  "https://www.instagram.com/p/DXWZRlmkiWo/",
  "https://www.instagram.com/p/DXMEm7vEgUy/",
  "https://www.instagram.com/p/DX9JjkoEmCt/",
];

const mockPlacedStudents: PlacedStudent[] = [
  {
    id: "1",
    name: "Arya Nair",
    company: "Tata Consultancy Services",
    designation: "Systems Engineer",
    package: "4.5 LPA",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    testimonial: "The finishing school program completely shifted my communication style. I cleared both technical and HR panels on my very first attempt.",
    instagramUrl: instagramPlacementPosts[0],
  },
  {
    id: "2",
    name: "Rahul Krishnan",
    company: "Federal Bank",
    designation: "Associate Officer",
    package: "5.8 LPA",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    testimonial: "The personality development and banking interview prep gave me the confidence to present myself naturally before senior executives.",
    instagramUrl: instagramPlacementPosts[1],
  },
  {
    id: "3",
    name: "Sneha Joseph",
    company: "Cognizant",
    designation: "Programmer Analyst",
    package: "4.2 LPA",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    testimonial: "From resume writing to mock group discussions, every detail was covered. The tough mock reviews were incredibly accurate to real interviews.",
    instagramUrl: instagramPlacementPosts[2],
  },
  {
    id: "4",
    name: "Devansh Pillai",
    company: "Infosys",
    designation: "Technology Analyst",
    package: "6.5 LPA",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    testimonial: "Unique Mentors gave me a structured path from confusion to clarity. My aptitude scores improved drastically within 3 weeks of joining.",
    instagramUrl: instagramPlacementPosts[3],
  },
  {
    id: "5",
    name: "Priya Menon",
    company: "HDFC Bank",
    designation: "Relationship Manager",
    package: "5.2 LPA",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=80",
    testimonial: "The GD and interview simulation sessions were very real. I felt fully prepared walking into the final round — completely calm and focused.",
    instagramUrl: instagramPlacementPosts[4],
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
  const [activeTab, setActiveTab] = useState<"seeker" | "employer">("seeker");

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  const statsRef = useInView();

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
          setPlacedStudents(data.map((item: any, index: number) => ({
            id: item.id,
            name: item.name,
            company: item.company,
            designation: item.designation,
            package: item.package || undefined,
            image: item.image_url,
            testimonial: item.testimonial || undefined,
            instagramUrl: item.instagram_url || instagramPlacementPosts[index % instagramPlacementPosts.length],
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

  const availableCompanies = ["All", ...Array.from(new Set(placedStudents.map(s => s.company)))];

  const filteredStudents = placedStudents.filter(s => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.testimonial || "").toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTag = selectedTag === "All" || s.company === selectedTag;

    return matchesSearch && matchesTag;
  });

  const placementEmbedPosts = Array.from(
    new Set([
      ...placedStudents
        .map((student) => student.instagramUrl)
        .filter((url): url is string => Boolean(url)),
      ...instagramPlacementPosts,
    ])
  );

  const inputClass = "w-full bg-[#fffaf5] border border-[#d9e8f2] rounded-[8px] px-4 py-3 text-sm text-[#251324] placeholder:text-[#6f5c6f]/40 focus:outline-none focus:border-[#0b5f99] focus:ring-2 focus:ring-[#0b5f99]/15 shadow-sm transition-all duration-200";
  const labelClass = "block text-xs font-bold text-[#6f5c6f] uppercase tracking-widest mb-1.5";

  return (
    <section className="bg-white min-h-screen relative isolate overflow-hidden font-[family-name:var(--font-body)] text-[#675667]">

      {/* ── HERO WITH ASYMMETRIC COLOR SHAPE ─────────────────────────── */}
      <div className="relative overflow-hidden pt-20 pb-16">
        {/* Asymmetric blue backdrop polygon */}
        <div
          className="absolute inset-y-0 left-0 -z-10 w-[45%] bg-[#e8f6ff] opacity-90 hidden lg:block"
          style={{ clipPath: "polygon(0 0, 85% 0, 100% 100%, 0 100%)" }}
        />

        {/* Glowing atmospheric dots */}
        <div className="pointer-events-none absolute -top-48 left-1/4 w-[800px] h-[500px] rounded-full bg-primary/5 blur-3xl opacity-60" />
        <div className="pointer-events-none absolute -top-48 right-1/4 w-[600px] h-[600px] rounded-full bg-secondary/5 blur-3xl opacity-50" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
            <div className="max-w-3xl space-y-6 text-left">
              {/* Premium Brand Motif Badge */}
              <div className="inline-flex items-center gap-2 rounded-[8px] bg-[#0b5f99] px-3.5 py-2 text-xs font-black uppercase tracking-[0.16em] text-white">
                <PencilLine className="h-4 w-4 text-[#ffcf72]" />
                Placement Tracker: 2024–2025
              </div>

              <h1 className="font-heading font-black text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-[#251324] text-balance">
                Bridging Ambition<br />
                <span className="text-[#bd168e]">to Global Careers</span>
              </h1>

              <p className="text-lg md:text-xl text-[#675667] leading-relaxed max-w-2xl font-medium">
                Unique Mentors is Kerala's premium finishing school, empowering ambitious graduates with polished business communication, critical thinking, and recruiter-vetted professional skills.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#join-network"
                  className="bg-[#bd168e] text-white font-extrabold shadow-md px-7 py-3.5 rounded-[8px] text-sm flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#981173] hover:shadow-lg hover:shadow-[#bd168e]/35"
                >
                  Register for Placements <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href="#all-graduates"
                  className="bg-white border border-[#d9e8f2] hover:border-[#0b5f99] hover:text-[#0b5f99] text-[#251324] font-extrabold px-7 py-3.5 rounded-[8px] text-sm transition-all duration-200"
                >
                  Explore Student Success
                </a>
              </div>
            </div>

            {/* Placement globe */}
            <div className="relative w-full shrink-0 lg:w-[32rem]">
              <div className="absolute -inset-4 rounded-[32px] bg-[#0b5f99]/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-[24px] border-[5px] border-white bg-[#101827] p-4 shadow-2xl">
                <div className="absolute left-5 top-5 z-20 rounded-[8px] border border-white/10 bg-white/10 px-3 py-2 backdrop-blur">
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#ffcf72]">
                    Placement Map
                  </p>
                  <p className="mt-1 text-xs font-semibold text-white/75">
                    Kochi-trained candidates. Wider career routes.
                  </p>
                </div>
                <RotatingEarth width={520} height={430} className="pt-10" />
                <div className="grid gap-3 border-t border-white/10 pt-4 sm:grid-cols-2">
                  <div className="rounded-[12px] border border-white/10 bg-white/8 p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-white/50">
                      Interview Turnaround
                    </p>
                    <p className="mt-1 text-2xl font-black text-white">4.8 Days</p>
                  </div>
                  <div className="rounded-[12px] border border-white/10 bg-white/8 p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-white/50">
                      Candidate Fee
                    </p>
                    <p className="mt-1 text-2xl font-black text-[#ffcf72]">0%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Infinite Logo Marquee Ticker */}
      <div className="bg-[#fffaf5] border-y border-[#d9e8f2] py-8 overflow-hidden relative">
        <div className="pointer-events-none absolute left-0 inset-y-0 w-32 bg-gradient-to-r from-[#fffaf5] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 inset-y-0 w-32 bg-gradient-to-l from-[#fffaf5] to-transparent z-10" />

        <div className="max-w-7xl mx-auto px-6 mb-4 flex items-center justify-between">
          <p className="text-xs font-bold text-[#6f5c6f] uppercase tracking-widest">Empowering Careers at Elite Enterprises</p>
        </div>

        <div className="relative w-full flex items-center">
          <div className="animate-marquee flex gap-12 whitespace-nowrap">
            {COMPANIES.concat(COMPANIES).concat(COMPANIES).map((company, idx) => (
              <div
                key={`${company}-${idx}`}
                className="flex items-center gap-2.5 bg-white border border-[#d9e8f2] px-6 py-3 rounded-xl shadow-sm hover:border-[#0b5f99] hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#0b5f99]/20 group-hover:bg-[#0b5f99] transition-colors" />
                <span className="text-sm font-extrabold text-[#6f5c6f] group-hover:text-[#251324] transition-colors">
                  {company}
                </span>
                <span className="text-[10px] font-bold text-[#6f5c6f]/50 bg-[#e8f6ff] px-2 py-0.5 rounded-md group-hover:text-[#0b5f99] transition-colors">
                  Hiring Partner
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── STATS SECTION ────────────────────────────────────────────── */}
      <div ref={statsRef.ref} className="max-w-7xl mx-auto px-6 py-20 relative">
        <div className="relative overflow-hidden bg-[#251324] text-white rounded-[24px] p-8 md:p-12 lg:p-16 shadow-2xl border border-white/10">
          {/* Subtle background overlay gradient */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] opacity-40 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-success/5 rounded-full blur-[100px] opacity-30 pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10 text-left">
            {/* Primary Success Stat Card (Left - 5 Cols) */}
            <div className="lg:col-span-5 space-y-6 lg:border-r lg:border-white/10 lg:pr-12">
              <div className="inline-flex items-center gap-2 bg-[#fffaf5]/10 border border-white/20 text-[#ffcf72] text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                Audited Career Outcome
              </div>

              <div className="space-y-1">
                <div className="text-7xl md:text-8xl font-black font-heading tracking-tighter text-[#ffcf72]">
                  {statsRef.inView ? <AnimatedNumber value="95%" inView={statsRef.inView} /> : "—"}
                </div>
                <h3 className="text-2xl font-black tracking-tight text-white">Placement Success Rate</h3>
              </div>

              <p className="text-sm text-white/70 leading-relaxed font-medium">
                Our curriculum guarantees that 95% of candidates transition into formal corporate roles within 90 days of graduation. This audited success rate makes Unique Mentors Kerala’s highly reliable career bridge.
              </p>

              <div className="flex items-center gap-3 pt-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="relative w-8 h-8 rounded-full border-2 border-[#251324] overflow-hidden bg-slate-800">
                      <Image
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                        alt="Student Avatar"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <span className="text-xs font-semibold text-white/60">Joined by 1,400+ placed alumni</span>
              </div>
            </div>

            {/* Sub-Metrics Cards (Right - 7 Cols) */}
            <div className="lg:col-span-7 grid sm:grid-cols-3 gap-8 sm:gap-6 md:pl-4">
              {/* Metric 2: Partners */}
              <div className="space-y-3">
                <div className="text-4xl md:text-5xl font-black text-[#ffcf72] font-heading">
                  {statsRef.inView ? <AnimatedNumber value="120+" inView={statsRef.inView} /> : "—"}
                </div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Hiring Partners</h4>
                <p className="text-xs text-white/60 leading-relaxed">Direct vacancies across major private banks, tech hubs, and MNCs.</p>
              </div>

              {/* Metric 3: Average Salary */}
              <div className="space-y-3 sm:border-l sm:border-white/10 sm:pl-8">
                <div className="text-4xl md:text-5xl font-black text-[#ffcf72] font-heading">
                  {statsRef.inView ? <AnimatedNumber value="6.2 LPA" inView={statsRef.inView} /> : "—"}
                </div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Average CTC</h4>
                <p className="text-xs text-white/60 leading-relaxed">Industry-competitive wage offers secured by graduating cohorts.</p>
              </div>

              {/* Metric 4: Highest Package */}
              <div className="space-y-3 sm:border-l sm:border-white/10 sm:pl-8">
                <div className="text-4xl md:text-5xl font-black text-[#ffcf72] font-heading">
                  {statsRef.inView ? <AnimatedNumber value="15 LPA" inView={statsRef.inView} /> : "—"}
                </div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Highest Package</h4>
                <p className="text-xs text-white/60 leading-relaxed">Peak evaluation logged by top-ranking students this session.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── ALUMNI INSTAGRAM EMBEDS ───────────────────────────────────── */}
      <div className="bg-[#e8f6ff] border-y border-[#d9e8f2] py-24 relative overflow-hidden">
        {/* Soft background visual arches */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 text-left">
            <div>
              <p className="text-xs font-black text-[#0b5f99] uppercase tracking-widest mb-2 font-mono">Success Spotlights</p>
              <h2 className="text-3xl md:text-4xl font-black font-heading text-[#251324] tracking-tight">Instagram-verified Placement Stories</h2>
              <p className="text-sm text-[#675667] mt-2 max-w-lg font-medium">
                Candidate outcomes are shown directly from Unique Mentors Instagram posts, keeping the original placement photos and captions visible.
              </p>
            </div>
            <div className="rounded-[8px] border border-[#0b5f99]/15 bg-white px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-[#0b5f99]">
              {placementEmbedPosts.length} source posts
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-[#0b5f99]" />
            </div>
          ) : (
            <>
              <InstagramEmbedCarousel posts={placementEmbedPosts} />

              <div className="mt-6 flex flex-wrap gap-3">
                {placementEmbedPosts.map((url, index) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full border border-[#d9e8f2] bg-white px-3.5 py-2 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#bd168e]"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#fff0fa] text-[#bd168e]">
                      <Instagram className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-[11px] font-black uppercase tracking-[0.12em] text-[#251324]">
                      Post {String(index + 1).padStart(2, "0")}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-[#6f5c6f]/60 transition-colors group-hover:text-[#bd168e]" />
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── ALL GRADUATES GRID REGISTRY ────────────────────────────────── */}
      <div id="all-graduates" className="max-w-7xl mx-auto px-6 py-24 text-left">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div>
            <p className="text-xs font-black text-[#0b5f99] uppercase tracking-widest mb-2 font-mono">Alumni Registry</p>
            <h2 className="text-3xl md:text-4xl font-black font-heading text-[#251324] tracking-tight">Every Success, Tracked</h2>
            <p className="text-sm text-[#675667] mt-2 max-w-xl font-medium">
              Browse through our graduates who have launched successful careers at leading banks, software giants, and MNCs.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80 shrink-0">
            <Search className="absolute left-4 top-3.5 h-4.5 w-4.5 text-[#6f5c6f]/40" />
            <input
              type="text"
              placeholder="Search student, designation, company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#fffaf5] border border-[#d9e8f2] rounded-xl pl-11 pr-4 py-3.5 text-sm text-[#251324] placeholder:text-[#6f5c6f]/40 focus:outline-none focus:border-[#0b5f99] focus:ring-2 focus:ring-[#0b5f99]/15 shadow-sm transition-all"
            />
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2 mb-8 items-center">
          <span className="text-xs font-bold text-[#6f5c6f]/60 uppercase tracking-wider mr-2">Filter by Partner:</span>
          {availableCompanies.slice(0, 8).map((comp) => (
            <button
              key={comp}
              onClick={() => setSelectedTag(comp)}
              className={cn(
                "text-xs font-extrabold px-4 py-2 rounded-xl border transition-all duration-200 cursor-pointer",
                selectedTag === comp
                  ? "bg-[#0b5f99] border-[#0b5f99] text-white shadow-sm"
                  : "bg-[#fffaf5] border-[#d9e8f2] text-[#6f5c6f] hover:border-[#0b5f99] hover:text-[#0b5f99]"
              )}
            >
              {comp}
            </button>
          ))}
          {availableCompanies.length > 8 && (
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="text-xs font-bold bg-[#fffaf5] border border-[#d9e8f2] text-[#6f5c6f] px-3 py-2 rounded-xl focus:outline-none focus:border-[#0b5f99]"
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
          <div className="text-center py-16 bg-[#fffaf5] rounded-2xl border border-[#d9e8f2]">
            <Users className="h-12 w-12 text-[#6f5c6f]/30 mx-auto mb-4" />
            <p className="text-base font-bold text-[#251324]">No records match your query</p>
            <p className="text-xs text-[#6f5c6f] mt-1.5">Try clearing filters or checking spelling.</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedTag("All"); }}
              className="mt-4 bg-[#0b5f99]/10 border border-[#0b5f99]/20 text-[#0b5f99] font-bold text-xs px-4 py-2 rounded-xl hover:bg-[#0b5f99] hover:text-white transition-all cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((s, i) => (
              <div
                key={s.id}
                className="group bg-[#fffaf5] border border-[#d9e8f2] rounded-2xl p-6 hover:border-[#0b5f99] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative h-12 w-12 rounded-xl overflow-hidden border border-[#d9e8f2] shrink-0 shadow-sm">
                      <Image
                        src={s.image || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"}
                        alt={s.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-black text-[#251324] text-base truncate">{s.name}</p>
                      <p className="text-xs text-[#6f5c6f] truncate font-semibold">{s.designation}</p>
                    </div>
                  </div>
                  {s.testimonial && (
                    <p className="text-xs text-[#6f5c6f] leading-relaxed mb-4 italic font-medium">
                      &ldquo;{s.testimonial}&rdquo;
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#d9e8f2]/60 mt-2">
                  <span className="text-xs font-bold text-[#0b5f99] bg-[#e8f6ff] border border-[#0b5f99]/15 px-3 py-1 rounded-full truncate max-w-[65%]">
                    {s.company}
                  </span>
                  {s.package && (
                    <span className="text-xs font-extrabold text-[#bd168e] bg-[#fffaf5] border border-[#bd168e]/15 px-2.5 py-1 rounded-full">
                      {s.package}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── REGISTRATION FORMS (Asymmetric shapes & mascot) ─────────────── */}
      <div id="join-network" className="bg-[#fffaf5] border-t border-[#d9e8f2] py-24 relative overflow-hidden">
        {/* Asymmetric brand backing highlight */}
        <div
          className="absolute inset-y-0 right-0 -z-10 w-[35%] bg-[#e8f6ff] opacity-80 hidden lg:block"
          style={{ clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0 100%)" }}
        />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-xl mx-auto mb-16">
            <p className="text-xs font-black text-[#0b5f99] uppercase tracking-widest mb-2 font-mono">Unique Mentors Network</p>
            <h2 className="text-3xl md:text-4xl font-black font-heading text-[#251324] tracking-tight">Join Our Placement Desk</h2>
            <p className="mt-3 text-[#675667] text-base font-semibold">
              Whether you are a trained graduate looking for a career launchpad or an employer seeking pre-screened professionals, get connected here.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start text-left">
            {/* Sidebar Cards Column */}
            <div className="lg:col-span-4 space-y-6">

              {/* Recruiter Perks */}
              <div className="relative bg-white border border-[#d9e8f2] rounded-3xl p-6 shadow-sm overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#0b5f99]/5 rounded-bl-full pointer-events-none" />
                <h4 className="font-black text-base text-[#251324] mb-4 flex items-center gap-2">
                  Recruiter Benefits
                </h4>
                <ul className="space-y-3.5 text-xs text-[#6f5c6f] leading-relaxed font-semibold">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="h-4 w-4 text-[#0b5f99] mt-0.5 shrink-0" />
                    <span><strong>Pre-screened Talent:</strong> Candidates evaluated on domain skills, communications, and logical aptitude.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="h-4 w-4 text-[#0b5f99] mt-0.5 shrink-0" />
                    <span><strong>Zero Recruitment Fees:</strong> No hidden charges for matching or listing vacancies.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="h-4 w-4 text-[#0b5f99] mt-0.5 shrink-0" />
                    <span><strong>Immediate Deployment:</strong> Graduates prepared for immediate onboarding in corporate functions.</span>
                  </li>
                </ul>
              </div>

              {/* Candidate Perks */}
              <div className="relative bg-white border border-[#d9e8f2] rounded-3xl p-6 shadow-sm overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#bd168e]/5 rounded-bl-full pointer-events-none" />
                <h4 className="font-black text-base text-[#251324] mb-4 flex items-center gap-2">
                  Candidate Perks
                </h4>
                <ul className="space-y-3.5 text-xs text-[#6f5c6f] leading-relaxed font-semibold">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="h-4 w-4 text-[#bd168e] mt-0.5 shrink-0" />
                    <span><strong>Elite Partner Network:</strong> High-priority vacancy alerts from TCS, Federal Bank, HDFC, and more.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="h-4 w-4 text-[#bd168e] mt-0.5 shrink-0" />
                    <span><strong>Mock Interview Prep:</strong> Intense practice rounds coached directly by corporate hiring heads.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="h-4 w-4 text-[#bd168e] mt-0.5 shrink-0" />
                    <span><strong>Continuous Support:</strong> Lifetime career mentorship, CV engineering, and vacancy dispatches.</span>
                  </li>
                </ul>
              </div>

              {/* Coordinator Hotline Card (Rotated, Double Border) */}
              <div className="bg-gradient-to-br from-[#0b5f99] to-[#057bd2] text-white rounded-3xl p-6 shadow-2xl relative overflow-hidden rotate-[-1.5deg] border-[5px] border-white hover:rotate-0 hover:scale-[1.01] transition-all duration-300">
                <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none">
                  <Send className="h-32 w-32 translate-x-8 translate-y-8" />
                </div>
                <h4 className="font-black text-base mb-2">Need Immediate Hiring?</h4>
                <p className="text-xs text-white/80 leading-relaxed mb-4 font-semibold">Connect directly with our Campus Relations Coordinator on WhatsApp for rapid vacancy reviews.</p>
                <a
                  href="https://wa.me/918137064888?text=Hello%20Unique%20Mentors%20Placement%20Desk%2C%20we%20want%20to%20hire%20from%20your%20campus."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-[#0b5f99] hover:bg-white/95 font-black text-xs px-5 py-3 rounded-lg shadow-md transition-all duration-300 hover:scale-105"
                >
                  WhatsApp Hiring Desk
                </a>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-8 space-y-6 relative">
              {/* Tab Selector */}
              <div className="flex bg-white border border-[#d9e8f2] rounded-2xl p-1 shadow-sm">
                {(["seeker", "employer"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "flex-1 py-3.5 px-4 rounded-xl text-sm font-bold transition-all duration-300 relative cursor-pointer",
                      activeTab === tab
                        ? "bg-[#0b5f99] text-white shadow-sm"
                        : "text-[#6f5c6f] hover:text-[#251324]"
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

              {/* Form Content Wrapper */}
              <div className="bg-white border border-[#d9e8f2] rounded-3xl p-8 shadow-2xl relative">
                {activeTab === "seeker" ? (
                  <form onSubmit={handleSeekerSubmit} className="space-y-6">
                    <div>
                      <h3 className="text-xl font-black font-heading text-[#251324]">Job Seeker Registration</h3>
                      <p className="text-xs text-[#6f5c6f] mt-1.5 leading-relaxed font-semibold">
                        Submit your details to enter our placements database. Our recruitment officer will contact you today to schedule a mapping interview.
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
                        <label className={labelClass}>Experience Level</label>
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
                          placeholder="E.g., Core Java, Accounting, Excel..."
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
                      className="w-full bg-[#bd168e] text-white font-extrabold shadow-md py-4 px-6 rounded-[8px] text-sm flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#981173] hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
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
                      <h3 className="text-xl font-black font-heading text-[#251324]">Recruiter vacancy details</h3>
                      <p className="text-xs text-[#6f5c6f] mt-1.5 leading-relaxed font-semibold">
                        Log your vacancies in our coordinate console. Our placement cell will create a pre-screened talent shortlist and send it to you within 1 business day.
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
                        placeholder="E.g., Relationship Manager, Junior Software Engineer"
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
                      className="w-full bg-[#bd168e] text-white font-extrabold shadow-md py-4 px-6 rounded-[8px] text-sm flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#981173] hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
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

              {/* Mascot decoration placed near forms */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0, rotate: 10 }}
                whileInView={{ scale: 1, opacity: 1, rotate: -3 }}
                viewport={{ once: true }}
                transition={{ type: "spring", bounce: 0.5, delay: 0.4 }}
                className="absolute -right-10 -bottom-14 z-20 w-32 drop-shadow-[0_15px_15px_rgba(0,0,0,0.15)] pointer-events-none hidden md:block"
              >
                <PencilMascot className="w-full" compact />
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
