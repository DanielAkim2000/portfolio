"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCurrentTheme } from "@/hooks/useCurrentTheme";
import ThemeToggle from "./theme-toggle.action";
import { FocusModeToggle } from "./focus-mode-toggle.action";

export type HeaderSheetProps = {};

interface LayoutIconProps {
  color: string;
  width: number;
}

const LayoutIcon = ({ color, width }: LayoutIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={width}
      viewBox="0 0 24 24"
      fill={color}
      stroke={color}
    >
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  );
};

export const HeaderSheet = (props: HeaderSheetProps) => {
  const theme = useCurrentTheme();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center">
          <Button size={"icon"} variant={"secondary"}>
            <LayoutIcon
              color={theme === "light" ? "#000" : "#FFF"}
              width={24}
            />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="min-w-full min-h-full pt-14 px-4 flex flex-row opacity-90 rounded-none border-0">
        <div className="sm:w-80 ml-auto w-full">
          <DialogTitle className="text-start text-2xl font-semibold mb-4">
            Action Center
          </DialogTitle>
          <div className="w-full flex gap-2">
            <ThemeToggle />
            <FocusModeToggle />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
