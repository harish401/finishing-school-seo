import { NextRequest, NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";
import { z } from "zod";

const createOrderSchema = z.object({
  amount: z.number().positive("Amount must be greater than zero"),
  courseId: z.string().min(1, "Course ID is required"),
  studentId: z.string().min(1, "Student ID is required"),
});

export async function POST(req: NextRequest) {
  // Return 503 Service Unavailable if payments are disabled
  if (process.env.PAYMENT_ENABLED !== "true") {
    return NextResponse.json(
      { error: "Payments are currently disabled on this platform." },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const validation = createOrderSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid request data", details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const { amount, courseId, studentId } = validation.data;

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // convert to paise
      currency: "INR",
      receipt: `receipt_${courseId.slice(0, 10)}_${studentId.slice(0, 10)}_${Date.now()}`,
      notes: {
        courseId,
        studentId,
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error: any) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json(
      { error: "Failed to create payment order" },
      { status: 500 }
    );
  }
}
