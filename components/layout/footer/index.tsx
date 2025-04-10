export type FooterProps = {};

export const Footer = (props: FooterProps) => {
  return (
    <footer className="flex flex-col-reverse lg:flex-row gap-10 lg:gap-0 p-4">
      <div className="lg:w-1/2">
        <ul>
          <li className="text-zinc-600 dark:text-zinc-400 mb-4">About Me</li>
          <li className="sm:max-w-md">
            I'm Emane Daniel Akim, A{" "}
            <span className="font-bold">full-stack developer</span> who loves
            developing and designing intuitive, clean, and modern technologies.
          </li>
        </ul>
      </div>
      <div className="lg:w-1/2 flex items-start">
        <ul className="flex-1">
          <li className="text-zinc-600 dark:text-zinc-400 mb-4">Work</li>
          <li>Contact</li>
          <li>Experience</li>
          <li>Skills and Tools</li>
          <li>Studio</li>
        </ul>
        <ul className="flex-1">
          <li className="text-zinc-600 dark:text-zinc-400 mb-4">Learn</li>
          <li>Docs</li>
          <li>Personnal Blog</li>
          <li>T.I.L</li>
        </ul>
      </div>
    </footer>
  );
};
