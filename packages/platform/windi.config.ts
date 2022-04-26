import { defineConfig } from "vite-plugin-windicss";
import colors from "windicss/colors";
import typography from "windicss/plugin/typography";

export default defineConfig({
  darkMode: "class",
  plugins: [typography()],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "65ch",
            color: "inherit",
            a: {
              color: "inherit",
              opacity: 0.75,
              fontWeight: "500",
              textDecoration: "underline",
              "&:hover": {
                opacity: 1,
                color: colors.teal[600],
              },
            },
            b: { color: "inherit" },
            strong: { color: "inherit" },
            em: { color: "inherit" },
            h1: { color: "inherit" },
            h2: { color: "inherit" },
            h3: { color: "inherit" },
            h4: { color: "inherit" },
            code: { color: "inherit" },
          },
        },
      },
    },
    fontSize: {
      xs: ["10px", { lineHeight: "12px" }],
      sm: ["12px", { lineHeight: "14px" }],
      base: ["14px", { lineHeight: "16px" }],
      lg: ["16px", { lineHeight: "18px" }],
      xl: ["18px", { lineHeight: "20px" }],
      "2xl": ["20px", { lineHeight: "22px" }],
      "3xl": ["30px", { lineHeight: "30px" }],
      "4xl": ["40px", { lineHeight: "40px" }],
      "5xl": ["50px", { lineHeight: "1" }],
      "6xl": ["60px", { lineHeight: "1" }],
      "7xl": ["70px", { lineHeight: "1" }],
      "8xl": ["80px", { lineHeight: "1" }],
      "9xl": ["90px", { lineHeight: "1" }],
      22: ["22px"],
      24: ["24px"],
      26: ["26px"],
      28: ["28px"],
      30: ["30px"],
      32: ["32px"],
      34: ["34px"],
    },
  },
});
