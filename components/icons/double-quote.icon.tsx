"use client";

import { useCurrentTheme } from "@/hooks/useCurrentTheme";

const DoubleQuoteIcon = () => {
  const theme = useCurrentTheme();

  const colors = {
    dark: {
      default: "var(--color-slate-700)",
    },
    light: {
      default: "var(--color-slate-300)",
    },
  };

  const currentColor = colors[theme as keyof typeof colors]?.default;

  return (
    <svg
      className="w-14 h-14 md:w-28 md:h-28 lg:w-48 lg:h-48"
      fill="none"
      viewBox="0 0 32 32"
      preserveAspectRatio="xMidYMid meet"
      style={{
        transition: "fill 0.2s ease-in-out",
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path fill="none" d="M0 0h24v24H0z" />
        <path
          d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"
          fill={currentColor}
        />
      </g>
    </svg>
  );
};

export { DoubleQuoteIcon };
