/**
 * Utilitaires pour la gestion du localStorage
 */

/**
 * fonction générique pour récupérer les clés du localStorage selon un filtre
 */
export const getLocalStorageKeys = (filter: (key: string) => boolean) => {
  if (typeof window === "undefined") return [];
  return Array.from({ length: localStorage.length }, (_, i) =>
    localStorage.key(i)
  ).filter((key): key is string => key !== null && filter(key));
};

/**
 * récupère toutes les clés de partage ou de vues
 */
export const getAllShareOrViewKey = () =>
  getLocalStorageKeys(
    (key) => key.endsWith("_shared") || key.endsWith("_viewed")
  );

/**
 * récupère toutes les clés de partage
 */
export const getAllShareKey = () =>
  getLocalStorageKeys((key) => key.endsWith("_shared"));

/**
 * récupère toutes les clés de vues
 */
export const getAllViewsKey = () =>
  getLocalStorageKeys((key) => key.endsWith("_viewed"));

/**
 * extrait l'ID d'une clé de localStorage
 */
export const getIdFromKey = (key: string) => {
  return key.split("_")[1];
};

/**
 * extrait la date d'une clé de localStorage
 */
export const extractDateFromKey = (key: string) => {
  return localStorage.getItem(key) || "";
};

/**
 * vérifie si une date est dans les dernières 24 heures
 */
export const isDateInLast24Hours = (date: Date) => {
  const DATE_24H = new Date(Date.now() - 1000 * 60 * 60 * 24);
  return date > DATE_24H;
};
