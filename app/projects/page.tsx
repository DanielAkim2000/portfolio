import { AnimatedTitleBlock } from "@/components/animated/title-block.animated";
import { SectionProjects } from "@/components/sections/projects/projects.section";
import TitleBlockWrapper from "@/components/wrapper/title-block.wrapper";

export type PageProjectsProps = {};

export const PageProjects = (props: PageProjectsProps) => {
  return (
    <div className="">
      <TitleBlockWrapper>
        <AnimatedTitleBlock
          title="Projects"
          subtitle="Showcase of My Frontend, Backend, and DevOps Projects"
        />
      </TitleBlockWrapper>
      <SectionProjects />
    </div>
  );
};

export default PageProjects;
