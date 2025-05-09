"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center">
      <motion.div
        className="max-w-md w-full p-8 rounded-xl bg-white/10 dark:bg-black/10 backdrop-blur-lg border border-slate-200 dark:border-slate-800 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center">
          {/* Animation 404 */}
          <motion.div
            className="relative mb-8 flex justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <motion.div
              className="flex items-center justify-center text-8xl font-extrabold"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 10,
              }}
            >
              <motion.span
                className="text-primary"
                initial={{ rotateY: 90 }}
                animate={{ rotateY: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                4
              </motion.span>
              <motion.div
                className="mx-2 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{
                  scale: [0, 1.2, 1],
                  rotate: [0, 20, 0],
                }}
                transition={{
                  delay: 0.4,
                  duration: 0.8,
                  times: [0, 0.6, 1],
                }}
              >
                <motion.div
                  className="w-12 h-12 rounded-full bg-primary"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                />
              </motion.div>
              <motion.span
                className="text-primary"
                initial={{ rotateY: 90 }}
                animate={{ rotateY: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                4
              </motion.span>
            </motion.div>
          </motion.div>

          <motion.h2
            className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Page not found
          </motion.h2>

          <motion.p
            className="text-slate-600 dark:text-slate-400 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            The page you are looking for does not exist.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button asChild variant="default" className="px-6" size="lg">
              <Link href="/">
                <HomeIcon className="w-4 h-4 mr-2" />
                Go back to home
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
