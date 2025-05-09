import { AnimatedTitleBlock } from "@/components/animated/title-block.animated";
import StickySidebar from "@/components/sidebar/sticky-sidebar";
import TitleWorkSections from "@/components/typography/work/title-work-sections";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StickyBarWrapper } from "@/components/wrapper/sticky-bar-wrapper";
import TitleBlockWrapper from "@/components/wrapper/title-block.wrapper";
import { createId } from "@/lib/utils";
import { LinkIcon, MailIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { JSX } from "react";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contact");

  return {
    title: `${t("title")} | Akim Emane`,
    description: t("subtitle"),
  };
}

const TableContact = ({
  head,
  body,
}: {
  head: string[];
  body: {
    item: string;
    detail: string | JSX.Element;
  }[];
}) => {
  return (
    <div className="rounded-lg border overflow-hidden">
      <Table className="lg:text-lg w-full">
        <TableHeader>
          <TableRow>
            {head.map((item, index) => (
              <TableHead
                key={index}
                className={`text-slate-600 dark:text-slate-400 font-bold pl-5 ${
                  index === 0 ? "bg-tertiary/50" : ""
                }`}
              >
                {item}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {body.map((item, index) => (
            <TableRow key={index} className="">
              <TableCell className="text-slate-600 dark:text-slate-400 pl-5 bg-tertiary/50">
                {item.item}
              </TableCell>
              <TableCell className="text-slate-600 dark:text-slate-400 pl-5">
                {item.detail}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default async function ContactPage() {
  const t = await getTranslations("contact");
  return (
    <div>
      <TitleBlockWrapper>
        <AnimatedTitleBlock
          variant="tertiary"
          lowTitle={t("work")}
          title={t("title")}
          subtitle={t("subtitle")}
        />
      </TitleBlockWrapper>
      <StickyBarWrapper>
        <div className="mt-10 lg:border-l lg:pl-5 text-lg lg:text-xl w-full">
          <div className="my-5 flex flex-col gap-2">
            <p>
              {t("reminder_start")}{" "}
              <span className="font-bold text-foreground">
                {t("business_purposes")}{" "}
              </span>
              {t("reminder_end")}
            </p>
            <br />
            <p>{t("understanding")}</p>
          </div>
          <Separator />
          <div className="my-5 flex flex-col gap-2">
            <TitleWorkSections
              title={t("contact_section")}
              id={createId("Contact")}
            />
            <TableContact
              head={[t("contact_section"), t("detail")]}
              body={[
                {
                  item: t("address"),
                  detail: "Joué-lès-Tours, France",
                },
                {
                  item: t("timezone"),
                  detail: "GMT+1",
                },
                {
                  item: t("email"),
                  detail: (
                    <a
                      href="mailto:emanedanielakim@gmail.com"
                      className="flex items-center gap-2 text-tertiary hover:text-tertiary/80"
                    >
                      <MailIcon size={18} />
                      emanedanielakim@gmail.com
                    </a>
                  ),
                },
              ]}
            />
          </div>
          <Separator />
          <div className="my-5 flex flex-col gap-2">
            <TitleWorkSections
              title={t("social_media")}
              id={createId("SocialMedia")}
            />
            <p className="mb-5">
              {t("social_media_text")}{" "}
              <strong className="text-foreground">{t("username")}</strong>
              {t("username_info")}
            </p>
            <TableContact
              head={[t("social_media"), t("link")]}
              body={[
                {
                  item: "LinkedIn",
                  detail: (
                    <a
                      href="http://linkedin.com/in/daniel-akim-emane-ab5700286"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-tertiary hover:text-tertiary/80"
                    >
                      linkedin.com/in/daniel-akim-emane-ab5700286
                      <LinkIcon size={18} />
                    </a>
                  ),
                },
                {
                  item: "GitHub",
                  detail: (
                    <a
                      href="https://github.com/DanielAkim2000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-tertiary hover:text-tertiary/80"
                    >
                      github.com/DanielAkim2000
                      <LinkIcon size={18} />
                    </a>
                  ),
                },
                {
                  item: "Instagram",
                  detail: (
                    <a
                      href="https://www.instagram.com/akim_emane"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-tertiary hover:text-tertiary/80"
                    >
                      instagram.com/akim_emane
                      <LinkIcon size={18} />
                    </a>
                  ),
                },
              ]}
            />
          </div>
        </div>
        <StickySidebar
          variant="tertiary"
          sections={[
            {
              title: t("contact_section"),
              id: createId("Contact"),
              isTitle: true,
            },
            {
              title: t("social_media"),
              id: createId("SocialMedia"),
              isTitle: true,
            },
          ]}
        />
      </StickyBarWrapper>
    </div>
  );
}
