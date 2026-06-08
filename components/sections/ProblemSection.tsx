"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  MessagesSquare,
} from "lucide-react";

const readinessRows = [
  {
    moment: "Asked to introduce themselves",
    ordinary: "A nervous answer, too short or too memorized.",
    coached: "A 30-second story with name, context, strength, and direction.",
  },
  {
    moment: "Placed in a group task",
    ordinary: "Either quiet participation or unfocused talking.",
    coached: "A role, a listening habit, and a simple way to structure points.",
  },
  {
    moment: "Preparing for interviews",
    ordinary: "Last-minute resumes and answers copied from the internet.",
    coached: "Evidence-based answers, mock panels, and feedback they can act on.",
  },
  {
    moment: "Choosing a future path",
    ordinary: "Pressure from marks, trends, and family expectations.",
    coached: "Career options mapped against interest, ability, and next steps.",
  },
];

const microSkills = [
  "Self introduction",
  "Stage confidence",
  "Listening",
  "Time planning",
  "Resume story",
  "Financial habits",
  "Career mapping",
  "Etiquette",
  "Networking",
  "Interview answers",
];

export function ProblemSection() {
  return (
    <section className="bg-[#fffaf5] py-16 sm:py-20 lg:py-24">
      <div className="container-main">
        <div className="grid gap-10 lg:grid-cols-[0.36fr_0.64fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="lg:sticky lg:top-28"
          >
            <span className="inline-flex items-center gap-2 rounded-[8px] bg-[#bd168e] px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-white">
              <ClipboardList className="h-4 w-4" />
              Readiness map
            </span>
            <h2 className="mt-5 max-w-lg font-heading text-3xl font-black leading-tight tracking-tight text-[#251324] sm:text-4xl lg:text-5xl">
              The gaps are ordinary. The practice has to be structured.
            </h2>
            <p className="mt-5 max-w-md text-base font-medium leading-relaxed text-[#675667]">
              Students do not need another abstract lecture on confidence. They
              need repeated situations where they can try, improve, and try
              again with a mentor watching the details.
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-[8px] bg-[#251324] px-5 py-3 text-sm font-extrabold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#3a203a]"
            >
              Discuss a custom batch
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="grid gap-3">
            {readinessRows.map((row, index) => (
              <motion.article
                key={row.moment}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.07,
                  ease: "easeOut",
                }}
                whileHover={{ y: -3 }}
                className="grid gap-4 rounded-[8px] border border-[#eadbea] bg-white p-4 shadow-sm sm:grid-cols-[0.9fr_1.1fr]"
              >
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#bd168e]">
                    Learner moment
                  </p>
                  <h3 className="mt-2 font-heading text-xl font-black leading-tight text-[#251324]">
                    {row.moment}
                  </h3>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-[#7a667a]">
                    {row.ordinary}
                  </p>
                </div>

                <div className="rounded-[8px] bg-[#fff1e5] p-4">
                  <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-[#c91522]">
                    <CheckCircle2 className="h-4 w-4" />
                    Coached output
                  </p>
                  <p className="mt-3 text-sm font-bold leading-relaxed text-[#3d2a3c]">
                    {row.coached}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mt-12 overflow-hidden border-y border-[#eadbea] py-4">
          <div className="animate-marquee gap-3">
            {[...microSkills, ...microSkills].map((skill, index) => (
              <span
                key={`${skill}-${index}`}
                className="inline-flex items-center gap-2 rounded-[8px] bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-[#251324]"
              >
                <MessagesSquare className="h-4 w-4 text-[#057bd2]" />
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
