import { useCurrentTheme } from "@/hooks/useCurrentTheme";
import { useState } from "react";

const NextIcon = () => {
  const theme = useCurrentTheme();
  const [isHovered, setIsHovered] = useState(false);

  const colors = {
    dark: {
      default: "var(--color-slate-400)",
      hover: "#FFFFFF", // blanc
    },
    light: {
      default: "var(--color-slate-600)",
      hover: "#000000", // noir
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
      viewBox="0 0 15 15"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transition: "fill 0.2s ease-in-out", // Animation fluide
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5C15 10.087 13.6902 12.3681 11.6975 13.7163L4.90687 4.20942C4.78053 4.03255 4.5544 3.95756 4.34741 4.02389C4.14042 4.09022 4 4.28268 4 4.50004V12H5V6.06027L10.8299 14.2221C9.82661 14.7201 8.696 15 7.5 15C3.35786 15 0 11.6421 0 7.5ZM10 10V4H11V10H10Z"
        fill={currentColor}
      />
    </svg>
  );
};

export { NextIcon };
