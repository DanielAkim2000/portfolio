"use client";

import dynamic from "next/dynamic";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { Skeleton } from "@/components/ui/skeleton";
import { shareProject } from "@/actions/share-projects";
import { shareBlog } from "@/actions/share-blog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { CopyIcon } from "lucide-react";
import copy from "copy-to-clipboard";

const INTERVAL_HOURS = 1;

const DynamicLottie = dynamic(() => import("lottie-react"), {
  ssr: false, // Désactive le SSR pour ce composant
  loading: () => <Skeleton className="w-10 h-10 rounded-full mx-1 my-1" />,
});

interface CardShareItemProps {
  id: string;
  animationData: Record<string, unknown>;
  count: number;
  isHovering: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  width?: number;
  info: string;
  type: "project" | "blog";
}

export const CardShareItem = ({
  id,
  animationData,
  count,
  isHovering,
  onMouseEnter,
  onMouseLeave,
  width = 50,
  info,
  type,
}: CardShareItemProps) => {
  const t = useTranslations("projects/id");

  const handleClick = async () => {
    const shareKey = `${type}_${id}_shared`;
    const lastShared = localStorage.getItem(shareKey);
    const now = new Date();

    let shouldIncrementShare = false;

    if (!lastShared) {
      shouldIncrementShare = true;
    } else {
      const lastSharedDate = new Date(lastShared);
      const hoursSinceLastShare =
        (now.getTime() - lastSharedDate.getTime()) / (1000 * 60 * 60);

      if (hoursSinceLastShare >= INTERVAL_HOURS) {
        shouldIncrementShare = true;
      }
    }

    if (shouldIncrementShare) {
      const promise = type === "project" ? shareProject(id) : shareBlog(id);
      toast.promise(promise, {
        loading: t("sharing"),
        success: t("shared"),
        error: t("error_sharing"),
      });
      localStorage.setItem(shareKey, `${new Date().toISOString()}`);
    } else {
      // si le projet a déjà été partagé, on met à jour la date de partage
      toast.info(t("already_shared"));
      localStorage.setItem(shareKey, `${new Date().toISOString()}`);
    }
  };

  const handleCopy = async () => {
    await copy(window.location.href);
    handleClick();
  };

  return (
    <div
      className="relative flex flex-col justify-between items-center group"
      style={{ minHeight: `${width + 30}px` }}
    >
      <div className="absolute -bottom-7 bg-white dark:bg-slate-900 text-xs px-2 py-1 rounded border opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none ">
        {info}
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger
            onClick={() => {
              setTimeout(() => {
                onMouseLeave();
              }, 100);
            }}
          >
            <DynamicLottie
              onMouseOut={onMouseLeave}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              onBlur={onMouseLeave}
              animationData={animationData}
              loop={isHovering}
              autoplay={isHovering}
              style={{
                width: `${width}px`,
                height: `${width}px`,
              }}
              className="hover:scale-125 transition-transform duration-200"
              rendererSettings={{
                preserveAspectRatio: "xMidYMid slice",
              }}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="theme-blur" side="top">
            <DropdownMenuItem
              onClick={handleCopy}
              className="dark:hover:bg-slate-800"
            >
              <CopyIcon className="w-4 h-4" />
              Copier le lien
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-full border font-bold min-w-7 h-7 flex items-center justify-center">
        {count}
      </div>
    </div>
  );
};
