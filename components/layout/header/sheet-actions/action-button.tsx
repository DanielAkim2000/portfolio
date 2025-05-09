"use client";

import { Button } from "@/components/ui/button";
import { LayoutIcon } from "./layout-icon";

interface ActionButtonProps {
  theme: string | null;
  isXl: boolean;
  locale: string | null;
  setIsOpen: (value: boolean) => void;
}

export const ActionButton = ({
  theme,
  isXl,
  locale,
  setIsOpen,
}: ActionButtonProps) => {
  const safeLocale = locale || "en";

  return (
    <div className="flex items-center">
      <Button
        size={isXl ? "default" : "icon"}
        variant={"secondary"}
        className="bg-accent dark:bg-slate-950/90 flex items-center gap-2"
        onClick={() => setIsOpen(true)}
      >
        <LayoutIcon color={theme === "light" ? "#000" : "#FFF"} width={24} />
        {isXl && (
          <span className="hidden xl:flex items-center gap-1">
            {safeLocale === "fr" ? "Ouvrir " : "Open "}
            <span className="font-mono bg-slate-200 dark:bg-slate-700 px-1.5 rounded text-xs font-bold min-w-4 text-center ml-1">
              Q
            </span>
          </span>
        )}
      </Button>
    </div>
  );
};
