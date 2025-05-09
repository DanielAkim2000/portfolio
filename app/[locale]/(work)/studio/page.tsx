import { AnimatedTitleBlock } from "@/components/animated/title-block.animated";
import StickySidebar from "@/components/sidebar/sticky-sidebar";
import { StickyBarWrapper } from "@/components/wrapper/sticky-bar-wrapper";
import TitleBlockWrapper from "@/components/wrapper/title-block.wrapper";
import { Separator } from "@/components/ui/separator";
import TitleWorkSections from "@/components/typography/work/title-work-sections";
import { createId } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Metadata } from "next";

const CardStudio = ({
  title,
  paragraph,
  id,
}: {
  title: string;
  paragraph: string;
  id: string;
}) => {
  return (
    <div className="flex flex-col gap-2 mt-5" id={id}>
      <h2 className="text-2xl font-extrabold text-slate-700 dark:text-slate-300">
        {title}
      </h2>
      <p className="text-slate-600 dark:text-slate-400 text-md mt-4 mb-4 whitespace-pre-line">
        {paragraph}
      </p>
    </div>
  );
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("studio");

  return {
    title: `${t("title")} | Akim Emane`,
    description: t("description"),
  };
}
export default async function StudioPage() {
  const t = await getTranslations("studio");

  const workstationEquipment = t.raw("equipment_list") as {
    title: string;
    paragraph: string;
  }[];

  return (
    <div>
      <TitleBlockWrapper>
        <AnimatedTitleBlock
          variant="tertiary"
          lowTitle="Work"
          title={t("title")}
          subtitle={t("description")}
        />
      </TitleBlockWrapper>
      <StickyBarWrapper>
        <div className="mt-10 lg:border-l lg:pl-10 text-lg lg:text-xl">
          <div className="my-5">
            <p>
              Voici mon environnement de travail actuel qui me permet de
              développer des applications web et mobiles, ainsi que de gérer mes
              serveurs.
            </p>
          </div>
          <div
            className="my-8 rounded-lg overflow-hidden relative"
            style={{ maxHeight: "500px" }}
          >
            {/* Utilisation d'une balise img standard car Next.js Image ne prend pas en charge le format HEIC nativement */}
            <Image
              src="/studio.png"
              alt="Mon espace de travail"
              className="w-full h-full object-cover rounded-lg"
              width={1000}
              height={1000}
            />
          </div>
          <Separator />
          <div className="my-5 text-slate-600 dark:text-slate-400">
            <TitleWorkSections title={t("equipment")} id="equipment" />
            <p>{t("setup_description")}</p>

            {workstationEquipment.map((item) => {
              const id = createId(item.title);
              return (
                <CardStudio
                  key={id}
                  title={item.title}
                  paragraph={item.paragraph}
                  id={id}
                />
              );
            })}
          </div>
        </div>
        <StickySidebar
          variant="tertiary"
          sections={[
            {
              id: "equipment",
              title: t("equipment"),
              isTitle: true,
            },
            ...workstationEquipment.map((item) => ({
              id: createId(item.title),
              title: item.title,
            })),
          ]}
        />
      </StickyBarWrapper>
    </div>
  );
}
