import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

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
            <li className="text-md font-semibold mb-2">
              <Link
                href="/contact"
                className="hover:text-primary transition-colors"
              >
                {t("contact")}
              </Link>
            </li>
            <li className="text-md font-semibold mb-2">
              <Link
                href="/experience"
                className="hover:text-primary transition-colors"
              >
                {t("experience")}
              </Link>
            </li>
            <li className="text-md font-semibold mb-2">
              <Link
                href="/skills-tools"
                className="hover:text-primary transition-colors"
              >
                {t("skills_and_tools")}
              </Link>
            </li>
            <li className="text-md font-semibold mb-2">
              <Link
                href="/studio"
                className="hover:text-primary transition-colors"
              >
                {t("studio")}
              </Link>
            </li>
          </ul>
          <ul className="flex-1">
            <li className="text-slate-600 dark:text-slate-400 mb-4 font-semibold">
              {t("learn")}
            </li>
            <li className="text-md font-semibold mb-2">
              <Link
                href="/projects"
                className="hover:text-primary transition-colors"
              >
                {t("docs")}
              </Link>
            </li>
            <li className="text-md font-semibold mb-2">
              <Link
                href="/blog"
                className="hover:text-primary transition-colors"
              >
                {t("personal_blog")}
              </Link>
            </li>
            <li className="text-md font-semibold mb-2">
              <Link
                href="/til"
                className="hover:text-primary transition-colors"
              >
                {t("til")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-between text-xs border-t py-6 border-slate-200 dark:border-slate-700">
        <span className="font-bold">{t("copyright")}</span>
        <a
          href="https://github.com/DanielAkim2000"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
        >
          {t("github_updates")}
        </a>
      </div>
    </footer>
  );
};
