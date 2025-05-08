import CardTil from "@/components/card/til/card-til";
import { Til, Title } from "@/prisma/generated";
import { useLocale } from "next-intl";
import { type SerializeResult } from "next-mdx-remote-client/serialize";

interface TilProps {
  til: (Til & { title: Title[]; additionalInfo: SerializeResult })[];
}

const SectionTil = ({ til }: TilProps) => {
  const locale = useLocale();
  // regroup til by date
  const dataSection = til.reduce((acc, item) => {
    // 10 Janvier 2025
    const dateKey = item.date.toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    acc[dateKey] = [
      ...(acc[dateKey] || []),
      {
        ...item,
        additionalInfo: item.additionalInfo,
      },
    ];
    return acc;
  }, {} as Record<string, (Til & { title: Title[]; additionalInfo: SerializeResult })[]>);

  return (
    <section className="mt-10 min-h-screen max-w-full flex flex-col gap-0 w-full">
      {Object.entries(dataSection).map(([date, data], index) => (
        <CardTil
          key={data[0].id + index}
          data={data.map((item) => ({
            title:
              item.title.find((title) => title.locale === locale)?.title ?? "",
            tags: item.tags,
            code: item.code,
            description:
              item.title.find((title) => title.locale === locale)?.subtitle ??
              "",
            officialLink: item.linkDoc ?? "",
            additionalInfo: item.additionalInfo,
            language: item.language,
          }))}
          date={date}
        />
      ))}
    </section>
  );
};

export default SectionTil;
