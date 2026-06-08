"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[+]?[\d\s-]+$/, "Please enter a valid phone number"),
  subject: z.string().min(1, "Please select a subject"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be under 1000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const subjects = [
  { value: "general", label: "General Inquiry" },
  { value: "courses", label: "Course Information" },
  { value: "enrollment", label: "Enrollment Help" },
  { value: "partnership", label: "Partnership / Collaboration" },
  { value: "feedback", label: "Feedback" },
  { value: "other", label: "Other" },
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const inputClasses = cn(
    "w-full px-4 py-3 rounded-[8px]",
    "bg-[#fffaf5] border border-[#d9e8f2]",
    "text-[#251324] placeholder:text-[#6f5c6f]/50",
    "focus:outline-none focus:border-[#0b5f99] focus:ring-2 focus:ring-[#0b5f99]/15",
    "transition-all duration-200",
    "font-[family-name:var(--font-body)] text-base shadow-sm"
  );

  const errorClasses = "text-error text-sm mt-1 font-[family-name:var(--font-body)] font-medium";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Name */}
      <div>
        <label htmlFor="contact-name" className="block text-sm font-bold text-[#251324] mb-1.5 font-[family-name:var(--font-body)]">
          Full Name *
        </label>
        <input
          id="contact-name"
          type="text"
          placeholder="Enter your full name"
          className={cn(inputClasses, errors.name && "border-error")}
          {...register("name")}
        />
        {errors.name && <p className={errorClasses}>{errors.name.message}</p>}
      </div>

      {/* Email & Phone row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-email" className="block text-sm font-bold text-[#251324] mb-1.5 font-[family-name:var(--font-body)]">
            Email *
          </label>
          <input
            id="contact-email"
            type="email"
            placeholder="you@example.com"
            className={cn(inputClasses, errors.email && "border-error")}
            {...register("email")}
          />
          {errors.email && <p className={errorClasses}>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="contact-phone" className="block text-sm font-bold text-[#251324] mb-1.5 font-[family-name:var(--font-body)]">
            Phone *
          </label>
          <input
            id="contact-phone"
            type="tel"
            placeholder="+91 09544774599"
            className={cn(inputClasses, errors.phone && "border-error")}
            {...register("phone")}
          />
          {errors.phone && <p className={errorClasses}>{errors.phone.message}</p>}
        </div>
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="contact-subject" className="block text-sm font-bold text-[#251324] mb-1.5 font-[family-name:var(--font-body)]">
          Subject *
        </label>
        <select
          id="contact-subject"
          className={cn(inputClasses, "appearance-none cursor-pointer", errors.subject && "border-error")}
          {...register("subject")}
        >
          <option value="">Select a subject</option>
          {subjects.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        {errors.subject && <p className={errorClasses}>{errors.subject.message}</p>}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="block text-sm font-bold text-[#251324] mb-1.5 font-[family-name:var(--font-body)]">
          Message *
        </label>
        <textarea
          id="contact-message"
          rows={5}
          placeholder="How can we help you?"
          className={cn(inputClasses, "resize-none", errors.message && "border-error")}
          {...register("message")}
        />
        {errors.message && <p className={errorClasses}>{errors.message.message}</p>}
      </div>

      {/* Status messages */}
      {status === "success" && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-success/10 text-success">
          <CheckCircle className="w-5 h-5" />
          <p className="text-sm font-medium">Message sent successfully! We&apos;ll get back to you soon.</p>
        </div>
      )}
      {status === "error" && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-error/10 text-error">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm font-medium">Something went wrong. Please try again.</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className={cn(
          "w-full sm:w-auto px-8 py-3.5 rounded-[8px]",
          "bg-[#bd168e] text-white font-extrabold shadow-md",
          "flex items-center justify-center gap-2",
          "transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#981173] hover:shadow-lg hover:shadow-[#bd168e]/35",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none",
          "font-[family-name:var(--font-body)] cursor-pointer"
        )}
      >
        {status === "loading" ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Send className="w-5 h-5" />
        )}
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
