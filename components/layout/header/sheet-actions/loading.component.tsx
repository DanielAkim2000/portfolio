import { AnimatePresence, motion } from "framer-motion";

const DotMotion = ({
  delay,
  keyPrefix,
}: {
  delay: number;
  keyPrefix: string;
}) => {
  return (
    <motion.div
      key={keyPrefix + "dot"}
      className="rounded-full dark:bg-white bg-black w-2 h-2"
      initial={{
        y: -20,
      }}
      animate={{
        y: 0,
      }}
      exit={{
        y: 15,
      }}
      transition={{
        duration: 0.4,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror",
        delay,
      }}
    ></motion.div>
  );
};

export const ComponentLoading = () => {
  return (
    <div className="flex flex-row gap-1 mt-10 justify-end">
      <AnimatePresence mode="wait">
        <DotMotion delay={0} keyPrefix="1" key="1" />
        <DotMotion delay={0.1} keyPrefix="2" key="2" />
        <DotMotion delay={0.2} keyPrefix="3" key="3" />
        <DotMotion delay={0.3} keyPrefix="4" key="4" />
      </AnimatePresence>
    </div>
  );
};
