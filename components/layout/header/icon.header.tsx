"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type IconHeaderProps = {};

export const IconHeader = (props: IconHeaderProps) => {
  const pathname = usePathname();
  return (
    <Link href="/" className="flex items-center">
      <div className="flex items-center text-xl">
        <div
          className={`${
            pathname === "/" ? "bg-primary" : "bg-transparent"
          }  border-2 sm:h-7 sm:w-7 h-8 w-8 border-primary items-center justify-center flex rounded-[10]`}
        >
          <div
            className={`
              ${pathname === "/" ? "bg-white" : "bg-primary"} 
              h-3.5 w-0.5 rotate-12 rounded-full sm:h-3 sm:w-0.5 `}
          />
        </div>
        <span className="text-slate-900 dark:text-slate-200 font-extrabold ml-1 max-sm:hidden">
          akim
        </span>
        <span className="text-primary font-extrabold max-sm:hidden">.</span>
      </div>
    </Link>
  );
};
