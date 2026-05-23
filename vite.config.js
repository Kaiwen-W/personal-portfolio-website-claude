import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' keeps asset paths relative so the build works whether the
// site lives at username.github.io or username.github.io/repo-name/
export default defineConfig({
  plugins: [react()],
  base: './',
})
