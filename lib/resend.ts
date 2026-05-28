import { Resend } from "resend";

/**
 * Resend email client instance.
 */
export const resend = new Resend(process.env.RESEND_API_KEY);

export const EMAIL_FROM = process.env.EMAIL_FROM || "noreply@uniquementors.in";
