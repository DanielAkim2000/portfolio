import type { MDXComponents } from "mdx/types";
import { Separator } from "@/components/ui/separator";
import TitleWorkSections from "@/components/typography/work/title-work-sections";
import { createId } from "@/lib/utils";
import { CodeBlock } from "./components/code-block/code-block.component";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Paragraphes
    p: ({ children }) => (
      <p className="text-slate-600 dark:text-slate-400 mb-4">{children}</p>
    ),

    // Listes
    ul: ({ children }) => (
      <ul className="list-disc list-inside pl-5 my-5">{children}</ul>
    ),

    // Éléments de liste
    li: ({ children }) => (
      <li className="text-slate-600 dark:text-slate-400">{children}</li>
    ),

    // Titres
    h1: ({ children }) => (
      <TitleWorkSections
        title={children as string}
        id={createId(children as string)}
      />
    ),

    h2: ({ children }) => (
      <TitleWorkSections
        title={children as string}
        id={createId(children as string)}
      />
    ),

    // Séparateurs
    hr: () => <Separator className="my-5" />,

    // Wrapper pour les sections
    section: ({ children }) => (
      <div className="my-5 text-slate-600 dark:text-slate-400">{children}</div>
    ),

    // Code
    code: ({ children, className }) => {
      // Si c'est un bloc de code avec une langue spécifiée (format: language-xxx)
      if (className?.includes("language-")) {
        const language = className.replace("language-", "");
        return (
          <div className="my-5 flex w-full">
            <CodeBlock
              language={language}
              code={children as string}
              className="mb-10 w-fit max-w-full"
            />
          </div>
        );
      }

      // Sinon, c'est du code en ligne
      return (
        <code className="bg-slate-100 dark:bg-slate-800 rounded px-1 py-0.5 text-sm">
          {children}
        </code>
      );
    },

    ...components,
  };
}
