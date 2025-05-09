import { TitleBlock } from "@/components/block/title.block";
import { DoubleQuoteIcon } from "@/components/icons/double-quote.icon";
import {
  SectionCardDevOps1,
  SectionCardDevOps2,
} from "@/components/sections/home/devops.section";
import { HomeSectionsMe } from "@/components/sections/home/me.sections";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("home");

  return {
    title: "Akim Emane - Portfolio",
    description: `${t("i'm")} Akim Emane, ${t("full_stack_developer")} ${t(
      "passionate_about_it"
    )}`,
  };
}

const TextCoffee = ({ t }: { t: (param: string) => string }) => {
  return (
    <div className="flex flex-row justify-center max-w-full mt-20 mb-20 gap-0">
      <div className="h-full items-end -mt-2 md:-mt-7 lg:-mt-14">
        <DoubleQuoteIcon />
      </div>
      <div className="text-3xl md:text-4xl lg:text-6xl flex flex-col gap-1 text-slate-500 dark:text-slate-400">
        <i className="">{t("development")}</i>
        <div className="flex flex-row items-center gap-2">
          <div className="w-6 h-0.5 bg-slate-400 dark:bg-slate-600" />
          <span className="font-extrabold text-slate-600 dark:text-slate-300">
            {t("coffee")}
          </span>
          <span className="">{t("into")}</span>
          <span className="font-extrabold text-slate-600 dark:text-slate-300">
            {t("code")}
          </span>
          <div className="w-6 h-0.5 bg-slate-400 dark:bg-slate-600" />
        </div>
        <div>
          <span>{t("then")} </span>
          <span className="font-extrabold p-0 px-1 rounded bg-slate-100 text-slate-600 dark:text-slate-300  dark:bg-slate-800">
            {t("magic")}.
          </span>
        </div>
      </div>
    </div>
  );
};

export default async function HomePage() {
  const t = await getTranslations("home");
  return (
    <div className="">
      <HomeSectionsMe />
      <TextCoffee t={t} />
      <div className="flex flex-col lg:flex-row lg:gap-4 mb-20">
        <SectionCardDevOps1 />
        <SectionCardDevOps2 />
      </div>
      <div className="flex flex-col gap-10 lg:gap-20">
        <div>
          <TitleBlock
            title={t("secure_and_reliable")}
            subtitle={t(
              "structured_logic_with_focus_on_performance_and_security"
            )}
            description={t("secure_and_reliable_description")}
          />
        </div>
        <div>
          <TitleBlock
            title={t("reliable_and_automated")}
            subtitle={t("infrastructure_as_code_with_seamless_ci_cd")}
            description={t(
              "emphasizing_automation_monitoring_and_reliability_to_ensure_smooth_deployments_and_maintain_high_system_uptime"
            )}
          />
        </div>
      </div>
    </div>
  );
}
