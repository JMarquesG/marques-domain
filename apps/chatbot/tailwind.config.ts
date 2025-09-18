import type { Config } from 'tailwindcss'
import preset from '../../packages/ui/tailwind.config'

export default {
  presets: [preset as Config],
  content: [
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}'
  ]
} satisfies Config

