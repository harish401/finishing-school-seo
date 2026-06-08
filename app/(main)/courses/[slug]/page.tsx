import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { generateSeoMetadata } from "@/lib/seo";
import {
  buildCourseSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { formatCurrency } from "@/lib/utils";
import { CourseGrid } from "@/components/courses/CourseGrid";
import type { CourseCardData, TrainerData } from "@/types";
import { 
  Calendar, 
  MapPin, 
  Award, 
  CheckCircle2, 
  Clock, 
  Star, 
  Users, 
  ShieldCheck, 
  UserCheck 
} from "lucide-react";

interface CurriculumStage {
  week: string;
  title: string;
  description: string;
  deliverable: string;
}

interface CourseDetail {
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  category: "school" | "college" | "healthcare" | "professional";
  fee: number;
  originalFee?: number;
  duration: string;
  mode: "online" | "offline" | "hybrid";
  thumbnail?: { url: string; alt: string };
  learningOutcomes: string[];
  highlights: string[];
  faqs: { question: string; answer: string }[];
  trainer: TrainerData;
  curriculum: CurriculumStage[];
}

const mockCourseDetails: Record<string, CourseDetail> = {
  "communication-mastery": {
    title: "Communication Mastery",
    slug: "communication-mastery",
    description:
      "Master public speaking, business communication, and interpersonal skills to stand out in any setting.",
    longDescription:
      "This comprehensive 8-week program is designed to transform you into a confident communicator. Whether you struggle with stage fright, boardroom presentations, or everyday conversations — our expert trainers will guide you through practical, hands-on sessions that build real-world skills. You'll practice with mock presentations, group discussions, and one-on-one coaching.",
    category: "professional",
    fee: 4999,
    originalFee: 7999,
    duration: "8 weeks",
    mode: "hybrid",
    thumbnail: { url: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800", alt: "Communication Mastery" },
    learningOutcomes: [
      "Deliver confident public speeches and presentations with zero anxiety",
      "Master micro-gestures, body alignment, and executive non-verbal subtext",
      "Draft high-impact professional emails, proposals, and briefs",
      "Engage effectively in high-pressure group debates and client pitches",
      "Build deep conversational rapport through dynamic active listening",
      "Overcome stage fright and speak clearly under high executive pressure",
    ],
    highlights: [
      "Mock presentation evaluation reports",
      "1-on-1 coaching with B2B experts",
      "Verified finishing school certificate",
      "Lifetime access to syllabus archives",
      "Direct placement advisory support",
    ],
    faqs: [
      {
        question: "Who is this course for?",
        answer:
          "This course is designed for college students, fresh graduates, and working professionals who want to improve their communication skills for career advancement.",
      },
      {
        question: "Is prior experience required?",
        answer:
          "No prior experience is needed. We welcome beginners and intermediate learners alike.",
      },
      {
        question: "What is the schedule?",
        answer:
          "Classes are held on weekends (Saturday & Sunday) from 10 AM to 1 PM IST, for 8 weeks.",
      },
      {
        question: "Will I get a certificate?",
        answer:
          "Yes, all students who complete the program receive a verified digital certificate.",
      },
    ],
    trainer: {
      id: "t1",
      name: "Dr. Ananya Rao",
      title: "Communication & Leadership Coach",
      bio: "With 15+ years of experience training professionals at Fortune 500 companies, Dr. Rao brings a unique blend of academic rigor and practical wisdom to every session.",
      specialties: ["Public Speaking", "Business Communication", "Leadership Presence"],
    },
    curriculum: [
      {
        week: "Weeks 1 - 2",
        title: "Foundation: Anxiety & Vocal Presence",
        description: "Overcome communication anxiety, master vocal warmups, and build baseline confidence for speaking.",
        deliverable: "Deliverable: Baseline speech recording & personal posture audit scorecard."
      },
      {
        week: "Weeks 3 - 4",
        title: "Structure: Logic & PREP Message Framing",
        description: "Structure professional explanations and arguments using the PREP (Point, Reason, Example, Point) framework.",
        deliverable: "Deliverable: Standard 2-minute executive brief writing & mock presentation."
      },
      {
        week: "Weeks 5 - 6",
        title: "Non-Verbal: Body Language & Decorum",
        description: "Align micro-expressions, open postures, micro-gestures, and professional dress codes to match B2B leadership standards.",
        deliverable: "Deliverable: Personal brand alignment audit & non-verbal video review."
      },
      {
        week: "Weeks 7 - 8",
        title: "Capstone: Boardrooms & Live Interviews",
        description: "Simulate high-stakes boardroom Q&A, handle objections, and master corporate placement interview cycles.",
        deliverable: "Deliverable: Capstone boardroom speech evaluation & verified course certificate."
      }
    ]
  },
  "financial-literacy-fundamentals": {
    title: "Financial Literacy Fundamentals",
    slug: "financial-literacy-fundamentals",
    description: "Learn budgeting, investing basics, and personal finance management to secure your future.",
    longDescription: "Gain clarity on wealth creation, banking essentials, tax optimization, and asset allocation starting with simple frameworks optimized for absolute beginners.",
    category: "college",
    fee: 3499,
    originalFee: 5999,
    duration: "6 weeks",
    mode: "online",
    thumbnail: { url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800", alt: "Financial Literacy" },
    learningOutcomes: [
      "Manage personal budgeting using the 50/30/20 rule",
      "Understand savings accounts, deposits, and banking structures",
      "Decipher the basics of compound interest and early investing",
      "Navigate tax configurations and common compliance routes",
    ],
    highlights: ["Interactive budget excel sheets", "Mock stock simulation exercises", "Completion certificate"],
    faqs: [
      { question: "Do I need math skills?", answer: "No complex math is required, only basic addition and subtraction." }
    ],
    trainer: {
      id: "t2",
      name: "Siddharth Mehta",
      title: "Chartered Accountant & Wealth Advisor",
      bio: "Siddharth has managed portfolios for high-net-worth clients and loves educating young adults about money.",
      specialties: ["Personal Finance", "Investment Strategy", "Tax Optimization"]
    },
    curriculum: [
      { week: "Weeks 1-3", title: "Banking, Savings & Budgeting", description: "Establish accounts, allocate earnings, and set financial goals.", deliverable: "Deliverable: Personal monthly budget spreadsheet." },
      { week: "Weeks 4-6", title: "Investing, Debt & Taxes", description: "Understand compound interest, mutual funds, stocks, and tax planning basics.", deliverable: "Deliverable: Completed mock investment portfolio model." }
    ]
  },
  "interview-prep-bootcamp": {
    title: "Interview Prep Bootcamp",
    slug: "interview-prep-bootcamp",
    description: "Crack any interview with mock sessions, resume building, and body language coaching.",
    longDescription: "An intensive 4-week workshop designed to polish your technical and HR interview response strategies, resume formatting, and LinkedIn profile settings.",
    category: "college",
    fee: 2999,
    originalFee: 4999,
    duration: "4 weeks",
    mode: "online",
    thumbnail: { url: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=800", alt: "Interview Prep" },
    learningOutcomes: [
      "Format standard resumes that bypass ATS filters",
      "Master the STAR response technique for behavioral questions",
      "Build a professional, search-optimized LinkedIn profile",
    ],
    highlights: ["Resume review reports", "1-on-1 mock interviews", "Access to placement networks"],
    faqs: [
      { question: "Is mock feedback recorded?", answer: "Yes, mock interviews are recorded and sent to you with a detailed evaluation sheet." }
    ],
    trainer: {
      id: "t3",
      name: "Rohan Sen",
      title: "Talent Acquisition Director",
      bio: "Rohan has vetted over 20,000 candidates for MNCs and startup unicorn systems globally.",
      specialties: ["Interview Drills", "ATS Optimization", "LinkedIn Branding"]
    },
    curriculum: [
      { week: "Weeks 1-2", title: "ATS Resumes & LinkedIn Mastery", description: "Draft high-impact text resumes and optimize digital footprints.", deliverable: "Deliverable: Approved ATS resume & LinkedIn setup." },
      { week: "Weeks 3-4", title: "STAR Framing & Live Mocks", description: "Master behavioral queries, body posture, and conduct live interview simulations.", deliverable: "Deliverable: Completed mock interview video report." }
    ]
  },
  "personality-development-schools": {
    title: "Personality Development for Schools",
    slug: "personality-development-schools",
    description: "A holistic program covering confidence building, etiquette, and leadership for school students.",
    longDescription: "Nurture confidence, grooming, speech clarity, and emotional expression in secondary school students.",
    category: "school",
    fee: 1999,
    duration: "4 weeks",
    mode: "offline",
    thumbnail: { url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800", alt: "Personality Development" },
    learningOutcomes: ["Speak confidently in public settings", "Adopt polite etiquette in group meetings", "Handle peer pressure productively"],
    highlights: ["Confidence workshops", "Etiquette lessons", "Certified completion"],
    faqs: [{ question: "What is the age limit?", answer: "Optimized for school students from 6th to 12th standards." }],
    trainer: {
      id: "t4",
      name: "Nisha Patel",
      title: "Child Psychologist & Soft Skills Mentor",
      bio: "Nisha designs developmental curricula that encourage students to express their true potential.",
      specialties: ["Emotional Intelligence", "Vocal Expression", "Confidence Building"]
    },
    curriculum: [
      { week: "Weeks 1-2", title: "Vocal Projection & Eye Contact", description: "Learn to introduce yourself and establish friendly, steady eye contact.", deliverable: "Deliverable: Short self-introduction speech assessment." },
      { week: "Weeks 3-4", title: "Social Etiquette & Cooperation", description: "Group coordination rules, table manners, and polite behavior guides.", deliverable: "Deliverable: Group presentation collaboration test." }
    ]
  },
  "professional-grooming-etiquette": {
    title: "Professional Grooming & Etiquette",
    slug: "professional-grooming-etiquette",
    description: "Learn corporate dressing, dining etiquette, and professional behaviour from industry experts.",
    longDescription: "Acquire visual presence, dining manners, email decorum, and behavioral confidence for corporate integration.",
    category: "professional",
    fee: 3999,
    originalFee: 5999,
    duration: "3 weeks",
    mode: "offline",
    thumbnail: { url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800", alt: "Professional Grooming" },
    learningOutcomes: ["Dress appropriately for all business occasions", "Demonstrate standard dining and conversation etiquette", "Conduct business with professional verbal and non-verbal poise"],
    highlights: ["Live corporate dining simulation", "Wardrobe coordination blueprint", "Etiquette playbook"],
    faqs: [{ question: "Is there a dining session?", answer: "Yes, the course includes a practical dining session at a premium business venue." }],
    trainer: {
      id: "t5",
      name: "Elena Rostova",
      title: "Corporate Image & Etiquette Expert",
      bio: "Elena coach business leaders, executives, and fresh graduates on international business standards.",
      specialties: ["Dining Etiquette", "Wardrobe Styling", "Interpersonal Poise"]
    },
    curriculum: [
      { week: "Week 1", title: "Wardrobe & Appearance Standards", description: "Coordinate business attire, accessories, grooming, and personal hygiene.", deliverable: "Deliverable: Individual styling blueprint." },
      { week: "Weeks 2-3", title: "Dining & Social Etiquette", description: "Practical rules for dining settings, introductions, small talk, and greeting etiquette.", deliverable: "Deliverable: Live dining simulation critique." }
    ]
  },
  "healthcare-communication-skills": {
    title: "Healthcare Communication Skills",
    slug: "healthcare-communication-skills",
    description: "Specialized communication training for healthcare professionals — patient interaction, empathy building, and clinical communication.",
    longDescription: "Equip clinicians, nurses, and hospital managers with patient-centric communication styles, empathy-first responses, and crisp inter-team reporting structures.",
    category: "healthcare",
    fee: 5999,
    duration: "6 weeks",
    mode: "hybrid",
    thumbnail: { url: "https://images.unsplash.com/photo-1576091160550-2173ff9e5eb4?auto=format&fit=crop&q=80&w=800", alt: "Healthcare Communication" },
    learningOutcomes: ["Communicate complex medical scenarios with empathy", "De-escalate patient anxiety and handle critical reviews", "Coordinate clinical handovers with high clarity"],
    highlights: ["Clinical scenario simulation report", "Empathy training exercises", "SBAR communication template"],
    faqs: [{ question: "Is this course accredited?", answer: "A certificate of finishing clinical communication is provided upon completion." }],
    trainer: {
      id: "t6",
      name: "Dr. Marcus Vance",
      title: "Director of Clinical Communication",
      bio: "Dr. Vance has mentored healthcare professionals globally on medical consultation excellence and hospital patient relations.",
      specialties: ["Patient Consultations", "Empathy-First Interventions", "SBAR Reporting"]
    },
    curriculum: [
      { week: "Weeks 1-3", title: "Empathetic Patient Consultations", description: "Active listening, explaining treatment options, and de-escalating tense patient family dialogue.", deliverable: "Deliverable: Patient scenario simulation review." },
      { week: "Weeks 4-6", title: "Clinical Handovers & Documentation", description: "Crisp inter-professional documentation, medical terminology layout, and transition-of-care guidelines.", deliverable: "Deliverable: Standard SBAR handover scorecard." }
    ]
  },

  // 18 NEW PROGRAMS
  "future-leaders-program": {
    title: "Future Leaders Program",
    slug: "future-leaders-program",
    description: "A transformational program designed to develop confidence, leadership abilities, communication skills, and a growth mindset among school students.",
    longDescription: "Designed for school students to establish early leadership competence, public speaking flow, collaborative team skills, time management habits, and emotional intelligence. The course uses structured workshops, confidence drills, and team assignments to build future-ready young leaders.",
    category: "school",
    fee: 1999,
    originalFee: 2999,
    duration: "4 weeks",
    mode: "offline",
    thumbnail: { url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800", alt: "Future Leaders Program" },
    learningOutcomes: [
      "Develop high self-awareness and positive personality development traits",
      "Learn and apply confidence-building techniques to speak in front of audiences",
      "Master the fundamentals of youth leadership and collaborative team building",
      "Improve spoken English, public speaking fluency, and social responsibility",
      "Build structured problem solving, logical decision making, and task prioritization habits",
    ],
    highlights: ["Interactive peer group projects", "Creative public speaking assignments", "Self-reflection scorecards", "Verified leadership badge"],
    faqs: [
      { question: "What age range is this program optimized for?", answer: "This program is designed for school students between 12 and 17 years of age." },
      { question: "Are classes scheduled on school days?", answer: "No, classes are scheduled on weekends to ensure academic schedules are not disrupted." }
    ],
    trainer: {
      id: "t_flp",
      name: "Sarah Jenkins",
      title: "Youth Development Coach & Author",
      bio: "Sarah has designed youth leadership programs for international schools and has authored two best-selling children's emotional intelligence playbooks.",
      specialties: ["Vocal Presence", "Emotional Intelligence", "Team Coordination"]
    },
    curriculum: [
      { week: "Weeks 1-2", title: "Self-Awareness & Vocal Confidence", description: "Identify personality strengths, conquer stage fright, and practice vocal modulation exercises.", deliverable: "Deliverable: 3-minute self-reflective speech recording." },
      { week: "Weeks 3-4", title: "Team Leadership & Problem Solving", description: "Work on group problem scenarios, lead collaborative team projects, and understand social responsibility.", deliverable: "Deliverable: Group leadership project submission." }
    ]
  },
  "career-awareness-program": {
    title: "Career Awareness Program",
    slug: "career-awareness-program",
    description: "Helps students explore career opportunities and make informed educational and professional choices.",
    longDescription: "A guided roadmap that helps high school students map their personal strengths and interests to real-world career domains, covering engineering, tech, healthcare, commerce, public service, and creative design industries.",
    category: "school",
    fee: 1499,
    originalFee: 2499,
    duration: "3 weeks",
    mode: "online",
    thumbnail: { url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800", alt: "Career Awareness Program" },
    learningOutcomes: [
      "Understand personal career interests, strengths, and professional inclinations",
      "Explore emerging career paths and upcoming opportunities across industrial fields",
      "Deep dive into Healthcare, Engineering, Technology, Commerce, and Creative fields",
      "Formulate a custom career planning roadmap and navigate academic choices",
    ],
    highlights: ["Aptitude assessment tools", "Expert guest panel interactive sessions", "Step-by-step career path checklist"],
    faqs: [
      { question: "Is there direct parent involvement?", answer: "Parents are invited to join the final roadmap discussion session on Week 3." }
    ],
    trainer: {
      id: "t_cap",
      name: "Dr. Rajesh Kumar",
      title: "Lead Career Counselor & Psychologist",
      bio: "Dr. Kumar has over 15 years of experience counselling students on national and international academic pathways.",
      specialties: ["Psychometric Analysis", "College Planning", "Emerging Careers"]
    },
    curriculum: [
      { week: "Week 1", title: "Aptitude Mapping & Interest Discovery", description: "Run psychometric exercises to outline individual capabilities and interest zones.", deliverable: "Deliverable: Personal aptitude report profile." },
      { week: "Weeks 2-3", title: "Industry Overviews & Career Roadmaps", description: "Investigate modern professional fields and draft educational milestones.", deliverable: "Deliverable: Final career choice roadmap blueprint." }
    ]
  },
  "study-skills-productivity-program": {
    title: "Study Skills & Productivity Program",
    slug: "study-skills-productivity-program",
    description: "Designed to help students improve academic performance through effective learning techniques.",
    longDescription: "Transform how you study. This course covers memory techniques, spaced repetition, the Cornell note-taking method, time management schedules, exam preparation strategies, and digital study tools designed to improve retention and reduce stress.",
    category: "school",
    fee: 1299,
    originalFee: 1999,
    duration: "3 weeks",
    mode: "online",
    thumbnail: { url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800", alt: "Study Skills & Productivity Program" },
    learningOutcomes: [
      "Implement smart study frameworks like active recall and spaced repetition",
      "Apply memory enhancement strategies to easily recall complex formulas and texts",
      "Create optimized study schedules and master time management limits",
      "Adopt advanced Cornell note-taking methods and map information visually",
      "Build daily concentration routines and manage test anxiety",
    ],
    highlights: ["Daily planner models", "Note-taking mock tests", "Interactive memory drills"],
    faqs: [
      { question: "Can this help students prepare for competitive exams?", answer: "Yes, the study skills taught are universally applicable to boards and competitive entry exams." }
    ],
    trainer: {
      id: "t_ssp",
      name: "Michael Chang",
      title: "Learning Design Specialist",
      bio: "Michael studies cognitive retention techniques and coaches students globally on academic performance optimization.",
      specialties: ["Spaced Repetition", "Active Recall", "Stress De-escalation"]
    },
    curriculum: [
      { week: "Week 1", title: "Cognitive Mechanics & Cornell Note-taking", description: "Discover how the brain retains facts. Master the Cornell note-taking structure.", deliverable: "Deliverable: Structured notes file from a sample lecture." },
      { week: "Weeks 2-3", title: "Memory Systems & Stress Control", description: "Use memory palace associations and build high-productivity study calendars.", deliverable: "Deliverable: Complete personalized revision plan." }
    ]
  },
  "communication-confidence-building-program": {
    title: "Communication & Confidence Building Program",
    slug: "communication-confidence-building-program",
    description: "Enhances communication skills and self-confidence for academic and personal success.",
    longDescription: "A youth program targeting spoken English flow, non-verbal expressions, presentation formatting, public speaking, active listening, and social etiquette guidelines to help students communicate naturally.",
    category: "school",
    fee: 1799,
    originalFee: 2799,
    duration: "4 weeks",
    mode: "hybrid",
    thumbnail: { url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800", alt: "Communication & Confidence Building Program" },
    learningOutcomes: [
      "Speak confidently and clearly in both classroom and social environments",
      "Understand verbal and non-verbal cues including body alignment",
      "Master introductory public speaking, presentations, and group discussions",
      "Refine active listening and develop appropriate social etiquette habits",
    ],
    highlights: ["Recorded speech practice", "Confidence-building activities", "Conversational English circles"],
    faqs: [{ question: "Do we work on grammar?", answer: "We focus on conversation confidence and flow; key grammar checks are integrated naturally." }],
    trainer: {
      id: "t_ccbp",
      name: "Linda Henderson",
      title: "Speech & Linguistics Mentor",
      bio: "Linda has taught English communication and verbal presence to students across schools globally.",
      specialties: ["Fluency Development", "Diction & Intonation", "Body Language"]
    },
    curriculum: [
      { week: "Weeks 1-2", title: "Speech Flow & Non-Verbal Alignment", description: "Learn eye-contact, gesture controls, and eliminate vocal fillers.", deliverable: "Deliverable: 1-minute video pitch evaluation." },
      { week: "Weeks 3-4", title: "Public Speaking & Etiquette Simulators", description: "Practice speaking in front of groups and participate in mock discussions.", deliverable: "Deliverable: Live 3-minute presentation graduation." }
    ]
  },
  "campus-to-corporate-program": {
    title: "Campus to Corporate Program",
    slug: "campus-to-corporate-program",
    description: "Prepares students to transition successfully from academic life to professional careers.",
    longDescription: "A transition course for fresh graduates designed to cultivate professional conduct, business etiquette, team dynamics, conflict resolution, and understanding corporate expectations.",
    category: "college",
    fee: 3499,
    originalFee: 4999,
    duration: "6 weeks",
    mode: "hybrid",
    thumbnail: { url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800", alt: "Campus to Corporate Program" },
    learningOutcomes: [
      "Understand corporate culture, standards, and workplace expectations",
      "Develop professional communication, business writing, and email habits",
      "Master business etiquette, dinner decorum, and team collaboration",
      "Understand workplace ethics, professional conduct, and career progression planning",
    ],
    highlights: ["Mock workplace scenarios", "Business writing exercises", "Professional etiquette handbooks"],
    faqs: [{ question: "Is this helpful for engineering students?", answer: "Yes, it is designed for students of all academic backgrounds entering corporate roles." }],
    trainer: {
      id: "t_c2c",
      name: "Vikram Malhotra",
      title: "Corporate HR Consultant",
      bio: "Vikram consults MNCs on onboarding talent and has directed corporate training for top technology firms.",
      specialties: ["Workplace Culture", "Business Etiquette", "Conflict Management"]
    },
    curriculum: [
      { week: "Weeks 1-3", title: "Corporate Conduct & Business Writing", description: "Learn workplace communications, structural email layout, and meeting etiquette.", deliverable: "Deliverable: Professional communication audit report." },
      { week: "Weeks 4-6", title: "Workplace Teams & Conflict Handling", description: "Handle project handovers, coordinate in teams, and resolve mock workspace conflicts.", deliverable: "Deliverable: Corporate readiness validation certificate." }
    ]
  },
  "financial-literacy-program": {
    title: "Financial Literacy Program",
    slug: "financial-literacy-program",
    description: "Provides practical knowledge for managing personal finances and building financial security.",
    longDescription: "Provides practical financial skills covering personal budget layouts, basic savings, investment vehicles, banking, credit scores, debt management, and basic tax filing.",
    category: "college",
    fee: 2499,
    originalFee: 3999,
    duration: "4 weeks",
    mode: "online",
    thumbnail: { url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800", alt: "Financial Literacy Program" },
    learningOutcomes: [
      "Design and manage personal budgets and track everyday expenditures",
      "Understand saving options, compound interest, and investment alternatives",
      "Learn banking mechanics, loan processing, and credit score monitoring",
      "Develop fundamental understanding of taxation and long-term financial goals",
    ],
    highlights: ["Interactive budget planning sheets", "Mock stock trading logs", "Credit scorecard checklists"],
    faqs: [{ question: "Will I learn about local tax structures?", answer: "Yes, we cover tax slabs, deductions, and basic filing routes." }],
    trainer: {
      id: "t_flp_col",
      name: "Sanjay Shah",
      title: "Financial Consultant & Wealth Advisor",
      bio: "Sanjay has over 12 years of experience hosting financial planning webinars for colleges and universities.",
      specialties: ["Tax Planning", "Investment Portfolios", "Debt Control"]
    },
    curriculum: [
      { week: "Weeks 1-2", title: "Banking, Budgeting & Savings", description: "Configure expense tracking, outline compound interest, and check banking products.", deliverable: "Deliverable: Personal cash-flow spreadsheet model." },
      { week: "Weeks 3-4", title: "Credit Scores, Taxes & Investing", description: "Analyze credit impacts, file mock tax documents, and assess investment classes.", deliverable: "Deliverable: Comprehensive personal wealth plan." }
    ]
  },
  "resume-interview-preparation-program": {
    title: "Resume & Interview Preparation Program",
    slug: "resume-interview-preparation-program",
    description: "Equips students with essential skills to secure internships and employment opportunities.",
    longDescription: "Get job-ready. Learn how to construct high-scoring resumes, optimize your LinkedIn profile, research job openings, and practice interview communication skills.",
    category: "college",
    fee: 1999,
    originalFee: 2999,
    duration: "4 weeks",
    mode: "online",
    thumbnail: { url: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=800", alt: "Resume & Interview Preparation Program" },
    learningOutcomes: [
      "Write high-scoring resumes, CVs, and cover letters that bypass ATS systems",
      "Optimize LinkedIn profile visibility and use job search channels effectively",
      "Prepare for interviews using standard response frameworks and structured answers",
      "Participate in group discussions and mock interview practice rounds",
    ],
    highlights: ["Professional resume template files", "LinkedIn profile audit scorecards", "Interactive group discussion mock sessions"],
    faqs: [{ question: "Do you review my resume personally?", answer: "Yes, each student receives two personalized resume reviews with feedback." }],
    trainer: {
      id: "t_ripp",
      name: "Pooja Sharma",
      title: "Corporate Recruiter & Coach",
      bio: "Pooja directs recruitment campaigns for corporate partners and helps graduates build their personal brands.",
      specialties: ["ATS Resumes", "LinkedIn Profiles", "Mock Interviews"]
    },
    curriculum: [
      { week: "Weeks 1-2", title: "Resume Construction & LinkedIn Strategy", description: "Write cover letters, build resumes, and optimize LinkedIn profiles.", deliverable: "Deliverable: Approved resume PDF & LinkedIn setup review." },
      { week: "Weeks 3-4", title: "Interview Practice & Group Discussions", description: "Prepare for HR and technical interview questions and practice group debates.", deliverable: "Deliverable: Video mock interview scorecard report." }
    ]
  },
  "leadership-development-program": {
    title: "Leadership Development Program",
    slug: "leadership-development-program",
    description: "Develops leadership qualities necessary for academic, professional, and personal growth.",
    longDescription: "A leadership program focusing on different leadership styles, team building, collaborative decision making, conflict resolution, negotiation skills, emotional intelligence, and project management fundamentals.",
    category: "college",
    fee: 2999,
    originalFee: 4500,
    duration: "5 weeks",
    mode: "hybrid",
    thumbnail: { url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800", alt: "Leadership Development Program" },
    learningOutcomes: [
      "Identify personal leadership style and manage diverse groups",
      "Coordinate team activities and build cooperative environments",
      "Make decisions under pressure and resolve disputes using negotiation techniques",
      "Apply emotional intelligence and manage projects using basic PM tools",
    ],
    highlights: ["Leadership case studies", "Interactive negotiation games", "Project management templates"],
    faqs: [{ question: "Is this program useful for student leaders?", answer: "Yes, it is highly recommended for student council members and club coordinators." }],
    trainer: {
      id: "t_ldp",
      name: "David Miller",
      title: "Leadership Consultant & Executive Coach",
      bio: "David mentors corporate teams and university groups on leadership strategies and project coordination.",
      specialties: ["Leadership Styles", "Conflict Resolution", "Strategic Thinking"]
    },
    curriculum: [
      { week: "Weeks 1-3", title: "Leadership Styles & Emotional Intelligence", description: "Assess leadership types, develop active self-awareness, and practice team-building exercises.", deliverable: "Deliverable: Leadership self-assessment plan." },
      { week: "Weeks 4-5", title: "Negotiation, Disputes & Project Basics", description: "Understand conflict resolution, negotiation basics, and project scheduling templates.", deliverable: "Deliverable: Complete project implementation blueprint." }
    ]
  },
  "healthcare-career-discovery-program": {
    title: "Healthcare Career Discovery Program",
    slug: "healthcare-career-discovery-program",
    description: "Introduces students and graduates to diverse healthcare career opportunities.",
    longDescription: "Learn about the diverse career paths in healthcare, including clinical medicine, dentistry, nursing, pharmacy, allied health, public health, and healthcare management.",
    category: "healthcare",
    fee: 3999,
    originalFee: 5999,
    duration: "4 weeks",
    mode: "online",
    thumbnail: { url: "https://images.unsplash.com/photo-1576091160550-2173ff9e5eb4?auto=format&fit=crop&q=80&w=800", alt: "Healthcare Career Discovery Program" },
    learningOutcomes: [
      "Understand roles, duties, and qualifications across medical and nursing sectors",
      "Learn about options in pharmacy, public health, and allied health support roles",
      "Understand the healthcare management landscape and international career routes",
      "Formulate a pathway for pursuing medical degrees and qualifications",
    ],
    highlights: ["Interviews with active doctors", "Hospital operations workflow reviews", "Global pathway guides"],
    faqs: [{ question: "Is this open to non-science students?", answer: "Yes, it is designed to help anyone interested in healthcare discover clinical and non-clinical roles." }],
    trainer: {
      id: "t_hcd",
      name: "Dr. Evelyn Ross",
      title: "Medical Education Consultant",
      bio: "Dr. Ross helps students select clinical specializations and plan international healthcare careers.",
      specialties: ["Medical Pathways", "Allied Healthcare", "Global Healthcare Options"]
    },
    curriculum: [
      { week: "Weeks 1-2", title: "Clinical Medicine, Nursing & Pharmacy Profiles", description: "Explore the daily roles and study pathways of doctors, nurses, and pharmacists.", deliverable: "Deliverable: Personal healthcare career interest profile." },
      { week: "Weeks 3-4", title: "Allied Health, Management & Global Routes", description: "Learn about healthcare administration, public health initiatives, and international licensing requirements.", deliverable: "Deliverable: Completed medical educational plan." }
    ]
  },
  "global-healthcare-career-program": {
    title: "Global Healthcare Career Program",
    slug: "global-healthcare-career-program",
    description: "Provides guidance on international healthcare careers and migration pathways.",
    longDescription: "A comprehensive guide to international licensing, registration, documentation, and visa options for healthcare professionals looking to migrate to the UAE, UK, Australia, Canada, Ireland, or New Zealand.",
    category: "healthcare",
    fee: 6999,
    originalFee: 9999,
    duration: "8 weeks",
    mode: "hybrid",
    thumbnail: { url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800", alt: "Global Healthcare Career Program" },
    learningOutcomes: [
      "Understand migration pathways for the UAE, UK, Australia, Canada, Ireland, and New Zealand",
      "Navigate licensing guidelines, credentials verification, and Dataflow checks",
      "Meet requirements for international registration bodies like NMC, GMC, and AHPRA",
      "Evaluate salary structures, job market opportunities, and visa options",
    ],
    highlights: ["Dataflow step-by-step checklist files", "Visa application templates", "Salary comparison tools"],
    faqs: [{ question: "Does the program assist with visa applications?", answer: "We provide comprehensive pathway guidance and templates, but do not issue visas." }],
    trainer: {
      id: "t_ghc",
      name: "Dr. Amit Verma",
      title: "International Healthcare Recruiter",
      bio: "Amit helps medical professionals migrate to GCC countries and Western healthcare systems.",
      specialties: ["Licensure Processes", "Credential Assessment", "Immigration Pathways"]
    },
    curriculum: [
      { week: "Weeks 1-4", title: "Licensing Requirements & UAE/UK Deep Dive", description: "Learn about DHA, DOH, MOH licensing, UK NMC, and GMC registration steps.", deliverable: "Deliverable: Individual licensing roadmap report." },
      { week: "Weeks 5-8", title: "US/Canada/Australia Pathways & Dataflow", description: "Navigate Australia's AHPRA, Canada validation steps, and complete mock Dataflow setups.", deliverable: "Deliverable: Completed global migration application check." }
    ]
  },
  "healthcare-licensure-exam-readiness-program": {
    title: "Healthcare Licensure Exam Readiness Program",
    slug: "healthcare-licensure-exam-readiness-program",
    description: "Guides healthcare professionals through licensing examinations and registration processes.",
    longDescription: "An exam preparation course focusing on Prometric and licensure exams for DHA, DOH, MOH, OMSB, QCHP, SCFHS, HCPC, and CORU registration processes.",
    category: "healthcare",
    fee: 7999,
    originalFee: 11999,
    duration: "10 weeks",
    mode: "online",
    thumbnail: { url: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800", alt: "Healthcare Licensure Exam Readiness Program" },
    learningOutcomes: [
      "Prepare for Prometric examinations with mock papers and study plans",
      "Navigate registration for DHA, DOH, MOH, OMSB, QCHP, and SCFHS licensing boards",
      "Prepare documentation for UK HCPC and Ireland CORU registration",
      "Verify credentials through Dataflow and manage registration procedures",
    ],
    highlights: ["Mock Prometric test questions", "Step-by-step documentation guides", "Registration template archives"],
    faqs: [{ question: "Is this for doctors or nurses?", answer: "This program is customized for doctors, nurses, and allied health professionals preparing for exams." }],
    trainer: {
      id: "t_lerp",
      name: "Dr. Sarah Al-Mansoori",
      title: "Licensure Prep Director",
      bio: "Dr. Al-Mansoori has over 10 years of experience coordinating medical training and licensing programs in the GCC region.",
      specialties: ["Prometric Exams", "GCC Licensure Boards", "Document Verification"]
    },
    curriculum: [
      { week: "Weeks 1-5", title: "GCC Licensure & Prometric Test Prep", description: "Prepare for DHA, MOH, and DOH exams using structured mock test practices.", deliverable: "Deliverable: Mock exam performance report." },
      { week: "Weeks 6-10", title: "HCPC, CORU & Dataflow Verification", description: "Prepare documentation for UK and Irish licensing boards and check Dataflow requirements.", deliverable: "Deliverable: Completed document verification folder." }
    ]
  },
  "healthcare-employability-excellence-program": {
    title: "Healthcare Employability Excellence Program",
    slug: "healthcare-employability-excellence-program",
    description: "Focuses on employability skills required for healthcare professionals.",
    longDescription: "An employability workshop for healthcare professionals, covering medical CV formatting, LinkedIn profiles, patient-centric communication styles, clinical scenario interviews, and teamwork.",
    category: "healthcare",
    fee: 4999,
    originalFee: 7499,
    duration: "6 weeks",
    mode: "hybrid",
    thumbnail: { url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800", alt: "Healthcare Employability Excellence Program" },
    learningOutcomes: [
      "Write high-scoring medical resumes and clinical CVs",
      "Optimize LinkedIn profile visibility for healthcare recruiting",
      "Learn and apply patient-first communication and clinical team building",
      "Prepare for clinical interviews, scenario reviews, and ethical questions",
    ],
    highlights: ["Personalized medical CV templates", "Mock scenario interviews", "Ethical case studies"],
    faqs: [{ question: "Are clinical mock scenarios included?", answer: "Yes, the course includes live mock interviews focused on clinical scenarios." }],
    trainer: {
      id: "t_heep",
      name: "Professor Jean Larson",
      title: "Healthcare Ethics & Communication Coach",
      bio: "Professor Larson trains clinical teams in communication standards, patient relations, and medical interview preparation.",
      specialties: ["Medical CV Design", "Clinical Mock Interviews", "Patient Relations"]
    },
    curriculum: [
      { week: "Weeks 1-3", title: "Clinical CV Writing & Professional Communication", description: "Format medical resumes and learn key patient and team communication styles.", deliverable: "Deliverable: Approved clinical CV portfolio." },
      { week: "Weeks 4-6", title: "Clinical Scenario Practice & Interview Prep", description: "Practice scenario interviews and study ethical cases and decision-making.", deliverable: "Deliverable: Mock interview performance review." }
    ]
  },
  "international-healthcare-career-guidance": {
    title: "International Healthcare Career Guidance",
    slug: "international-healthcare-career-guidance",
    description: "Provides personalized guidance for healthcare professionals planning international careers.",
    longDescription: "A career guidance service providing credential assessments, country selection advice, licensing roadmaps, and documentation planning for healthcare professionals looking to practice abroad.",
    category: "healthcare",
    fee: 2999,
    originalFee: 4999,
    duration: "2 weeks",
    mode: "online",
    thumbnail: { url: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=800", alt: "International Healthcare Career Guidance" },
    learningOutcomes: [
      "Assess credential eligibility for migration pathways",
      "Compare licensing boards and select destination countries",
      "Build a step-by-step roadmap for document verification and migration",
      "Understand upskilling requirements for international certification",
    ],
    highlights: ["Individual eligibility review", "Country selection reports", "1-on-1 advisor calls"],
    faqs: [{ question: "Is this program open to all healthcare roles?", answer: "Yes, it is designed for doctors, nurses, pharmacists, and lab technicians." }],
    trainer: {
      id: "t_ihcg",
      name: "Dr. Robert Chen",
      title: "Global Mobility Consultant",
      bio: "Dr. Chen advises international health boards on talent recruitment and helps clinicians relocate internationally.",
      specialties: ["Credential Mapping", "Country Selection Guides", "Relocation Timelines"]
    },
    curriculum: [
      { week: "Week 1", title: "Credential Check & Country Match", description: "Analyze credentials and compare licensing boards across different destination options.", deliverable: "Deliverable: Personal country suitability report." },
      { week: "Week 2", title: "Licensure Roadmaps & Step-by-Step Plans", description: "Design a step-by-step plan for document verification and application processes.", deliverable: "Deliverable: Completed international relocation roadmap." }
    ]
  },
  "leadership-management": {
    title: "Leadership & Management",
    slug: "leadership-management",
    description: "Develop effective leadership and managerial competencies.",
    longDescription: "An advanced leadership course covering strategic planning, team building, conflict management, decision making, performance tracking, and organizational behavior.",
    category: "professional",
    fee: 5499,
    originalFee: 7999,
    duration: "6 weeks",
    mode: "hybrid",
    thumbnail: { url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800", alt: "Leadership & Management" },
    learningOutcomes: [
      "Apply strategic planning frameworks to achieve business objectives",
      "Manage team dynamics and build collaborative work environments",
      "Resolve workplace conflicts and make decisions under pressure",
      "Track performance metrics and study organizational behavior models",
    ],
    highlights: ["Strategic planning guides", "Team management tools", "Performance scorecards"],
    faqs: [{ question: "Do we study real corporate case studies?", answer: "Yes, the program uses real-world business case studies from various industries." }],
    trainer: {
      id: "t_lm_prof",
      name: "Arthur Pendelton",
      title: "Executive Business Consultant",
      bio: "Arthur has coached management teams at top firms and teaches organizational leadership at graduate levels.",
      specialties: ["Strategic Planning", "Team Performance", "Change Management"]
    },
    curriculum: [
      { week: "Weeks 1-3", title: "Strategic Planning & Team Coordination", description: "Set business goals, delegate tasks, and study team dynamics.", deliverable: "Deliverable: Team performance roadmap blueprint." },
      { week: "Weeks 4-6", title: "Conflict Resolution & Performance Management", description: "Manage workplace disputes, track KPIs, and study organizational change.", deliverable: "Deliverable: Management readiness certificate." }
    ]
  },
  "communication-excellence": {
    title: "Communication Excellence",
    slug: "communication-excellence",
    description: "Communicate effectively in professional environments.",
    longDescription: "An advanced business communication course covering presentation design, public speaking, technical writing, interpersonal relations, and cross-cultural communication.",
    category: "professional",
    fee: 3999,
    originalFee: 5999,
    duration: "4 weeks",
    mode: "online",
    thumbnail: { url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800", alt: "Communication Excellence" },
    learningOutcomes: [
      "Present business ideas clearly and structure slide decks effectively",
      "Speak confidently in public settings and handle Q&A sessions",
      "Draft clear business reports, emails, and proposals",
      "Build interpersonal connections and manage cross-cultural communications",
    ],
    highlights: ["Business presentation templates", "Technical writing guides", "Recorded speech evaluations"],
    faqs: [{ question: "Is email writing covered?", answer: "Yes, the course includes training on professional email formatting and writing." }],
    trainer: {
      id: "t_ce_prof",
      name: "Diane Sterling",
      title: "Business Communication Specialist",
      bio: "Diane advises corporate teams on presentation skills and cross-cultural communication strategies.",
      specialties: ["Public Presentations", "Business Proposals", "Cross-Cultural Dialogue"]
    },
    curriculum: [
      { week: "Weeks 1-2", title: "Corporate Presentations & Spoken Presence", description: "Structure slide decks, practice speaking under pressure, and manage Q&A sessions.", deliverable: "Deliverable: Business presentation slide deck file." },
      { week: "Weeks 3-4", title: "Business Writing & Interpersonal Skills", description: "Draft reports, write professional emails, and practice communication across cultures.", deliverable: "Deliverable: Writing portfolio assessment report." }
    ]
  },
  "grooming-professional-etiquette": {
    title: "Grooming & Professional Etiquette",
    slug: "grooming-professional-etiquette",
    description: "Develop a polished and professional personal brand.",
    longDescription: "A professional image development course covering grooming standards, business dress codes, dining etiquette, digital communication, and meeting manners.",
    category: "professional",
    fee: 2999,
    originalFee: 4499,
    duration: "3 weeks",
    mode: "offline",
    thumbnail: { url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800", alt: "Grooming & Professional Etiquette" },
    learningOutcomes: [
      "Adhere to grooming and wardrobe standards for different business events",
      "Practice professional meeting, dining, and introduction etiquette",
      "Manage professional digital presence and follow email etiquette",
      "Develop a polished personal brand and project confidence",
    ],
    highlights: ["Wardrobe wardrobe styling guides", "Interactive dining etiquette manuals", "Digital branding templates"],
    faqs: [{ question: "Is this useful for interview preparation?", answer: "Yes, dressing and personal presentation are critical first steps in any job search." }],
    trainer: {
      id: "t_gpe_prof",
      name: "Samantha Wright",
      title: "Image & Style Consultant",
      bio: "Samantha helps professionals build their public image and has coached candidates for television and public events.",
      specialties: ["Grooming Standards", "Dress Codes", "Dining Etiquette"]
    },
    curriculum: [
      { week: "Week 1", title: "Visual Standards & Dress Codes", description: "Select professional attire and follow grooming and presentation standards.", deliverable: "Deliverable: Personal grooming checklist." },
      { week: "Weeks 2-3", title: "Dining, Meeting & Digital Etiquette", description: "Learn business dining rules, meeting manners, and follow digital communication guidelines.", deliverable: "Deliverable: Etiquette assessment report." }
    ]
  },
  "career-advancement-coaching": {
    title: "Career Advancement Coaching",
    slug: "career-advancement-coaching",
    description: "Accelerate professional growth and career progression.",
    longDescription: "A career coaching program covering goal setting, advancement strategies, networking, promotion planning, and navigating career transitions.",
    category: "professional",
    fee: 5999,
    originalFee: 8999,
    duration: "4 weeks",
    mode: "online",
    thumbnail: { url: "https://images.unsplash.com/photo-1521791136368-1a8682707636?auto=format&fit=crop&q=80&w=800", alt: "Career Advancement Coaching" },
    learningOutcomes: [
      "Set clear professional goals and outline development paths",
      "Implement strategies to increase visibility and position for promotion",
      "Build a professional network and leverage career connections",
      "Navigate career transitions and prepare for management roles",
    ],
    highlights: ["Career development plan files", "Promotion checklist tools", "Networking tracking models"],
    faqs: [{ question: "Do we have 1-on-1 coaching calls?", answer: "Yes, the program includes two private career advisory sessions." }],
    trainer: {
      id: "t_cac_prof",
      name: "George Sterling",
      title: "Executive Career Advisor",
      bio: "George has mentored executives at various growth stages and helps professionals plan their career paths.",
      specialties: ["Promotion Planning", "Career Transitions", "Executive Presence"]
    },
    curriculum: [
      { week: "Weeks 1-2", title: "Goal Setting & Career Strategy", description: "Outline milestones, identify growth areas, and write career development plans.", deliverable: "Deliverable: Individual career plan file." },
      { week: "Weeks 3-4", title: "Promotion Planning & Networking Strategy", description: "Develop networking skills, prepare for salary reviews, and plan for career advancement.", deliverable: "Deliverable: Promotion readiness plan." }
    ]
  },
  "personal-branding-networking": {
    title: "Personal Branding & Networking",
    slug: "personal-branding-networking",
    description: "Build a strong professional identity and network for long-term career success.",
    longDescription: "Learn how to build your professional identity, optimize your LinkedIn profile, network effectively, establish thought leadership, and grow your career visibility.",
    category: "professional",
    fee: 4499,
    originalFee: 6499,
    duration: "4 weeks",
    mode: "hybrid",
    thumbnail: { url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800", alt: "Personal Branding & Networking" },
    learningOutcomes: [
      "Define and communicate your personal brand statement",
      "Optimize LinkedIn profile visibility and write professional posts",
      "Build a professional network and cultivate career contacts",
      "Apply content writing tactics to grow industry visibility",
    ],
    highlights: ["LinkedIn branding blueprints", "Content calendar templates", "Networking log tracking models"],
    faqs: [{ question: "Do I need to publish articles?", answer: "We focus on writing short posts and engaging in professional networks, but long articles are optional." }],
    trainer: {
      id: "t_pbn_prof",
      name: "Sophia Martinez",
      title: "Social Branding Strategist",
      bio: "Sophia advises businesses and professionals on social media strategy, networking, and personal branding.",
      specialties: ["LinkedIn Branding", "Content Calendars", "Professional Networking"]
    },
    curriculum: [
      { week: "Weeks 1-2", title: "Personal Brand Statement & LinkedIn Setup", description: "Define your professional values and optimize your LinkedIn profile layout.", deliverable: "Deliverable: Finished personal brand statement portfolio." },
      { week: "Weeks 3-4", title: "Content Writing & Professional Connections", description: "Draft professional posts, manage content calendars, and build industry connections.", deliverable: "Deliverable: 30-day professional networking roadmap." }
    ]
  }
};

const mockRelatedCourses: CourseCardData[] = [
  {
    id: "2",
    title: "Financial Literacy Fundamentals",
    slug: "financial-literacy-fundamentals",
    description: "Learn budgeting, investing basics, and personal finance management.",
    category: "college",
    fee: 3499,
    duration: "6 weeks",
    mode: "online",
    thumbnail: { url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800", alt: "Financial Literacy" },
  },
  {
    id: "3",
    title: "Interview Prep Bootcamp",
    slug: "interview-prep-bootcamp",
    description: "Crack any interview with mock sessions and resume building.",
    category: "college",
    fee: 2999,
    duration: "4 weeks",
    mode: "online",
    thumbnail: { url: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=800", alt: "Interview Prep" },
  },
];

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = mockCourseDetails[slug];

  if (!course) {
    return generateSeoMetadata({
      title: "Course Not Found",
      description: "The requested course could not be found.",
      path: `/courses/${slug}`,
    });
  }

  return generateSeoMetadata({
    title: course.title,
    description: course.description,
    path: `/courses/${slug}`,
  });
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = mockCourseDetails[slug];

  if (!course) {
    notFound();
  }

  const courseSchema = buildCourseSchema({
    title: course.title,
    description: course.description,
    slug: course.slug,
    fee: course.fee,
    mode: course.mode,
    duration: course.duration,
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: course.title, href: `/courses/${course.slug}` },
  ]);

  const faqSchema = buildFaqSchema(course.faqs);

  const defaultThumbnailUrl = "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800";

  return (
    <>
      <JsonLd data={courseSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-surface-container-low border-b border-outline-variant/20 py-20 lg:py-24">
        {/* Dynamic ambient glowing backing meshes */}
        <div className="absolute -right-40 -top-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -left-40 bottom-0 w-[400px] h-[400px] bg-primary-container/3 rounded-full blur-3xl" />

        <div className="container-main relative z-10">
          {/* Breadcrumbs link path */}
          <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant/75 mb-6 uppercase tracking-wider select-none">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/courses" className="hover:text-primary transition-colors">Courses</Link>
            <span>/</span>
            <span className="text-primary font-bold">{course.title}</span>
          </div>

          <div className="grid gap-12 lg:grid-cols-12 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-7 text-left">
              <span className="inline-flex items-center rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-primary backdrop-blur-sm select-none">
                {course.category} program
              </span>
              <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-on-surface md:text-5xl lg:text-6xl leading-[1.1]">
                {course.title}
              </h1>
              <p className="mt-6 text-base sm:text-lg text-on-surface-variant leading-relaxed font-normal">
                {course.longDescription}
              </p>

              {/* Mode & Duration Cards */}
              <div className="flex flex-wrap gap-4 mt-8 select-none">
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/20 shadow-sm text-sm font-semibold text-on-surface">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/20 shadow-sm text-sm font-semibold text-on-surface">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="capitalize">{course.mode} delivery</span>
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="mt-10 flex flex-wrap items-center gap-8">
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-on-surface-variant/80 uppercase tracking-widest mb-1 select-none">Tuition Fee</span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-black text-on-surface font-sans">
                      {formatCurrency(course.fee)}
                    </span>
                    {course.originalFee && (
                      <span className="text-lg text-on-surface-variant/65 line-through font-medium">
                        {formatCurrency(course.originalFee)}
                      </span>
                    )}
                  </div>
                </div>
                <Link
                  href={`/enroll/${course.slug}`}
                  className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold text-on-primary gradient-primary shadow-lg shadow-primary/25 transition-all duration-300 hover:opacity-95 hover:-translate-y-0.5"
                >
                  Enroll In Program
                </Link>
              </div>
            </div>

            {/* Right overlapping visual column */}
            <div className="lg:col-span-5 relative w-full h-[320px] sm:h-[380px] hidden lg:flex items-center justify-center select-none">
              {/* Decorative 3D-like floating layout backing card */}
              <div className="absolute inset-0 bg-primary/5 rounded-3xl border border-outline-variant/30 transform rotate-2 translate-x-4 translate-y-4" />
              
              <div className="relative w-full h-full rounded-3xl overflow-hidden border border-outline-variant/40 shadow-2xl bg-surface-container-lowest">
                <Image 
                  src={course.thumbnail?.url || defaultThumbnailUrl} 
                  alt={course.title} 
                  fill
                  className="object-cover opacity-95 transition-transform duration-700 hover:scale-105"
                  priority
                />
                {/* Visual mesh overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#151c27]/75 via-[#151c27]/20 to-transparent" />
                
                {/* Floating Rating Tag */}
                <div className="absolute bottom-6 left-6 right-6 z-10 flex items-center justify-between p-4 rounded-2xl bg-surface/90 backdrop-blur-md border border-white/20 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                      <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-black text-on-surface">4.9 / 5.0 Rating</p>
                      <p className="text-[10px] text-on-surface-variant">Verified student reviews</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-black text-primary">
                    <Users className="w-4 h-4" />
                    <span>500+ Graduated</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn Outcomes Grid */}
      <section className="section-padding bg-background text-on-surface">
        <div className="container-main max-w-7xl mx-auto px-4 text-center">
          <span className="chip bg-primary/10 text-primary border border-primary/20 select-none">SYLLABUS FOCUS</span>
          <h2 className="mt-4 font-heading text-3xl font-extrabold text-on-surface sm:text-4xl tracking-tight leading-tight">
            What You&apos;ll Learn
          </h2>
          <p className="mt-3 text-sm sm:text-base text-on-surface-variant max-w-xl mx-auto">
            Our learn-by-doing modules bridge the gap between classroom theory and real-world career performance.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {course.learningOutcomes.map((outcome, i) => (
              <div
                key={i}
                className="flex gap-4 rounded-2xl border border-outline-variant/15 bg-surface-container-lowest p-6 text-left transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              >
                {/* Custom list number badge */}
                <span className="text-2xl font-black font-mono tracking-tighter text-primary/30 w-8 shrink-0 mt-0.5 select-none">
                  {(i + 1).toString().padStart(2, '0')}
                </span>
                <span className="text-sm font-semibold leading-relaxed text-on-surface-variant">
                  {outcome}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Week-by-Week Curriculum Timeline */}
      {course.curriculum && course.curriculum.length > 0 && (
        <section className="section-padding bg-surface-container-low/50 border-t border-b border-outline-variant/20">
          <div className="container-main max-w-4xl mx-auto px-4 text-center">
            <span className="chip bg-primary/10 text-primary border border-primary/20 select-none">ROADMAP</span>
            <h2 className="mt-4 font-heading text-3xl font-extrabold text-on-surface sm:text-4xl tracking-tight leading-tight">
              Weekly Curriculum Details
            </h2>
            <p className="mt-3 text-sm sm:text-base text-on-surface-variant max-w-xl mx-auto">
              An 8-week structured roadmap built to systematically escalate your corporate poise and presence.
            </p>

            <div className="mt-14 relative pl-8 border-l-2 border-outline-variant/30 flex flex-col gap-8 max-w-2xl mx-auto">
              {course.curriculum.map((stage, idx) => (
                <div key={stage.week} className="relative text-left">
                  {/* Timeline bullet dot */}
                  <span className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center z-10 select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </span>

                  <div className="p-6 rounded-2xl border border-outline-variant/15 bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-mono font-black uppercase tracking-wider text-primary">
                        {stage.week}
                      </span>
                      <span className="flex items-center gap-1 text-[8px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full select-none">
                        Active Stage
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-on-surface font-[family-name:var(--font-heading)]">
                      {stage.title}
                    </h3>
                    <p className="text-xs text-on-surface-variant leading-relaxed mt-2">
                      {stage.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-on-surface-variant/80 bg-surface-container-low border border-outline-variant/10 px-3.5 py-2.5 rounded-xl">
                      <Award className="w-4 h-4 text-primary shrink-0" />
                      <span>{stage.deliverable}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Course Highlights */}
      <section className="section-padding bg-background text-on-surface">
        <div className="container-main max-w-7xl mx-auto px-4 text-center">
          <span className="chip bg-primary/10 text-primary border border-primary/20 select-none">BENEFITS</span>
          <h2 className="mt-4 font-heading text-3xl font-extrabold text-on-surface sm:text-4xl tracking-tight leading-tight">
            Program Highlights
          </h2>
          <p className="mt-3 text-sm sm:text-base text-on-surface-variant max-w-xl mx-auto">
            Beyond standard coursework — we support your personal integration with coaching, placements, and community.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-center">
            {course.highlights.map((highlight, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/15 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 text-left"
              >
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 select-none">
                  <span className="text-base font-black font-mono text-primary">{(i + 1).toString().padStart(2, '0')}</span>
                </div>
                <span className="text-sm font-bold text-on-surface-variant">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Elite Faculty Showcase Card */}
      <section className="section-padding bg-surface-container-low/50 border-t border-b border-outline-variant/20">
        <div className="container-main max-w-4xl mx-auto px-4 text-center">
          <span className="chip bg-primary/10 text-primary border border-primary/20 select-none">FACULTY</span>
          <h2 className="mt-4 font-heading text-3xl font-extrabold text-on-surface sm:text-4xl tracking-tight leading-tight">
            Faculty Spotlight
          </h2>
          <p className="mt-3 text-sm sm:text-base text-on-surface-variant max-w-xl mx-auto mb-10">
            Learn directly from seasoned corporate consultants and verified executive communication directors.
          </p>

          <div className="mt-8 flex flex-col items-start gap-8 rounded-3xl border border-outline-variant bg-surface-container-lowest p-8 md:p-10 shadow-lg md:flex-row relative overflow-hidden select-none">
            {/* Background design elements */}
            <div className="absolute right-0 top-0 w-24 h-24 bg-primary/5 rounded-bl-3xl" />

            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-outline-variant/35 shadow-md flex-shrink-0 mx-auto md:mx-0">
              <Image 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" 
                alt={course.trainer.name} 
                fill
                className="object-cover"
              />
            </div>
            
            <div className="text-center md:text-left flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mb-2">
                <h3 className="font-heading text-xl md:text-2xl font-black text-on-surface leading-tight">
                  {course.trainer.name}
                </h3>
                <span className="flex items-center gap-1 text-[8px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  <UserCheck className="w-3 h-3" />
                  Verified Lead Coach
                </span>
              </div>
              <p className="text-sm font-semibold text-primary">
                {course.trainer.title}
              </p>
              <p className="mt-4 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                {course.trainer.bio}
              </p>
              {course.trainer.specialties && (
                <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-2">
                  {course.trainer.specialties.map((s) => (
                    <span key={s} className="chip bg-surface-container-low text-on-surface-variant/80 border-outline-variant/25 text-xs font-bold font-mono px-3 py-1 rounded-md">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Details Accordion */}
      <section className="section-padding bg-background text-on-surface">
        <div className="container-main max-w-3xl mx-auto px-4">
          <span className="chip bg-primary/10 text-primary border border-primary/20 block w-fit mx-auto select-none">FAQ</span>
          <h2 className="mt-4 font-heading text-center text-3xl font-extrabold text-on-surface sm:text-4xl tracking-tight leading-tight mb-10">
            Frequently Asked Questions
          </h2>
          <div className="mt-8 space-y-4">
            {course.faqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-outline-variant/20 bg-surface-container-lowest shadow-sm overflow-hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between p-5 font-heading font-extrabold text-on-surface select-none hover:bg-surface-container-low/40 transition-colors">
                  {faq.question}
                  <svg
                    className="h-4 w-4 flex-shrink-0 text-on-surface-variant transition-transform duration-300 group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 pt-1 text-sm text-on-surface-variant leading-relaxed text-left">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related Courses */}
      <section className="section-padding bg-surface-container-low/30 border-t border-outline-variant/20">
        <div className="container-main max-w-7xl mx-auto px-4 text-center">
          <span className="chip bg-primary/10 text-primary border border-primary/20 select-none">RECOMMENDATIONS</span>
          <h2 className="mt-4 font-heading text-3xl font-extrabold text-on-surface sm:text-4xl tracking-tight leading-tight">
            You May Also Like
          </h2>
          <p className="mt-3 text-sm sm:text-base text-on-surface-variant max-w-xl mx-auto mb-12">
            Explore other dynamic career acceleration and finishing school pathways.
          </p>

          <div className="mt-8">
            <CourseGrid courses={mockRelatedCourses} />
          </div>
        </div>
      </section>
    </>
  );
}
