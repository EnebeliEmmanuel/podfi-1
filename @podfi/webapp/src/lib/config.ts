import { z } from "zod"

const EnvSchema = z.object({
  PARTICLE_PROJECT_ID: z.string(),
  PARTICLE_CLIENT_KEY: z.string(),
  PARTICLE_APP_ID: z.string(),
  WALLETCONNECT_PROJECT_ID: z.string(),
})

const env = EnvSchema.parse({
  PARTICLE_PROJECT_ID: import.meta.env.VITE_PARTICLE_PROJECT_ID,
  PARTICLE_CLIENT_KEY: import.meta.env.VITE_PARTICLE_CLIENT_KEY,
  PARTICLE_APP_ID: import.meta.env.VITE_PARTICLE_APP_ID,
  WALLETCONNECT_PROJECT_ID: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
})

export const config = {
  particle: {
    projectId: env.PARTICLE_PROJECT_ID,
    clientKey: env.PARTICLE_CLIENT_KEY,
    appId: env.PARTICLE_APP_ID,
  },
  walletconnect: {
    projectId: env.WALLETCONNECT_PROJECT_ID
  },
}

