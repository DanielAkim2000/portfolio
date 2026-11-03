"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { runWasm } from "@/lib/runner/wasm-run";
import type { WasmRunnerConfig } from "@/lib/runner/wasm-registry";
import { Dices, Loader2, Play, Terminal } from "lucide-react";

const MAX_ARGS = 1000;

type Result = {
  /** Renseigné seulement quand un checker valide la sortie (push_swap) */
  moves: number | null;
  verdict: string | null;
  output: string;
  errors: string;
};

function randomDistinctNumbers(count: number) {
  const numbers = new Set<number>();
  while (numbers.size < count) {
    numbers.add(Math.floor(Math.random() * 2000) - 1000);
  }
  return [...numbers].join(" ");
}

export function WasmRunner({ config }: { config: WasmRunnerConfig }) {
  const t = useTranslations("projects/id");
  const [open, setOpen] = useState(false);
  const [variantIndex, setVariantIndex] = useState(0);
  const variant = config.variants[variantIndex];
  const [input, setInput] = useState(variant.sample);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const groups = [...new Set(config.variants.map((item) => item.group ?? ""))];

  function selectVariant(index: number) {
    setVariantIndex(index);
    setInput(config.variants[index].sample);
    setResult(null);
    setError(null);
  }

  async function handleRun() {
    const args =
      variant.input === "args"
        ? variant.argsMode === "single"
          ? [input.trim()]
          : input.split(/\s+/).filter(Boolean)
        : [];
    if (args.length > MAX_ARGS) {
      setError(t("runner_error_too_many", { max: MAX_ARGS }));
      return;
    }

    setIsRunning(true);
    setError(null);
    setResult(null);

    try {
      const run = await runWasm({
        program: variant.program,
        args,
        stdin: variant.input === "stdin" ? input : "",
      });

      if (!variant.checker) {
        setResult({
          moves: null,
          verdict: null,
          output: run.stdout,
          errors: run.stderr.trim(),
        });
        return;
      }

      if (run.exitCode !== 0) {
        setError(t("runner_error_invalid"));
        return;
      }

      const check = await runWasm({
        program: variant.checker,
        args,
        stdin: run.stdout,
      });

      setResult({
        moves: run.stdout.split("\n").filter(Boolean).length,
        verdict: check.stdout.trim() || check.stderr.trim() || null,
        output: run.stdout,
        errors: run.stderr.trim(),
      });
    } catch (runError) {
      setError(
        runError instanceof Error && runError.message === "RUN_TIMEOUT"
          ? t("runner_error_timeout")
          : t("runner_error_generic")
      );
    } finally {
      setIsRunning(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="lg">
          <Play />
          <span>{t("runner_open")}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Terminal className="size-5" />
            {t("runner_title")}
          </DialogTitle>
          <DialogDescription>{t("runner_description")}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {config.variants.length > 1 && (
            <div className="space-y-2">
              <label
                htmlFor="runner-variant"
                className="text-sm font-medium text-foreground"
              >
                {t("runner_cpp_exercise")}
              </label>
              <select
                id="runner-variant"
                value={variantIndex}
                onChange={(event) => selectVariant(Number(event.target.value))}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {groups.map((group) => (
                  <optgroup key={group} label={group}>
                    {config.variants.map(
                      (item, index) =>
                        (item.group ?? "") === group && (
                          <option key={item.id} value={index}>
                            {item.label}
                          </option>
                        )
                    )}
                  </optgroup>
                ))}
              </select>
            </div>
          )}

          {variant.input !== "none" && (
            <div className="space-y-2">
              <label
                htmlFor="runner-input"
                className="text-sm font-medium text-foreground"
              >
                {t(variant.labelKey ?? "runner_cpp_label_args")}
              </label>
              <Textarea
                id="runner-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                rows={variant.input === "stdin" ? 9 : 3}
                className="font-mono text-sm"
              />
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button onClick={handleRun} disabled={isRunning}>
              {isRunning ? <Loader2 className="animate-spin" /> : <Play />}
              <span>{isRunning ? t("runner_running") : t("runner_run")}</span>
            </Button>
            {variant.randomCount && (
              <Button
                variant="outline"
                onClick={() =>
                  setInput(randomDistinctNumbers(variant.randomCount ?? 0))
                }
                disabled={isRunning}
              >
                <Dices />
                <span>{t("runner_random", { count: variant.randomCount })}</span>
              </Button>
            )}
          </div>

          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}

          {result && (
            <div className="space-y-2">
              {result.moves !== null && (
                <p className="text-sm font-medium text-foreground">
                  {t("runner_moves", { count: result.moves })}
                  {result.verdict &&
                    ` · ${t("runner_checker", { result: result.verdict })}`}
                </p>
              )}
              {result.errors && (
                <p className="font-mono text-sm whitespace-pre-wrap text-destructive">
                  {result.errors}
                </p>
              )}
              <pre className="max-h-72 overflow-auto rounded-lg border bg-muted/40 p-4 font-mono text-sm whitespace-pre-wrap">
                {result.output ||
                  t(variant.checker ? "runner_output_empty" : "runner_no_output")}
              </pre>
            </div>
          )}

          <p className="text-xs text-muted-foreground">{t(variant.noteKey)}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
