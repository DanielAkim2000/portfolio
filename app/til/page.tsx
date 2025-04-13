import { AnimatedTitleBlock } from "@/components/animated/title-block.animated";
import SectionTil from "@/components/sections/T.I.L/til.section";
import TitleBlockWrapper from "@/components/wrapper/title-block.wrapper";

const page = () => {
  return (
    <div>
      <TitleBlockWrapper>
        <AnimatedTitleBlock
          title="Today I Learned"
          subtitle="Short notes on front-end, backend and devops related topics"
        />
      </TitleBlockWrapper>
      <SectionTil />
    </div>
  );
};

export default page;
