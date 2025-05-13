import {
  getAllViewsKey,
  getAllShareKey,
  extractDateFromKey,
  isDateInLast24Hours,
} from "./localStorage";
import { ReactionType } from "@/prisma/generated";
import { createLogger } from "@/utils/logger";

const logger = createLogger("action-center");

/**
 * Vérifie si une date est dans les dernières 24 heures
 */
export const verifyDate = (date: Date) => {
  return isDateInLast24Hours(date);
};

/**
 * Ajoute des données supplémentaires aux données de vues
 */
export const addOtherDataToFetchViewsData = (data: {
  [key: string]: {
    title: {
      title: string;
      locale: string;
    }[];
  };
}) => {
  logger.info("Traitement des données de vues");
  const viewsKeys = getAllViewsKey();
  logger.debug("Clés de vues trouvées:", viewsKeys.length);

  let dataWithOtherData: {
    [key: string]: {
      title: {
        title: string;
        locale: string;
      }[];
      model: "Blog" | "Project";
      createdAt: Date;
    };
  } = {};

  Object.keys(data).forEach((key) => {
    const views = viewsKeys.filter((view) => view.includes(key));
    logger.debug(`Pour l'ID ${key}, ${views.length} vues trouvées`);

    views.forEach((view) => {
      const dateStr = extractDateFromKey(view);
      if (dateStr && verifyDate(new Date(dateStr))) {
        dataWithOtherData[key] = {
          ...data[key],
          model: view.includes("blog") ? "Blog" : "Project",
          createdAt: new Date(dateStr),
        };
        logger.debug(`Vue ajoutée pour ${key}, date: ${dateStr}`);
      }
    });
  });

  logger.info(
    "Données de vues traitées:",
    Object.keys(dataWithOtherData).length
  );
  return dataWithOtherData;
};

/**
 * Ajoute des données supplémentaires aux données de partage
 */
export const addOtherDataToFetchShareData = (data: {
  [key: string]: {
    title: {
      title: string;
      locale: string;
    }[];
  };
}) => {
  logger.info("Traitement des données de partage");
  const sharesKeys = getAllShareKey();
  logger.debug("Clés de partage trouvées:", sharesKeys.length);

  let dataWithOtherData: {
    [key: string]: {
      title: {
        title: string;
        locale: string;
      }[];
      model: "Blog" | "Project";
      createdAt: Date;
    };
  } = {};

  Object.keys(data).forEach((key) => {
    const shares = sharesKeys.filter((share) => share.includes(key));
    logger.debug(`Pour l'ID ${key}, ${shares.length} partages trouvés`);

    shares.forEach((share) => {
      const dateStr = extractDateFromKey(share);
      if (dateStr && verifyDate(new Date(dateStr))) {
        dataWithOtherData[key] = {
          ...data[key],
          model: share.includes("blog") ? "Blog" : "Project",
          createdAt: new Date(dateStr),
        };
        logger.debug(`Partage ajouté pour ${key}, date: ${dateStr}`);
      }
    });
  });

  logger.info(
    "Données de partage traitées:",
    Object.keys(dataWithOtherData).length
  );
  return dataWithOtherData;
};

/**
 * Filtre les données de réactions des dernières 24 heures
 */
export const filterReactionsDataIn24h = (data: {
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
}) => {
  logger.info("Filtrage des réactions des dernières 24h");

  // Créer un objet qui va contenir les entrées filtrées
  const dataFiltered: {
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
  } = {};

  // Pour chaque ID (blog ou projet)
  Object.keys(data).forEach((key) => {
    const { title, model, types } = data[key];

    // Filtrer les types de réactions qui sont dans les dernières 24h
    const recentTypes = types.filter((t) => verifyDate(new Date(t.date)));

    // Si nous avons des réactions récentes, ajouter à notre objet filtré
    if (recentTypes.length > 0) {
      dataFiltered[key] = {
        title,
        model,
        types: recentTypes,
      };
      logger.debug(`${recentTypes.length} réactions récentes pour ${key}`);
    }
  });

  logger.info("Réactions filtrées:", Object.keys(dataFiltered).length);
  return dataFiltered;
};

/**
 * Convertit les données de réactions avec types multiples en format compatible pour la fusion
 */
export const convertReactionsForMerge = (data: {
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
}) => {
  logger.info("Conversion des réactions pour la fusion");

  const convertedData: {
    [key: string]: {
      title: {
        title: string;
        locale: string;
      }[];
      model: "Blog" | "Project";
      type: string;
      createdAt: Date;
      allTypes?: {
        type: ReactionType;
        date: Date;
      }[];
    };
  } = {};

  Object.keys(data).forEach((key) => {
    const { title, model, types } = data[key];

    if (types.length > 0) {
      // Trier les types par date (plus récente en premier)
      const sortedTypes = [...types].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      // Utiliser le type le plus récent comme type principal pour l'affichage
      convertedData[key] = {
        title,
        model,
        type: sortedTypes[0].type,
        createdAt: sortedTypes[0].date,
        allTypes: types, // Conserver tous les types pour référence
      };

      logger.debug(
        `Réaction convertie pour ${key}, type principal: ${sortedTypes[0].type}`
      );
    }
  });

  logger.info(
    "Données de réactions converties:",
    Object.keys(convertedData).length
  );
  return convertedData;
};

/**
 * Fusionne les données de réactions, de partages et de vues
 */
export const mergeData = (
  reactionsData: {
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
  },
  sharesData: {
    [key: string]: {
      title: {
        title: string;
        locale: string;
      }[];
      model: "Blog" | "Project";
      createdAt: Date;
    };
  },
  viewsData: {
    [key: string]: {
      title: {
        title: string;
        locale: string;
      }[];
      model: "Blog" | "Project";
      createdAt: Date;
    };
  }
) => {
  logger.info("Fusion des données");
  logger.debug(`- Réactions: ${Object.keys(reactionsData).length}`);
  logger.debug(`- Partages: ${Object.keys(sharesData).length}`);
  logger.debug(`- Vues: ${Object.keys(viewsData).length}`);

  // Convertir les réactions pour la fusion
  const processedReactionsData = convertReactionsForMerge(reactionsData);

  // Créer un tableau pour stocker toutes les données fusionnées
  let mergedData = [];

  // Ajouter les réactions avec le type correct
  const reactionsItems = Object.keys(processedReactionsData).map((key) => ({
    ...processedReactionsData[key],
    typeData: "reaction",
    id: key,
  }));
  mergedData.push(...reactionsItems);
  logger.debug(`${reactionsItems.length} éléments de réactions ajoutés`);

  // Ajouter les partages avec le type correct
  const sharesItems = Object.keys(sharesData).map((key) => ({
    ...sharesData[key],
    typeData: "shareOrView", // Utiliser "shareOrView" pour être compatible avec CardShare
    id: key,
  }));
  mergedData.push(...sharesItems);
  logger.debug(`${sharesItems.length} éléments de partages ajoutés`);

  // Ajouter les vues avec le type correct
  const viewsItems = Object.keys(viewsData).map((key) => ({
    ...viewsData[key],
    typeData: "view",
    id: key,
  }));
  mergedData.push(...viewsItems);
  logger.debug(`${viewsItems.length} éléments de vues ajoutés`);

  // Tri des données par date (plus récentes en premier)
  const sortedData = mergedData.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  logger.info(`Total après fusion: ${sortedData.length} éléments`);
  return sortedData;
};
