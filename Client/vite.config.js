import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      // Include the datepicker JavaScript file in optimizeDeps
      "react-tailwindcss-datepicker",

    ],
    
  },
  server: {
    port: 3000
  }
})
