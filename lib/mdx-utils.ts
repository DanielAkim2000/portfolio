import { ReactNode } from "react";
import { createId } from "@/lib/utils";

interface MDXComponent {
  type?: {
    name?: string;
  };
  props?: {
    children?: string | ReactNode;
  };
}

interface MDXContent {
  props: {
    children?: MDXComponent[];
  };
}

const getContentFromProject = async (locale: string, title: string) => {
  const { default: Content } = await import(
    `@/content/${locale}/projects/${title}.mdx`
  );
  return Content;
};

const getContentFromBlog = async (locale: string, id: string) => {
  const { default: Content } = await import(
    `@/content/${locale}/blog/${id}.mdx`
  );
  return Content;
};

const getTitleFromContentMdx = (
  content: () => MDXContent
): {
  title: string;
  id: string;
  isTitle: boolean;
}[] => {
  const getTitleH1 = content()
    ?.props?.children?.filter(
      (child: MDXComponent) => child?.type?.name === "h1"
    )
    .map((h1: MDXComponent) => h1?.props?.children || "");

  const titlesH1 = getTitleH1?.map((title: string | ReactNode) => {
    return {
      title: String(title),
      id: createId(String(title)),
      isTitle: true,
    };
  });

  const getTitleH2 = content()
    ?.props?.children?.filter(
      (child: MDXComponent) => child?.type?.name === "h2"
    )
    .map((h2: MDXComponent) => h2?.props?.children || "");

  const titlesH2 = getTitleH2?.map((title: string | ReactNode) => {
    return {
      title: String(title),
      id: createId(String(title)),
      isTitle: false,
    };
  });

  return [...(titlesH1 || []), ...(titlesH2 || [])];
};

export { getContentFromProject, getContentFromBlog, getTitleFromContentMdx };
