export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "@/styles/globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { CookieBanner } from "@/components/cookies/CookieBanner";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";

const interHeading = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const poppinsBody = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_NAME}`,
    default: `${SITE_NAME} — Finishing School for Students & Professionals`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: `${SITE_NAME} — Finishing School for Students & Professionals`,
    description: SITE_DESCRIPTION,
    url: "./",
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent(SITE_NAME)}`,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Finishing School for Students & Professionals`,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/api/og?title=${encodeURIComponent(SITE_NAME)}`],
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=1", sizes: "any" },
      { url: "/favicon.ico?v=1", type: "image/x-icon" },
    ],
    shortcut: "/favicon.ico?v=1",
    apple: "/icons/apple-touch-icon.png",
  },
};

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${interHeading.variable} ${poppinsBody.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.__ENV = {
                NEXT_PUBLIC_SUPABASE_URL: ${JSON.stringify(process.env.NEXT_PUBLIC_SUPABASE_URL || "")},
                NEXT_PUBLIC_SUPABASE_ANON_KEY: ${JSON.stringify(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "")}
              };
            `,
          }}
        />
      </head>
      <body className="font-body bg-background text-on-surface antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton phone={WHATSAPP_NUMBER} />
        <CookieBanner />
      </body>
    </html>
  );
}
