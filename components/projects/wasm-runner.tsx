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
  const [input, setInput] = useState(config.sample);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleRun() {
    const isArgs = config.input === "args";
    const args = isArgs ? input.split(/\s+/).filter(Boolean) : [];
    if (args.length > MAX_ARGS) {
      setError(t("runner_error_too_many", { max: MAX_ARGS }));
      return;
    }

    setIsRunning(true);
    setError(null);
    setResult(null);

    try {
      const run = await runWasm({
        program: config.program,
        args,
        stdin: isArgs ? "" : input,
      });

      if (!isArgs) {
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

      const lines = run.stdout.split("\n").filter(Boolean);
      let verdict: string | null = null;

      if (config.checker) {
        const check = await runWasm({
          program: config.checker,
          args,
          stdin: run.stdout,
        });
        verdict = check.stdout.trim() || check.stderr.trim() || null;
      }

      setResult({
        moves: lines.length,
        verdict,
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
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Terminal className="size-5" />
            {t("runner_title")}
          </DialogTitle>
          <DialogDescription>{t("runner_description")}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="runner-args"
              className="text-sm font-medium text-foreground"
            >
              {t(`runner_${config.id}_label`)}
            </label>
            <Textarea
              id="runner-args"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              rows={config.input === "stdin" ? 9 : 3}
              className="font-mono text-sm"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={handleRun} disabled={isRunning}>
              {isRunning ? <Loader2 className="animate-spin" /> : <Play />}
              <span>{isRunning ? t("runner_running") : t("runner_run")}</span>
            </Button>
            {config.randomCount && (
              <Button
                variant="outline"
                onClick={() =>
                  setInput(randomDistinctNumbers(config.randomCount ?? 0))
                }
                disabled={isRunning}
              >
                <Dices />
                <span>{t("runner_random", { count: config.randomCount })}</span>
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
                <p className="font-mono text-sm text-destructive">{result.errors}</p>
              )}
              <pre className="max-h-72 overflow-auto rounded-lg border bg-muted/40 p-4 font-mono text-sm whitespace-pre-wrap">
                {result.output || t(config.input === "args" ? "runner_output_empty" : "runner_no_output")}
              </pre>
            </div>
          )}

          <p className="text-xs text-muted-foreground">{t(`runner_${config.id}_note`)}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
