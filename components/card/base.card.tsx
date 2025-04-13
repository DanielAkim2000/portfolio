"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { ChevronRightIcon } from "lucide-react";

export type DevopsCardProps = {
  index: number;
  title: string;
  description: string;
  isClicked: boolean;
  setIsClicked: (index: number) => void;
  link?: string;
  icon?: React.ReactNode;
};

interface HandleClickParams {
  index: number;
  setIsClicked: React.Dispatch<React.SetStateAction<boolean[]>>;
  isClicked: boolean[];
}

export const handleClick = ({
  index,
  setIsClicked,
  isClicked,
}: HandleClickParams): void => {
  if (isClicked[index]) {
    return;
  }
  setIsClicked((prevState) => prevState.map((clicked, i) => i === index));
};

export const BaseCard = (props: DevopsCardProps) => {
  return (
    <div
      className={`w-full border-2 p-4 flex flex-row gap-2 items-center rounded-lg bg-white dark:bg-slate-900 transition ease-in-out duration-200 ${
        props.isClicked ? "border-primary" : ""
      }`}
    >
      <div className="hidden xl:flex w-20 items-center justify-center">
        {props.icon ? (
          <>{props.icon}</>
        ) : (
          <span
            className={`text-start font-extrabold text-6xl transition ease-in-out duration-200 ${
              props.isClicked
                ? "text-primary"
                : "text-slate-400 dark:text-slate-600"
            }`}
          >
            {props.index + 1}
          </span>
        )}
      </div>
      <button
        type="button"
        onClick={() => props.setIsClicked(props.index)}
        className="items-start flex flex-col"
      >
        <p
          className={`${
            props.isClicked ? "text-primary" : ""
          } font-bold mb-1 text-start`}
        >
          {props.title}
        </p>
        <p className="text-sm text-slate-600 text-start dark:text-slate-400">
          {props.description}
        </p>
        {props?.link && (
          <Button
            asChild
            variant="outline"
            onClick={(e) => e.stopPropagation()}
            className="rounded-full bg-transparent border-0 text-primary font-bold hover:bg-primary/15 hover:text-primary dark:bg-transparent dark:hover:bg-primary/15 dark:hover:text-primary shadow-none transition ease-in-out duration-200"
          >
            <Link href={props.link} className="rounded-full mt-4">
              Learn More
              <ChevronRightIcon className="ml-2 h-4 w-4 text-primary" />
            </Link>
          </Button>
        )}
      </button>
    </div>
  );
};
