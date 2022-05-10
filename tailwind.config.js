module.exports = {
  darkMode: "media",
  content: ["./src/**/*.tsx"],
  theme: {
    fontFamily: {
      mono: "JetBrains Mono",
    },
    extend: {
      keyframes: {
        slideLeft: {
          "0%": {
            transform: "translateX(-100px)",
            opacity: 0,
          },
          "100%": {
            transform: "translateX(0)",
            opacity: 1,
          },
        },
      },
      animation: {
        slideLeft: "slideLeft 0.2s ease-out ",
      },
      colors: {
        yellow: {
          0: "#F9DC75",
          2: "#F5C61D",
          3: "#F1DE9C",
          4: "#584504",
        },
        black: {
          0: "#312702",
          2: "#7C7765",
          3: "#A2A097",
          4: "#EBEBEB",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
