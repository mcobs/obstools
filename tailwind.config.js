/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'minecraft-green': '#4CAF50',
        'minecraft-dark-green': '#2E7D32',
        'minecraft-brown': '#8D6E63',
        'minecraft-gray': '#607D8B',
      }
    },
  },
  plugins: [],
}
