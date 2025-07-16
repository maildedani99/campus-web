/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        caveat: ['var(--font-caveat)'],
      },
     colors: {
      primary: '#e11d48',    // rojo corporativo
      bg: '#2a2a2a',          // gris oscuro más claro
      },
    },
  },
  plugins: [],
}
