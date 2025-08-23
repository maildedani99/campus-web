import type { Config } from "tailwindcss"
import flowbitePlugin from "flowbite/plugin"

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/lib/esm/**/*.js",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
       fontFamily: {
        sans: ['"Nunito Sans"', "sans-serif"],
      },
      colors: {
        primary: "#ef4444",
        surface: "#202120",
        background: "#0f0f10",
        text: "#ffffff",
        subtitle: "#9ca3af",
      },
    },
  },
  plugins: [flowbitePlugin],
}
export default config
