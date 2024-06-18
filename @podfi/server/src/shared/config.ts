import { z } from 'zod'

const EnvSchema = z.object({
  PORT: z.coerce.number().min(1).max(65535)
})

const env = EnvSchema
  .parse(process.env)

export const config = {
  app: {
    port: env.PORT
  }
}
