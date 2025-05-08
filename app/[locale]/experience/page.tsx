import { AnimatedTitleBlock } from "@/components/animated/title-block.animated";
import StickySidebar from "@/components/sidebar/sticky-sidebar";
import CardExperience from "@/components/card/experience/card-experience";
import TitleWorkSections from "@/components/typography/work/title-work-sections";
import { Separator } from "@/components/ui/separator";
import TitleBlockWrapper from "@/components/wrapper/title-block.wrapper";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("experience");

  return {
    title: `${t("title")} | Akim Emane`,
    description: t("description"),
  };
}

export default async function ExperiencePage() {
  const t = await getTranslations("experience");

  // Récupération des données depuis les traductions
  const educationExperiences = t.raw("education") as Array<{
    title: string;
    period: string;
    description: string;
    skills: string[];
    id: string;
  }>;

  const professionalExperiences = t.raw("projects") as Array<{
    title: string;
    period: string;
    description: string;
    skills: string[];
    id: string;
  }>;

  return (
    <div>
      <TitleBlockWrapper>
        <AnimatedTitleBlock
          variant="tertiary"
          lowTitle="Work"
          title={t("title")}
          subtitle={t("description")}
        />
      </TitleBlockWrapper>
      <div className="flex flex-row lg:gap-10 text-slate-600 dark:text-slate-400 relative">
        <div className="mt-10 lg:border-l lg:pl-10 text-lg lg:text-xl">
          <div className="my-5">
            <p>{t("intro")}</p>
          </div>
          <Separator />
          <div className="my-5 text-slate-600 dark:text-slate-400">
            <TitleWorkSections title={t("education_title")} id="formation" />
            <p>{t("education_description")}</p>
            {educationExperiences.map((exp) => (
              <CardExperience
                key={exp.id}
                title={exp.title}
                period={exp.period}
                description={exp.description}
                skills={exp.skills}
                id={exp.id}
              />
            ))}
          </div>
          <Separator />
          <div className="my-5 text-slate-600 dark:text-slate-400">
            <TitleWorkSections title={t("projects_title")} id="projects" />
            <p>{t("projects_description")}</p>
            {professionalExperiences.map((exp) => (
              <CardExperience
                key={exp.id}
                title={exp.title}
                period={exp.period}
                description={exp.description}
                skills={exp.skills}
                id={exp.id}
              />
            ))}
          </div>
        </div>
        <StickySidebar
          variant="tertiary"
          sections={[
            { title: t("education_title"), id: "formation", isTitle: true },
            ...educationExperiences.map((exp) => ({
              id: exp.id,
              title: exp.title,
            })),
            { title: t("projects_title"), id: "projects", isTitle: true },
            ...professionalExperiences.map((exp) => ({
              id: exp.id,
              title: exp.title,
            })),
          ]}
        />
      </div>
    </div>
  );
}
