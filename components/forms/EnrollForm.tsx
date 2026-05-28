"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { GraduationCap, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const enrollSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[+]?[\d\s-]+$/, "Please enter a valid phone number"),
  institution: z.string().min(2, "Please enter your school/college name"),
  educationLevel: z.string().min(1, "Please select your education level"),
});

type EnrollFormData = z.infer<typeof enrollSchema>;

const educationLevels = [
  { value: "school-8-10", label: "School (Class 8-10)" },
  { value: "school-11-12", label: "School (Class 11-12)" },
  { value: "undergraduate", label: "Undergraduate" },
  { value: "postgraduate", label: "Postgraduate" },
  { value: "professional", label: "Working Professional" },
  { value: "other", label: "Other" },
];

interface EnrollFormProps {
  courseSlug: string;
  courseTitle: string;
}

export function EnrollForm({ courseSlug, courseTitle }: EnrollFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnrollFormData>({
    resolver: zodResolver(enrollSchema),
  });

  const onSubmit = async (data: EnrollFormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, courseSlug }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const inputClasses = cn(
    "w-full px-4 py-3 rounded-lg",
    "bg-surface-container-lowest border border-outline-variant/30",
    "text-on-surface placeholder:text-on-surface-variant/50",
    "focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20",
    "transition-all duration-200",
    "font-[family-name:var(--font-body)] text-base"
  );

  if (status === "success") {
    return (
      <div className="text-center py-12 px-6">
        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-success" />
        </div>
        <h3 className="text-2xl font-bold text-on-surface font-[family-name:var(--font-heading)] mb-2">
          Enrollment Submitted!
        </h3>
        <p className="text-on-surface-variant font-[family-name:var(--font-body)]">
          Thank you for enrolling in <strong>{courseTitle}</strong>. We&apos;ll contact you shortly with next steps.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Course info card */}
      <div className="p-4 rounded-xl bg-primary-light/30 border border-primary-container/20 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-on-primary" />
          </div>
          <div>
            <p className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">Enrolling for</p>
            <p className="font-bold text-on-surface font-[family-name:var(--font-heading)]">{courseTitle}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label htmlFor="enroll-name" className="block text-sm font-semibold text-on-surface mb-1.5">Full Name *</label>
          <input id="enroll-name" type="text" placeholder="Enter your full name" className={cn(inputClasses, errors.name && "border-error")} {...register("name")} />
          {errors.name && <p className="text-error text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="enroll-email" className="block text-sm font-semibold text-on-surface mb-1.5">Email *</label>
            <input id="enroll-email" type="email" placeholder="you@example.com" className={cn(inputClasses, errors.email && "border-error")} {...register("email")} />
            {errors.email && <p className="text-error text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="enroll-phone" className="block text-sm font-semibold text-on-surface mb-1.5">Phone *</label>
            <input id="enroll-phone" type="tel" placeholder="+91 09544774599" className={cn(inputClasses, errors.phone && "border-error")} {...register("phone")} />
            {errors.phone && <p className="text-error text-sm mt-1">{errors.phone.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="enroll-institution" className="block text-sm font-semibold text-on-surface mb-1.5">School / College Name *</label>
          <input id="enroll-institution" type="text" placeholder="Your institution" className={cn(inputClasses, errors.institution && "border-error")} {...register("institution")} />
          {errors.institution && <p className="text-error text-sm mt-1">{errors.institution.message}</p>}
        </div>

        <div>
          <label htmlFor="enroll-education" className="block text-sm font-semibold text-on-surface mb-1.5">Education Level *</label>
          <select id="enroll-education" className={cn(inputClasses, "appearance-none cursor-pointer", errors.educationLevel && "border-error")} {...register("educationLevel")}>
            <option value="">Select your education level</option>
            {educationLevels.map((l) => (
              <option key={l.value} value={l.value}>{l.label}</option>
            ))}
          </select>
          {errors.educationLevel && <p className="text-error text-sm mt-1">{errors.educationLevel.message}</p>}
        </div>

        {status === "error" && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-error/10 text-error">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm font-medium">Something went wrong. Please try again.</p>
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className={cn(
            "w-full px-8 py-3.5 rounded-lg",
            "gradient-primary text-on-primary font-semibold",
            "flex items-center justify-center gap-2",
            "hover:opacity-90 transition-opacity",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          {status === "loading" ? <Loader2 className="w-5 h-5 animate-spin" /> : <GraduationCap className="w-5 h-5" />}
          {status === "loading" ? "Submitting..." : "Submit Enrollment"}
        </button>
      </form>
    </div>
  );
}
