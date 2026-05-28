import { Metadata } from "next";
import { generateSeoMetadata } from "@/lib/seo";
import { Award, Download, ExternalLink, ShieldCheck } from "lucide-react";

export const metadata: Metadata = generateSeoMetadata({
  title: "My Certificates",
  description: "View and download your earned finishing school certificates.",
  path: "/student/certificates",
  noIndex: true,
});

export default function StudentCertificatesPage() {
  const certificates = [
    {
      id: "CERT-2026-YLA01",
      courseTitle: "Youth Leadership Accelerator Program",
      issueDate: "April 15, 2026",
      grade: "A+",
      credentialUrl: "#",
    },
  ];

  return (
    <div className="space-y-8 font-[family-name:var(--font-body)]">
      
      <div>
        <h1 className="font-[family-name:var(--font-heading)] font-extrabold text-2xl sm:text-3xl text-on-surface">
          My Earned Certifications
        </h1>
        <p className="text-on-surface-variant text-sm mt-1">
          Review, share, or download your industry-accredited finishing school credentials.
        </p>
      </div>

      {certificates.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-surface-container-lowest border border-outline-variant/20 shadow-sm max-w-lg mx-auto">
          <Award className="w-12 h-12 text-on-surface-variant/40 mx-auto mb-4" />
          <h3 className="font-[family-name:var(--font-heading)] font-bold text-lg text-on-surface">No Credentials Yet</h3>
          <p className="text-on-surface-variant text-sm mt-1 leading-relaxed">
            Certificates are issued automatically upon achieving a 100% completion milestone in any registered program. Complete your modules to earn accreditation.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert, idx) => (
            <div key={idx} className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 shadow-md p-6 relative overflow-hidden flex flex-col justify-between hover:border-primary-container/30 transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-3xl" />
              
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <Award className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="font-[family-name:var(--font-heading)] font-bold text-lg text-on-surface leading-tight">
                    {cert.courseTitle}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-on-surface-variant mt-2 font-medium">
                    <span>Credential ID:</span>
                    <code className="bg-surface-container-low px-1.5 py-0.5 rounded text-primary font-bold">{cert.id}</code>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 text-sm border-t border-outline-variant/10">
                  <div>
                    <span className="text-xs text-on-surface-variant">Issued On</span>
                    <p className="font-bold text-on-surface mt-0.5">{cert.issueDate}</p>
                  </div>
                  <div>
                    <span className="text-xs text-on-surface-variant">Grade Achieved</span>
                    <p className="font-bold text-on-surface mt-0.5">{cert.grade}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-outline-variant/20">
                <button className="flex-1 py-2 px-4 bg-primary text-on-primary text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity">
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
                <a
                  href={cert.credentialUrl}
                  className="py-2 px-4 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  Verify
                </a>
              </div>

              <div className="mt-4 flex items-center gap-1.5 justify-center text-[10px] font-bold text-success uppercase">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Industry Accreditation</span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
