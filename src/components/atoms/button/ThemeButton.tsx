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
      className="dark:bg-light-bg bg-dark-bg dark:text-light-text-primary text-dark-text-primary fixed bottom-4 right-4 p-2 rounded-full shadow-lg transition-colors duration-300 hover:bg-opacity-80"
    >
      {theme === "dark" ? (
        <Sun className="size-6" />
      ) : (
        <Moon className="size-6" />
      )}
    </button>
  );
};

export default ThemeButton;
