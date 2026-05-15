import { createClient } from '@supabase/supabase-js'

// Server-only Supabase client. Import ONLY in server components and Route Handlers.
// Never import this in a "use client" component — use src/lib/supabase.js there.
export function createServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { auth: { persistSession: false } }
  )
}
