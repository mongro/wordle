const plugin = require("tailwindcss/plugin");

module.exports = {
  purge: {
    content: ["./src/**/*.{html,js}"],
    options: {
      safelist: [
        "animation-delay-1",
        "animation-delay-2",
        "animation-delay-3",
        "animation-delay-4",
        "animation-delay-5",
      ],
    },
  },
  darkMode: "class",
  theme: {
    extend: {
      boxShadow: {
        "3xl": "0 0 9px 6px grey",
      },

      screens: {
        height: {
          raw: "(min-height: 800px)",
          // => @media (min-width: 640px) { ... }
        },
      },
      keyframes: {
        grow: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        shake: {
          "10%": { transform: "translateX(-5%)" },
          "30%": { transform: "translateX(5%)" },
          "50%": { transform: "translateX(-10%)" },
          "70%": { transform: "translateX(10%)" },
          "90%": { transform: "translateX(-5%)" },
          "100%": { transform: "translateX(0%)" },
        },

        dance: {
          "10%": { transform: "translateY(-5%)" },
          "30%": { transform: "translateY(-30%)" },
          "50%": { transform: "translateY(-50%)" },
          "70%": { transform: "translateY(-30%)" },
          "90%": { transform: "translateY(-5%)" },
          "100%": { transform: "translateY(0%)" },
        },
        collapse: {
          "0%": { transform: "rotate(0deg)", opacity: 1 },
          "20%": { transform: "rotate(-200deg)", opacity: 1 },
          "40%": { transform: "rotate(-90deg)", opacity: 1 },
          "60%": { transform: "rotate(-170deg)", opacity: 0.8 },
          "80%": { transform: "rotate(-135deg)", opacity: 0.5 },
          "100%": { transform: "rotate(-135deg)", opacity: 0 },
        },
        hide: {
          "100%": { transform: "rotateX(90deg)" },
        },

        show: {
          "100%": { transform: "rotateX(0deg)" },
        },
      },
      animation: {
        shake: "shake 250ms ease-in-out ",
        flip: "hide 300ms linear 0s forwards, show 500ms linear 300ms forwards",
        dance: "dance 500ms linear",
        grow: "grow 0.8s linear ",
        collapse: "collapse 500ms linear 0s forwards",
      },
    },
  },
  plugins: [],
};
