"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { Skeleton } from "@/components/ui/skeleton";
import { addReactionProject } from "@/actions/add-reactions-projects";
import { addReactionBlog } from "@/actions/add-reactions-blogs";
import { getReactionType } from "./utils";

// Importez dynamiquement les composants qui utilisent lottie-react
const DynamicLottie = dynamic(() => import("lottie-react"), {
  ssr: false, // Désactive le SSR pour ce composant
  loading: () => <Skeleton className="w-10 h-10 rounded-full mx-1 my-1" />,
});

interface CardReactionItemProps {
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

export const CardReactionItem = ({
  id,
  animationData,
  count,
  width = 50,
  info,
  type,
}: CardReactionItemProps) => {
  const t = useTranslations("projects/id");
  const [showFlying, setShowFlying] = useState(false);

  const handleClick = async () => {
    setShowFlying(true);
    const timer = setTimeout(() => {
      setShowFlying(false);
    }, 100);
    const reactionType = getReactionType(info);
    if (reactionType) {
      const promise =
        type === "project"
          ? addReactionProject(id, reactionType)
          : addReactionBlog(id, reactionType);
      toast.promise(promise, {
        loading: t("reaction_adding"),
        success: (data) => {
          if (data.message === "reaction_already_exists") {
            return t("reaction_already_exists");
          }
          return t("reaction_added");
        },
        error: () => {
          return t("reaction_error");
        },
        finally: () => {
          clearTimeout(timer);
        },
      });
    }
  };

  return (
    <div
      className="relative flex flex-col justify-between items-center group"
      style={{ minHeight: `${width + 30}px` }}
    >
      <div className="absolute -bottom-7 bg-white dark:bg-slate-900 text-xs px-2 py-1 rounded border opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none ">
        {info}
      </div>
      <div onClick={handleClick}>
        <DynamicLottie
          animationData={animationData}
          loop={false}
          autoplay={false}
          style={{
            width: `${width}px`,
            height: `${width}px`,
          }}
          className="cursor-pointer hover:scale-125 transition-transform duration-200"
          rendererSettings={{
            preserveAspectRatio: "xMidYMid slice",
          }}
        />
      </div>

      <AnimatePresence>
        {showFlying && (
          <motion.div
            initial={{ opacity: 1, y: 0, scale: 1 }}
            animate={{ opacity: 0, y: -100, scale: 1.5 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 1.25 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          >
            <DynamicLottie
              animationData={animationData}
              loop={false}
              autoplay={true}
              rendererSettings={{
                preserveAspectRatio: "xMidYMid slice",
              }}
              style={{
                width: `${width * 0.8}px`,
                height: `${width * 0.8}px`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="rounded-full border font-bold min-w-7 h-7 flex items-center justify-center">
        {count}
      </div>
    </div>
  );
};
