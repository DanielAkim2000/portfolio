import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createId = (title: string) =>
  title.toLowerCase().replace(/\s+/g, "-");

// function pour avoir n text selon ca fait combien de temps qui c est passé // a few seconds ago, 15 minutes ago, 19 hours ago
export const getTimeText = (date: Date, locale: string) => {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - new Date(date).getTime());
  const diffMinutes = Math.ceil(diffTime / (1000 * 60));
  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
  return diffHours > 1
    ? `${
        locale === "fr"
          ? `il y a ${diffHours} heures`
          : `${diffHours} hours ago`
      }`
    : diffMinutes > 1
    ? `${
        locale === "fr"
          ? `il y a ${diffMinutes} minutes`
          : `a ${diffMinutes} minutes ago`
      }`
    : `${locale === "fr" ? "il y a quelques secondes" : "a few seconds ago"}`;
};
