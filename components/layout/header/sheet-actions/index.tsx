"use client";

import { useEffect, useState, useReducer, useMemo } from "react";
import { useActionCenterData } from "@/hooks/actions-center/useActonCenterData";
import { useCurrentTheme } from "@/hooks/useCurrentTheme";
import { useLocale, useTranslations } from "next-intl";
import { useBreakpoint } from "@/hooks/useBreakPoint";
import { useSettings } from "@/zustand/settings.store";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

// Composants extraits
import { ActionButton } from "./action-button";
import { KeyboardShortcutsSection } from "./keyboard-shortcuts-section";
import { ActionPanelContent } from "./action-panel-content";
import { reducer } from "./reducer";

// Utils
import {
  addOtherDataToFetchViewsData,
  addOtherDataToFetchShareData,
  filterReactionsDataIn24h,
  mergeData,
} from "@/utils/action-center";

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
  const { setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("header");
  const isXl = useBreakpoint("xl");
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  // accès à l'état du focus mode pour le raccourci clavier
  const { focusMode, setFocusMode } = useSettings();

  // fonction pour basculer le thème
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // fonction pour basculer le mode focus
  const toggleFocusMode = () => {
    setFocusMode(!focusMode);
    toast.info(
      <span className="text-primary">
        Focus mode is now {!focusMode ? "on" : "off"}
      </span>,
      {
        description: t("focus_mode_description"),
        classNames: {
          title: "text-sm font-semibold",
          icon: "self-start",
        },
        position: isOpen ? "top-center" : "top-right",
      }
    );
  };

  const mergedData = useMemo(() => {
    if (!state.reactions || !state.shareData || !state.reactionData) {
      return [];
    }

    return mergeData(state.reactions, state.shareData, state.reactionData);
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
      dispatch({ type: "SET_REACTION_DATA", payload: viewsData });

      const shareData = addOtherDataToFetchShareData(sharesOrViews);
      dispatch({ type: "SET_SHARE_DATA", payload: shareData });
    }

    if (reactions) {
      const filteredReactions = filterReactionsDataIn24h(reactions);
      dispatch({ type: "SET_REACTIONS", payload: filteredReactions });
    }
  }, [reactions, sharesOrViews, isOpen]);

  // Empêcher le scroll du body quand le panneau est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Initialisation du portail
  useEffect(() => {
    setPortalElement(document.body);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Q pour ouvrir/fermer le panneau
      if (e.key.toLowerCase() === "q") {
        setIsOpen((prev) => !prev);
      }

      // D pour basculer le thème
      if (e.key.toLowerCase() === "d") {
        toggleTheme();
      }

      // F pour basculer le mode focus
      if (e.key.toLowerCase() === "f") {
        toggleFocusMode();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, toggleFocusMode]);

  return (
    <>
      <ActionButton
        theme={theme}
        isXl={isXl}
        locale={locale}
        setIsOpen={setIsOpen}
      />

      {portalElement &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Overlay/backdrop */}
                <motion.div
                  key="overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 w-full h-screen"
                  onClick={() => setIsOpen(false)}
                />

                {/* Panel du centre d'actions - prend toute la largeur en xl */}
                <motion.div
                  key="actionPanel"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="fixed xl:left-0 right-0 top-0 bottom-0 min-w-full w-full h-[100dvh] flex flex-col xl:flex-row bg-slate-100/90 dark:bg-background/90 z-50 overflow-hidden"
                  aria-describedby="action-center"
                  aria-controls="action-center"
                  aria-expanded={isOpen}
                >
                  {isXl && <KeyboardShortcutsSection locale={locale} />}

                  <ActionPanelContent
                    locale={locale}
                    t={t}
                    isXl={isXl}
                    isOpen={isOpen}
                    isLoading={isLoading}
                    mergedData={mergedData}
                    setIsOpen={setIsOpen}
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          portalElement
        )}
    </>
  );
};
