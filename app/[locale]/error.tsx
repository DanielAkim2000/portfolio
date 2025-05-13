"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HomeIcon, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { createLogger } from "@/utils/logger";

const logger = createLogger("error-boundary");

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");

  useEffect(() => {
    logger.error("Erreur d'application détectée:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center">
      <motion.div
        className="max-w-md w-full p-8 rounded-xl bg-white/10 dark:bg-black/10 backdrop-blur-lg border border-slate-200 dark:border-slate-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center text-center">
          <motion.div
            className="relative mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2,
            }}
          >
            <div className="w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                  delay: 0.3,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-red-500"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </motion.div>
            </div>
          </motion.div>

          <motion.h2
            className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {t("title")}
          </motion.h2>

          <motion.p
            className="text-slate-600 dark:text-slate-400 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {t("description")}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button onClick={reset} variant="secondary" className="flex-1">
              <RefreshCcw className="w-4 h-4 mr-2" />
              {t("try_again")}
            </Button>

            <Button asChild variant="default" className="flex-1">
              <Link href="/">
                <HomeIcon className="w-4 h-4 mr-2" />
                {t("go_home")}
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
