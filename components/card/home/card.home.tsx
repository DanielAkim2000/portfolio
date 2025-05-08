import { CodeIcon, HeartIcon, Stars } from "lucide-react";

const Icon = (iconName: string) => {
  switch (iconName) {
    case "star":
      return <Stars fill="white" color="white" />;
    case "heart":
      return <HeartIcon fill="white" color="white" />;
    case "code":
      return <CodeIcon color="white" />;
  }
};

const bgStyleIcon = (iconName: string) => {
  switch (iconName) {
    case "star":
      return "bg-amber-300 dark:bg-amber-900";
    case "heart":
      return "bg-pink-300 dark:bg-pink-900";
    case "code":
      return "bg-sky-300 dark:bg-sky-900";
  }
};

const CardHome = ({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-row max-w-96 border rounded-lg flex-1 bg-white dark:bg-slate-900">
      {/* Ce parent devient le conteneur relatif */}
      <div className="w-8 border-r">
        <div className="w-8 h-8 border-b relative">
          <div
            className={`w-12 h-12 ${bgStyleIcon(
              icon
            )}  rounded-full absolute left-full top-full transform -translate-x-1/2 -translate-y-1/2 z-10`}
          >
            <div className="flex items-center justify-center w-full h-full">
              {Icon(icon)}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="border-b h-8 relative">
          <div className="rounded-full bg-slate-100 dark:bg-slate-800 absolute left-0 top-full transform -translate-y-1/2 w-11/12 pl-8 py-1.5">
            <span className="font-bold text-sm truncate ml-2">{title}</span>
          </div>
        </div>

        <div className="p-6  text-sm text-slate-600 dark:text-slate-400">
          {description}
        </div>
      </div>
    </div>
  );
};

export default CardHome;
