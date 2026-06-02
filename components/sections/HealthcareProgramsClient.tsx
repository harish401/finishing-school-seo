'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Search, 
  ClipboardCheck, 
  GraduationCap, 
  Stethoscope, 
  ExternalLink,
  MessageSquare,
  BadgeAlert,
  Sparkles
} from 'lucide-react';

interface ExamDetail {
  id: string;
  name: string;
  fullName: string;
  targetRegion: string;
  idealFor: string;
  subjects: string[];
  features: string[];
}

const exams: ExamDetail[] = [
  {
    id: 'dha',
    name: 'DHA Exam',
    fullName: 'Dubai Health Authority',
    targetRegion: 'Dubai, UAE',
    idealFor: 'Nurses, General Practitioners, Specialists, Pharmacists, Allied Health',
    subjects: [
      'Clinical Case Management',
      'Nursing Fundamentals & Therapeutics',
      'Pharmacotherapy & Drug Safety',
      'Diagnostic & Laboratory Interpretations',
      'Medical Ethics & Patient Safety Standards'
    ],
    features: [
      'Comprehensive MCQ Practice Drills',
      'Dataflow Document Verification Consultation',
      'Computer-Based Testing (CBT) Interface Prep',
      'Mock Assessments matching real DHA patterns'
    ]
  },
  {
    id: 'moh',
    name: 'MOH Exam',
    fullName: 'Ministry of Health',
    targetRegion: 'Northern Emirates (Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah, Fujairah)',
    idealFor: 'Doctors, Dentists, Nurses, Pharmacists, Lab Technicians',
    subjects: [
      'Community Medicine & Healthcare Systems',
      'Obstetrics & Gynecology Clinical Protocols',
      'Pediatric Care Standards',
      'Internal Medicine Cases',
      'Pharmaceutical Formulation & Dispensing'
    ],
    features: [
      'Syllabus mapped directly to MOH Guidelines',
      'Interactive Live Clinical Problem Solving',
      'Intensive Pharmacist & Nurse Specialization Classes',
      'Individual Performance Analytics & Review'
    ]
  },
  {
    id: 'prometric',
    name: 'Prometric Exams',
    fullName: 'Saudi Commission, Qatar DHP, Oman OMSB',
    targetRegion: 'Saudi Arabia, Qatar, Oman, Bahrain',
    idealFor: 'All Healthcare & Medical Licensure Aspirants',
    subjects: [
      'Nursing Leadership & Critical Care',
      'General Dentistry & Oral Surgery',
      'Clinical Pathology & Laboratory Practice',
      'Radiography Techniques & Safety',
      'Physiotherapy Assessment Protocols'
    ],
    features: [
      'Large Question Bank with 5000+ Verified MCQs',
      'Prometric Testing Center Interface Simulations',
      'High-yield Review Notes for last-minute revisions',
      'Expert Guidance through OMSB & SCHQ Portals'
    ]
  },
  {
    id: 'haad',
    name: 'HAAD / DOH Exam',
    fullName: 'Department of Health - Abu Dhabi',
    targetRegion: 'Abu Dhabi & Al Ain, UAE',
    idealFor: 'Nurses, Allied Health, General Practitioners, Dental Professionals',
    subjects: [
      'Advanced Cardiac Life Support (ACLS)',
      'Clinical Decision Making Frameworks',
      'Maternal & Neonatal Critical Care',
      'Pharmacokinetics & Drug Interactions',
      'infection Control & Quality Metrics'
    ],
    features: [
      'Highly Targeted HAAD Nurse Specialist Prep',
      'Interactive Case Study Workshops',
      'Credentialing Evaluation & Application Support',
      'Continuous Doubt-Clearing with Dr. Deepa & Faculty'
    ]
  }
];

const dataflowSteps = [
  {
    step: '01',
    title: 'Credential Evaluation',
    desc: 'Verify eligibility by reviewing qualification transcripts, professional registers, and clinical experience requirements.',
    detail: 'We execute a prior-assessment check to ensure your certificates align with Gulf regulatory authorities (DHA, MOH, DOH) before processing financial transactions.'
  },
  {
    step: '02',
    title: 'Primary Source Verification (Dataflow)',
    desc: 'Direct background verification of documents from the issuing institutions (universities, hospitals, licensing boards).',
    detail: 'Dataflow is the mandatory background screening stage. We handle uploading, indexing, and continuous tracking to prevent "No Match" or "Negative" reports.'
  },
  {
    step: '03',
    title: 'Exam Registration & Scheduling',
    desc: 'Establish credentialing profiles, book eligibility IDs, and secure preferred testing slots at regional Prometric centres.',
    detail: 'We manage portal profiles, coordinate credentialing approvals, generate standard eligibility letters, and book testing slots closest to your location.'
  },
  {
    step: '04',
    title: 'Preparation & Licensure Conferred',
    desc: 'Comprehensive coaching, dynamic simulated mocks, and license activation support once the exam is cleared.',
    detail: 'Complete intensive coaching under Dr. Deepa Seira Babu and our medical faculty, clear your CBT, and secure your professional license to practice abroad.'
  }
];

