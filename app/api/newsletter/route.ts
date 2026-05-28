import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = newsletterSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid email", details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const { email } = validation.data;

    // Log the newsletter subscription
    console.log(`[NEWSLETTER SIGNUP] Secured email: ${email}`);

    // Here you would typically integrate with Mailchimp, ConvertKit, etc.
    // e.g. await mailchimp.lists.addListMember(...)

    return NextResponse.json({
      success: true,
      message: "Thank you for subscribing to our finishing school newsletter!",
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Subscription processing failed" },
      { status: 500 }
    );
  }
}
