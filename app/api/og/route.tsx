import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title") || "Unique Mentors Finishing School";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            background: "linear-gradient(135deg, #3525cd 0%, #4f46e5 100%)",
            padding: "80px",
            boxSizing: "border-box",
            fontFamily: "sans-serif",
          }}
        >
          {/* Top Logo branding */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                background: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                fontWeight: "bold",
                color: "#3525cd",
              }}
            >
              U
            </div>
            <span
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#ffffff",
                letterSpacing: "0.05em",
              }}
            >
              UNIQUE MENTORS
            </span>
          </div>

          {/* Main Title Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              marginTop: "40px",
              maxWidth: "900px",
            }}
          >
            <span
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#c7c4d8",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
              }}
            >
              FINISHING SCHOOL &amp; DEVELOPMENT PORTAL
            </span>
            <h1
              style={{
                fontSize: "64px",
                fontWeight: "800",
                color: "#ffffff",
                margin: 0,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </h1>
          </div>

          {/* Bottom Trust Indicators */}
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid rgba(255, 255, 255, 0.15)",
              paddingTop: "40px",
            }}
          >
            <span style={{ color: "#ffffff", fontSize: "16px", fontWeight: "600" }}>
              Shaping Tomorrow&apos;s Leaders Today
            </span>
            <span style={{ color: "#c7c4d8", fontSize: "16px", fontWeight: "500" }}>
              uniquementors.com
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error(`OG image generation failed:`, e);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
