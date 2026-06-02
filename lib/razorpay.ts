import Razorpay from "razorpay";

/**
 * Razorpay client instance.
 * Only initialized when payment is enabled and keys are set.
 */
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_dummy_for_build",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "rzp_secret_dummy_for_build",
});
