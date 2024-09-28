import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        inherit: "inherit",
        focusRing: "#888",
        currentColor: "currentColor",
        transparent: "transparent",
        white: "#fff",
        black: "#000100",
        primary: {
          DEFAULT: "#4baff1",
          light: "#aaf9ff",
        },
        gray: {
          1: "#F1F1F1",
          2: "#313131",
        },
        blue: {
          1: "#537699",
          2: "#5480A7",
          3: "#79AAD1",
        },
        brown: {
          1: "#965D3F",
          2: "#AF6341",
          3: "#D98865",
        },
        beige: {
          1: "#D6C7B2",
          2: "#DCD3C4",
          3: "#F4EDE2",
        },
        yellow: {
          1: "#E4BD13",
          2: "#EFC822",
          3: "#F2DC84",
        },
        error: {
          1: "#E6353D",
          2: "#FCE0E0",
        },
      },
    },
    fontFamily: {
      sans: ["Poppins"],
    },
  },

  plugins: [],
} satisfies Config;
