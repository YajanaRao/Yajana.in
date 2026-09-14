import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/* Lazy so a missing env var fails the portfolio loader with a clear error
   instead of crashing the whole server at module load. */
export function getSupabase(): SupabaseClient {
  if (!client) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error(
        "Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables"
      );
    }
    client = createClient(supabaseUrl, supabaseAnonKey);
  }
  return client;
}
