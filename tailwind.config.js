/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        all: "all",
      },
      keyframes: {
        rotate_border: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        rotate_border: "rotate_border 6s linear infinite",
      },
      backgroundImage: {
        "gradient-conic":
          "conic-gradient(transparent, transparent, transparent, #C8A217)",
        "home-bg": 
          "url('Tolet-Globe-Frontend/src/assets/background.png')",
        "gradient-conic-2":
          "conic-gradient(transparent, transparent, transparent, #3CBDB1)",
      },
      colors: {
        "custom-teal": "#3cbdb1",
        "custom-gold": "#c8a217",
      },
    },
  },
  plugins: [],
};
