export function getTitleByLocale<
  T extends {
    locale: string;
    title: string;
    subtitle?: string | null;
    description?: string | null;
  },
>(titles: T[], locale: string) {
  return titles.find((item) => item.locale === locale);
}
