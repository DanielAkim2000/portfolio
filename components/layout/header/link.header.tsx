import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { useState } from "react";

export type HeaderLinkProps = {
  text: string;
  href?: string;
  variant?: "primary" | "tertiary";
};

export const HeaderLink = ({
  text,
  href = "/",
  variant = "primary",
}: HeaderLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Définit les couleurs en fonction de la variante
  const textColor = variant === "primary" ? "text-primary" : "text-tertiary";
  const bgColor = variant === "primary" ? "bg-primary" : "bg-tertiary";

  return (
    <Link href={href}>
      <div
        className="relative flex flex-col items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className={`${textColor} text-sm font-semibold`}>{text}</span>
        <motion.div
          className={`h-[2px] ${bgColor} absolute -bottom-2 rounded-full`}
          initial={{ width: 0 }}
          animate={{
            width: isHovered ? "100%" : 0,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        />
      </div>
    </Link>
  );
};
