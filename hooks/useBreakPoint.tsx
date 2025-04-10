"use client";

import { useState, useEffect } from "react";

// Correspondance des breakpoints de Tailwind CSS
const breakpoints: Record<string, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export function useBreakpoint(bp: keyof typeof breakpoints) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${breakpoints[bp]}px)`);

    // Met à jour l'état en fonction du match actuel
    const handleChange = () => setMatches(mediaQuery.matches);
    handleChange(); // Vérifier immédiatement au montage

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [bp]);

  return matches;
}
