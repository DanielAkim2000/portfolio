export type TitleBlockProps = {
  title: string;
  subtitle: string;
  description?: string;
};

export const TitleBlock = (props: TitleBlockProps) => {
  return (
    <>
      <h2 className="text-primary font-extrabold">{props.title}</h2>
      <p className="text-slate-700 dark:text-slate-200 text-3xl lg:text-4xl mb-4 font-extrabold">
        {props.subtitle}
      </p>
      {props.description ? (
        <p className="max-w-lg">{props.description}</p>
      ) : null}
    </>
  );
};
