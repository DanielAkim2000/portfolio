import { UnifiedActionCenterResponse } from "@/actions/get-unified-action-center-data";
import { getAllShareOrViewKey, getIdFromKey } from "@/utils/localStorage";
import { ReactionType } from "@/prisma/generated";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { createLogger } from "@/utils/logger";

const logger = createLogger("useActionCenterData");

// Clé de cache pour React Query
const ACTION_CENTER_CACHE_KEY = ["action-center-data"];

// types pour le reducer
export type ActionCenterState = {
  reactionData:
    | {
        [key: string]: {
          title: {
            title: string;
            locale: string;
          }[];
          model: "Blog" | "Project";
          createdAt: Date;
        };
      }
    | undefined;
  shareData:
    | {
        [key: string]: {
          title: {
            title: string;
            locale: string;
          }[];
          model: "Blog" | "Project";
          createdAt: Date;
        };
      }
    | undefined;
  reactions:
    | {
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
      }
    | undefined;
};

export type Action =
  | { type: "SET_REACTION_DATA"; payload: ActionCenterState["reactionData"] }
  | { type: "SET_SHARE_DATA"; payload: ActionCenterState["shareData"] }
  | { type: "SET_REACTIONS"; payload: ActionCenterState["reactions"] };

/**
 * Hook pour récupérer les données de l'action center
 * Utilise React Query pour la gestion du cache et des requêtes
 */
export const useActionCenterData = ({
  enabled = true,
}: {
  enabled?: boolean;
}) => {
  const [latestIds, setLatestIds] = useState<string[]>([]);
  const queryClient = useQueryClient();

  // Fonction pour récupérer les IDs actuels à partir du localStorage
  const getLatestIds = useCallback(() => {
    const shareOrViewsKeys = getAllShareOrViewKey();
    return shareOrViewsKeys.map(getIdFromKey);
  }, []);

  // Fonction pour rafraîchir les données
  const mutate = useCallback(() => {
    logger.info("mutate appelé");
    // Mettre à jour les IDs immédiatement
    const freshIds = getLatestIds();
    setLatestIds(freshIds);

    // Invalider la requête pour forcer un rafraîchissement
    queryClient.invalidateQueries({ queryKey: ACTION_CENTER_CACHE_KEY });
    logger.debug("Query invalidée avec IDs:", freshIds);
  }, [queryClient, getLatestIds]);

  // Effectuer la requête avec React Query
  const { data, error, isFetching } = useQuery<UnifiedActionCenterResponse>({
    queryKey: ACTION_CENTER_CACHE_KEY,
    queryFn: async () => {
      logger.debug("Exécution de la requête avec IDs:", latestIds);
      const response = await fetch(
        `/api/action-center?ids=${latestIds.join(",")}`
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données");
      }
      return response.json();
    },
    enabled: !!latestIds.length && enabled,
    staleTime: 60 * 1000, // Considérer les données comme fraîches pendant 1 minute
    refetchOnWindowFocus: false,
  });

  // Initialiser les IDs au montage du composant
  useEffect(() => {
    const ids = getLatestIds();
    logger.info("Initialisation avec IDs:", ids);
    setLatestIds(ids);
  }, [getLatestIds]);

  return {
    reactions: data?.reactions,
    sharesOrViews: data?.blogAndProjectData,
    isLoading: isFetching,
    error,
    mutate,
  };
};
