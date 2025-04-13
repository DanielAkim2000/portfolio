export type FooterProps = {};

export const Footer = (props: FooterProps) => {
  return (
    <footer className="mt-40 pt-4 px-4 xl:max-w-7xl max-w-6xl mx-auto text-sm">
      <div className="flex flex-col-reverse lg:flex-row gap-10 lg:gap-0 mb-20">
        <div className="lg:w-1/2">
          <ul>
            <li className="text-slate-600 dark:text-slate-400 mb-4 font-semibold">
              About Me
            </li>
            <li className="sm:max-w-md">
              I'm Emane Daniel Akim, A{" "}
              <span className="font-semibold">full-stack developer</span> who
              loves developing and designing intuitive, clean, and modern
              technologies.
            </li>
          </ul>
        </div>
        <div className="lg:w-1/2 flex items-start">
          <ul className="flex-1">
            <li className="text-slate-600 dark:text-slate-400 mb-4 font-semibold">
              Work
            </li>
            <li className="text-md font-semibold mb-2">Contact</li>
            <li className="text-md font-semibold mb-2">Experience</li>
            <li className="text-md font-semibold mb-2">Skills and Tools</li>
            <li className="text-md font-semibold mb-2">Studio</li>
          </ul>
          <ul className="flex-1">
            <li className="text-slate-600 dark:text-slate-400 mb-4 font-semibold">
              Learn
            </li>
            <li className="text-md font-semibold mb-2">Docs</li>
            <li className="text-md font-semibold mb-2">Personnal Blog</li>
            <li className="text-md font-semibold mb-2">T.I.L</li>
          </ul>
        </div>
      </div>
      <div className="flex justify-between text-xs border-t py-6 border-slate-200 dark:border-slate-700">
        <span className="font-bold">© 2025, Emanedaniel.fr</span>
        <span>see the recent update on GitHub</span>
      </div>
    </footer>
  );
};
