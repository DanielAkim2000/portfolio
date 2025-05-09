"use client";

import { motion } from "framer-motion";

const LoadingDot = ({ delay, index }: { delay: number; index: number }) => {
  return (
    <motion.div
      key={`loading-dot-${index}`}
      className="w-4 h-4 rounded-full bg-tertiary"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay,
      }}
    />
  );
};

const LoadingCircle = () => {
  return (
    <motion.div
      className="w-16 h-16 rounded-full border-4 border-tertiary/20"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <motion.div
        className="w-full h-full rounded-full border-t-4 border-tertiary"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </motion.div>
  );
};

export default function Loading() {
  return (
    <div className="min-h-[80vh] w-full flex flex-col items-center justify-center">
      <motion.div
        className="flex flex-col items-center gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <LoadingCircle />

        <div className="flex gap-3 mt-4">
          {[0, 1, 2, 3].map((i) => (
            <LoadingDot delay={i * 0.15} index={i} key={i} />
          ))}
        </div>

        <motion.p
          className="text-lg text-tertiary/80 font-medium mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Chargement en cours...
        </motion.p>
      </motion.div>
    </div>
  );
}
