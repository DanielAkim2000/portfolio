import { TitleBlock } from "@/components/block/title.block";
import { DoubleQuoteIcon } from "@/components/icons/double-quote.icon";
import {
  SectionCardDevOps1,
  SectionCardDevOps2,
} from "@/components/sections/home/devops.section";
import { HomeSectionsMe } from "@/components/sections/home/me.sections";

const TextCoffee = () => {
  return (
    <div className="flex flex-row justify-center max-w-full mt-20 mb-20 gap-0">
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
          <span className="font-extrabold p-0 px-1 rounded bg-slate-100 text-slate-600 dark:text-slate-300  dark:bg-slate-800">
            Magic.
          </span>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="">
      <HomeSectionsMe />
      <TextCoffee />
      <div className="flex flex-col lg:flex-row lg:gap-4 mb-20">
        <SectionCardDevOps1 />
        <SectionCardDevOps2 />
      </div>
      <div className="flex flex-col gap-10 lg:gap-20">
        <div>
          <TitleBlock
            title="Robust & Scalable"
            subtitle="Structured Logic with Focus on Performance and Security."
            description="Designing modular, secure APIs with scalable architecture, prioritizing clean code and efficient data flow."
          />
        </div>
        <div>
          <TitleBlock
            title="Reliable & Automated"
            subtitle="Infrastructure as Code with Seamless CI/CD."
            description="Emphasizing automation, monitoring, and reliability to ensure smooth deployments and maintain high system uptime."
          />
        </div>
      </div>
    </div>
  );
}
