module.exports = {
  darkMode: "class",
  corePlugins: {
    preflight: false
  },
  content: [
    "./src/auth/**/*.{js,jsx,ts,tsx}",
    "./src/core/**/*.{js,jsx,ts,tsx}",
    "./src/admin/**/*.{js,jsx,ts,tsx}",
    "./src/homepage/components/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('flowbite/plugin')
  ],
}
