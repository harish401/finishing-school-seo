"use client";

import { FormEvent, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Mail, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type SubmitStatus = "idle" | "loading" | "success";

interface WaitlistHeroProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
  inputPlaceholder?: string;
  buttonText?: string;
  successText?: string;
  features?: string[];
  visualImage?: string;
  visualAlt?: string;
  className?: string;
}

interface ConfettiParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
}

const confettiColors = ["#e21b2f", "#2563eb", "#10b981", "#fbbf24", "#bd168e"];

export function WaitlistHero({
  eyebrow = "School Programs",
  title,
  subtitle,
  inputPlaceholder = "school@email.com",
  buttonText = "Request Program",
  successText = "Request noted",
  features = ["Confidence labs", "Career discovery", "Study habits"],
  visualImage = "/pencil set/image.png",
  visualAlt = "",
  className,
}: WaitlistHeroProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const fireConfetti = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: ConfettiParticle[] = Array.from({ length: 58 }, () => ({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 11,
      vy: (Math.random() - 1.85) * 10,
      life: 100,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      size: Math.random() * 4 + 2,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index];
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.42;
        particle.life -= 2;

        ctx.globalAlpha = Math.max(0, particle.life / 100);
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        if (particle.life <= 0) particles.splice(index, 1);
      }

      ctx.globalAlpha = 1;

      if (particles.length > 0) {
        window.requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    animate();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");

    window.setTimeout(() => {
      setStatus("success");
      setEmail("");
      fireConfetti();
    }, 900);
  };

  return (
    <section
      className={cn(
        "relative isolate flex min-h-[100svh] items-center overflow-hidden border-b border-[#f0c8bc] bg-[#fffaf5] px-4 py-[clamp(5.75rem,9vw,8rem)] sm:px-6 lg:px-8",
        className
      )}
    >
      <style>{`
        @keyframes um-spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes um-spin-slow-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes um-bounce-in {
          0% { transform: scale(0.88); opacity: 0; }
          55% { transform: scale(1.04); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .um-spin-slow { animation: um-spin-slow 48s linear infinite; }
        .um-spin-slow-reverse { animation: um-spin-slow-reverse 58s linear infinite; }
        .um-bounce-in { animation: um-bounce-in 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
      `}</style>

      <div className="absolute inset-0 -z-20 bg-[radial-gradient(#e21b2f_1px,transparent_1px)] opacity-[0.08] [background-size:22px_22px]" />
      <div className="absolute left-1/2 top-[47%] -z-10 h-[clamp(330px,72vw,760px)] w-[clamp(330px,72vw,760px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[inset_0_0_0_1px_rgba(226,27,47,0.08)]" />

      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-90"
        style={{
          perspective: "1200px",
          transform: "perspective(1200px) rotateX(clamp(4deg, 1.4vw, 12deg))",
          transformOrigin: "center bottom",
        }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 um-spin-slow">
          <div className="absolute left-1/2 top-1/2 h-[clamp(390px,86vw,920px)] w-[clamp(390px,86vw,920px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f4b5a7] bg-[conic-gradient(from_30deg,transparent,#fff1e5,transparent,#dbeafe,transparent)] opacity-70" />
        </div>
        <div className="absolute inset-0 um-spin-slow-reverse">
          <div className="absolute left-1/2 top-1/2 h-[clamp(270px,60vw,620px)] w-[clamp(270px,60vw,620px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#bfdbfe] bg-[conic-gradient(from_160deg,transparent,#eff6ff,transparent,#fff1e5,transparent)] opacity-80" />
        </div>
        <div className="absolute inset-0">
          <img
            src={visualImage}
            alt={visualAlt}
            className="absolute left-1/2 top-1/2 h-[clamp(170px,34vw,340px)] w-[clamp(170px,34vw,340px)] -translate-x-1/2 -translate-y-1/2 rounded-[24px] border border-white/70 bg-white/70 object-cover p-1 opacity-[0.18] shadow-2xl sm:opacity-[0.24]"
          />
        </div>
      </div>

      <div className="container-main relative z-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center overflow-hidden rounded-[16px] border border-[#f0c8bc] bg-white shadow-lg sm:h-16 sm:w-16 sm:rounded-[18px]">
            <Sparkles className="h-6 w-6 text-[#e21b2f] sm:h-7 sm:w-7" />
          </div>

          <p className="inline-flex max-w-full rounded-[8px] border border-[#f0c8bc] bg-white/80 px-4 py-2 text-center text-[11px] font-black uppercase tracking-[0.14em] text-[#e21b2f] shadow-sm backdrop-blur sm:text-xs sm:tracking-[0.16em]">
            {eyebrow}
          </p>

          <h1 className="mt-5 max-w-4xl font-heading text-[clamp(2.35rem,9vw,4.75rem)] font-black leading-[1.04] tracking-tight text-[#251324] text-balance">
            {title}
          </h1>

          <p className="mt-5 max-w-2xl text-sm font-semibold leading-relaxed text-[#6c5a6c] sm:text-base lg:text-lg">
            {subtitle}
          </p>

          <div className="relative mt-7 w-full max-w-xl px-1 sm:mt-8">
            <canvas
              ref={canvasRef}
              className="pointer-events-none absolute left-1/2 top-1/2 z-30 h-[min(56vw,420px)] w-[min(92vw,620px)] -translate-x-1/2 -translate-y-1/2"
            />

            <div
              className={cn(
                "absolute inset-0 flex min-h-[132px] items-center justify-center rounded-[18px] bg-success text-white shadow-lg transition-all duration-500 sm:min-h-16 sm:rounded-full",
                status === "success"
                  ? "scale-100 opacity-100"
                  : "pointer-events-none scale-95 opacity-0"
              )}
            >
              <div
                className={cn(
                  "flex items-center gap-2 text-base font-extrabold",
                  status === "success" && "um-bounce-in"
                )}
              >
                <span className="rounded-full bg-white/20 p-1">
                  <CheckCircle2 className="h-5 w-5" />
                </span>
                {successText}
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className={cn(
                "relative grid min-h-[132px] w-full gap-2 rounded-[18px] border border-[#efd2c5] bg-white p-2 shadow-xl transition-all duration-500 sm:block sm:h-16 sm:min-h-16 sm:rounded-full sm:p-0",
                status === "success"
                  ? "pointer-events-none scale-95 opacity-0"
                  : "scale-100 opacity-100"
              )}
            >
              <div className="relative h-14 sm:h-full">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#a58b91] sm:left-5" />
                <input
                  type="email"
                  required
                  placeholder={inputPlaceholder}
                  value={email}
                  disabled={status === "loading"}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-full w-full rounded-[14px] bg-[#fffaf5] pl-11 pr-4 text-sm font-semibold text-[#251324] outline-none placeholder:text-[#a58b91] disabled:cursor-wait disabled:opacity-70 sm:rounded-full sm:bg-transparent sm:pl-12 sm:pr-[156px] sm:text-base"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-[14px] bg-[#e21b2f] px-5 text-sm font-extrabold text-white transition-all hover:bg-[#b91525] active:scale-95 disabled:cursor-wait disabled:opacity-80 sm:absolute sm:bottom-1.5 sm:right-1.5 sm:top-1.5 sm:h-auto sm:w-auto sm:min-w-[140px] sm:rounded-full"
              >
                {status === "loading" ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/35 border-t-white" />
                ) : (
                  <>
                    {buttonText}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="mt-7 grid w-full max-w-3xl gap-2 sm:mt-8 sm:grid-cols-3 sm:gap-3">
            {features.map((item) => (
              <div
                key={item}
                className="rounded-[8px] border border-[#f0c8bc] bg-white/85 px-3 py-3 text-sm font-extrabold leading-tight text-[#523f4f] shadow-sm backdrop-blur sm:px-4"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
