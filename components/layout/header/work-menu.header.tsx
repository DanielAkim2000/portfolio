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
        <div className="flex gap-2 items-center">
          <Link href="/skills-tools">
            <span className="text-sm cursor-pointer">{t("skills_tools")}</span>
          </Link>
          <Dot />
          <Link href="/experience">
            <span className="text-sm cursor-pointer">{t("experience")}</span>
          </Link>
          <Dot />
          <Link href="/studio">
            <span className="text-sm cursor-pointer">{t("studio")}</span>
          </Link>
          <Dot />
          <Link href="/contact">
            <span className="text-sm cursor-pointer">{t("contact")}</span>
          </Link>
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
          <DropdownMenuItem className="group-hover:!text-tertiary group-hover:cursor-pointer group-active:!text-tertiary group-active:cursor-pointer">
            {t("skills_tools")}
          </DropdownMenuItem>
        </Link>
        <Link href="/experience">
          <DropdownMenuItem className="group-hover:!text-tertiary group-hover:cursor-pointer group-active:!text-tertiary group-active:cursor-pointer">
            {t("experience")}
          </DropdownMenuItem>
        </Link>
        <Link href="/studio">
          <DropdownMenuItem className="group-hover:!text-tertiary group-hover:cursor-pointer group-active:!text-tertiary group-active:cursor-pointer">
            {t("studio")}
          </DropdownMenuItem>
        </Link>
        <Link href="/contact">
          <DropdownMenuItem className="group-hover:!text-tertiary group-hover:cursor-pointer group-active:!text-tertiary group-active:cursor-pointer">
            {t("contact")}
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
