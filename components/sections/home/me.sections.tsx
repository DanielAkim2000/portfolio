"use client";

import { Button } from "@/components/ui/button";
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
import CardHome from "@/components/card/home/card.home";
import Image from "next/image";
import TitleBlockWrapper from "@/components/wrapper/title-block.wrapper";
import { useTranslations } from "next-intl";

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

export const HomeSectionsMe = () => {
  const t = useTranslations("home");
  return (
    <div className="w-full flex lg:justify-center">
      <TitleBlockWrapper>
        <motion.div variants={container} initial="hidden" animate="show">
          <div className="lg:flex lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="overflow-hidden mb-4">
                <motion.div className="flex items-center" variants={item}>
                  <span className="text-zinc-700 dark:text-zinc-400 text-2xl md:text-4xl">
                    {t("hi")}!{" "}
                  </span>
                  <motion.img
                    src="/waving-hand.svg"
                    alt="waving-hand"
                    initial={{ rotate: -30 }}
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: 2, duration: 0.5, delay: 0.1 }}
                    // style={{ width: isMd ? 45 : 30, height: isMd ? 45 : 30 }}
                    className="w-8 h-8 md:w-10 md:h-10"
                  />
                </motion.div>
              </div>

              <div className="overflow-hidden mb-4">
                <motion.div variants={item}>
                  <span className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-700 dark:text-zinc-100">
                    {t("i'm")}{" "}
                  </span>
                  <span className="text-5xl md:text-7xl font-extrabold tracking-tight text-primary">
                    Emane{" "}
                  </span>
                  <span className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-700 dark:text-zinc-100">
                    Daniel,
                  </span>
                </motion.div>
              </div>

              <motion.p
                className="text-lg md:text-xl tracking-tight max-w-sm md:max-w-lg whitespace-pre-wrap mb-10"
                variants={item}
              >
                <span className="dark:opacity-60">{t("a")} </span>
                <span className="opacity-100">
                  {t("full_stack_developer")},{" "}
                </span>
                <span className="dark:opacity-60">
                  {t("passionate_about_it")}
                </span>
              </motion.p>

              <motion.div
                className="items-center flex gap-1 mb-20 lg:mb-32"
                variants={item}
              >
                <Button size="lg" className="font-bold" asChild>
                  <Link href="/contact">{t("contact_me")}</Link>
                </Button>
                <Button variant="ghost" size="lg" className="font-bold" asChild>
                  <Link
                    target="_blank"
                    href={"/cv_emane_daniel.pdf"}
                    rel="noopener noreferrer"
                  >
                    <FileTextIcon />
                    {t("resume")}
                  </Link>
                </Button>
              </motion.div>

              <motion.div className="" variants={item}>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {t("current_stack_tools")}
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
            </div>
            <Image
              src="/kanekiken.png"
              alt="kanekiken"
              width={400}
              height={400}
              className="hidden lg:flex w-[400] h-[600] object-contain"
              draggable={false}
              priority
              quality={100}
            />
          </div>

          <div className="flex max-lg:hidden lg:flex-row gap-4">
            <CardHome
              icon="star"
              title={t("secure_and_reliable")}
              description={t("secure_and_reliable_description")}
            />
            <CardHome
              icon="heart"
              title={t("scalable_architecture")}
              description={t("scalable_architecture_description")}
            />
            <CardHome
              icon="code"
              title={t("high_performance")}
              description={t("high_performance_description")}
            />
          </div>
        </motion.div>
      </TitleBlockWrapper>
    </div>
  );
};
