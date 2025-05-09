"use client";

import { Keyboard } from "lucide-react";
import { KeyboardShortcut } from "./keyboard-shortcut";

interface KeyboardShortcutsSectionProps {
  locale: string | null;
}

export const KeyboardShortcutsSection = ({
  locale,
}: KeyboardShortcutsSectionProps) => {
  const safeLocale = locale || "en";

  return (
    <div className="hidden xl:flex flex-col justify-center xl:w-1/3 h-full px-8 bg-slate-200/50 dark:bg-slate-800/30 border-r border-slate-300 dark:border-slate-700">
      <div className="flex gap-2 items-center mb-6">
        <Keyboard size={36} className="text-slate-600 dark:text-slate-300" />
        <span className="font-semibold text-slate-700 dark:text-slate-200 text-2xl">
          {safeLocale === "fr" ? "Raccourcis clavier" : "Keyboard shortcuts"}
        </span>
      </div>
      <div className="flex flex-col gap-4">
        <KeyboardShortcut
          keyChar="Q"
          description={
            safeLocale === "fr"
              ? "Ouvrir/fermer ce panneau"
              : "Open/close this panel"
          }
        />
        <KeyboardShortcut
          keyChar="D"
          description={
            safeLocale === "fr"
              ? "Basculer thème clair/sombre"
              : "Toggle light/dark theme"
          }
        />
        <KeyboardShortcut
          keyChar="F"
          description={
            safeLocale === "fr"
              ? "Activer/désactiver le mode focus"
              : "Toggle focus mode"
          }
        />
      </div>
    </div>
  );
};
