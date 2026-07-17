import { createClient, type SupabaseClient } from '@supabase/supabase-js'

function env(name: string): string | undefined {
  const value = import.meta.env[name] as string | undefined
  const trimmed = value?.trim()
  return trimmed || undefined
}

const configuredUrl = env('VITE_SUPABASE_URL')
const anonKey = env('VITE_SUPABASE_ANON_KEY')

/**
 * In local dev, call Supabase through the Vite proxy (`/supabase-api`)
 * so browsers / firewalls that block *.supabase.co still work.
 * Production builds still use the real Supabase URL.
 */
const url =
  configuredUrl && import.meta.env.DEV
    ? `${window.location.origin}/supabase-api`
    : configuredUrl

export const isSupabaseConfigured = Boolean(configuredUrl && anonKey)

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url!, anonKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null
