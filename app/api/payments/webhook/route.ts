import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  // Return 503 Service Unavailable if payments are disabled
  if (process.env.PAYMENT_ENABLED !== "true") {
    return NextResponse.json(
      { error: "Payments are currently disabled on this platform." },
      { status: 503 }
    );
  }

  try {
    const bodyString = await req.text();
    const signature = req.headers.get("x-razorpay-signature");
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!signature || !secret) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(bodyString)
      .digest("hex");

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: "Invalid signature verification" }, { status: 400 });
    }

    const payload = JSON.parse(bodyString);
    const event = payload.event;

    // Handle payment/order success events
    if (event === "order.paid" || event === "payment.captured") {
      const paymentEntity = payload.payload.payment.entity;
      const orderId = paymentEntity.order_id;
      const amount = paymentEntity.amount / 100; // back to rupees
      const notes = paymentEntity.notes || {};
      
      const { courseId, studentId } = notes;

      console.log(`Razorpay Payment captured successfully:`, {
        orderId,
        amount,
        courseId,
        studentId,
      });

      // TODO: Connect payload client to update enrollment status to 'completed'
      // import { getPayload } from 'payload';
      // const payloadClient = await getPayload({ config });
      // await payloadClient.update({
      //   collection: 'enrollments',
      //   where: { paymentId: { equals: orderId } },
      //   data: { paymentStatus: 'completed', status: 'active' }
      // });
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error("Razorpay webhook signature processing error:", error);
    return NextResponse.json(
      { error: "Internal processing failure" },
      { status: 500 }
    );
  }
}
