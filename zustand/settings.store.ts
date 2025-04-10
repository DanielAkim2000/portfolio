import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";

interface SettingsState {
  focusMode: boolean;
  setFocusMode: (focusMode: boolean) => void;
}

const useSettingsStore = create<SettingsState>()(
  devtools(
    persist(
      (set) => ({
        focusMode: false,
        setFocusMode: (focusMode) => set({ focusMode }),
      }),
      {
        name: "settings-storage",
        storage: createJSONStorage(() => sessionStorage),
      }
    ),
    { name: "settings-store" }
  )
);

export const useSettings = () => {
  const { focusMode, setFocusMode } = useSettingsStore();
  return { focusMode, setFocusMode };
};
