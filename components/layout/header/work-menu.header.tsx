"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useBreakpoint } from "@/hooks/useBreakPoint";
import { ChevronDown } from "lucide-react";

export type HeaderWorkMenuProps = {};

const Trigger = ({ rotate }: { rotate?: boolean }) => (
  <div className="flex items-center rounded-full bg-accent px-3.5 py-2">
    <span className="text-sm cursor-pointer lg:cursor-default">Work</span>
    <ChevronDown
      className={`ml-0.5 text-sm ${rotate ? "-rotate-90" : ""}`}
      size={15}
    />
  </div>
);

const Dot = () => <div className="w-1 h-1 bg-accent rounded-full" />;

export const HeaderWorkMenu = (props: HeaderWorkMenuProps) => {
  const isLg = useBreakpoint("lg");
  if (isLg) {
    return (
      <div className="flex items-center gap-4">
        <Trigger rotate />
        <div className="flex gap-2 items-center">
          <span className="text-sm cursor-pointer">Skills & Tools</span>
          <Dot />
          <span className="text-sm cursor-pointer">Experience</span>
          <Dot />
          <span className="text-sm cursor-pointer">Studio</span>
          <Dot />
          <span className="text-sm cursor-pointer">Contact</span>
        </div>
      </div>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full cursor-pointer">
        <Trigger />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Skills & Tools</DropdownMenuItem>
        <DropdownMenuItem>Experience</DropdownMenuItem>
        <DropdownMenuItem>Studio</DropdownMenuItem>
        <DropdownMenuItem>Contact</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
