/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'
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
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
      screens: {
        'xs': '375px', // Custom breakpoint
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
};
