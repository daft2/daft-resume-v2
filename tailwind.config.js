export default {
  content: ["./src/**/*.tsx", "./src/**/*.css"],
  plugins: [require("@tailwindcss/forms")],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', "cursive"],
        silk: ['"Silkscreen"', "cursive"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      colors: {
        // Light Theme
        light: {
          bg: "#E8E4D9",
          surface: "#F5F1E6",
          text: {
            primary: "#1A1A1A",
            secondary: "#555555",
          },
          border: "#C8C0A8",
        },
        // Dark Theme
        dark: {
          bg: "#0A0A0F",
          surface: "#12121A",
          text: {
            primary: "#EAEAEA",
            secondary: "#A0A0A0",
          },
          border: "#1E1E2E",
        },
        // Arcade/Game Accent Colors
        arcade: {
          blue: "#0070F3",
          green: "#00FF90",
          yellow: "#FFE600",
          red: "#FF003C",
          magenta: "#9D00FF",
          cyan: "#00FFFF",
          gold: "#FFD700",
          hp: "#22C55E",
          mp: "#3B82F6",
          xp: "#EAB308",
        },
      },
      backgroundImage: {
        "gradient-power-glow": "linear-gradient(90deg, #00FFFF, #9D00FF)",
        "gradient-arcade-sunset": "linear-gradient(135deg, #FF003C, #FFE600)",
        "gradient-hero": "linear-gradient(180deg, #0070F3 0%, #121212 100%)",
        "gradient-hp": "linear-gradient(90deg, #22C55E, #16A34A)",
        "gradient-mp": "linear-gradient(90deg, #3B82F6, #2563EB)",
        "gradient-xp": "linear-gradient(90deg, #EAB308, #CA8A04)",
      },
      boxShadow: {
        "glow-cyan": "0 0 12px 2px rgba(0, 255, 255, 0.3)",
        "glow-magenta": "0 0 12px 2px rgba(157, 0, 255, 0.3)",
        "glow-green": "0 0 12px 2px rgba(0, 255, 144, 0.3)",
        "glow-gold": "0 0 12px 2px rgba(255, 215, 0, 0.3)",
        "glow-red": "0 0 12px 2px rgba(255, 0, 60, 0.3)",
        "rpg-inset": "inset 0 2px 8px rgba(0,0,0,0.4)",
      },
    },
    keyframes: {
      typing: {
        "0%": { width: "0%", visibility: "hidden" },
        "100%": { width: "100%" },
      },
      blink: {
        "50%": { borderColor: "transparent" },
        "100%": { borderColor: "white" },
      },
      "stat-fill": {
        "0%": { width: "0%" },
        "100%": { width: "var(--fill-width)" },
      },
      scanline: {
        "0%": { transform: "translateY(-100%)" },
        "100%": { transform: "translateY(100vh)" },
      },
      "pixel-pulse": {
        "0%, 100%": { opacity: "1" },
        "50%": { opacity: "0.7" },
      },
      "border-glow": {
        "0%, 100%": { borderColor: "rgba(0, 255, 255, 0.4)" },
        "50%": { borderColor: "rgba(0, 255, 255, 0.8)" },
      },
      "float-up": {
        "0%": { opacity: "0", transform: "translateY(8px)" },
        "100%": { opacity: "1", transform: "translateY(0)" },
      },
    },
    animation: {
      typing:
        "typing 2s steps(20) infinite alternate, blink .7s infinite",
      "stat-fill": "stat-fill 1.2s ease-out forwards",
      scanline: "scanline 8s linear infinite",
      "pixel-pulse": "pixel-pulse 2s ease-in-out infinite",
      "border-glow": "border-glow 2s ease-in-out infinite",
      "float-up": "float-up 0.4s ease-out forwards",
    },
  },
};
