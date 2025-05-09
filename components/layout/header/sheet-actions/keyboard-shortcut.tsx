interface KeyboardShortcutProps {
  keyChar: string;
  description: string;
}

export const KeyboardShortcut = ({
  keyChar,
  description,
}: KeyboardShortcutProps) => (
  <div className="flex items-center gap-2">
    <div className="font-mono bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded text-md font-bold min-w-6 text-center">
      {keyChar}
    </div>
    <span className="text-md text-slate-600 dark:text-slate-300">
      {description}
    </span>
  </div>
);
