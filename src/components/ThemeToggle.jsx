import { useState, useEffect } from "react";
import { flushSync } from "react-dom";
import { Sun, Moon } from "lucide-react";

function currentTheme() {
  if (typeof document !== "undefined") {
    const t = document.documentElement.getAttribute("data-theme");
    if (t === "light" || t === "dark") return t;
  }
  return "light";
}

/* Light / dark toggle. The initial theme is resolved before paint by a
   small script in index.html (stored choice → light). Light is the default
   for any visitor who hasn't picked a theme; this button flips it (and
   cross-fades via the View Transitions API). */
export default function ThemeToggle() {
  const [theme, setTheme] = useState(currentTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", theme === "light" ? "#FAFAFB" : "#08080B");
    }
  }, [theme]);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("theme", next);
    } catch (e) {
      /* storage unavailable — the toggle still works for this session */
    }
    const apply = () => {
      document.documentElement.setAttribute("data-theme", next);
      setTheme(next);
    };
    if (document.startViewTransition) {
      document.startViewTransition(() => flushSync(apply));
    } else {
      apply();
    }
  };

  const isDark = theme === "dark";
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";
  return (
    <button
      type="button"
      className="arc-theme-toggle"
      onClick={toggle}
      aria-label={label}
      title={label}
    >
      {isDark ? (
        <Sun size={17} strokeWidth={2.2} />
      ) : (
        <Moon size={17} strokeWidth={2.2} />
      )}
    </button>
  );
}
