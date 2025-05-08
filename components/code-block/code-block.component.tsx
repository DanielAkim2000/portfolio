"use client";

import { useState } from "react";
import { Highlight, themes, type Language } from "prism-react-renderer";
import { cn } from "@/lib/utils";
import { useCurrentTheme } from "@/hooks/useCurrentTheme";
import copy from "copy-to-clipboard";
import { ClipboardCheckIcon, ClipboardIcon } from "lucide-react";

interface CodeBlockProps {
  readonly code: string;
  readonly language: Language;
  readonly showLineNumbers?: boolean;
  readonly className?: string;
  readonly highlightLines?: readonly number[];
}

export function CodeBlock({ code, language, className }: CodeBlockProps) {
  const resolvedTheme = useCurrentTheme();
  const isDark = resolvedTheme === "dark";
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    if (isCopied) return;

    copy(code.trim());
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 5000);
  };

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
          <pre
            className={cn(className, "text-sm p-4 overflow-x-auto w-full")}
            style={{
              ...style,
              maxWidth: "100%",
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
                    const { key: tokenKeyProp, ...tokenProps } = getTokenProps({
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
        )}
      </Highlight>
    </div>
  );
}
