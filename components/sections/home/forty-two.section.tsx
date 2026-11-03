"use client";

import CardHome from "@/components/card/home/card.home";
import { TitleBlock } from "@/components/block/title.block";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function Section42Highlights() {
  const t = useTranslations("home");

  return (
    <div className="mb-20">
      <TitleBlock
        title={t("forty_two_focus")}
        subtitle={t("forty_two_focus_subtitle")}
      />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <CardHome
          icon="code"
          title={t("systems_programming")}
          description={t("systems_programming_description")}
        />
        <CardHome
          icon="heart"
          title={t("algorithms_concurrency")}
          description={t("algorithms_concurrency_description")}
        />
        <CardHome
          icon="star"
          title={t("networks_devops")}
          description={t("networks_devops_description")}
        />
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button asChild size="lg">
          <Link href="/projects">{t("forty_two_cta")}</Link>
        </Button>
        <p className="text-sm text-muted-foreground">{t("forty_two_cta_hint")}</p>
      </div>
    </div>
  );
}
