/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "float-box": {
          "0%, 100%": {
            transform: "perspective(1000px) rotateX(2deg) rotateY(2deg) translateZ(20px)",
          },
          "50%": {
            transform: "perspective(1000px) rotateX(-2deg) rotateY(-2deg) translateZ(30px)",
          },
        },
      },
      animation: {
        "float-box": "float-box 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}