import Razorpay from "razorpay";

/**
 * Razorpay client instance.
 * Only initialized when payment is enabled and keys are set.
 */
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});
