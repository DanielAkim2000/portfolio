import { useSettings } from "@/zustand/settings.store";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { toast } from "sonner";

export type FocusModeToggleProps = {};

export const FocusModeToggle = (props: FocusModeToggleProps) => {
  const { focusMode, setFocusMode } = useSettings();

  return (
    <button
      className={`flex-1 bg-secondary rounded-md p-4 flex flex-col items-start cursor-pointer ${
        focusMode ? "opacity-100" : "opacity-50"
      }`}
      onClick={() => {
        setFocusMode(!focusMode);
        toast.info(
          <span className="text-primary">
            Focus mode is now {!focusMode ? "on" : "off"}
          </span>,
          {
            description: `Focus helps reduce distractions by hiding floating components, like navigation and reactions`,
            classNames: {
              title: "text-red-500 text-sm font-semibold",
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
        <span className="text-sm">Focus: </span>
        <span className="text-sm">{focusMode ? "On" : "Off"}</span>
      </div>
    </button>
  );
};
