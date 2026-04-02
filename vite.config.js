import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Use '/gokulport.github.io/' for GitHub Pages subdomain
  base: '/gokulport.github.io/',
})
