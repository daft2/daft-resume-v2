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
      className="group relative flex items-center justify-center w-9 h-9 rounded-full border border-border text-text-tertiary hover:text-text-primary hover:border-text-tertiary transition-all duration-300"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="size-[15px]" />
      ) : (
        <Moon className="size-[15px]" />
      )}
    </button>
  );
};

export default ThemeButton;
