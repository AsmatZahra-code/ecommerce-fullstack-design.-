/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkmode: "class",
  theme: {
    extend: {
      // ✅ Correct
      colors: {
        primary: "#0d6efd",
        secondary: "#ffffff",
        dark: "#1c1c1c",
        bg:"#777777",
        orangeCustom: '#F38332',
        tealCustom: '#55BDC3',
        
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "3rem",
        },
      },
    },
     plugins: [require('@tailwindcss/line-clamp')],
  },

  plugins: [],
};
