import { AnimatedTitleBlock } from "@/components/animated/title-block.animated";
import { SectionProjects } from "@/components/sections/projects/projects.section";
import TitleBlockWrapper from "@/components/wrapper/title-block.wrapper";
import { getAllProjects } from "@/actions/get-all-projects";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("projects");

  return {
    title: `${t("title")} | Akim Emane`,
    description: t("description"),
  };
}

export type PageProjectsProps = {
  params: Promise<{ locale: string }>;
};

const getProjects = async () => {
  const projects = await fetch("http://localhost:3000/api/projects", {
    next: {
      tags: ["projects"],
    },
  });
  return projects.json() as Promise<ReturnType<typeof getAllProjects>>;
};

export default async function ProjectsPage(props: PageProjectsProps) {
  const t = await getTranslations("projects");
  const { locale } = await props.params;
  const projects = await getProjects();
  return (
    <div className="">
      <TitleBlockWrapper>
        <AnimatedTitleBlock
          variant="primary"
          lowTitle={t("low_title")}
          title={t("title")}
          subtitle={t("description")}
        />
      </TitleBlockWrapper>
      <SectionProjects projects={projects} locale={locale} />
    </div>
  );
}
