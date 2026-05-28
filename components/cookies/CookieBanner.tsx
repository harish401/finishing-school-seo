"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Cookie, X } from "lucide-react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = (level: "all" | "necessary") => {
    localStorage.setItem("cookie_consent", level);
    if (level === "all") {
      window.gtag?.("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "granted",
      });
    }
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
          <div
            className={cn(
              "max-w-4xl mx-auto p-6 rounded-2xl",
              "glass border border-outline-variant/20",
              "shadow-xl"
            )}
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary-light/40 flex items-center justify-center shrink-0 mt-0.5">
                <Cookie className="w-5 h-5 text-primary-container" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-on-surface font-[family-name:var(--font-heading)] mb-1">
                  We value your privacy
                </h3>
                <p className="text-sm text-on-surface-variant font-[family-name:var(--font-body)] leading-relaxed">
                  We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
                  By clicking &ldquo;Accept All&rdquo;, you consent to our use of cookies.
                </p>
              </div>
              <button
                onClick={() => setShow(false)}
                className="text-on-surface-variant hover:text-on-surface transition-colors shrink-0"
                aria-label="Close cookie banner"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-4 ml-14">
              <button
                onClick={() => handleAccept("all")}
                className="px-5 py-2.5 rounded-lg gradient-primary text-on-primary text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Accept All
              </button>
              <button
                onClick={() => handleAccept("necessary")}
                className="px-5 py-2.5 rounded-lg border border-outline-variant/30 text-on-surface text-sm font-semibold hover:bg-surface-container-low transition-colors"
              >
                Necessary Only
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
