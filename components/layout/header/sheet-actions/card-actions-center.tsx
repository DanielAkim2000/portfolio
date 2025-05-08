import { Link } from "@/i18n/navigation";
import { getTimeText } from "@/lib/utils";

export interface CardData {
  title: {
    title: string;
    locale: string;
  }[];
  model: "Blog" | "Project";
  createdAt: Date;
  type?: string;
  allTypes?: {
    type: string;
    date: Date;
  }[];
  id?: string;
  typeData?: string;
}

export interface CardProps {
  data: CardData;
  locale: string;
  id: string;
  close: () => void;
}

const BaseCard = ({
  title,
  date,
  children,
  link,
  close,
  locale,
}: {
  title: string;
  date: Date;
  children: React.ReactNode;
  link: string;
  close: () => void;
  locale: string;
}) => (
  <Link href={link} onClick={close}>
    <div className="rounded-lg border w-full p-4 theme-blur">
      <div className="w-full flex flex-row justify-between">
        <span className="text-sm dark:text-slate-400 text-slate-600 font-semibold">
          {title}
        </span>
        <span className="text-sm dark:text-slate-400 text-slate-600">
          {getTimeText(date, locale)}
        </span>
      </div>
      {children}
    </div>
  </Link>
);

export const CardView = ({ data, locale, id, close }: CardProps) => (
  <BaseCard
    title={locale === "en" ? "VIEW" : "VUE"}
    date={data.createdAt}
    link={data.model === "Blog" ? `/blog/${id}` : `/projects/${id}`}
    close={close}
    locale={locale}
  >
    <div className="w-full flex flex-row mt-4">
      <p className="text-sm dark:text-slate-400 text-slate-600">
        Vous avez vu{" "}
        <span className="text-primary">
          {data.title.find((title) => title.locale === locale)?.title}
        </span>{" "}
        {data.model === "Blog" ? "blog post" : "project"}
      </p>
    </div>
  </BaseCard>
);

export const CardReaction = ({ data, locale, id, close }: CardProps) => {
  const getSmiley = (type: string) => {
    if (type === "CLAPPING") return "👏";
    if (type === "AMAZED") return "🤩";
    if (type === "THINKING") return "🤔";
    return "🔥"; // Emoji par défaut
  };

  // Utiliser type comme type principal pour l'affichage
  const mainType = data.type || "";
  const mainSmiley = getSmiley(mainType);

  // Si nous avons plusieurs types de réactions, les afficher
  const hasMultipleReactions = data.allTypes && data.allTypes.length > 1;

  return (
    <BaseCard
      title="REACTION"
      date={data.createdAt}
      link={data.model === "Blog" ? `/blog/${id}` : `/projects/${id}`}
      close={close}
      locale={locale}
    >
      <div className="w-full flex flex-row mt-4">
        <p className="text-sm dark:text-slate-400 text-slate-600">
          {hasMultipleReactions ? (
            <>
              Le{" "}
              <span className="text-primary">
                {data.title.find((title) => title.locale === locale)?.title}
              </span>{" "}
              {data.model === "Blog" ? "blog post" : "project"} a reçu plusieurs
              réactions{" "}
              <span className="text-primary flex space-x-1">
                {data.allTypes?.map((type, index) => (
                  <span key={index}>{getSmiley(type.type)}</span>
                ))}
              </span>
            </>
          ) : (
            <>
              Le{" "}
              <span className="text-primary">
                {data.title.find((title) => title.locale === locale)?.title}
              </span>{" "}
              {data.model === "Blog" ? "blog post" : "project"} a reçu une
              nouvelle réaction{" "}
              <span className="text-primary">{mainSmiley}</span>
            </>
          )}
        </p>
      </div>
    </BaseCard>
  );
};

export const CardShare = ({ data, locale, id, close }: CardProps) => (
  <BaseCard
    title="SHARE"
    date={data.createdAt}
    link={data.model === "Blog" ? `/blog/${id}` : `/projects/${id}`}
    close={close}
    locale={locale}
  >
    <div className="w-full flex flex-row mt-4">
      <p className="text-sm dark:text-slate-400 text-slate-600">
        Vous avez partagé{" "}
        <span className="text-primary">
          {data.title.find((title) => title.locale === locale)?.title}
        </span>{" "}
        {data.model === "Blog" ? "blog post" : "project"}
      </p>
    </div>
  </BaseCard>
);

// Composant pour l'état vide
export const EmptyRecentActivity = () => (
  <div className="rounded-lg border w-full p-4">
    <p className="text-sm dark:text-slate-400 text-slate-600">
      No recent activity
    </p>
  </div>
);
