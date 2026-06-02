import { Resend } from "resend";

/**
 * Resend email client instance.
 */
export const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key_for_build");

export const EMAIL_FROM = process.env.EMAIL_FROM || "noreply@uniquementors.org";
