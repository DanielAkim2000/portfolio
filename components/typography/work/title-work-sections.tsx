const TitleWorkSections = ({ title, id }: { title: string; id: string }) => {
  return (
    <h2
      id={`${id}`}
      className="text-3xl font-extrabold text-slate-700 dark:text-slate-300 mb-5"
    >
      {title}
    </h2>
  );
};

export default TitleWorkSections;
