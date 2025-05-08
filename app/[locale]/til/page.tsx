import { getAllTil } from "@/actions/get-all-til";
import { AnimatedTitleBlock } from "@/components/animated/title-block.animated";
import SectionTil from "@/components/sections/T.I.L/til.section";
import TitleBlockWrapper from "@/components/wrapper/title-block.wrapper";
import { getTranslations } from "next-intl/server";
import { serialize } from "next-mdx-remote-client/serialize";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("til");

  return {
    title: `${t("title")} | Akim Emane`,
    description: t("description"),
  };
}

export default async function TilPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("til");
  const til = await getAllTil();
  const tilWithAdditionalInfo = await Promise.all(
    til.map(async (item) => ({
      ...item,
      additionalInfo: await serialize({
        source:
          item.additionalInfo.find((info) => info.locale === locale)?.content ??
          "",
      }),
    }))
  );
  return (
    <div>
      <TitleBlockWrapper>
        <AnimatedTitleBlock
          lowTitle="T.I.L"
          variant="primary"
          title={t("title")}
          subtitle={t("description")}
        />
      </TitleBlockWrapper>
      <SectionTil til={tilWithAdditionalInfo} />
    </div>
  );
}
