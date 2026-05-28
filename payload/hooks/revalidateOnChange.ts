import { revalidatePath } from 'next/cache';
import type { CollectionAfterChangeHook } from 'payload';

/**
 * Returns a Payload afterChange hook that revalidates the given path
 * using Next.js ISR (Incremental Static Regeneration).
 *
 * @param path - The path to revalidate (e.g. '/courses', '/blog')
 */
export const revalidateOnChange = (path: string): CollectionAfterChangeHook => {
  return ({ doc, req }) => {
    req.payload.logger.info(`Revalidating path: ${path}`);
    revalidatePath(path);
    return doc;
  };
};
