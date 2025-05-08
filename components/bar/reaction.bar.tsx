"use client";

import clapAnimation from "@/public/lottie/clap.json";
import hmmAnimation from "@/public/lottie/hmm.json";
import wowAnimation from "@/public/lottie/wow.json";
import shareAnimation from "@/public/lottie/share.json";
import shareWhiteAnimation from "@/public/lottie/share-white.json";
import { useCallback, useState } from "react";
import { AreaChartIcon } from "lucide-react";
import { useCurrentTheme } from "@/hooks/useCurrentTheme";
import { useSettings } from "@/zustand/settings.store";
import { cn } from "@/lib/utils";
import { Reaction, ReactionType } from "@/prisma/generated";
import {
  CardReactionItem,
  CardShareItem,
  getReactionCount,
} from "@/components/card/reactions";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const ReactionBar = ({
  id,
  data,
  nbShares,
  nbViews,
  type,
}: {
  id: string;
  data: Reaction[];
  nbShares: number;
  nbViews: number;
  type: "project" | "blog";
}) => {
  const theme = useCurrentTheme();
  const settings = useSettings();
  const [isHovering, setIsHovering] = useState<Record<string, boolean>>({
    clap: false,
    wow: false,
    hmm: false,
    share: false,
  });

  const handleMouseEnter = useCallback(
    (reaction: string) => {
      setIsHovering((prev) => ({ ...prev, [reaction]: true }));
    },
    [setIsHovering]
  );

  const handleMouseLeave = useCallback(
    (reaction: string) => {
      setIsHovering((prev) => ({ ...prev, [reaction]: false }));
    },
    [setIsHovering]
  );

  const countReactionsClap = getReactionCount(data, ReactionType.CLAPPING);
  const countReactionsWow = getReactionCount(data, ReactionType.AMAZED);
  const countReactionsHmm = getReactionCount(data, ReactionType.THINKING);

  return (
    <div
      className={cn(
        `${settings.focusMode ? "" : "sticky bottom-10"}`,
        "rounded-lg p-4 border w-fit mx-auto text-foreground theme-blur"
      )}
    >
      <div className="flex flex-row gap-2 h-full">
        <CardReactionItem
          id={id}
          animationData={clapAnimation}
          count={countReactionsClap}
          isHovering={isHovering.clap}
          onMouseEnter={() => handleMouseEnter("clap")}
          onMouseLeave={() => handleMouseLeave("clap")}
          info="CLAPPING"
          type={type}
        />
        <CardReactionItem
          id={id}
          animationData={wowAnimation}
          count={countReactionsWow}
          isHovering={isHovering.wow}
          onMouseEnter={() => handleMouseEnter("wow")}
          onMouseLeave={() => handleMouseLeave("wow")}
          info="AMAZED"
          type={type}
        />
        <CardReactionItem
          id={id}
          animationData={hmmAnimation}
          count={countReactionsHmm}
          isHovering={isHovering.hmm}
          onMouseEnter={() => handleMouseEnter("hmm")}
          onMouseLeave={() => handleMouseLeave("hmm")}
          info="THINKING"
          type={type}
        />
        <Popover>
          <div className="ml-10 sm:ml-20">
            <div className="p-2">
              <PopoverTrigger>
                <AreaChartIcon className="w-7 h-7 cursor-pointer hover:scale-125 transition-transform duration-200" />
              </PopoverTrigger>
              <PopoverContent side="top" align="center" className="theme-blur">
                <div className="flex flex-col gap-4 justify-center items-center font-semibold text-md">
                  <span className="text-xl">Insight</span>
                  <div className="flex flex-row gap-2 justify-between items-center w-full">
                    <div className="flex flex-col gap-2 items-center">
                      <span>Views</span>
                      <span className="text-xl font-normal">{nbViews}</span>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                      <span>Shares</span>
                      <span className="text-xl font-normal">{nbShares}</span>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                      <span>Reactions</span>
                      <span className="text-xl font-normal">
                        {countReactionsClap +
                          countReactionsWow +
                          countReactionsHmm}
                      </span>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </div>
          </div>
        </Popover>
        <CardShareItem
          id={id}
          animationData={
            theme === "dark" ? shareWhiteAnimation : shareAnimation
          }
          count={nbShares}
          isHovering={isHovering.share}
          width={35}
          onMouseEnter={() => handleMouseEnter("share")}
          onMouseLeave={() => handleMouseLeave("share")}
          info="Share"
          type={type}
        />
      </div>
    </div>
  );
};

export default ReactionBar;
