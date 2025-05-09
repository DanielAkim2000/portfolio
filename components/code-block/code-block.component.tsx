"use client";

import { useState, useEffect } from "react";
import { Highlight, themes, type Language } from "prism-react-renderer";
import { cn } from "@/lib/utils";
import { useCurrentTheme } from "@/hooks/useCurrentTheme";
import copy from "copy-to-clipboard";
import { ClipboardCheckIcon, ClipboardIcon } from "lucide-react";

// Skeleton pour le chargement
const CodeBlockSkeleton = () => (
  <div className="relative rounded-md overflow-hidden shadow-sm flex flex-col w-full animate-pulse lg:max-w-xl">
    <div className="flex items-center justify-between px-4 py-2 bg-slate-200 dark:bg-slate-700 text-xs h-8">
      <div className="w-12 h-4 bg-slate-300 dark:bg-slate-600 rounded"></div>
      <div className="w-6 h-6 bg-slate-300 dark:bg-slate-600 rounded"></div>
    </div>
    <div className="bg-slate-100 dark:bg-slate-800 p-4 ">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="h-4 bg-slate-200 dark:bg-slate-700 rounded my-2 w-full"
          style={{ width: "100%" }}
        ></div>
      ))}
    </div>
  </div>
);

interface CodeBlockProps {
  readonly code: string;
  readonly language: Language;
  readonly showLineNumbers?: boolean;
  readonly className?: string;
  readonly highlightLines?: readonly number[];
}

export function CodeBlock({ code, language, className }: CodeBlockProps) {
  const resolvedTheme = useCurrentTheme();
  const [isCopied, setIsCopied] = useState(false);
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    if (resolvedTheme) {
      setIsThemeLoaded(true);
    }
  }, [resolvedTheme]);

  const copyToClipboard = async () => {
    if (isCopied) return;

    copy(code.trim());
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 5000);
  };

  // Comptage des lignes
  const lineCount = code.trim().split("\n").length;

  if (!isThemeLoaded) {
    return <CodeBlockSkeleton />;
  }

  return (
    <div
      className={cn(
        "relative rounded-md overflow-hidden shadow-sm flex flex-col w-full",
        className
      )}
    >
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 dark:bg-slate-800 text-xs text-slate-200">
        <span className="font-mono font-medium">{language}</span>
        <button
          onClick={copyToClipboard}
          className="flex flex-row items-center"
        >
          {isCopied ? (
            <div className="rounded bg-primary dark:bg-primary/10 mr-1 flex items-center py-1 px-2">
              <span className="text-slate-200 dark:text-primary mr-1 font-semibold">
                Copied !
              </span>
            </div>
          ) : null}
          <div
            className={`p-1 rounded border ${isCopied ? "border-primary" : ""}`}
          >
            {isCopied ? (
              <ClipboardCheckIcon className="text-primary" size={16} />
            ) : (
              <ClipboardIcon
                className="text-slate-200 dark:text-slate-700 hover:border-primary transition-colors "
                size={16}
              />
            )}
          </div>
        </button>
      </div>

      <Highlight
        code={code.trim()}
        language={language}
        theme={isDark ? themes.vsDark : themes.vsLight}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <div className="relative">
            <pre
              className={cn(
                className,
                "text-sm p-4 overflow-x-auto max-w-full"
              )}
              style={{
                ...style,
                overflowWrap: "normal",
              }}
            >
              {tokens.map((line, i) => {
                const { key, ...lineProps } = getLineProps({ line, key: i });
                return (
                  <div
                    key={key as React.Key}
                    {...lineProps}
                    className="whitespace-pre"
                  >
                    {line.map((token, tokenKey) => {
                      const { key: tokenKeyProp, ...tokenProps } =
                        getTokenProps({
                          token,
                          key: tokenKey,
                        });
                      return (
                        <span key={tokenKeyProp as React.Key} {...tokenProps} />
                      );
                    })}
                  </div>
                );
              })}
            </pre>
            <div className="absolute bottom-2 right-2 text-xs text-slate-500 dark:text-slate-400 font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-sm">
              {lineCount} {lineCount === 1 ? "line" : "lines"}
            </div>
          </div>
        )}
      </Highlight>
    </div>
  );
}
