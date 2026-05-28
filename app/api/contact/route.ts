import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { resend, EMAIL_FROM } from "@/lib/resend";
import fs from "fs";
import path from "path";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// File path for storing leads locally without a database
const LEADS_FILE_PATH = path.join(process.cwd(), "scratch", "leads.json");

// Helper to save lead and clean up leads older than 30 days
function saveLeadAndCleanup(newLead: any) {
  try {
    const dir = path.dirname(LEADS_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    let leads = [];
    if (fs.existsSync(LEADS_FILE_PATH)) {
      const fileData = fs.readFileSync(LEADS_FILE_PATH, "utf-8");
      try {
        leads = JSON.parse(fileData);
      } catch (jsonErr) {
        console.error("Stale or invalid leads file. Resetting store:", jsonErr);
        leads = [];
      }
    }

    const now = Date.now();
    const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

    // Filter out leads older than 30 days (Auto-Expiry / TTL)
    const activeLeads = Array.isArray(leads)
      ? leads.filter((lead: any) => lead.timestamp && lead.timestamp > thirtyDaysAgo)
      : [];

    // Append new lead
    activeLeads.push({
      ...newLead,
      timestamp: now,
      dateString: new Date(now).toISOString(),
    });

    fs.writeFileSync(LEADS_FILE_PATH, JSON.stringify(activeLeads, null, 2), "utf-8");
    console.log(`[LEADS STORAGE] Saved new lead and cleaned up expired ones. Total active leads: ${activeLeads.length}`);
  } catch (err) {
    console.error("Failed to store lead locally:", err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = contactSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid contact form data", details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, phone, subject, message } = validation.data;

    // 1. Save lead locally and cleanup expired leads (30-day TTL)
    saveLeadAndCleanup({ name, email, phone, subject, message });

    // 2. Send emails using Resend
    try {
      const apiKey = process.env.RESEND_API_KEY;
      const isResendConfigured = apiKey && apiKey !== "re_xxxxx" && !apiKey.includes("xxxxx");

      if (isResendConfigured) {
        const prettySubject = subject.charAt(0).toUpperCase() + subject.slice(1) + " Inquiry";

        // Send notification to ADMIN
        try {
          await resend.emails.send({
            from: EMAIL_FROM,
            to: "uniquementors.webapp@gmail.com",
            subject: `🚨 [New Lead Alert] ${name} - ${prettySubject}`,
            html: `
              <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
                <div style="border-bottom: 2px solid #f1f5f9; padding-bottom: 20px; margin-bottom: 24px; text-align: left;">
                  <h2 style="color: #0f172a; margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.5px; display: inline-block;">Unique Mentors</h2>
                  <div style="float: right; background-color: #ecfdf5; color: #047857; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 20px; border: 1px solid #a7f3d0; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 2px;">
                    New Consultation Lead
                  </div>
                  <div style="clear: both;"></div>
                  <p style="color: #64748b; margin: 4px 0 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Operational Alert Desk</p>
                </div>

                <p style="font-size: 15px; color: #334155; line-height: 1.6; margin-top: 0;">
                  An inquiry has been successfully captured from the digital consultation desk. Below are the submission specifics:
                </p>

                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 24px 0;">
                  <h3 style="color: #0f172a; font-size: 13px; font-weight: 700; margin: 0 0 16px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">
                    Prospect Details
                  </h3>
                  
                  <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                    <tr>
                      <td style="padding: 8px 0; width: 130px; font-weight: 600; color: #64748b; vertical-align: top;">Full Name:</td>
                      <td style="padding: 8px 0; font-weight: 700; color: #0f172a;">${name}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; font-weight: 600; color: #64748b; vertical-align: top;">Email Address:</td>
                      <td style="padding: 8px 0; font-weight: 600;">
                        <a href="mailto:${email}" style="color: #0284c7; text-decoration: none;">${email}</a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; font-weight: 600; color: #64748b; vertical-align: top;">Phone Number:</td>
                      <td style="padding: 8px 0; font-weight: 600;">
                        <a href="tel:${phone}" style="color: #334155; text-decoration: none;">${phone}</a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; font-weight: 600; color: #64748b; vertical-align: top;">Subject Area:</td>
                      <td style="padding: 8px 0;">
                        <span style="background-color: #f1f5f9; padding: 3px 8px; border-radius: 6px; border: 1px solid #e2e8f0; font-size: 12px; font-weight: 600; color: #475569;">
                          ${prettySubject}
                        </span>
                      </td>
                    </tr>
                  </table>
                </div>

                <div style="background-color: #fff; border-left: 4px solid #0284c7; padding: 4px 0 4px 16px; margin: 24px 0;">
                  <h4 style="margin: 0 0 6px 0; color: #0f172a; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Message/Inquiry:</h4>
                  <p style="margin: 0; color: #334155; font-size: 14px; line-height: 1.6; font-style: italic;">
                    "${message}"
                  </p>
                </div>

                <div style="text-align: center; margin-top: 32px; padding-top: 20px; border-top: 1px solid #f1f5f9;">
                  <a href="mailto:${email}?subject=Re: Your inquiry regarding ${prettySubject}" style="background-color: #0284c7; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; padding: 12px 24px; border-radius: 8px; display: inline-block;">
                    Initiate Direct Response
                  </a>
                </div>

                <div style="margin-top: 32px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 16px;">
                  <strong>System Generation Log</strong> • Cleaned up old lead indices matching 30-day TTL parameters.<br />
                  Unique Mentors Operations Desk • Kochi Campus
                </div>
              </div>
            `,
          });
          console.log(`[RESEND EMAIL] Admin notification email dispatched successfully to uniquelymentors.webapp@gmail.com.`);
        } catch (adminErr: any) {
          console.error("====================================================");
          console.error("❌ ADMIN EMAIL DISPATCH FAILED!");
          console.error("Error Details:", adminErr);
          console.error("====================================================");
        }

        // Send beautifully styled HTML auto-reply confirmation to USER
        try {
          await resend.emails.send({
            from: EMAIL_FROM,
            to: email,
            subject: `We received your inquiry - Unique Mentors`,
            html: `
              <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 35px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
                <div style="text-align: center; border-bottom: 2px solid #f1f5f9; padding-bottom: 24px; margin-bottom: 28px;">
                  <h2 style="color: #0284c7; margin: 0 0 6px 0; font-size: 26px; font-weight: 800; letter-spacing: -0.75px;">Unique Mentors</h2>
                  <span style="font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #64748b; border: 1px solid #e2e8f0; padding: 4px 12px; border-radius: 20px; background-color: #f8fafc; display: inline-block;">
                    Advisory Consultation Desk
                  </span>
                </div>
                
                <p style="font-size: 16px; color: #1e293b; line-height: 1.6; margin-top: 0;">Dear <strong>${name}</strong>,</p>
                
                <p style="font-size: 15px; color: #475569; line-height: 1.6;">
                  Thank you for reaching out to <strong>Unique Mentors Finishing School</strong>. We have successfully registered your inquiry regarding <strong>"${prettySubject}"</strong>.
                </p>
                
                <p style="font-size: 15px; color: #475569; line-height: 1.6;">
                  One of our academic consultants has been assigned to your request and is currently evaluating your profile. We will contact you via email or phone within <strong>24 business hours</strong> to guide you on the next steps of your professional growth journey.
                </p>
                
                <div style="background-color: #f8fafc; padding: 20px; border-radius: 12px; margin: 28px 0; border: 1px solid #e2e8f0; border-left: 4px solid #0284c7;">
                  <h4 style="margin: 0 0 12px 0; color: #0f172a; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Summary of Your Submission:</h4>
                  <table style="width: 100%; font-size: 13px; color: #475569; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 6px 0; width: 110px; font-weight: 600; color: #64748b; vertical-align: top;">Subject Area:</td>
                      <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">${prettySubject}</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0; font-weight: 600; color: #64748b; vertical-align: top;">Your Message:</td>
                      <td style="padding: 6px 0; color: #334155; line-height: 1.5; font-style: italic;">"${message}"</td>
                    </tr>
                  </table>
                </div>

                <div style="background-color: #f0f9ff; border: 1px solid #bae6fd; border-radius: 12px; padding: 18px; margin: 24px 0;">
                  <h4 style="margin: 0 0 8px 0; color: #0369a1; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">💡 What's Next?</h4>
                  <ul style="margin: 0; padding-left: 20px; color: #0369a1; font-size: 13px; line-height: 1.6;">
                    <li style="margin-bottom: 6px;"><strong>Advisor Assignment:</strong> A mentor specializing in <em>${prettySubject}</em> is reviewing your request.</li>
                    <li style="margin-bottom: 6px;"><strong>Discovery Call:</strong> Keep an eye on your phone number (<strong>${phone}</strong>) for a brief alignment chat.</li>
                    <li><strong>Campus Tour:</strong> If you would like to visit our Kochi campus in person, reply directly to this email to book a slot.</li>
                  </ul>
                </div>

                <p style="font-size: 14px; color: #475569; line-height: 1.6;">
                  If you have any immediate questions, feel free to reply directly to this message or get in touch with our front desk at <strong>+91 09544774599</strong>.
                </p>
                
                <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 32px 0;" />
                
                <p style="font-size: 11px; color: #94a3b8; text-align: center; line-height: 1.7; margin: 0;">
                  <strong>Unique Mentors Finishing School</strong><br />
                  1st Floor, Jyothy, Ernakulathappan Temple Road, Pallimukku, Kochi, Kerala - 682011<br />
                  © ${new Date().getFullYear()} Unique Mentors. All rights reserved.
                </p>
              </div>
            `,
          });
          console.log(`[RESEND EMAIL] Customer auto-reply email dispatched successfully to ${email}.`);
        } catch (customerErr: any) {
          console.error("====================================================");
          console.error("❌ CUSTOMER AUTO-REPLY EMAIL DISPATCH FAILED!");
          console.error("Error Details:", customerErr);
          console.error("----------------------------------------------------");
          console.error("💡 NOTE: In Resend Sandbox Mode, you can only send emails to the email address that registered the Resend account. Dispatches to unverified third-party emails will fail.");
          console.error("====================================================");
        }
      } else {
        console.warn("====================================================");
        console.warn("⚠️ [RESEND EMAIL] RESEND_API_KEY is not configured or uses placeholder 're_xxxxx'!");
        console.warn("   Emails were NOT dispatched. Submission was saved locally to leads.json.");
        console.warn("   To enable email delivery, set a valid RESEND_API_KEY in .env.local.");
        console.warn("====================================================");
        console.log(`[CONTACT LOG ONLY] Name: ${name}, Email: ${email}, Subject: ${subject}`);
      }
    } catch (globalMailError: any) {
      console.error("====================================================");
      console.error("❌ GLOBAL RESEND DISPATCH PROCESSING ERROR!");
      console.error("Error Details:", globalMailError);
      console.error("====================================================");
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been received! Our support team will get in touch soon.",
    });

  } catch (error) {
    console.error("Contact API processing error:", error);
    return NextResponse.json(
      { error: "Failed to process contact message" },
      { status: 500 }
    );
  }
}
