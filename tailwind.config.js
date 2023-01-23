/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "index.html"
  ],
  theme: {
    colors: {
      transparent: "transparent",
      "red": "#ff5252",
      "purple": "#8f19e8",
      "purple-light": "#a445ed",
      "purple-lighter": "#2d153f",
      "gray": "#757575",
      "gray-night": "#050505",
      "gray-half-darkest": "#0e0e0e",
      "gray-darkest": "#1f1f1f",
      "gray-darker": "#2d2d2d",
      "gray-dark": "#3a3a3a",
      "gray-light": "#757575",
      "gray-lighter": "#e8e8e8",
      "gray-lightest": "#f4f4f4",
      "white": "#ffffff",
      "black": "#000000",
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      serif: ["Lora", "serif"],
      mono: ["Inconsolata", "monospace"],
    },
    container: {
      center: true,
      screens: {
        sm: "480px",
        md: "768px",
        lg: "768px",
        xl: "768px",
      },
    },
    extend: {
      dropShadow: {
        "purple-light": "0px 6px 20px #a445ed",
        "gray": "0px 6px 20px #00000019",
      }
    },
    screens: {
      xs: "430px",
    },
  },
  darkMode: "class",
  plugins: [],
}
