import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

function readEnvFileValue(filePath: string, key: string): string | undefined {
  if (!existsSync(filePath)) return undefined
  const text = readFileSync(filePath, 'utf8')
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const k = trimmed.slice(0, eq).trim()
    if (k !== key) continue
    return trimmed.slice(eq + 1).trim().replace(/^['"]|['"]$/g, '')
  }
  return undefined
}

export default defineConfig(({ mode }) => {
  const root = process.cwd()
  const fileUrl =
    readEnvFileValue(resolve(root, '.env.local'), 'VITE_SUPABASE_URL') ||
    readEnvFileValue(resolve(root, `.env.${mode}`), 'VITE_SUPABASE_URL') ||
    readEnvFileValue(resolve(root, '.env'), 'VITE_SUPABASE_URL')

  // Prefer project .env over machine-wide env placeholders like YOUR_PROJECT
  const loaded = loadEnv(mode, root, 'VITE_')
  const supabaseUrl = fileUrl || loaded.VITE_SUPABASE_URL?.trim()
  const isPlaceholder =
    !supabaseUrl ||
    /your_project|YOUR_PROJECT|xxxx\.supabase/i.test(supabaseUrl)

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy:
        supabaseUrl && !isPlaceholder
          ? {
              '/supabase-api': {
                target: supabaseUrl,
                changeOrigin: true,
                secure: true,
                rewrite: (path) => path.replace(/^\/supabase-api/, ''),
              },
            }
          : undefined,
    },
  }
})
