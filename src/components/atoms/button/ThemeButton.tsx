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
      document.documentElement.setAttribute("data-theme", stored);
      document.documentElement.classList.toggle("dark", stored === "dark");
    }
  }, []);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg border border-border text-text-secondary hover:text-text-primary hover:border-accent/30 hover:bg-accent-subtle transition-all duration-200"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
    </button>
  );
};

export default ThemeButton;
