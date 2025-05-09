"use client";

import { Button } from "@/components/ui/button";
import ThemeToggle from "./theme-toggle.action";
import { FocusModeToggle } from "./focus-mode-toggle.action";
import ChangeLangue from "./change-langue";
import { ComponentLoading } from "./loading.component";
import {
  CardView,
  CardReaction,
  CardShare,
  EmptyRecentActivity,
} from "./card-actions-center";
import { X } from "lucide-react";

interface ActionPanelContentProps {
  locale: string | null;
  t: (key: string) => string;
  isXl: boolean;
  isOpen: boolean;
  isLoading: boolean;
  mergedData: any[];
  setIsOpen: (value: boolean) => void;
}

export const ActionPanelContent = ({
  locale,
  t,
  isXl,
  isOpen,
  isLoading,
  mergedData,
  setIsOpen,
}: ActionPanelContentProps) => {
  // Utilisation d'une valeur par défaut si locale est null
  const safeLocale = locale || "en";

  return (
    <>
      <Button
        size={"icon"}
        variant={"secondary"}
        className="absolute top-3 right-4 z-10 theme-blur"
        onClick={() => setIsOpen(false)}
      >
        <X className="h-4 w-4 text-muted-foreground" />
      </Button>

      {/* Contenu principal - à droite */}
      <div className="w-full sm:w-[400px] h-full flex flex-col pt-20 px-4 relative ml-auto">
        <h2 className="text-start text-2xl font-semibold mb-4">
          {t("action_center")}
        </h2>
        <div className="w-full flex gap-2">
          <ThemeToggle />
          <FocusModeToggle isOpen={isOpen} />
        </div>
        <div className="flex justify-end mt-4">
          <ChangeLangue />
        </div>
        <div className="my-2">
          <span className="text-xl font-bold text-black dark:text-white">
            {safeLocale === "fr" ? "Activité récente" : "Recent Activity"}
          </span>
        </div>

        {/* Container scrollable */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="flex flex-col gap-2">
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
                          locale={safeLocale}
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
                          locale={safeLocale}
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
                          locale={safeLocale}
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
      </div>
    </>
  );
};
