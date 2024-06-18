import { app, config } from "./src"
import { serve } from "@hono/node-server"

serve({
  port: config.app.port,
  fetch: app.fetch,
})

