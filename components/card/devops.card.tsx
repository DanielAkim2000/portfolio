export type DevopsCardProps = {
  index: number;
  title: string;
  description: string;
  isClicked: boolean;
  setIsClicked: (index: number) => void;
};

export const DevopsCard = (props: DevopsCardProps) => {
  return (
    <button
      type="button"
      onClick={() => props.setIsClicked(props.index)}
      className={`w-full border-2 p-4 flex flex-col items-start rounded-lg ${
        props.isClicked ? "border-primary" : ""
      }`}
    >
      <div className="hidden lg:flex">
        <span className="text-slate-700 dark:text-slate-200">
          {props.index}
        </span>
      </div>
      <p className={`${props.isClicked ? "text-primary" : ""} font-bold mb-1`}>
        {props.title}
      </p>
      <p className="text-sm text-slate-600 text-start dark:text-slate-400">
        {props.description}
      </p>
    </button>
  );
};
