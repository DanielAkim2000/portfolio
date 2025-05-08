"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { useCurrentTheme } from "@/hooks/useCurrentTheme";
import ThemeToggle from "./theme-toggle.action";
import { FocusModeToggle } from "./focus-mode-toggle.action";
import { useLocale, useTranslations } from "next-intl";
import ChangeLangue from "./change-langue";
import { useEffect, useState, useReducer, useMemo } from "react";
import {
  CardView,
  CardReaction,
  CardShare,
  EmptyRecentActivity,
} from "@/components/layout/header/sheet-actions/card-actions-center";
import {
  useActionCenterData,
  ActionCenterState,
  Action,
} from "@/hooks/actions-center/useActonCenterData";
import { ComponentLoading } from "./loading.component";
import {
  addOtherDataToFetchViewsData,
  addOtherDataToFetchShareData,
  filterReactionsDataIn24h,
  mergeData,
} from "@/utils/action-center";
import { X } from "lucide-react";

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

// reducer pour la gestion des états
const reducer = (
  state: ActionCenterState,
  action: Action
): ActionCenterState => {
  switch (action.type) {
    case "SET_REACTION_DATA":
      console.log("[HeaderSheet] SET_REACTION_DATA", action.payload);
      return { ...state, reactionData: action.payload };
    case "SET_SHARE_DATA":
      console.log("[HeaderSheet] SET_SHARE_DATA", action.payload);
      return { ...state, shareData: action.payload };
    case "SET_REACTIONS":
      console.log("[HeaderSheet] SET_REACTIONS", action.payload);
      return { ...state, reactions: action.payload };
    default:
      return state;
  }
};

export const HeaderSheet = () => {
  const { reactions, sharesOrViews, isLoading, mutate } = useActionCenterData({
    enabled: true,
  });
  const [state, dispatch] = useReducer(reducer, {
    reactionData: undefined,
    shareData: undefined,
    reactions: undefined,
  });
  const locale = useLocale();
  const theme = useCurrentTheme();
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("header");

  const mergedData = useMemo(() => {
    if (!state.reactions || !state.shareData || !state.reactionData) {
      return [];
    }

    const result = mergeData(
      state.reactions,
      state.shareData,
      state.reactionData
    );

    return result;
  }, [state.reactions, state.shareData, state.reactionData]);

  useEffect(() => {
    if (isOpen) {
      mutate();
    }
  }, [isOpen, mutate]);

  // Mise à jour de l'état avec les données récupérées
  useEffect(() => {
    if (sharesOrViews) {
      // Traitement des vues
      const viewsData = addOtherDataToFetchViewsData(sharesOrViews);

      dispatch({
        type: "SET_REACTION_DATA",
        payload: viewsData,
      });

      const shareData = addOtherDataToFetchShareData(sharesOrViews);

      dispatch({
        type: "SET_SHARE_DATA",
        payload: shareData,
      });
    }

    if (reactions) {
      const filteredReactions = filterReactionsDataIn24h(reactions);

      dispatch({
        type: "SET_REACTIONS",
        payload: filteredReactions,
      });
    }
  }, [reactions, sharesOrViews, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center">
          <Button
            size={"icon"}
            variant={"secondary"}
            className="bg-accent dark:bg-slate-950/90"
          >
            <LayoutIcon
              color={theme === "light" ? "#000" : "#FFF"}
              width={24}
            />
          </Button>
        </div>
      </DialogTrigger>

      <DialogContent
        aria-describedby="action-center"
        aria-controls="action-center"
        aria-expanded={isOpen}
        className="min-w-full max-h-screen h-full pt-20  px-4 flex flex-row bg-slate-100/90 dark:bg-background/90 rounded-none border-0"
      >
        <DialogClose asChild>
          <Button
            size={"icon"}
            variant={"secondary"}
            className="absolute top-3 right-4 z-10 theme-blur"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </Button>
        </DialogClose>
        <div className="sm:w-[320px] ml-auto w-full h-full flex flex-col">
          <DialogTitle className="text-start text-2xl font-semibold mb-4">
            {t("action_center")}
          </DialogTitle>
          <div className="w-full flex gap-2">
            <ThemeToggle />
            <FocusModeToggle />
          </div>
          <div className="flex justify-end mt-4">
            <ChangeLangue />
          </div>
          <div className="my-2">
            <span className="text-xl font-bold text-black dark:text-white">
              Recently Activity
            </span>
          </div>
          <div className="flex flex-col gap-2 overflow-y-scroll overflow-hidden flex-1 scrollbar-hide">
            {isLoading ? (
              <ComponentLoading />
            ) : (
              <>
                {mergedData.length > 0 ? (
                  mergedData.map((data) => {
                    console.log(
                      "[HeaderSheet] Rendu item:",
                      data.typeData,
                      data.id
                    );

                    if (data.typeData === "reaction") {
                      return (
                        <CardReaction
                          key={`reaction-${data.id}`}
                          data={data}
                          locale={locale}
                          id={data.id || ""}
                          close={() => setIsOpen(false)}
                        />
                      );
                    }
                    if (
                      data.typeData === "shareOrView" ||
                      data.typeData === "share"
                    ) {
                      return (
                        <CardShare
                          key={`share-${data.id}`}
                          data={data}
                          locale={locale}
                          id={data.id || ""}
                          close={() => setIsOpen(false)}
                        />
                      );
                    }
                    if (data.typeData === "view") {
                      return (
                        <CardView
                          key={`view-${data.id}`}
                          data={data}
                          locale={locale}
                          id={data.id || ""}
                          close={() => setIsOpen(false)}
                        />
                      );
                    }
                    return null;
                  })
                ) : (
                  <EmptyRecentActivity />
                )}
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
