"use client";

import { useEffect, useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { useSettings } from "@/zustand/settings.store";
import { cn } from "@/lib/utils";

type StickySidebarProps = {
  variant: "primary" | "tertiary";
  sections: { id: string; title: string; isTitle?: boolean }[];
};

const SpanClassNameDynamic = {
  primary: "text-primary/80",
  tertiary: "text-tertiary/80",
};

const SpanHoverSectionClassNameDynamic = {
  primary: "hover:text-primary",
  tertiary: "hover:text-tertiary",
};

const SpanVisibleSectionClassNameDynamic = {
  primary: "bg-primary/5 dark:bg-primary/15 text-primary/70",
  tertiary: "bg-tertiary/5 dark:bg-tertiary/15 text-tertiary/70",
};

const StickySidebar = ({ sections, variant }: StickySidebarProps) => {
  const settings = useSettings();
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [visibleSections, setVisibleSections] = useState<
    Record<string, boolean>
  >({});
  const [isSticky, setIsSticky] = useState(false);

  const handleVisibilityChange = (id: string, isVisible: boolean) => {
    setVisibleSections((prev) => ({
      ...prev,
      [id]: isVisible,
    }));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!settings.focusMode) setIsSticky(!entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );
    const currentSentinelRef = sentinelRef.current;
    if (currentSentinelRef && !settings.focusMode) {
      observer.observe(currentSentinelRef);
    }

    return () => {
      if (currentSentinelRef) {
        observer.unobserve(currentSentinelRef);
      }
    };
  }, [sentinelRef, settings.focusMode]);

  useEffect(() => {
    const sectionElements = sections.map((section) =>
      document.getElementById(section.id)
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!settings.focusMode) {
            handleVisibilityChange(entry.target.id, entry.isIntersecting);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    sectionElements?.forEach((element) => {
      if (element && !settings.focusMode) {
        observer.observe(element);
      }
    });

    return () => {
      sectionElements?.forEach((element) => {
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [sections, settings.focusMode]);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="hidden lg:block lg:w-1/3">
      <div ref={sentinelRef} className="h-1" />
      <div
        className={`flex rounded-lg h-fit min-w-72 bg-white/50 dark:bg-slate-900/50 border flex-col ${
          settings.focusMode ? "" : "sticky top-28"
        }`}
      >
        <div className="p-5 font-bold text-lg flex flex-row items-center justify-between">
          <span>Contents</span>
          {isSticky ? (
            <span
              className={cn(
                SpanClassNameDynamic[variant],
                ` border rounded-full px-2 text-sm cursor-pointer`
              )}
              onClick={handleScrollToTop}
            >
              scroll to top
            </span>
          ) : null}
        </div>
        <Separator />
        <div className="flex flex-col my-5 text-slate-600 dark:text-slate-400">
          {sections.map((section) => (
            <span
              key={section.id}
              onClick={() => handleScrollTo(section.id)}
              className={cn(
                SpanHoverSectionClassNameDynamic[variant],
                `px-5 hover:cursor-pointer py-2.5 `,
                `${section.isTitle ? "font-bold text-foreground" : "pl-10"}`,
                `${
                  visibleSections[section.id]
                    ? SpanVisibleSectionClassNameDynamic[variant]
                    : ""
                }`
              )}
            >
              {section.title}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StickySidebar;
