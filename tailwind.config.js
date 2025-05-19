export default {
  content: ["./src/**/*.tsx", "./src/**/*.css"],
  plugins: [require("@tailwindcss/forms")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Light Theme
        light: {
          bg: "#F4F4F7",
          surface: "#FFFFFF",
          text: {
            primary: "#1A1A1A",
            secondary: "#555555",
          },
          border: "#E0E0E0",
        },
        // Dark Theme
        dark: {
          bg: "#121212",
          surface: "#1E1E1E",
          text: {
            primary: "#EAEAEA",
            secondary: "#A0A0A0",
          },
          border: "#2A2A2A",
        },
        // Arcade/Game Accent Colors
        arcade: {
          blue: "#0070F3", // PlayStation X
          green: "#00FF90", // Triangle / Go
          yellow: "#FFE600", // Arcade yellow
          red: "#FF003C", // Danger / Button A
          magenta: "#9D00FF", // Synthwave
          cyan: "#00FFFF", // Tron glow
        },
      },
      backgroundImage: {
        "gradient-power-glow": "linear-gradient(90deg, #00FFFF, #9D00FF)",
        "gradient-arcade-sunset": "linear-gradient(135deg, #FF003C, #FFE600)",
        "gradient-hero": "linear-gradient(180deg, #0070F3 0%, #121212 100%)",
      },
    },
  },
};
