import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  define: {
    // 为浏览器环境提供 Buffer 全局变量
    'global': 'globalThis',
  },
  resolve: {
    alias: {
      buffer: 'buffer',
    }
  }
})
