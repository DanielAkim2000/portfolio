import React from "react";

type StickyBarWrapperProps = {
  children: React.ReactNode;
};

export const StickyBarWrapper = ({ children }: StickyBarWrapperProps) => {
  return (
    <div className="flex flex-row lg:gap-10 text-slate-600 dark:text-slate-400 relative">
      {children}
    </div>
  );
};
