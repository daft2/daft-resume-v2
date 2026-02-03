import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeButton = () => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    return (
      (document.documentElement.getAttribute("data-theme") as
        | "light"
        | "dark") || "light"
    );
  });

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      document.documentElement.classList.toggle("dark", stored === "dark");
    }
  }, []);

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-4 right-4 p-2.5 rounded-sm border-2 transition-all duration-300 z-50
        dark:bg-dark-surface bg-light-surface
        dark:border-arcade-cyan/30 border-light-border
        dark:text-arcade-cyan text-light-text-primary
        hover:shadow-glow-cyan dark:hover:border-arcade-cyan/60
        hover:scale-105 active:scale-95"
    >
      {theme === "dark" ? (
        <Sun className="size-5" />
      ) : (
        <Moon className="size-5" />
      )}
    </button>
  );
};

export default ThemeButton;
