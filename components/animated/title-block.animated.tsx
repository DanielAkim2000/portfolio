"use client";
import { motion, Variants } from "framer-motion";

export type AnimatedTitleBlockProps = {
  title: string;
  subtitle: string;
};

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1, // délai entre les enfants
    },
  },
};
const item: Variants = {
  hidden: { x: -30, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.1,
      ease: "linear",
      type: "spring",
      damping: 20,
      bounce: 0,
      stiffness: 300,
    },
  },
};

export const AnimatedTitleBlock = (props: AnimatedTitleBlockProps) => {
  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <motion.h1
        className="text-[2.5rem] font-extrabold leading-tight text-slate-700 md:text-7xl md:leading-snug dark:text-slate-300"
        variants={item}
      >
        {props.title}
      </motion.h1>
      <motion.p
        className="mt-4 text-lg text-slate-600 md:mt-6 md:text-2xl lg:max-w-[500px] xl:max-w-[700px] dark:text-slate-400"
        variants={item}
      >
        {props.subtitle}
      </motion.p>
    </motion.div>
  );
};
