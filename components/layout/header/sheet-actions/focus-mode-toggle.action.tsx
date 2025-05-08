import { useSettings } from "@/zustand/settings.store";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export const FocusModeToggle = () => {
  const t = useTranslations("header");
  const { focusMode, setFocusMode } = useSettings();

  return (
    <button
      className={`flex-1 theme-blur rounded-md p-4 flex flex-col items-start cursor-pointer ${
        focusMode ? "opacity-100" : "opacity-50"
      }`}
      onClick={() => {
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
          }
        );
      }}
    >
      {focusMode ? (
        <EyeIcon className="w-6 h-6" />
      ) : (
        <EyeOffIcon className="w-6 h-6" />
      )}
      <div className="mt-7">
        <span className="text-sm">{t("focus")}: </span>
        <span className="text-sm">{focusMode ? t("on") : t("off")}</span>
      </div>
    </button>
  );
};
