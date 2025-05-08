import {
  getAllViewsKey,
  getAllShareKey,
  extractDateFromKey,
  isDateInLast24Hours,
} from "./localStorage";
import { ReactionType } from "@/prisma/generated";

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
  console.log("[action-center] Traitement des données de vues");
  const viewsKeys = getAllViewsKey();
  console.log("[action-center] Clés de vues trouvées:", viewsKeys.length);

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
    console.log(
      `[action-center] Pour l'ID ${key}, ${views.length} vues trouvées`
    );

    views.forEach((view) => {
      const dateStr = extractDateFromKey(view);
      if (dateStr && verifyDate(new Date(dateStr))) {
        dataWithOtherData[key] = {
          ...data[key],
          model: view.includes("blog") ? "Blog" : "Project",
          createdAt: new Date(dateStr),
        };
        console.log(
          `[action-center] Vue ajoutée pour ${key}, date: ${dateStr}`
        );
      }
    });
  });

  console.log(
    "[action-center] Données de vues traitées:",
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
  console.log("[action-center] Traitement des données de partage");
  const sharesKeys = getAllShareKey();
  console.log("[action-center] Clés de partage trouvées:", sharesKeys.length);

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
    console.log(
      `[action-center] Pour l'ID ${key}, ${shares.length} partages trouvés`
    );

    shares.forEach((share) => {
      const dateStr = extractDateFromKey(share);
      if (dateStr && verifyDate(new Date(dateStr))) {
        dataWithOtherData[key] = {
          ...data[key],
          model: share.includes("blog") ? "Blog" : "Project",
          createdAt: new Date(dateStr),
        };
        console.log(
          `[action-center] Partage ajouté pour ${key}, date: ${dateStr}`
        );
      }
    });
  });

  console.log(
    "[action-center] Données de partage traitées:",
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
  console.log("[action-center] Filtrage des réactions des dernières 24h");

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
      console.log(
        `[action-center] ${recentTypes.length} réactions récentes pour ${key}`
      );
    }
  });

  console.log(
    "[action-center] Réactions filtrées:",
    Object.keys(dataFiltered).length
  );
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
  console.log("[action-center] Conversion des réactions pour la fusion");

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

      console.log(
        `[action-center] Réaction convertie pour ${key}, type principal: ${sortedTypes[0].type}`
      );
    }
  });

  console.log(
    "[action-center] Données de réactions converties:",
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
  console.log("[action-center] Fusion des données");
  console.log(
    `[action-center] - Réactions: ${Object.keys(reactionsData).length}`
  );
  console.log(`[action-center] - Partages: ${Object.keys(sharesData).length}`);
  console.log(`[action-center] - Vues: ${Object.keys(viewsData).length}`);

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
  console.log(
    `[action-center] ${reactionsItems.length} éléments de réactions ajoutés`
  );

  // Ajouter les partages avec le type correct
  const sharesItems = Object.keys(sharesData).map((key) => ({
    ...sharesData[key],
    typeData: "shareOrView", // Utiliser "shareOrView" pour être compatible avec CardShare
    id: key,
  }));
  mergedData.push(...sharesItems);
  console.log(
    `[action-center] ${sharesItems.length} éléments de partages ajoutés`
  );

  // Ajouter les vues avec le type correct
  const viewsItems = Object.keys(viewsData).map((key) => ({
    ...viewsData[key],
    typeData: "view",
    id: key,
  }));
  mergedData.push(...viewsItems);
  console.log(`[action-center] ${viewsItems.length} éléments de vues ajoutés`);

  // Tri des données par date (plus récentes en premier)
  const sortedData = mergedData.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  console.log(
    `[action-center] Total après fusion: ${sortedData.length} éléments`
  );
  return sortedData;
};
