"use client";

import { Button } from "@/components/ui/button";
import { ChartNoAxesColumn, ChevronRight, DotIcon, Pin } from "lucide-react";
import Link from "next/link";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { Blog, Title } from "@/prisma/generated";

export type SectionPostsProps = {
  blogs: (Blog & { title: Title[] })[];
};

const CardPinnedPost = (post: Post) => {
  return (
    <div className="relative overflow-hidden sm:rounded-lg sm:border flex-1">
      <motion.div
        initial={{ x: "-200%" }}
        animate={{ x: "300%", opacity: 0 }}
        transition={{ duration: 1.5, delay: 2 }}
        className="absolute w-1/4 h-full bg-slate-200 dark:bg-slate-300 pointer-events-none opacity-60"
      />
      <BaseCardPost {...post} />
    </div>
  );
};

const CardPost = (post: Post) => {
  return (
    <div className="flex flex-row items-start justify-between gap-6 flex-1">
      <div className="h-0.25 w-24 bg-border lg:flex hidden mt-16" />
      <BaseCardPost {...post} />
    </div>
  );
};

const BaseCardPost = (post: Post) => {
  const { title, description, date, views, shares, location } = post;
  const locale = useLocale();
  const dateFormatted = new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const dateString = `${dateFormatted}`;

  const descriptionString =
    description.length > 100 ? `${description.slice(0, 100)}...` : description;
  const titleString = title.length > 50 ? `${title.slice(0, 50)}...` : title;
  const locationString =
    location.length > 20 ? `${location.slice(0, 20)}...` : location;
  return (
    <Link href={`/blog/${post.id}`} className="flex-1 group">
      <div className="py-6 sm:px-6">
        {post.pinned ? (
          <div className="flex items-center gap-2 text-slate-500 dark:text-primary">
            <Pin />
            <span className=" text-xl font-semibold">Pinned Post</span>
          </div>
        ) : null}
        <div className="mt-2 items-center flex gap-1 text-slate mb-2  text-sm text-slate-500 dark:text-slate-400 md:mb-1">
          <span>{dateString}</span>
          <DotIcon />
          <span>{locationString}</span>
        </div>
        <h3 className="text-3xl font-extrabold text-slate-700 dark:text-slate-300 my-2">
          {titleString}
        </h3>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          {descriptionString}
        </p>
        <div className="flex items-center gap-2 mt-2 mb-2 text-slate-600 dark:text-slate-400 text-xs">
          <div className="flex items-center">
            <ChartNoAxesColumn className="mr-1" />
            <CountUp
              start={0}
              end={views}
              duration={2}
              separator=" "
              className="mr-1"
            />
            <span> Views</span>
          </div>
          <DotIcon />
          <div className="flex items-center">
            <CountUp
              start={0}
              end={shares}
              duration={2}
              separator=" "
              className="mr-1"
            />
            <span> Shares</span>
          </div>
        </div>
        <Button
          variant="outline"
          className={`text-primary mt-2 text-sm font-bold hover:text-primary ${
            post.pinned ? "sm:hidden" : ""
          }`}
          size="sm"
        >
          read more
          <ChevronRight
            className="group-hover:animate-caret-blink group-active:animate-caret-blink"
            size={16}
          />
        </Button>
      </div>
    </Link>
  );
};

interface Post {
  id: string;
  title: string;
  description: string;
  date: string;
  views: number;
  shares: number;
  pinned: boolean;
  location: string;
}

export const SectionPosts = (props: SectionPostsProps) => {
  const { blogs } = props;
  const locale = useLocale();
  const posts = blogs.map((blog) => {
    return {
      id: blog.id,
      title: blog.title.find((t) => t.locale === locale)?.title || "",
      description:
        blog.title.find((t) => t.locale === locale)?.description || "",
      date: new Date(blog.createdAt).toISOString(),
      views: blog.views,
      shares: blog.nbShares,
      pinned: blog.pinned,
      location: blog.location,
    };
  });
  return (
    <section className="mt-10  sm:px-5  flex flex-col md:w-4/6 md:ml-auto gap-2 sm:gap-4">
      {posts.map((post) => {
        return post.pinned ? (
          <CardPinnedPost key={post.id} {...post} />
        ) : (
          <CardPost key={post.id} {...post} />
        );
      })}
    </section>
  );
};
