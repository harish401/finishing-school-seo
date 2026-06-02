"use client";

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function AboutSection() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const imageReveal = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Decorative premium background elements */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[30rem] h-[30rem] rounded-full bg-secondary-container/5 blur-3xl pointer-events-none" />
      
      <div className="container-main relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          
          {/* Left: Images grid */}
          <div className="relative lg:col-span-5">
            <motion.div 
              className="grid grid-cols-2 gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                visible: { transition: { staggerChildren: 0.15 } }
              }}
            >
              <div className="flex flex-col gap-4 mt-8">
                <motion.div 
                  className="relative h-48 w-full overflow-hidden rounded-2xl border border-outline-variant/10 shadow-sm"
                  variants={imageReveal}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600"
                    alt="Students collaborating"
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/10 to-transparent" />
                </motion.div>
                <motion.div 
                  className="relative h-64 w-full overflow-hidden rounded-2xl border border-outline-variant/10 shadow-md"
                  variants={imageReveal}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=600"
                    alt="Mentorship session"
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/10 to-transparent" />
                </motion.div>
              </div>
              <div className="flex flex-col gap-4">
                <motion.div 
                  className="relative h-64 w-full overflow-hidden rounded-2xl border border-outline-variant/10 shadow-md"
                  variants={imageReveal}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=600"
                    alt="Professional environment"
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/10 to-transparent" />
                </motion.div>
                <motion.div 
                  className="relative h-48 w-full overflow-hidden rounded-2xl border border-outline-variant/10 shadow-sm"
                  variants={imageReveal}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600"
                    alt="Career growth"
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/10 to-transparent" />
                </motion.div>
              </div>
            </motion.div>
            
            {/* Elegant Glassmorphic Experience Badge with Continuous Float & Pulse */}
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md rounded-full h-32 w-32 flex flex-col items-center justify-center border border-white/40 shadow-xl z-20"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              animate={{
                y: [0, -6, 0],
              }}
              whileHover={{ scale: 1.05 }}
              /* Continuous floating animation */
              style={{
                animation: "floatBadge 4s ease-in-out infinite"
              }}
            >
              <span className="text-3xl font-extrabold text-primary font-[family-name:var(--font-heading)]">10+</span>
              <span className="text-[10px] font-semibold tracking-wider text-on-surface-variant text-center uppercase px-2 leading-tight">
                Years of Excellence
              </span>
            </motion.div>
          </div>

          {/* Right: Content */}
          <motion.div 
            className="flex flex-col justify-center lg:col-span-7"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.12 } }
            }}
          >
            <motion.div variants={fadeInUp}>
              <span className="chip mb-4 bg-primary/10 text-primary border border-primary/10 uppercase tracking-wider text-xs font-semibold">
                OUR MISSION &amp; LEGACY
              </span>
              <h2 className="text-3xl font-extrabold text-on-surface sm:text-4xl lg:text-5xl font-[family-name:var(--font-heading)] leading-tight tracking-tight">
                Shaping Healthcare &amp; <br />
                <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent">
                  Corporate Leaders Worldwide
                </span>
              </h2>
            </motion.div>
            
            <motion.div className="space-y-6 text-base leading-relaxed text-on-surface-variant mt-6" variants={fadeInUp}>
              <p>
                Unique Mentors is a multi-disciplinary academy dedicated to transforming professional careers. Through our **Medical Licensure division**, we guide healthcare professionals through the complexities of Gulf licensing exams (DHA, MOH, Prometric, HAAD) and document Dataflow verification processes.
              </p>
              
              <div className="pl-6 border-l-4 border-primary text-base font-medium italic text-on-surface py-1">
                &ldquo;Our vision is to empower medical and corporate aspirants with unshakeable competence, enabling them to excel internationally and lead with confidence.&rdquo;
              </div>
              
              <p>
                Alongside medical training, our **Professional Finishing School** bridges the employability gap for school students, college graduates, and young executives by building high-demand communication skills, personal grooming, and corporate etiquette.
              </p>
            </motion.div>
            
            <motion.div 
              className="mt-10 grid grid-cols-2 gap-8 border-t border-outline-variant/35 pt-8"
              variants={fadeInUp}
            >
              <div>
                <h4 className="text-3xl font-extrabold text-primary font-[family-name:var(--font-heading)]">98%</h4>
                <p className="mt-2 text-xs uppercase tracking-wider font-semibold text-on-surface-variant">Placement Success Rate</p>
              </div>
              <div>
                <h4 className="text-3xl font-extrabold text-primary font-[family-name:var(--font-heading)]">50+</h4>
                <p className="mt-2 text-xs uppercase tracking-wider font-semibold text-on-surface-variant">Expert Corporate Mentors</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
