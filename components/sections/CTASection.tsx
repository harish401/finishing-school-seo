import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export function CTASection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-main">
        <div className="relative isolate overflow-hidden rounded-[8px] bg-[#0b5f99] p-6 text-white sm:p-8 lg:p-10">
          <Image
            src="/brand/um-calendar-cover.png"
            alt=""
            fill
            sizes="100vw"
            className="-z-10 object-cover opacity-[0.18]"
          />
          <div
            className="absolute inset-y-0 right-0 -z-10 w-[55%] bg-[#9f257d]/74"
            style={{ clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0 100%)" }}
          />
          <div
            className="absolute inset-x-0 bottom-0 -z-10 h-20 bg-[#008b7d]"
            style={{ clipPath: "polygon(0 44%, 100% 0, 100% 100%, 0 100%)" }}
          />

          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              Ready to make students career-ready?
            </h2>
            <p className="mt-4 text-base font-semibold leading-relaxed text-white/86 sm:text-lg">
              Bring a practical finishing-school program to your school,
              college, healthcare batch, or professional group.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center gap-2 rounded-[8px] bg-white px-5 py-3 text-sm font-extrabold text-[#251324] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#fff1e5]"
              >
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/programs/professional-development"
                className="inline-flex min-h-12 items-center gap-2 rounded-[8px] border border-white/50 bg-white/8 px-5 py-3 text-sm font-extrabold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/12"
              >
                <Phone className="h-4 w-4" />
                Professional Programs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
