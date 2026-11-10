/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neonCyan: "#00f3ff",
        neonGreen: "#00ff66",
        neonPink: "#ff007f",
        neonPurple: "#bc13fe",
      },
      boxShadow: {
        cyanGlow: "0 0 15px rgba(0, 243, 255, 0.4)",
        pinkGlow: "0 0 15px rgba(255, 0, 127, 0.4)",
        greenGlow: "0 0 15px rgba(0, 255, 102, 0.4)",
      }
    },
  },
  plugins: [],
}