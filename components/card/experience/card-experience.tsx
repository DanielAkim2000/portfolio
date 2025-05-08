const CardExperience = ({
  title,
  period,
  description,
  skills,
  id,
}: {
  title: string;
  period: string;
  description: string;
  skills?: string[];
  id: string;
}) => {
  return (
    <div className="flex flex-col gap-2 mt-5" id={id}>
      <div className="flex flex-row justify-between items-center flex-wrap">
        <h2 className="text-2xl font-extrabold text-slate-700 dark:text-slate-300">
          {title}
        </h2>
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {period}
        </span>
      </div>
      <p className="text-slate-600 dark:text-slate-400 text-md mt-4 mb-4 whitespace-pre-line">
        {description}
      </p>
      {skills && skills.length > 0 && (
        <div className="flex flex-row flex-wrap gap-2 mt-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-medium bg-slate-200 dark:bg-slate-800 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardExperience;
