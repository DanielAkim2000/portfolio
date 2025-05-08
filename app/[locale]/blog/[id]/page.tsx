import { getBlog as getBlogAction } from "@/actions/get-blog";
import { AnimatedTitleBlock } from "@/components/animated/title-block.animated";
import ViewsCompte from "@/components/compteur-views/views-compte";
import ReactionBar from "@/components/bar/reaction.bar";
import StickySidebar from "@/components/sidebar/sticky-sidebar";
import { StickyBarWrapper } from "@/components/wrapper/sticky-bar-wrapper";
import TitleBlockWrapper from "@/components/wrapper/title-block.wrapper";
import { getContentFromBlog, getTitleFromContentMdx } from "@/lib/mdx-utils";
import { Title } from "@/prisma/generated";

const getBlog = async (id: string) => {
  const blog = await fetch(`http://localhost:3000/api/blog?id=${id}`, {
    next: {
      tags: [`blog-${id}`],
    },
  });
  return blog.json() as Promise<ReturnType<typeof getBlogAction>>;
};

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  const blog = await getBlog(id);
  if (!blog) {
    return <div>Blog not found</div>;
  }
  const Content = await getContentFromBlog(locale, id);
  const sections = getTitleFromContentMdx(Content);
  return (
    <div className="max-w-full w-full">
      <TitleBlockWrapper>
        <AnimatedTitleBlock
          lowTitle={blog.title.find((t: Title) => t.locale === locale)?.title}
          title={
            blog.title.find((t: Title) => t.locale === locale)?.title || ""
          }
          subtitle={
            blog.title.find((d: Title) => d.locale === locale)?.subtitle || ""
          }
        />
      </TitleBlockWrapper>
      <div className="my-5"></div>
      {/* <GithubButton href="#" /> */}
      <StickyBarWrapper>
        <div className="flex flex-col lg:w-2/3 w-full">
          <div className="mt-10 lg:border-l lg:pl-10 text-lg lg:text-xl mb-10 flex-grow">
            <Content />
          </div>
          <ReactionBar
            data={blog.reactions}
            id={id}
            type="blog"
            nbShares={blog.nbShares}
            nbViews={blog.views}
          />
        </div>
        <StickySidebar variant="primary" sections={sections} />
      </StickyBarWrapper>
      <ViewsCompte id={id} type="blog" />
    </div>
  );
}
