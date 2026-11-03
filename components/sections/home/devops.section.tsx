"use client";

import { TitleBlock } from "@/components/block/title.block";
import { BaseCard, handleClick } from "@/components/card/base.card";
import { useTranslations } from "next-intl";
import { useState } from "react";

const SectionCardDevOps1 = () => {
  const t = useTranslations("home");
  const [isClicked, setIsClicked] = useState([false, false, false, false]);

  return (
    <div className="flex-1">
      <div className="px-6 md:px-12 ml-auto mr-auto max-w-[75rem] mb-6">
        <TitleBlock
          title={t("foundations_title")}
          subtitle={t("foundations_subtitle")}
          description={t("foundations_description")}
        />
      </div>
      <div className="flex flex-col gap-4 mb-6">
        <BaseCard
          index={0}
          title={t("card_algorithms")}
          description={t("card_algorithms_description")}
          isClicked={isClicked[0]}
          setIsClicked={() =>
            handleClick({
              index: 0,
              setIsClicked,
              isClicked,
            })
          }
        />
        <BaseCard
          index={1}
          title={t("card_memory_systems")}
          description={t("card_memory_systems_description")}
          isClicked={isClicked[1]}
          setIsClicked={() =>
            handleClick({
              index: 1,
              setIsClicked,
              isClicked,
            })
          }
        />
        <BaseCard
          index={2}
          title={t("card_concurrency")}
          description={t("card_concurrency_description")}
          isClicked={isClicked[2]}
          setIsClicked={() =>
            handleClick({
              index: 2,
              setIsClicked,
              isClicked,
            })
          }
        />
        <BaseCard
          index={3}
          title={t("card_code_quality")}
          description={t("card_code_quality_description")}
          isClicked={isClicked[3]}
          setIsClicked={() =>
            handleClick({
              index: 3,
              setIsClicked,
              isClicked,
            })
          }
        />
      </div>
    </div>
  );
};

const SectionCardDevOps2 = () => {
  const t = useTranslations("home");
  const [isClicked, setIsClicked] = useState([false, false, false, false]);

  return (
    <div className="flex-1">
      <div className="px-6 md:px-12 ml-auto mr-auto max-w-[75rem] mb-6">
        <TitleBlock
          title={t("web_apps_title")}
          subtitle={t("web_apps_subtitle")}
          description={t("web_apps_description")}
        />
      </div>
      <div className="flex flex-col gap-4 mb-6">
        <BaseCard
          index={0}
          title={t("card_modern_ui")}
          description={t("card_modern_ui_description")}
          isClicked={isClicked[0]}
          setIsClicked={() =>
            handleClick({
              index: 0,
              setIsClicked,
              isClicked,
            })
          }
        />
        <BaseCard
          index={1}
          title={t("card_mobile_apps")}
          description={t("card_mobile_apps_description")}
          isClicked={isClicked[1]}
          setIsClicked={() =>
            handleClick({
              index: 1,
              setIsClicked,
              isClicked,
            })
          }
        />
        <BaseCard
          index={2}
          title={t("card_apis_services")}
          description={t("card_apis_services_description")}
          isClicked={isClicked[2]}
          setIsClicked={() =>
            handleClick({
              index: 2,
              setIsClicked,
              isClicked,
            })
          }
        />
        <BaseCard
          index={3}
          title={t("card_web_craft")}
          description={t("card_web_craft_description")}
          isClicked={isClicked[3]}
          setIsClicked={() =>
            handleClick({
              index: 3,
              setIsClicked,
              isClicked,
            })
          }
        />
      </div>
    </div>
  );
};
export { SectionCardDevOps1, SectionCardDevOps2 };
