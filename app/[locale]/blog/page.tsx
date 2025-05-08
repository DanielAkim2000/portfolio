import { AnimatedTitleBlock } from "@/components/animated/title-block.animated";
import { SectionPosts } from "@/components/sections/blog/posts.section";
import TitleBlockWrapper from "@/components/wrapper/title-block.wrapper";
import { getTranslations } from "next-intl/server";
import { getAllBlogs } from "@/actions/get-all-blogs";

const getBlogs = async () => {
  const blogs = await fetch("http://localhost:3000/api/blogs", {
    next: {
      tags: ["blogs"],
    },
  });
  return blogs.json() as Promise<ReturnType<typeof getAllBlogs>>;
};

export default async function BlogsPage() {
  const t = await getTranslations("blog");
  const blogs = await getBlogs();
  return (
    <div className="">
      <TitleBlockWrapper>
        <AnimatedTitleBlock
          lowTitle="Blog"
          variant="primary"
          title={t("title")}
          subtitle={t("subtitle")}
        />
      </TitleBlockWrapper>
      <SectionPosts blogs={blogs} />
    </div>
  );
}
