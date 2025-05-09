"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useBreakpoint } from "@/hooks/useBreakPoint";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { HeaderLink } from "./link.header";

const Trigger = ({
  rotate,
  t,
}: {
  rotate?: boolean;
  t: (p: string) => string;
}) => (
  <div className="flex items-center rounded-full bg-accent dark:bg-slate-900/80 px-5 py-2.5 font-bold text-tertiary">
    <span className="text-sm cursor-pointer lg:cursor-default">
      {t("work")}
    </span>
    <ChevronDown
      className={`ml-0.5 text-sm ${rotate ? "-rotate-90" : ""}`}
      size={15}
    />
  </div>
);

const Dot = () => <div className="w-1 h-1 bg-accent rounded-full" />;

export const HeaderWorkMenu = () => {
  const t = useTranslations("header");
  const isLg = useBreakpoint("lg");
  if (isLg) {
    return (
      <div className="flex items-center gap-4 text-tertiary font-bold">
        <Trigger rotate t={t} />
        <div className="flex gap-4 items-center">
          <HeaderLink
            text={t("skills_tools")}
            href="/skills-tools"
            variant="tertiary"
          />
          <Dot />
          <HeaderLink
            text={t("experience")}
            href="/experience"
            variant="tertiary"
          />
          <Dot />
          <HeaderLink text={t("studio")} href="/studio" variant="tertiary" />
          <Dot />
          <HeaderLink text={t("contact")} href="/contact" variant="tertiary" />
        </div>
      </div>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full cursor-pointer">
        <Trigger t={t} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="text-tertiary font-bold group  bg-white/50 dark:bg-slate-900/50"
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <Link href="/skills-tools">
          <DropdownMenuItem className="group-hover:!text-tertiary group-hover:cursor-pointer group-active:!text-tertiary group-active:cursor-pointer dark:hover:bg-slate-800">
            {t("skills_tools")}
          </DropdownMenuItem>
        </Link>
        <Link href="/experience">
          <DropdownMenuItem className="group-hover:!text-tertiary group-hover:cursor-pointer group-active:!text-tertiary group-active:cursor-pointer dark:hover:bg-slate-800">
            {t("experience")}
          </DropdownMenuItem>
        </Link>
        <Link href="/studio">
          <DropdownMenuItem className="group-hover:!text-tertiary group-hover:cursor-pointer group-active:!text-tertiary group-active:cursor-pointer dark:hover:bg-slate-800">
            {t("studio")}
          </DropdownMenuItem>
        </Link>
        <Link href="/contact">
          <DropdownMenuItem className="group-hover:!text-tertiary group-hover:cursor-pointer group-active:!text-tertiary group-active:cursor-pointer dark:hover:bg-slate-800">
            {t("contact")}
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
