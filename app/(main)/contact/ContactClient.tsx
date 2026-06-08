"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PencilLine } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { PencilMascot } from "@/components/brand/PencilMascot";

export default function ContactClient() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative isolate overflow-hidden bg-white pb-20 font-[family-name:var(--font-body)] text-[#675667]"
    >
      {/* Asymmetric Brand Background Clip-path matching the main page AboutSection */}
      <div
        className="absolute inset-y-0 left-0 -z-10 w-[45%] bg-[#e8f6ff] opacity-90 hidden lg:block"
        style={{ clipPath: "polygon(0 0, 85% 0, 100% 100%, 0 100%)" }}
      />
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-primary-light/10 rounded-full blur-3xl pointer-events-none" />

      {/* Editorial Header Section */}
      <section className="relative pt-20 pb-16 text-left">
        <div className="container-main max-w-7xl mx-auto px-4">
          <motion.div variants={itemVariants} className="inline-block mb-5">
            <span className="inline-flex items-center gap-2 rounded-[8px] bg-[#0b5f99] px-3.5 py-2 text-xs font-black uppercase tracking-[0.16em] text-white">
              <PencilLine className="h-4 w-4 text-[#ffcf72]" />
              Executive Desk
            </span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants} 
            className="font-[family-name:var(--font-heading)] font-black text-4xl sm:text-5xl lg:text-6xl text-[#251324] tracking-tight leading-[1.1] max-w-4xl"
          >
            Connect with our <span className="text-[#bd168e]">Advisory Team</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants} 
            className="mt-6 text-base sm:text-lg text-[#675667] max-w-2xl font-medium leading-relaxed"
          >
            Whether you are planning an organizational training cohort, reserving a campus tour, or looking for individual career guidance, we are here to guide you.
          </motion.p>
        </div>
      </section>

      {/* Main Grid: Form & Visual Stack */}
      <section className="container-main max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Stacked, Rotated Brand Cards with Mascot */}
          <motion.div variants={itemVariants} className="lg:col-span-5 space-y-10 relative">
            
            {/* Advisor Welcome Card (Rotated, Double Border) */}
            <div className="rounded-[16px] border-[5px] border-white bg-[#faf7f4] p-6 shadow-2xl overflow-hidden relative group rotate-[-1.5deg] hover:rotate-0 hover:scale-[1.01] transition-all duration-300">
              {/* Soft aesthetic backdrop pattern */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#e8dfd8]/40 rounded-full blur-xl pointer-events-none" />
              
              <div className="relative aspect-[4/5] w-full rounded-[10px] overflow-hidden bg-[#e8dfd8] shadow-inner">
                <Image
                  src="/contact/chatgpt-contact.png"
                  alt="Advisory Head"
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                  priority
                />
              </div>

              <div className="mt-6 text-left relative z-10">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#0b5f99] font-mono">
                  Admissions Office
                </span>
                <h3 className="font-[family-name:var(--font-heading)] font-black text-xl text-[#251324] mt-1">
                  Advisory Desk
                </h3>
                <p className="text-[#6f5c6f] text-sm mt-3 leading-relaxed font-medium italic">
                  "Our finishing tracks are designed to build confidence, polish communication, and accelerate professional growth. Write to us to discuss your goals."
                </p>
              </div>
            </div>

            {/* Timings Card (Rotated opposite direction, Double Border) */}
            <div className="rounded-[16px] border-[5px] border-white bg-[#fffaf5] p-6 space-y-4 shadow-xl text-left rotate-[1deg] hover:rotate-0 hover:scale-[1.01] transition-all duration-300 border-[#d9e8f2]">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#0b5f99] font-mono">
                VISITATION TIMINGS
              </span>
              <h4 className="font-heading text-lg font-black text-[#251324]">
                Campus Operations
              </h4>
              <ul className="space-y-3 text-sm text-[#6f5c6f] font-semibold">
                <li className="flex justify-between items-center">
                  <span>Monday – Saturday</span>
                  <span className="text-[#251324]">9:00 AM – 6:00 PM</span>
                </li>
                <div className="h-px bg-[#d9e8f2]" />
                <li className="flex justify-between items-center">
                  <span>Sundays & Holidays</span>
                  <span className="font-bold text-[#e21b2f]">Closed</span>
                </li>
              </ul>
              
              <div className="pt-2 text-xs text-[#6f5c6f] border-t border-[#d9e8f2] mt-2 font-medium">
                <span className="font-bold text-[#251324]">Note:</span> Boardroom consultations, college cohort bookings, and campus tours require reservations at least 24 hours in advance.
              </div>
            </div>

            {/* Pencil Mascot popping in behind the cards */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: -15 }}
              whileInView={{ scale: 1, opacity: 1, rotate: -5 }}
              viewport={{ once: true }}
              transition={{ type: "spring", bounce: 0.5, delay: 0.5 }}
              className="absolute -right-6 -bottom-12 z-20 w-32 drop-shadow-[0_15px_15px_rgba(0,0,0,0.2)] pointer-events-none hidden md:block"
            >
              <PencilMascot className="w-full" compact />
            </motion.div>

          </motion.div>

          {/* Right Column: Digital Inquiry Portal */}
          <motion.div 
            variants={itemVariants} 
            className="lg:col-span-7 bg-[#fffaf5] p-8 sm:p-12 rounded-[20px] border border-[#d9e8f2] shadow-2xl text-left relative overflow-hidden"
          >
            {/* Soft decorative background glow */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#e8f6ff]/60 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 space-y-6">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#0b5f99] font-mono select-none">
                  Digital Portal
                </span>
                <h2 className="font-[family-name:var(--font-heading)] font-black text-2xl md:text-3xl text-[#251324] mt-2 mb-3">
                  Send Us a Message
                </h2>
                <p className="text-[#6f5c6f] text-sm leading-relaxed max-w-xl font-medium">
                  Have a question or request? Submit the form below and an admissions coordinator will respond to you within one business day.
                </p>
              </div>

              <div className="pt-4">
                <ContactForm />
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Kochi Map Embed */}
      <section className="mt-20 border-t border-[#d9e8f2] bg-[#e8f6ff] py-16 relative overflow-hidden">
        {/* Angled background highlight */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-white/30 via-transparent to-transparent pointer-events-none" />
        
        <div className="container-main max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="inline-flex items-center gap-2 rounded-[8px] bg-[#0b5f99] px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-white">
            Campus Route
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-heading)] font-black text-2xl md:text-3xl text-[#251324] tracking-tight">
            Locate Our Kochi Campus
          </h2>
          <p className="text-[#675667] text-sm mt-2 max-w-md mx-auto font-medium">
            Find us in Pallimukku, Ernakulam, easily accessible from the Pallimukku junction and Ernakulam South Metro.
          </p>

          <div className="w-full h-[400px] rounded-[16px] overflow-hidden border-[6px] border-white shadow-2xl mt-10 relative bg-white">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.6200236611086!2d76.2858852758117!3d9.965476173612803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d5b43cd77ff%3A0xc8f58c36b4233897!2sUnique%20Mentors!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Unique Mentors Kochi Campus Location"
              className="opacity-95"
            />
          </div>
        </div>
      </section>
    </motion.div>
  );
}
