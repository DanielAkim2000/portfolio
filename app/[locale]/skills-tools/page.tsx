import { AnimatedTitleBlock } from "@/components/animated/title-block.animated";
import { Separator } from "@/components/ui/separator";
import TitleBlockWrapper from "@/components/wrapper/title-block.wrapper";
import StickySidebar from "@/components/sidebar/sticky-sidebar";
import TitleWorkSections from "@/components/typography/work/title-work-sections";
import { createId } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import { StickyBarWrapper } from "@/components/wrapper/sticky-bar-wrapper";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("skills_tools");

  return {
    title: `${t("title")} | Akim Emane`,
    description: t("description"),
  };
}

const CardSkillsAndTools = ({
  title,
  paragraph,
  id,
}: {
  title: string;
  paragraph: string;
  id: string;
}) => {
  return (
    <div className="flex flex-col gap-2 mt-5" id={id}>
      <h2 className="text-2xl font-extrabold text-slate-700 dark:text-slate-300">
        {title}
      </h2>
      <p className="text-slate-600 dark:text-slate-400 text-md mt-4 mb-4 whitespace-pre-line">
        {paragraph}
      </p>
    </div>
  );
};

export default async function SkillsToolsPage() {
  const t = await getTranslations("skills_tools");
  const years = new Date().getFullYear() - 2023;

  const FrontEndSkillsAndTools = [
    {
      title: "TypeScript",
      paragraph: t("typescript_paragraph"),
    },
    {
      title: "React.js",
      paragraph: t("reactjs_paragraph"),
    },
    {
      title: "Next.js",
      paragraph: t("nextjs_paragraph"),
    },
    {
      title: "Expo",
      paragraph: t("expo_paragraph"),
    },
    {
      title: "Tailwind CSS",
      paragraph: t("tailwind_paragraph"),
    },
    {
      title: "Framer Motion",
      paragraph: t("framer_motion_paragraph"),
    },
  ];

  const BackEndSkillsAndTools = [
    {
      title: "Node.js",
      paragraph: t("nodejs_paragraph"),
    },
    {
      title: "Express.js",
      paragraph: t("expressjs_paragraph"),
    },
    {
      title: "Nest.js",
      paragraph: t("nestjs_paragraph"),
    },
    {
      title: "PHP",
      paragraph: t("php_paragraph"),
    },
    {
      title: "Symfony",
      paragraph: t("symfony_paragraph"),
    },
  ];

  const DevOpsSkillsAndTools = [
    {
      title: "Docker",
      paragraph: t("docker_paragraph"),
    },
    {
      title: "GitHub Actions",
      paragraph: t("github_actions_paragraph"),
    },
    {
      title: "Nginx",
      paragraph: t("nginx_paragraph"),
    },
    {
      title: "Linux",
      paragraph: t("linux_paragraph"),
    },
  ];

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
      <StickyBarWrapper>
        <div className="mt-10 lg:border-l lg:pl-10 text-lg lg:text-xl">
          <div className="my-5">
            <p>
              {t("started_career")}{" "}
              <span className="font-bold text-foreground">
                {years} {t("years_old")}
              </span>
              .
            </p>
            <br />
            <p>{t("scope_interest")}</p>
          </div>
          <Separator />
          <div className="my-5 text-slate-600 dark:text-slate-400">
            <TitleWorkSections
              title={t("front_end_developer")}
              id="front-end-developer"
            />
            <p>{t("front_end_love")}</p>
            <p>{t("front_end_enjoy")}</p>
            <ul className="list-disc list-inside pl-5 my-5">
              <li>{t("web_application")}</li>
              <li>{t("mobile_application")}</li>
              <li>{t("documentation_pages")}</li>
              <li>{t("cms_contents_layout")}</li>
              <li>{t("dashboard_layout")}</li>
              <li>{t("and_others")}</li>
            </ul>
            <p>{t("simple_websites")}</p>
            {FrontEndSkillsAndTools.map((item) => {
              const id = createId(item.title);
              return (
                <CardSkillsAndTools
                  key={id}
                  title={item.title}
                  paragraph={item.paragraph}
                  id={id}
                />
              );
            })}
          </div>
          <Separator />
          <div className="my-5 text-slate-600 dark:text-slate-400">
            <TitleWorkSections
              title={t("back_end_developer")}
              id="back-end-developer"
            />
            <p>{t("back_end_love")}</p>
            <p>{t("back_end_enjoy")}</p>
            <ul className="list-disc list-inside pl-5 my-5">
              <li>{t("restful")}</li>
              <li>{t("auth_systems")}</li>
              <li>{t("background_tasks")}</li>
              <li>{t("database_design")}</li>
              <li>{t("realtime_features")}</li>
              <li>{t("third_party_integrations")}</li>
            </ul>
            <p>{t("small_services")}</p>
            {BackEndSkillsAndTools.map((item) => {
              const id = createId(item.title);
              return (
                <CardSkillsAndTools
                  key={id}
                  title={item.title}
                  paragraph={item.paragraph}
                  id={id}
                />
              );
            })}
          </div>
          <Separator />
          <div className="my-5 text-slate-600 dark:text-slate-400">
            <TitleWorkSections
              title={t("devops_engineer")}
              id="devops-engineer"
            />
            <p>{t("devops_love")}</p>
            <p>{t("devops_enjoy")}</p>
            <ul className="list-disc list-inside pl-5 my-5">
              <li>{t("containerization")}</li>
              <li>{t("ci_cd_pipeline")}</li>
              <li>{t("server_configuration")}</li>
              <li>{t("monitoring")}</li>
              <li>{t("deployments")}</li>
            </ul>
            <p>{t("devops_journey")}</p>
            {DevOpsSkillsAndTools.map((item) => {
              const id = createId(item.title);
              return (
                <CardSkillsAndTools
                  key={id}
                  title={item.title}
                  paragraph={item.paragraph}
                  id={id}
                />
              );
            })}
          </div>
        </div>
        <StickySidebar
          variant="tertiary"
          sections={[
            {
              id: "front-end-developer",
              title: t("front_end_developer"),
              isTitle: true,
            },
            ...FrontEndSkillsAndTools.map((item) => ({
              id: createId(item.title),
              title: item.title,
            })),
            {
              id: "back-end-developer",
              title: t("back_end_developer"),
              isTitle: true,
            },
            ...BackEndSkillsAndTools.map((item) => ({
              id: createId(item.title),
              title: item.title,
            })),
            {
              id: "devops-engineer",
              title: t("devops_engineer"),
              isTitle: true,
            },
            ...DevOpsSkillsAndTools.map((item) => ({
              id: createId(item.title),
              title: item.title,
            })),
          ]}
        />
      </StickyBarWrapper>
    </div>
  );
}
