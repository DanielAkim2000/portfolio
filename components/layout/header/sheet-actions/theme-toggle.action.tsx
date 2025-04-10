"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MoonStarIcon, SunIcon } from "lucide-react";
import { useCurrentTheme } from "@/hooks/useCurrentTheme";
import { useTheme } from "next-themes";
import React from "react";

export default function ThemeToggle() {
  const theme = useCurrentTheme();
  const { setTheme } = useTheme();
  const isDark = theme === "dark";
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`flex-1 bg-secondary rounded-md p-4 flex flex-col items-start ${
        isDark ? "opacity-100" : "opacity-50"
      }`}
    >
      <motion.div className="relative w-6 h-6 cursor-pointer flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.span
              key="moon"
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute"
            >
              <MoonStarIcon className="w-5 h-5" />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ rotate: 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -180, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute"
            >
              <SunIcon className="w-5 h-5" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      <div className="mt-7">
        <span className="text-sm">Dark Mode: </span>
        <span className="text-sm">{theme === "light" ? "Off" : "On"}</span>
      </div>
    </button>
  );
}
