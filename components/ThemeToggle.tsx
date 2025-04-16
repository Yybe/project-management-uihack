"use client";

import Image from "next/image";
import { useTheme } from "./theme-provider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <Image
        src={theme === "light" ? "/assets/icons/theme-light.svg" : "/assets/icons/theme.svg"}
        alt="Theme"
        width={20}
        height={20}
      />
    </button>
  );
}
