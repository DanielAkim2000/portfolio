"use server";

import prisma from "@/lib/prisma";
import { ReactionType } from "@/prisma/generated";

export type UnifiedActionCenterResponse = {
  reactions: {
    [key: string]: {
      title: {
        title: string;
        locale: string;
      }[];
      model: "Blog" | "Project";
      types: {
        type: ReactionType;
        date: Date;
      }[];
    };
  };
  blogAndProjectData: {
    [key: string]: {
      title: {
        title: string;
        locale: string;
      }[];
    };
  };
};

export const getUnifiedActionCenterData = async (
  sessionId: string,
  ids: string[]
) => {
  try {
    // Récupérer les réactions
    const reactions = await prisma.reaction.findMany({
      where: {
        sessionId: sessionId,
      },
      select: {
        id: true,
        type: true,
        createdAt: true,
        Blog: {
          select: {
            id: true,
            title: {
              select: {
                title: true,
                locale: true,
              },
            },
          },
        },
        Project: {
          select: {
            id: true,
            title: {
              select: {
                title: true,
                locale: true,
              },
            },
          },
        },
      },
    });

    // récupérer les blogs et projets des IDs
    const blogs = await prisma.blog.findMany({
      where: {
        id: { in: ids },
      },
      select: {
        title: {
          select: {
            title: true,
            locale: true,
          },
        },
        id: true,
      },
    });

    const projects = await prisma.project.findMany({
      where: { id: { in: ids } },
      select: {
        title: {
          select: {
            title: true,
            locale: true,
          },
        },
        id: true,
      },
    });

    // formater la réponse pour les réactions en les regroupant par ID
    const formattedReactions: UnifiedActionCenterResponse["reactions"] = {};

    reactions.forEach((reaction) => {
      const id = reaction.Blog?.id || reaction.Project?.id;
      const title = reaction.Blog?.title || reaction.Project?.title;
      const model = reaction.Blog?.id ? "Blog" : "Project";

      if (!id || !title) return;

      if (!formattedReactions[id]) {
        formattedReactions[id] = {
          title: title,
          model: model,
          types: [],
        };
      }

      // Ajouter le type et la date de réaction au tableau
      formattedReactions[id].types.push({
        type: reaction.type as ReactionType,
        date: reaction.createdAt,
      });
    });

    const formattedBlogAndProjectData: UnifiedActionCenterResponse["blogAndProjectData"] =
      {};
    blogs.forEach((blog) => {
      formattedBlogAndProjectData[blog.id] = {
        title: blog.title,
      };
    });
    projects.forEach((project) => {
      formattedBlogAndProjectData[project.id] = {
        title: project.title,
      };
    });

    return {
      reactions: formattedReactions,
      blogAndProjectData: formattedBlogAndProjectData,
    };
  } catch (error) {
    return {
      reactions: {},
      blogAndProjectData: {},
    };
  }
};
