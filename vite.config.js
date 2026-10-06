import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const standalone = mode === 'standalone'

  return {
    base: standalone ? '/' : '/product/',
    plugins: [react()],
    build: standalone ? {} : {
      outDir: '../public/product',
      emptyOutDir: true,
    },
    server: { host: '127.0.0.1', port: 5173 },
  }
})