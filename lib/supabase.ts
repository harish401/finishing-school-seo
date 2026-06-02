import { createClient } from "@supabase/supabase-js";

// Safe runtime resolution of environment variables (handles Docker build-time isolation)
const getSupabaseUrl = () => {
  if (typeof window !== "undefined") {
    return (window as any).__ENV?.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  }
  return process.env.NEXT_PUBLIC_SUPABASE_URL;
};

const getSupabaseAnonKey = () => {
  if (typeof window !== "undefined") {
    return (window as any).__ENV?.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  }
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
};

const supabaseUrl = getSupabaseUrl();
const supabaseAnonKey = getSupabaseAnonKey();

// Check if Supabase keys are actual valid credentials rather than default placeholders
export const isSupabaseConfigured = !!(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== "https://your-project-id.supabase.co" &&
  !supabaseUrl.includes("your-project-id")
);

// Singleton Supabase Client instance (null if unconfigured to support mock fallback)
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;
