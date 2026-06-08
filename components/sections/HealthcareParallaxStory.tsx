import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Globe2,
  ShieldCheck,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import { TextParallaxContent } from "@/components/ui/text-parallax-content-scroll";
import { getFinishingProgramCategory } from "@/lib/finishing-school-programs";
import { cn } from "@/lib/utils";

interface HealthcarePanel {
  imgUrl: string;
  imagePosition?: string;
  subheading: string;
  heading: string;
  title: string;
  body: string;
  icon: LucideIcon;
  points: string[];
  stat: string;
  statLabel: string;
}

const panels: HealthcarePanel[] = [
  {
    imgUrl:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2400&auto=format&fit=crop",
    imagePosition: "center",
    subheading: "Career Discovery",
    heading: "Choose a healthcare path with clarity.",
    title: "Start with the right route, not guesswork.",
    body:
      "Students and healthcare aspirants map realistic roles, country options, eligibility expectations, and the preparation rhythm before committing time and money.",
    icon: Stethoscope,
    points: [
      "Role and strength mapping",
      "Nursing, allied health, and medical route clarity",
      "One-to-one guidance before major decisions",
    ],
    stat: "01",
    statLabel: "Pathway map before preparation begins",
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=2400&auto=format&fit=crop",
    imagePosition: "center 38%",
    subheading: "Global Readiness",
    heading: "Prepare for international standards.",
    title: "Build the habits expected in global healthcare.",
    body:
      "The program connects communication, documentation, patient-first professionalism, and country-specific milestones into one readable plan.",
    icon: Globe2,
    points: [
      "Gulf and overseas career orientation",
      "Documentation and application awareness",
      "Interview, workplace, and patient communication",
    ],
    stat: "02",
    statLabel: "Global preparation milestones",
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1581093458791-9f3c3a13f9d0?q=80&w=2400&auto=format&fit=crop",
    imagePosition: "center 45%",
    subheading: "Licensure Readiness",
    heading: "Turn exam anxiety into a plan.",
    title: "Licensure preparation made structured.",
    body:
      "Candidates get orientation for exam expectations, study planning, credential checks, mock practice, and the confidence to move through complex healthcare pathways.",
    icon: ClipboardCheck,
    points: [
      "Exam orientation and study planning",
      "Credential and dataflow readiness",
      "Mock practice with review loops",
    ],
    stat: "03",
    statLabel: "Exam and documentation workflow",
  },
];

export function HealthcareParallaxStory() {
  const category = getFinishingProgramCategory("healthcare");

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-[#f6fbff] px-4 pb-14 pt-28 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20 lg:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(#057bd2_1px,transparent_1px)] opacity-[0.08] [background-size:22px_22px]" />
        <div className="container-main relative">
          <div className="grid gap-8 lg:grid-cols-[0.66fr_0.34fr] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-[8px] border border-[#bfe5ff] bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#057bd2] shadow-sm">
                <ShieldCheck className="h-4 w-4" />
                {category.eyebrow}
              </span>
              <h1 className="mt-5 max-w-5xl font-heading text-4xl font-black leading-[1.04] tracking-tight text-[#16212a] text-balance sm:text-5xl lg:text-7xl">
                Healthcare career readiness, mapped like a real pathway.
              </h1>
              <p className="mt-5 max-w-3xl text-base font-semibold leading-relaxed text-[#536272] sm:text-lg">
                {category.description}
              </p>
            </div>

            <div className="rounded-[8px] border border-[#cfeeff] bg-white p-4 shadow-lg">
              <div className="flex items-center gap-3 border-b border-[#e4f4ff] pb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-[8px] bg-[#057bd2] text-white">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-[#057bd2]">
                    Program Focus
                  </p>
                  <p className="mt-1 text-sm font-black text-[#16212a]">
                    Discovery, global pathways, licensure
                  </p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {category.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="rounded-[8px] bg-[#eef9ff] px-3 py-3 text-xs font-extrabold leading-tight text-[#24536f]"
                  >
                    {highlight}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {panels.map((panel, index) => {
        const Icon = panel.icon;

        return (
          <TextParallaxContent
            key={panel.title}
            imgUrl={panel.imgUrl}
            subheading={panel.subheading}
            heading={panel.heading}
            imagePosition={panel.imagePosition}
            overlayClassName={index === 1 ? "from-[#042033]/76 via-[#064f7a]/54 to-[#02111c]/82" : undefined}
          >
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 pb-20 pt-10 md:grid-cols-12 md:pb-24 md:pt-12">
              <div className="md:col-span-4">
                <div className="sticky top-28">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[8px] bg-[#057bd2] text-white shadow-lg">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="mt-5 font-heading text-5xl font-black leading-none text-[#d7eefc] sm:text-6xl">
                    {panel.stat}
                  </p>
                  <p className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-[#057bd2]">
                    {panel.statLabel}
                  </p>
                </div>
              </div>

              <div className="md:col-span-8">
                <h3 className="font-heading text-3xl font-black leading-tight tracking-tight text-[#16212a] sm:text-4xl">
                  {panel.title}
                </h3>
                <p className="mt-4 text-lg font-semibold leading-relaxed text-[#536272] sm:text-xl">
                  {panel.body}
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  {panel.points.map((point) => (
                    <div
                      key={point}
                      className="rounded-[8px] border border-[#cfeeff] bg-[#f6fbff] p-4"
                    >
                      <CheckCircle2 className="h-5 w-5 text-[#057bd2]" />
                      <p className="mt-3 text-sm font-extrabold leading-snug text-[#16212a]">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/contact"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] bg-[#057bd2] px-6 py-3 text-sm font-extrabold text-white transition-all hover:-translate-y-0.5 hover:bg-[#0568b1]"
                  >
                    {category.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/courses"
                    className={cn(
                      "inline-flex min-h-12 items-center justify-center rounded-[8px] border border-[#bfe5ff] bg-white px-6 py-3 text-sm font-extrabold text-[#16212a] transition-all hover:-translate-y-0.5 hover:bg-[#f6fbff]",
                      index !== 0 && "sm:hidden"
                    )}
                  >
                    Browse Courses
                  </Link>
                </div>
              </div>
            </div>
          </TextParallaxContent>
        );
      })}
    </div>
  );
}
