import { AnimatedTitleBlock } from "@/components/animated/title-block.animated";
import { SectionPosts } from "@/components/sections/blog/posts.section";
import TitleBlockWrapper from "@/components/wrapper/title-block.wrapper";

export default function BlogPage() {
  return (
    <div className="">
      <TitleBlockWrapper>
        <AnimatedTitleBlock
          title="Personal Blog"
          subtitle="Web development thoughts and stories"
        />
      </TitleBlockWrapper>
      <SectionPosts />
    </div>
  );
}
