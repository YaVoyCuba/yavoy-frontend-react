import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { lingui } from '@lingui/vite-plugin'

// Enable babel macros for Lingui
const reactPlugin = react({ babel: { plugins: ['macros'] } })

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactPlugin,
    lingui()
  ]
})
