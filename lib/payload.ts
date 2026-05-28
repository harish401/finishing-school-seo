import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Get a PayloadCMS client instance.
 * Uses the in-process Payload client — no HTTP round-trip.
 * Safe to call in React Server Components and API routes.
 */
export const getPayloadClient = async () => {
  return await getPayload({ config });
};
