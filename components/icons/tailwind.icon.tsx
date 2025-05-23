"use client";

import { useCurrentTheme } from "@/hooks/useCurrentTheme";
import { useState } from "react";

const TailwindIcon = () => {
  const theme = useCurrentTheme();
  const [isHovered, setIsHovered] = useState(false);

  const colors = {
    dark: {
      default: "var(--color-slate-400)",
      hover: "#38BDF8", // bleu de tailwind
    },
    light: {
      default: "var(--color-slate-600)",
      hover: "#38BDF8", // bleu de tailwind
    },
  };

  const currentColor = isHovered
    ? colors[theme ?? "dark"].hover
    : colors[theme ?? "dark"].default;

  return (
    <svg
      width="24px"
      height="24px"
      fill="none"
      viewBox="0 0 24 24"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transition: "fill 0.2s ease-in-out", // Animation fluide
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"
        fill={currentColor}
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
};

export { TailwindIcon };
