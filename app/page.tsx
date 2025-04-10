import { DoubleQuoteIcon } from "@/components/icons/double-quote.icon";
import SectionCardDevOps1 from "@/components/sections/home/devops1.section";
import { HomeSectionsMe } from "@/components/sections/home/me.sections";

const TextCoffee = () => {
  return (
    <div className="flex flex-row justify-center max-w-full mt-20 gap-0 mb-10">
      <div className="h-full items-end -mt-2 md:-mt-7 lg:-mt-14">
        <DoubleQuoteIcon />
      </div>
      <div className="text-3xl md:text-4xl lg:text-6xl flex flex-col gap-1 text-slate-500 dark:text-slate-400">
        <i className="">Development: Turning</i>
        <div className="flex flex-row items-center gap-2">
          <div className="w-6 h-0.5 bg-slate-400 dark:bg-slate-600" />
          <span className="font-extrabold text-slate-600 dark:text-slate-300">
            Coffee
          </span>
          <span className="">into</span>
          <span className="font-extrabold text-slate-600 dark:text-slate-300">
            Code
          </span>
          <div className="w-6 h-0.5 bg-slate-400 dark:bg-slate-600" />
        </div>
        <div>
          <span>then </span>
          <span className="font-extrabold p-0.5 rounded bg-slate-100 text-slate-600 dark:text-slate-300  dark:bg-slate-800">
            Magic.
          </span>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="mx-4">
      <HomeSectionsMe />
      <TextCoffee />
      <div className="px-6 md:px-12 ml-auto mr-auto max-w-[75rem] mb-6">
        <h2 className="text-primary font-extrabold">
          Backend (Secure & performant)
        </h2>
        <p className="text-slate-700 dark:text-slate-200 text-3xl lg:text-4xl mb-4 font-extrabold">
          Resilient, Modular & High-Performance Architecture.
        </p>
        <p className="max-w-lg">
          Build robust systems with clean logic, optimized for speed,
          scalability, and security
        </p>
      </div>
      <SectionCardDevOps1 />
    </div>
  );
}
