"use client";

import { useSettings } from "@/zustand/settings.store";
import { IconHeader } from "./icon.header";
import { HeaderLink } from "./link.header";
import { HeaderSheet } from "./sheet-actions";
import { HeaderWorkMenu } from "./work-menu.header";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import ChangeLangueDropdown from "./change-langue-dropdown";

const Header = () => {
  const { focusMode } = useSettings();
  const t = useTranslations("header");

  const [isSticky, setIsSticky] = useState(false);
  const sentinelRef = useRef(null);

  /**
   * Créer un IntersectionObserver qui observe l’élément sentinelRef (juste avant le header).

      Quand sentinelRef quitte l’écran (entry.isIntersecting === false), setIsSticky(true), donc le header devient sticky.

      Quand sentinelRef est visible (entry.isIntersecting === true), setIsSticky(false), donc le header redevient normal.

      Ajoute et retire l'observation au montage/démontage du composant.

      📌 Pourquoi threshold: 0.1 ?

      Cela signifie que 10% de l’élément doit être visible avant qu’il soit considéré comme "intersecté".

      Si on mettait 0, il déclencherait trop tôt.
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    const currentSentinelRef = sentinelRef.current;
    if (currentSentinelRef) {
      observer.observe(currentSentinelRef);
    }

    return () => {
      if (currentSentinelRef) {
        observer.unobserve(currentSentinelRef);
      }
    };
  }, []);
  return (
    <>
      <div
        ref={sentinelRef}
        className={`w-full pt-2  bg-white dark:bg-black `}
      />
      <nav
        className={`py-4 px-4 pt-4 flex items-center ${
          !focusMode && "sticky top-0 z-50"
        }  ${
          isSticky && !focusMode
            ? "border-b bg-white/70 dark:bg-slate-900/80"
            : "bg-white dark:bg-black"
        }`}
        style={{
          backdropFilter: isSticky && !focusMode ? "blur(10px)" : "none",
        }}
      >
        <div className="max-w-[120rem] w-full mx-auto flex justify-between items-center">
          <ul className={`flex items-center gap-4 `}>
            <li>
              <IconHeader />
            </li>
            <li>
              <HeaderLink text={t("projects")} href="/projects" />
            </li>
            <li>
              <HeaderLink text={t("blog")} href="/blog" />
            </li>
            <li>
              <HeaderLink text={t("til")} href="/til" />
            </li>
            <li>
              <HeaderWorkMenu />
            </li>
          </ul>
          <div className="flex items-center gap-2">
            <ChangeLangueDropdown />
            <HeaderSheet />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
