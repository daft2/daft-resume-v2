export default {
  content: ["./src/**/*.tsx", "./src/**/*.css"],
  plugins: [require("@tailwindcss/forms")],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Sora"', "sans-serif"],
        serif: ['"Newsreader"', "Georgia", "serif"],
        pixel: ['"Press Start 2P"', "cursive"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      colors: {
        bg: "var(--bg)",
        surface: {
          DEFAULT: "var(--surface)",
          raised: "var(--surface-raised)",
        },
        border: {
          DEFAULT: "var(--border)",
          subtle: "var(--border-subtle)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          tertiary: "var(--text-tertiary)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          muted: "var(--accent-muted)",
          subtle: "var(--accent-subtle)",
        },
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 8vw, 5.5rem)", { lineHeight: "0.95", letterSpacing: "-0.03em", fontWeight: "600" }],
        "display": ["clamp(2rem, 5vw, 3.5rem)", { lineHeight: "1.05", letterSpacing: "-0.025em", fontWeight: "600" }],
        "heading": ["clamp(1.25rem, 2.5vw, 1.75rem)", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7", fontWeight: "400" }],
        "body": ["0.9375rem", { lineHeight: "1.7", fontWeight: "400" }],
        "caption": ["0.8125rem", { lineHeight: "1.5", fontWeight: "400" }],
        "label": ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.06em", fontWeight: "500" }],
        "micro": ["0.625rem", { lineHeight: "1.4", letterSpacing: "0.08em", fontWeight: "500" }],
      },
      keyframes: {
        "reveal-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "reveal-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "line-grow": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        "cursor-blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        "reveal-up": "reveal-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "reveal-in": "reveal-in 0.6s ease-out forwards",
        "line-grow": "line-grow 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "cursor-blink": "cursor-blink 1s step-end infinite",
      },
    },
  },
};
