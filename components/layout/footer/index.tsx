import { useTranslations } from "next-intl";

export const Footer = () => {
  const t = useTranslations("footer");
  return (
    <footer className="mt-40 pt-4 px-4 xl:max-w-7xl max-w-6xl mx-auto text-sm">
      <div className="flex flex-col-reverse lg:flex-row gap-10 lg:gap-0 mb-20">
        <div className="lg:w-1/2">
          <ul>
            <li className="text-slate-600 dark:text-slate-400 mb-4 font-semibold">
              {t("about_me")}
            </li>
            <li className="sm:max-w-md">{t("about_description")}</li>
          </ul>
        </div>
        <div className="lg:w-1/2 flex items-start">
          <ul className="flex-1">
            <li className="text-slate-600 dark:text-slate-400 mb-4 font-semibold">
              {t("work")}
            </li>
            <li className="text-md font-semibold mb-2">{t("contact")}</li>
            <li className="text-md font-semibold mb-2">{t("experience")}</li>
            <li className="text-md font-semibold mb-2">
              {t("skills_and_tools")}
            </li>
            <li className="text-md font-semibold mb-2">{t("studio")}</li>
          </ul>
          <ul className="flex-1">
            <li className="text-slate-600 dark:text-slate-400 mb-4 font-semibold">
              {t("learn")}
            </li>
            <li className="text-md font-semibold mb-2">{t("docs")}</li>
            <li className="text-md font-semibold mb-2">{t("personal_blog")}</li>
            <li className="text-md font-semibold mb-2">{t("til")}</li>
          </ul>
        </div>
      </div>
      <div className="flex justify-between text-xs border-t py-6 border-slate-200 dark:border-slate-700">
        <span className="font-bold">{t("copyright")}</span>
        <span>{t("github_updates")}</span>
      </div>
    </footer>
  );
};
