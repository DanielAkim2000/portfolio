import { getProject as getProjectAction } from "@/actions/get-project";
import { AnimatedTitleBlock } from "@/components/animated/title-block.animated";
import ViewsCompte from "@/components/compteur-views/views-compte";
import ReactionBar from "@/components/bar/reaction.bar";
import StickySidebar from "@/components/sidebar/sticky-sidebar";
import { Button } from "@/components/ui/button";
import { StickyBarWrapper } from "@/components/wrapper/sticky-bar-wrapper";
import TitleBlockWrapper from "@/components/wrapper/title-block.wrapper";
import { getContentFromProject, getTitleFromContentMdx } from "@/lib/mdx-utils";
import { Content, Title } from "@/prisma/generated";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Globe } from "lucide-react";
import { Metadata } from "next";

const GithubButton = ({
  variant = "default",
  href,
  type,
}: {
  variant?: "default" | "tertiary";
  href: string;
  type: "Github" | "Backend" | "Frontend";
}) => {
  return (
    <Button variant={variant} size={"lg"} asChild>
      <Link href={href} target="_blank">
        <svg
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-current"
        >
          <title>GitHub</title>
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
        <span>{type}</span>
      </Link>
    </Button>
  );
};

const getProject = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/project?id=${id}`, {
    next: {
      tags: [`project-${id}`],
    },
  });
  return res.json() as Promise<ReturnType<typeof getProjectAction>>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
  const { id, locale } = await params;
  const project = await getProject(id);

  if (!project) {
    return {
      title: "Projet non trouvé",
      description: "Ce projet n'existe pas ou a été supprimé.",
    };
  }

  const title =
    project?.title.find((t: Title) => t.locale === locale)?.title || "";
  const description =
    project?.description.find((d: Content) => d.locale === locale)?.content ||
    "";

  return {
    title: `${title} | Projets | Akim Emane`,
    description: description,
  };
}

// afficher aussi la description du title
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  const project = await getProject(id);
  const Content = await getContentFromProject(
    locale,
    project?.title.find((t: Title) => t.locale === locale)?.title ?? ""
  );
  const sections = getTitleFromContentMdx(Content);
  const t = await getTranslations("projects/id");

  if (!project) {
    return <div>Project not found</div>;
  }
  return (
    <div>
      <TitleBlockWrapper>
        <AnimatedTitleBlock
          lowTitle={t("low_title")}
          title={
            project?.title.find((t: Title) => t.locale === locale)?.title ?? ""
          }
          subtitle={
            project?.title.find((d: Title) => d.locale === locale)?.subtitle ??
            ""
          }
        />
      </TitleBlockWrapper>
      <div className="my-5"></div>
      <div className="flex flex-row gap-2 flex-wrap">
        {project.githubLink.length > 0 &&
          project.githubLink.map((link, index) => (
            <GithubButton
              key={link}
              href={link}
              type={
                project.githubLink.length === 1
                  ? "Github"
                  : project.githubLink.length === 2
                  ? index === 0
                    ? "Backend"
                    : "Frontend"
                  : "Github"
              }
            />
          ))}
        {project.link && (
          <Button variant="tertiary" size={"lg"} asChild>
            <Link href={project.link} target="_blank">
              <Globe size={24} />
              <span>{t("visit")}</span>
            </Link>
          </Button>
        )}
      </div>
      <StickyBarWrapper>
        <div>
          <div className="mt-10 lg:border-l lg:pl-10 text-lg lg:text-xl mb-10">
            <Content />
          </div>
          <ReactionBar
            data={project.reactions}
            id={id}
            type="project"
            nbShares={project.nbShares}
            nbViews={project.views}
          />
        </div>
        <StickySidebar variant="primary" sections={sections} />
      </StickyBarWrapper>
      <ViewsCompte id={id} type="project" />
    </div>
  );
}