export function HealthcareProgramsClient() {
  const [activeExam, setActiveExam] = useState<string>('dha');
  const [activeStep, setActiveStep] = useState<number>(0);

  const selectedExam = exams.find(e => e.id === activeExam) || exams[0];

  return (
    <div className="section-padding bg-background relative overflow-hidden">
      {/* Visual Blueprint Backdrop grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
      <div className="absolute top-0 right-0 -mr-40 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-40 w-[500px] h-[500px] rounded-full bg-secondary-container/5 blur-3xl pointer-events-none" />

      <div className="container-main relative z-10">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-16">
          <span className="chip bg-primary/10 text-primary border border-primary/10 uppercase tracking-widest text-xs font-semibold px-4 py-1.5 rounded-full inline-block">
            OVERSEAS MEDICAL COACHING DIVISION
          </span>
          <h2 className="text-4xl font-extrabold text-on-surface sm:text-5xl font-[family-name:var(--font-heading)] leading-tight tracking-tight mt-4">
            Licensure Exam Preparation &amp; <br />
            <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent">
              Comprehensive Dataflow Support
            </span>
          </h2>
          <p className="mt-6 text-lg text-on-surface-variant leading-relaxed">
            With over 11 years of dedicated experience under the visionary guidance of founders <strong>Dr. Deepa Seira Babu</strong> and <strong>Dr. Praveena Prathapachandran</strong>, we prepare medical and healthcare professionals to clear Gulf licensing exams and manage official credentials verification.
          </p>
        </div>

        {/* Section 1: The Interactive Exam Showcase */}
        <div className="grid gap-12 lg:grid-cols-12 mb-24">
          
          {/* Left Column: Exam Navigation Buttons */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <h3 className="text-xs uppercase font-extrabold tracking-wider text-on-surface-variant/80 mb-2 pl-2">
              Select Licensure Category
            </h3>
            {exams.map((exam) => (
              <button
                key={exam.id}
                onClick={() => setActiveExam(exam.id)}
                className={cn(
                  'flex items-center justify-between p-5 rounded-2xl border text-left transition-all duration-300',
                  activeExam === exam.id
                    ? 'bg-primary-light/30 border-primary shadow-md'
                    : 'border-outline-variant/30 hover:border-primary-container hover:bg-primary-light/10 bg-surface/50'
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm',
                    activeExam === exam.id ? 'bg-primary text-white' : 'bg-surface border border-outline-variant/30 text-on-surface-variant'
                  )}>
                    {exam.id.toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface leading-snug">{exam.name}</h4>
                    <p className="text-xs text-on-surface-variant mt-0.5">{exam.fullName}</p>
                  </div>
                </div>
                <div className={cn(
                  'w-2 h-2 rounded-full transition-colors duration-300',
                  activeExam === exam.id ? 'bg-primary' : 'bg-transparent'
                )} />
              </button>
            ))}

            {/* Quick Contact Box */}
            <div className="mt-8 p-6 rounded-3xl border border-outline-variant/40 bg-surface-container-low/40 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-10 translate-x-2 translate-y-2">
                <Stethoscope className="w-28 h-28 text-primary" />
              </div>
              <h4 className="font-bold text-on-surface flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                Dataflow Verification Help
              </h4>
              <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                Stuck with credentials or primary source screening? Our dedicated Operations Desk manages document verification seamlessly.
              </p>
              <a
                href="https://wa.me/919400262274?text=Hi%20Unique%20Mentors,%20I%20want%20to%20know%20more%20about%20Medical%20Licensure%20and%20Dataflow%20verification."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-xs font-bold text-white shadow-md hover:bg-emerald-600 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                Chat with Document Specialist
              </a>
            </div>
          </div>

          {/* Right Column: Syllabus Drawer & Mockup */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeExam}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="bg-surface/50 border border-outline-variant/30 rounded-[2rem] p-8 md:p-10 shadow-lg backdrop-blur-md relative overflow-hidden"
              >
                {/* Visual Blueprint background line */}
                <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-primary/20 rounded-tr-[2rem] pointer-events-none" />

                {/* Exam Title & Scope */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/30 pb-6 mb-8">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                      Exam Category Scope
                    </span>
                    <h3 className="text-3xl font-extrabold text-on-surface font-[family-name:var(--font-heading)] mt-2">
                      {selectedExam.name}
                    </h3>
                  </div>
                  <div className="md:text-right bg-surface border border-outline-variant/30 rounded-2xl px-5 py-3 shadow-sm flex flex-col justify-center">
                    <p className="text-xs text-on-surface-variant font-medium">Target Region</p>
                    <p className="font-bold text-primary text-sm mt-0.5">{selectedExam.targetRegion}</p>
                  </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  
                  {/* Left sub-column: Subjects Timeline */}
                  <div>
                    <h4 className="text-xs uppercase font-extrabold tracking-wider text-on-surface-variant/90 mb-4 flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-primary" />
                      Core Curriculum Modules
                    </h4>
                    <ul className="space-y-4">
                      {selectedExam.subjects.map((sub, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary border border-primary/15 text-xs font-bold flex items-center justify-center">
                            {i + 1}
                          </span>
                          <span className="text-sm font-medium text-on-surface-variant leading-relaxed">
                            {sub}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right sub-column: Features & Mockup Card */}
                  <div className="flex flex-col justify-between gap-6">
                    <div>
                      <h4 className="text-xs uppercase font-extrabold tracking-wider text-on-surface-variant/90 mb-4 flex items-center gap-2">
                        <ClipboardCheck className="w-4 h-4 text-primary" />
                        Our Coaching Features
                      </h4>
                      <ul className="space-y-3">
                        {selectedExam.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <ShieldCheck className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span className="text-xs font-medium text-on-surface-variant leading-normal">
                              {feat}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Official credential card mockup */}
                    <div className="relative border border-outline-variant/30 rounded-2xl bg-gradient-to-br from-primary-light/20 to-surface/80 p-5 overflow-hidden shadow-sm">
                      <div className="absolute right-0 top-0 opacity-10">
                        <BadgeAlert className="w-20 h-20 text-primary" />
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-primary" />
                        </div>
                        <h5 className="font-bold text-xs text-on-surface tracking-wider uppercase">
                          International Licensure Ready
                        </h5>
                      </div>
                      <p className="text-[11px] text-on-surface-variant mt-2 leading-relaxed">
                        Earn your official practice license in the UAE, KSA, Oman, or Qatar. Standard credentials verified directly via recognized dataflow registries.
                      </p>
                      <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between text-[10px] font-semibold text-on-surface-variant">
                        <span>EST. Legacy: 2015</span>
                        <span className="text-primary flex items-center gap-0.5">
                          Verified <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 inline" />
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Section 2: The Dataflow & Licensure Roadmap */}
        <div className="border-t border-outline-variant/30 pt-24 mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="chip bg-primary/10 text-primary border border-primary/10 uppercase tracking-widest text-xs font-semibold px-4 py-1.5 rounded-full inline-block">
              THE LICENSING ROADMAP
            </span>
            <h3 className="text-3xl font-extrabold text-on-surface sm:text-4xl font-[family-name:var(--font-heading)] leading-tight mt-4">
              Step-by-Step Licensure &amp; Verification Workflow
            </h3>
            <p className="mt-4 text-sm text-on-surface-variant leading-relaxed">
              We manage the entire pathway seamlessly, from initial certificate assessment through Primary Source Verification (PSV) to successfully clearing exams.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {dataflowSteps.map((step, idx) => (
              <div 
                key={idx}
                className={cn(
                  'border rounded-3xl p-6 transition-all duration-300 relative overflow-hidden backdrop-blur-sm',
                  activeStep === idx
                    ? 'border-primary bg-primary-light/10 shadow-md'
                    : 'border-outline-variant/30 bg-surface/40 hover:bg-surface/70'
                )}
                onMouseEnter={() => setActiveStep(idx)}
              >
                {/* Step Number */}
                <div className="flex items-center justify-between mb-6">
                  <span className={cn(
                    'text-4xl font-extrabold font-[family-name:var(--font-heading)] select-none leading-none',
                    activeStep === idx ? 'text-primary' : 'text-on-surface-variant/20'
                  )}>
                    {step.step}
                  </span>
                  <div className={cn(
                    'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-300',
                    activeStep === idx ? 'bg-primary text-white' : 'bg-surface-container border border-outline-variant/30 text-on-surface-variant'
                  )}>
                    ✓
                  </div>
                </div>

                <h4 className="font-bold text-on-surface text-lg leading-snug mb-3">{step.title}</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-4">{step.desc}</p>
                
                {/* Extended Details revealing on hover/select */}
                <div className={cn(
                  'text-[11px] leading-relaxed text-primary mt-3 pt-3 border-t border-outline-variant/20 transition-all duration-300',
                  activeStep === idx ? 'opacity-100 max-h-[120px]' : 'opacity-40 max-h-[120px]'
                )}>
                  {step.detail}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Founders Message Showcase */}
        <div className="bg-surface/50 border border-outline-variant/30 rounded-[3rem] p-10 md:p-16 shadow-lg backdrop-blur-md relative overflow-hidden mb-12">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            
            {/* Left: Founders Typographic Message */}
            <div className="lg:col-span-7">
              <span className="chip bg-primary/10 text-primary border border-primary/10 uppercase tracking-widest text-[10px] font-black px-3 py-1 rounded-full">
                FOUNDERS MESSAGE
              </span>
              <h3 className="text-3xl font-extrabold text-on-surface font-[family-name:var(--font-heading)] mt-4 leading-tight tracking-tight">
                Empowering Healthcare Professionals Worldwide
              </h3>
              
              <div className="mt-6 space-y-4 text-sm text-on-surface-variant leading-relaxed">
                <p>
                  At Unique Mentors, our medical division is founded on a deep-seated commitment to supporting healthcare personnel in their international pursuits. Navigating dynamic board registrations and primary verification screening can be complex.
                </p>
                <div className="pl-6 border-l-4 border-primary text-sm font-semibold italic text-on-surface py-1">
                  &ldquo;With over a decade of personal coaching and process management expertise, we deliver a standardized blueprint that takes care of every credential check and provides focused tutoring to guarantee licensure success.&rdquo;
                </div>
                <p className="text-xs">
                  Whether you are preparing for the Dubai Health Authority licensing exam, scheduling Prometric sittings, or completing essential dataflow checks, our expert instructors are with you at every step.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-6 items-center border-t border-outline-variant/20 pt-6">
                <div>
                  <p className="font-extrabold text-on-surface text-sm">Dr. Deepa Seira Babu</p>
                  <p className="text-xs text-on-surface-variant font-medium mt-0.5">Founder &amp; Coach Teacher</p>
                </div>
                <div className="w-px h-8 bg-outline-variant/30 hidden sm:block" />
                <div>
                  <p className="font-extrabold text-on-surface text-sm">Dr. Praveena Prathapachandran</p>
                  <p className="text-xs text-on-surface-variant font-medium mt-0.5">Founder &amp; Coach Teacher</p>
                </div>
              </div>
            </div>

            {/* Right: Premium B2B Verification Callout Desk */}
            <div className="lg:col-span-5 relative">
              <div className="border border-outline-variant/40 rounded-[2rem] bg-gradient-to-br from-surface to-primary-light/10 p-8 shadow-sm">
                <h4 className="font-black text-xs uppercase tracking-widest text-primary">
                  100% Verified Credentials Assistance
                </h4>
                <h3 className="text-xl font-bold text-on-surface mt-2">
                  Avoid Application Rejection
                </h3>
                <p className="text-xs text-on-surface-variant mt-3 leading-relaxed">
                  Submitting mismatched certificates or failing dataflow checks can bar you from practicing in Gulf countries. Our Operations Desk ensures absolute error-free verification.
                </p>
                
                <ul className="mt-5 space-y-2.5">
                  {[
                    'Prior eligibility checks matching Gulf standards',
                    'Safe uploading and document tracking reports',
                    'Eligibility ID creation and scheduling',
                    '100% verified practice exams coaching'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span className="text-xs font-semibold text-on-surface-variant">{item}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="https://wa.me/919400262274?text=Hi%20Unique%20Mentors,%20I%20would%20like%20to%20schedule%20a%20free%20Medical%20Licensure%20and%20Dataflow%20consultation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-xs font-bold text-white shadow-md hover:bg-opacity-90 transition-all duration-300"
                >
                  <MessageSquare className="w-4 h-4" />
                  Schedule Free Assessment
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
