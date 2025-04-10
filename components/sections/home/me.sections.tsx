"use client";

import { Button } from "@/components/ui/button";
import { useBreakpoint } from "@/hooks/useBreakPoint";
import { FileTextIcon } from "lucide-react";
import { motion, Variants } from "framer-motion";
import {
  ExpoIcon,
  ExpressIcon,
  FigmaIcon,
  NestIcon,
  NextIcon,
  ReactIcon,
  TailwindIcon,
  TypescriptIcon,
} from "@/components/icons";
import Link from "next/link";
import CardHome from "@/components/card/card.home";

export type HomeSectionsMeProps = {};

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

export const HomeSectionsMe = (props: HomeSectionsMeProps) => {
  const isMd = useBreakpoint("md");
  return (
    <section className="mt-20 sm:px-5 lg:p-10">
      <motion.div variants={container} initial="hidden" animate="show">
        <div className="overflow-hidden">
          <motion.div className="flex items-center" variants={item}>
            <span className="text-zinc-700 dark:text-zinc-400 text-2xl md:text-4xl">
              Hi!{" "}
            </span>
            <motion.img
              src="/waving-hand.svg"
              alt="waving-hand"
              initial={{ rotate: -30 }}
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: 2, duration: 0.5, delay: 0.1 }}
              style={{ width: isMd ? 45 : 30, height: isMd ? 45 : 30 }}
            />
          </motion.div>
        </div>

        <div className="overflow-hidden">
          <motion.div variants={item}>
            <span className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-700 dark:text-zinc-100">
              I'm{" "}
            </span>
            <span className="text-5xl md:text-7xl font-extrabold tracking-tight text-primary">
              Emane{" "}
            </span>
            <span className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-700 dark:text-zinc-100">
              Daniel ,
            </span>
          </motion.div>
        </div>

        <motion.p
          className="text-lg md:text-xl tracking-tight max-w-sm md:max-w-lg whitespace-pre-wrap"
          variants={item}
        >
          <span className="dark:opacity-60">A </span>
          <span className="opacity-100">full stack developer, </span>
          <span className="dark:opacity-60">
            passionate about IT as well as web and mobile development.
          </span>
        </motion.p>

        <motion.div className="items-center flex gap-1 mt-4" variants={item}>
          <Button
            onClick={() => console.log("get pressed")}
            size="lg"
            className="font-bold"
          >
            Get in Touch
          </Button>
          <Button variant="ghost" size="lg" className="font-bold" asChild>
            <Link
              target="_blank"
              href={"/cv_emane_daniel.pdf"}
              rel="noopener noreferrer"
            >
              <FileTextIcon />
              RESUME
            </Link>
          </Button>
        </motion.div>

        <motion.div className="lg:mt-48 mt-20 sm:mt-24" variants={item}>
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
            current stack/tools:
          </span>
          <div>
            <div className="flex gap-3 mt-2 items-center">
              <ExpressIcon />
              <NestIcon />
              <ReactIcon />
              <NextIcon />
              <ExpoIcon />
              <TypescriptIcon />
              <TailwindIcon />
              <div className="w-[0.25] h-5 rounded-full bg-slate-600 dark:bg-slate-400 mx-2" />
              <FigmaIcon />
            </div>
          </div>
        </motion.div>
        <br />
        <div className="flex max-lg:hidden lg:flex-row gap-4">
          <CardHome
            icon="star"
            title="Secure & Reliable"
            description="Prioritizing data protection, authentication, and fault tolerance to ensure safe and steady performance."
          />
          <CardHome
            icon="heart"
            title="Scalable Architecture"
            description="Designing systems that grow effortlessly—whether it’s handling 10 or 10 million requests."
          />
          <CardHome
            icon="code"
            title="High Performance"
            description="Optimized for speed and efficiency to deliver seamless experiences behind the scenes."
          />
        </div>
      </motion.div>
    </section>
  );
};
