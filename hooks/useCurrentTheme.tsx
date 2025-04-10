"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export function useCurrentTheme() {
  const { resolvedTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<"dark" | "light" | null>(
    null
  );

  useEffect(() => {
    // Vérifie si le thème est défini
    setCurrentTheme(
      resolvedTheme === "dark" || resolvedTheme === "light"
        ? resolvedTheme
        : "dark"
    );
  }, [resolvedTheme]);

  return currentTheme;
}
