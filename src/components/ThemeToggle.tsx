import React, { useState, useEffect } from "react";

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = "" }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Get saved theme or default to light
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const initialTheme = savedTheme || systemTheme;

    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // Only auto-switch if user hasn't manually set a preference
      if (!localStorage.getItem("theme")) {
        const newTheme = e.matches ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <button
        className={`w-12 h-6 rounded-full p-1 transition-colors ${className}`}
        style={{ backgroundColor: "var(--color-bg-alt)" }}
        aria-label="Toggle theme"
        disabled
      >
        <div
          className="w-4 h-4 rounded-full shadow-md transition-transform"
          style={{ backgroundColor: "var(--color-text)" }}
        ></div>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out
        hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2
        ${className}
      `}
      style={{
        backgroundColor:
          theme === "dark" ? "var(--color-accent)" : "var(--color-bg-alt)",
        focusRingColor: "var(--color-accent)",
      }}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      <div
        className={`
          w-4 h-4 rounded-full shadow-md transition-transform duration-300 ease-in-out
          ${theme === "dark" ? "translate-x-6" : "translate-x-0"}
        `}
        style={{ backgroundColor: "var(--color-text)" }}
      >
        {/* Sun/Moon icon */}
        <div className="flex items-center justify-center h-full">
          {theme === "dark" ? (
            // Moon icon
            <svg
              className="w-3 h-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              style={{ color: "var(--color-bg)" }}
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          ) : (
            // Sun icon
            <svg
              className="w-3 h-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              style={{ color: "var(--color-warning)" }}
            >
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;
