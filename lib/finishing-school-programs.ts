export type ProgramCategoryKey =
  | "schools"
  | "colleges"
  | "healthcare"
  | "professional-development";

export type ProgramTheme = "red" | "teal" | "blue" | "magenta";

export interface FinishingProgram {
  title: string;
  description: string;
  focus: string;
}

export interface FinishingProgramCategory {
  key: ProgramCategoryKey;
  navLabel: string;
  eyebrow: string;
  title: string;
  shortTitle: string;
  description: string;
  audience: string;
  cta: string;
  href: string;
  theme: ProgramTheme;
  heroImage: string;
  heroAlt: string;
  highlights: string[];
  outcomes: string[];
  programs: FinishingProgram[];
}

export const finishingProgramCategories: Record<
  ProgramCategoryKey,
  FinishingProgramCategory
> = {
  schools: {
    key: "schools",
    navLabel: "School Programs",
    eyebrow: "School Programs",
    title: "Future-ready skills for school students",
    shortTitle: "For Schools",
    description:
      "Colorful, activity-led finishing school modules that help students build confidence, discipline, communication, and early career clarity.",
    audience: "Students in middle school, high school, and higher secondary",
    cta: "Partner for School Programs",
    href: "/programs/schools",
    theme: "red",
    heroImage:
      "/imagesclor/WhatsApp Image 2026-06-02 at 12.42.50 (1).jpeg",
    heroAlt: "Student learning time management in a finishing school program",
    highlights: [
      "Age-aware sessions",
      "Confidence labs",
      "Career discovery",
      "Study habits",
    ],
    outcomes: [
      "Students speak with more clarity in class and group settings.",
      "Learners build better study routines, attention habits, and time discipline.",
      "Parents and schools get a clearer view of each student's strengths and interests.",
    ],
    programs: [
      {
        title: "Future Leaders Program",
        description:
          "Builds responsibility, initiative, teamwork, and decision-making through group challenges and leadership labs.",
        focus: "Leadership, responsibility, teamwork",
      },
      {
        title: "Career Awareness Program",
        description:
          "Introduces students to career pathways, personal strengths, and choices they can start exploring early.",
        focus: "Career discovery, self-awareness",
      },
      {
        title: "Study Skills & Productivity Program",
        description:
          "Teaches time management, exam planning, focus routines, and practical productivity habits for school life.",
        focus: "Time management, study routines",
      },
      {
        title: "Communication & Confidence Building Program",
        description:
          "Helps students speak up, present ideas, handle group interaction, and reduce stage hesitation.",
        focus: "Speaking, confidence, expression",
      },
    ],
  },
  colleges: {
    key: "colleges",
    navLabel: "College Programs",
    eyebrow: "College Programs",
    title: "Campus-to-career readiness for graduates",
    shortTitle: "For Colleges",
    description:
      "A practical finishing school track for college students and graduates preparing for interviews, workplace expectations, money decisions, and leadership roles.",
    audience: "College students, final-year batches, and fresh graduates",
    cta: "Build a College Program",
    href: "/programs/colleges",
    theme: "teal",
    heroImage:
      "/imagesclor/image copy 16.png",
    heroAlt: "Student learning financial discipline in a college program",
    highlights: [
      "Placement readiness",
      "Financial literacy",
      "Resume workshops",
      "Leadership practice",
    ],
    outcomes: [
      "Students enter placement season with stronger resumes and interview confidence.",
      "Graduates learn practical money habits before they begin earning.",
      "Campus teams can run structured, measurable readiness programs batch by batch.",
    ],
    programs: [
      {
        title: "Campus to Corporate Program",
        description:
          "Prepares students for workplace behavior, communication standards, corporate culture, and first-job expectations.",
        focus: "Workplace transition, corporate etiquette",
      },
      {
        title: "Financial Literacy Program",
        description:
          "Covers budgeting, saving, credit awareness, basic investing, and everyday financial discipline.",
        focus: "Money habits, budgeting, investing basics",
      },
      {
        title: "Resume & Interview Preparation Program",
        description:
          "Includes resume building, personal introductions, mock interviews, group discussions, and feedback.",
        focus: "Resume, interviews, placement readiness",
      },
      {
        title: "Leadership Development Program",
        description:
          "Develops ownership, team communication, initiative, conflict handling, and presentation maturity.",
        focus: "Leadership, collaboration, ownership",
      },
    ],
  },
  healthcare: {
    key: "healthcare",
    navLabel: "Healthcare Career Programs",
    eyebrow: "Healthcare Career Programs",
    title: "Healthcare career clarity and global readiness",
    shortTitle: "Healthcare Careers",
    description:
      "Guided programs for students and healthcare aspirants who want to understand medical career routes, global opportunities, licensure readiness, and employability standards.",
    audience: "Healthcare students, graduates, nurses, allied health aspirants",
    cta: "Explore Healthcare Careers",
    href: "/programs/healthcare",
    theme: "blue",
    heroImage: "/imagesclor/WhatsApp Image 2026-06-02 at 12.42.50.jpeg",
    heroAlt: "Graduate choosing a dream career with guidance",
    highlights: [
      "Career discovery",
      "Global pathways",
      "Licensure readiness",
      "Employability coaching",
    ],
    outcomes: [
      "Aspirants understand local and international healthcare career routes more clearly.",
      "Candidates learn the communication, documentation, and readiness standards expected abroad.",
      "Students receive guidance before committing time and money to complex career pathways.",
    ],
    programs: [
      {
        title: "Healthcare Career Discovery Program",
        description:
          "Helps students understand healthcare roles, strengths, career routes, and realistic next steps.",
        focus: "Career mapping, role discovery",
      },
      {
        title: "Global Healthcare Career Program",
        description:
          "Introduces international healthcare opportunities, destination pathways, and preparation milestones.",
        focus: "Global careers, pathway planning",
      },
      {
        title: "Healthcare Licensure Exam Readiness Program",
        description:
          "Builds exam orientation, study planning, documentation awareness, and confidence for licensure journeys.",
        focus: "Licensure planning, exam readiness",
      },
      {
        title: "Healthcare Employability Excellence Program",
        description:
          "Improves patient communication, interview confidence, workplace behavior, and professional presence.",
        focus: "Employability, communication, workplace skills",
      },
      {
        title: "International Healthcare Career Guidance",
        description:
          "Provides one-to-one guidance on country options, eligibility, application routes, and next actions.",
        focus: "International guidance, eligibility clarity",
      },
    ],
  },
  "professional-development": {
    key: "professional-development",
    navLabel: "Professional Development",
    eyebrow: "Professional Development Programs",
    title: "Professional polish for graduates and early careers",
    shortTitle: "Professional Growth",
    description:
      "Focused coaching for young professionals and graduates who want sharper communication, stronger presence, better networks, and faster career movement.",
    audience: "Graduates, early professionals, and career switchers",
    cta: "Start Professional Coaching",
    href: "/programs/professional-development",
    theme: "magenta",
    heroImage:
      "/imagesclor/WhatsApp Image 2026-06-02 at 12.42.50 (4).jpeg",
    heroAlt: "Young professional building confidence through etiquette training",
    highlights: [
      "Management skills",
      "Communication excellence",
      "Professional etiquette",
      "Personal branding",
    ],
    outcomes: [
      "Participants communicate with stronger structure, tone, and professional maturity.",
      "Graduates learn to present themselves well in meetings, interviews, and networking spaces.",
      "Professionals build a visible, credible personal brand for career advancement.",
    ],
    programs: [
      {
        title: "Leadership & Management",
        description:
          "Develops people handling, ownership, planning, delegation, and everyday management confidence.",
        focus: "Leadership, planning, management",
      },
      {
        title: "Communication Excellence",
        description:
          "Strengthens speaking, listening, writing, presentations, and difficult conversation skills.",
        focus: "Speaking, writing, presentation",
      },
      {
        title: "Grooming & Professional Etiquette",
        description:
          "Covers appearance, business manners, meeting behavior, dining etiquette, and first impressions.",
        focus: "Grooming, etiquette, presence",
      },
      {
        title: "Career Advancement Coaching",
        description:
          "Supports career planning, workplace confidence, promotion readiness, and growth conversations.",
        focus: "Career planning, growth coaching",
      },
      {
        title: "Personal Branding & Networking",
        description:
          "Builds LinkedIn presence, networking skills, credibility cues, and a confident professional story.",
        focus: "Branding, networking, visibility",
      },
    ],
  },
};

export const finishingProgramList = Object.values(finishingProgramCategories);

export function getFinishingProgramCategory(key: ProgramCategoryKey) {
  return finishingProgramCategories[key];
}
