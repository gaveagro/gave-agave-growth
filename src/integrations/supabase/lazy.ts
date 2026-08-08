/**
 * Lazily loads the Supabase client so it stays out of the initial/prerender bundle.
 */
export const getSupabase = async () => (await import('./client')).supabase;
