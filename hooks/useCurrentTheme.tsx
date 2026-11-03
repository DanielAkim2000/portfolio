"use client";

import { useTheme } from "next-themes";

export function useCurrentTheme() {
  const { resolvedTheme } = useTheme();

  // resolvedTheme est undefined tant que next-themes n'a pas lu le thème côté client
  if (resolvedTheme === undefined) return null;

  return resolvedTheme === "light" ? "light" : "dark";
}
