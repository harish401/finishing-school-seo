import { NextRequest, NextResponse } from "next/server";
import { resend, EMAIL_FROM } from "@/lib/resend";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import fs from "fs";
import path from "path";

const OTP_FILE_PATH = path.join(process.cwd(), "scratch", "otp.json");

// Helper to save OTP details locally (Zero-DB)
function saveOTP(code: string) {
  try {
    const dir = path.dirname(OTP_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const otpData = {
      code,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes validity
    };

    fs.writeFileSync(OTP_FILE_PATH, JSON.stringify(otpData, null, 2), "utf-8");
    console.log(`[AUTH OTP] Generated secure verification code: ${code}. Expiring in 5 minutes.`);
  } catch (err) {
    console.error("Failed to save OTP locally:", err);
  }
}

// Helper to read and validate OTP
function verifyOTPCode(inputCode: string): boolean {
  try {
    if (!fs.existsSync(OTP_FILE_PATH)) {
      return false;
    }

    const fileData = fs.readFileSync(OTP_FILE_PATH, "utf-8");
    const { code, expiresAt } = JSON.parse(fileData);

    if (code === inputCode && Date.now() < expiresAt) {
      // Clear OTP file on successful match (single-use token)
      try {
        fs.unlinkSync(OTP_FILE_PATH);
      } catch (e) {
        console.error("Failed to delete used OTP token file:", e);
      }
      return true;
    }
  } catch (err) {
    console.error("Failed to read/validate OTP locally:", err);
  }
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, email, password, code } = body;

    // ── STAGE 1: GENERATE AND SEND OTP ──
    if (action === "send") {
      if (!email || !password) {
        return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
      }

      // 1. Validate credentials
      let isValidCredentials = false;

      if (isSupabaseConfigured && supabase) {
        // Authenticate against Supabase Auth
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (!error) {
          isValidCredentials = true;
          // Sign out immediately on server client to prevent premature session state
          await supabase.auth.signOut();
        }
      } else {
        // Local fallback credentials
        const envUser = process.env.ADMIN_USERNAME || "admin";
        const envPass = process.env.ADMIN_PASSWORD || "uniquementors2026";
        if (email === envUser && password === envPass) {
          isValidCredentials = true;
        }
      }

      if (!isValidCredentials) {
        return NextResponse.json({ error: "Invalid administrator credentials." }, { status: 401 });
      }

      // 2. Credentials are correct -> Generate 6-digit OTP code
      const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
      saveOTP(generatedCode);

      // 3. Dispatch OTP via Resend
      try {
        if (process.env.RESEND_API_KEY) {
          await resend.emails.send({
            from: EMAIL_FROM,
            to: "uniquementors.webapp@gmail.com",
            subject: `🔐 Secure Verification Code: ${generatedCode}`,
            html: `
              <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 30px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);">
                <div style="border-bottom: 2px solid #f1f5f9; padding-bottom: 16px; margin-bottom: 20px; text-align: center;">
                  <h2 style="color: #0284c7; margin: 0; font-size: 22px; font-weight: 800; tracking-tight;">Unique Mentors</h2>
                  <span style="font-size: 10px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #64748b; margin-top: 4px; display: inline-block;">
                    Console Identity Verification
                  </span>
                </div>

                <p style="font-size: 15px; color: #334155; line-height: 1.6; margin-top: 0; text-align: center;">
                  You requested administrative access to the Database Operations Room. Use the secure code below to complete your authentication:
                </p>

                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; text-align: center; margin: 24px 0;">
                  <span style="font-family: 'Courier New', Courier, monospace; font-size: 32px; font-weight: 800; color: #0284c7; letter-spacing: 6px;">
                    ${generatedCode}
                  </span>
                  <p style="margin: 8px 0 0 0; font-size: 11px; color: #94a3b8; font-weight: bold; text-transform: uppercase;">
                    Valid for 5 minutes only
                  </p>
                </div>

                <div style="background-color: #fff9db; border-left: 4px solid #fcc419; padding: 12px; margin: 20px 0; border-radius: 4px; font-size: 13px; color: #665c2b; line-height: 1.5;">
                  <strong>Security Reminder:</strong> If you did not initiate this request, please ignore this email or change your security credentials immediately.
                </div>

                <div style="margin-top: 24px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 12px;">
                  Unique Mentors Operations Desk • Kochi Campus
                </div>
              </div>
            `,
          });
          console.log(`[AUTH OTP] Dispatched OTP verification email successfully to uniquelymentors.webapp@gmail.com.`);
        } else {
          console.warn("[AUTH OTP] RESEND_API_KEY unconfigured. Logging verification code locally instead:");
          console.warn(`=========================================`);
          console.warn(`🔑 SECURE OTP: ${generatedCode}`);
          console.warn(`=========================================`);
        }
      } catch (mailErr) {
        console.error("[AUTH OTP] Resend failed to deliver verification mail:", mailErr);
      }

      return NextResponse.json({ otp_sent: true });
    }

    // ── STAGE 2: VERIFY OTP CODE ──
    if (action === "verify") {
      if (!code) {
        return NextResponse.json({ error: "Verification code is required" }, { status: 400 });
      }

      const isCodeValid = verifyOTPCode(code.trim());

      if (!isCodeValid) {
        return NextResponse.json({ error: "Invalid or expired verification code." }, { status: 401 });
      }

      return NextResponse.json({ verified: true });
    }

    return NextResponse.json({ error: "Invalid action parameter" }, { status: 400 });

  } catch (error) {
    console.error("Auth OTP API processing error:", error);
    return NextResponse.json({ error: "Internal Auth Server Error" }, { status: 500 });
  }
}
