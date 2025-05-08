"use client";

import { useMDXComponents } from "@/mdx-components";
import { useSettings } from "@/zustand/settings.store";
import { CodeBlock } from "../../code-block/code-block.component";
import { MDXClient } from "next-mdx-remote-client";
import { SerializeResult } from "next-mdx-remote-client/serialize";
import { LinkIcon } from "lucide-react";
import Link from "next/link";

interface TilDataItem {
  title: string;
  tags?: string[];
  code?: string;
  description?: string;
  officialLink?: string;
  additionalInfo?: SerializeResult;
  language: string;
}

interface CardItemProps {
  title: string;
  tags?: string[];
  code?: string;
  description?: string;
  officialLink?: string;
  additionalInfo?: SerializeResult;
  language: string;
}
interface CardTilProps {
  data: TilDataItem[];
  date?: string;
}

const CardItem = ({
  title,
  tags,
  code,
  description,
  officialLink,
  additionalInfo,
  language,
}: CardItemProps) => {
  const settings = useSettings();
  const components = useMDXComponents({});
  if (additionalInfo && "error" in additionalInfo) {
    // either render error UI or throw `mdxSource.error`
    return <div>Error</div>;
  }
  return (
    <div className="flex flex-grow w-full">
      <div className="min-w-[2px] max-w-[2px] min-h-full bg-border relative py-8">
        <div className={`${!settings.focusMode ? "sticky top-20" : ""}`}>
          <div className="w-5 h-5 bg-primary border-2 rounded-full border-primary -translate-x-2.5 z-10">
            <div className="w-8 h-0.5 bg-primary my-auto -translate-x-1.75 translate-y-1.75 z-0" />
          </div>
        </div>
      </div>
      <div className="py-7 flex flex-col w-full pl-10 md:pl-14">
        <span className="text-slate-700 dark:text-slate-200 font-extrabold text-2xl">
          {title}
        </span>
        {tags ? (
          <div className="flex flex-row gap-3 mt-4 mb-4 text-primary flex-wrap">
            {tags.map((tag, index) => (
              <span
                className="bg-primary/10 dark:bg-primary/10 rounded-full px-2"
                key={tag + index}
              >
                {`#${tag}`}
              </span>
            ))}
          </div>
        ) : null}
        {description ? (
          <p className="text-slate-600 dark:text-slate-400 text-md mt-4 mb-4">
            {description}
          </p>
        ) : null}
        {code ? (
          <CodeBlock
            language={language}
            code={code}
            className="w-fit max-w-full"
          />
        ) : null}
        {additionalInfo ? (
          <div className="mt-4 w-full max-w-full">
            <MDXClient {...additionalInfo} components={components} />
          </div>
        ) : null}
        {officialLink ? (
          <Link
            href={officialLink}
            target="_blank"
            className="text-primary mt-4 block text-md"
          >
            Official Documentation{" "}
            <LinkIcon className="inline ml-1" size={14} />
          </Link>
        ) : null}
      </div>
    </div>
  );
};

const CardTil = ({ data, date }: CardTilProps) => {
  const settings = useSettings();
  return (
    <div className="flex max-w-full w-full">
      <div className="py-7 hidden md:flex flex-col gap-2 w-[250px]">
        <div className={`${!settings.focusMode ? "sticky top-20" : ""}`}>
          <span className="whitespace-nowrap text-lg font-extrabold ">
            {date}
          </span>
        </div>
      </div>
      <div className="flex flex-col w-full md:w-[calc(100%-250px)]">
        {data.map((item, index) => (
          <CardItem
            key={item.title + index}
            title={item.title}
            tags={item.tags}
            code={item.code}
            description={item.description}
            officialLink={item.officialLink}
            language={item.language}
            additionalInfo={item.additionalInfo}
          />
        ))}
      </div>
    </div>
  );
};

export default CardTil;
