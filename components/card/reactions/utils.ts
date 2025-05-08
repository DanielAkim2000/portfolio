import { Reaction, ReactionType } from "@/prisma/generated";

/**
 * Compte le nombre de réactions d'un type spécifique
 */
export function getReactionCount(data: Reaction[], reactionType: ReactionType) {
  return data.reduce((acc, reaction) => {
    if (reaction.type === reactionType) {
      return acc + 1;
    }
    return acc;
  }, 0);
}

/**
 * Convertit une chaîne de type en énumération ReactionType
 */
export function getReactionType(type: string): ReactionType | undefined {
  switch (type) {
    case "CLAPPING":
      return ReactionType.CLAPPING;
    case "AMAZED":
      return ReactionType.AMAZED;
    case "THINKING":
      return ReactionType.THINKING;
    default:
      return undefined;
  }
}
