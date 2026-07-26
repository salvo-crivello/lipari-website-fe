import { z } from "zod"

/**
 * Validated at boot — a missing/invalid var crashes the process immediately
 * instead of surfacing as a silent `undefined` deep in a component tree.
 */
const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.url().default("http://localhost:3000")
  // CONTENT_API_URL: z.url(), // uncomment once the content backend exists
})

export const env = envSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL
})
