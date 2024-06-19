import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import path from 'path'

export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@podfi/contracts/types": path.resolve(__dirname, "../contracts/src/typechain"),
      "@podfi/contracts/artifacts": path.resolve(__dirname, "../contracts/artifacts"),
    },
  },
})
