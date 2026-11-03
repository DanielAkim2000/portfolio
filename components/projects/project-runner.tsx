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
import { fetchGithubRunnerSources } from "@/lib/runner/github-sources";
import { runWithPiston } from "@/lib/runner/piston-client";
import { Hammer, Loader2, Terminal } from "lucide-react";

type ProjectRunnerProps = {
  githubUrl: string;
  language: "c" | "cpp";
  branch: string;
  files: string[];
  sampleStdin?: string | null;
};

export function ProjectRunner({
  githubUrl,
  language,
  branch,
  files,
  sampleStdin,
}: ProjectRunnerProps) {
  const t = useTranslations("projects/id");
  const [open, setOpen] = useState(false);
  const [stdin, setStdin] = useState(sampleStdin ?? "");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRun() {
    setIsRunning(true);
    setError(null);
    setOutput("");

    try {
      setOutput(`$ make && ./program\n${t("runner_fetching_sources")}\n`);

      const sources = await fetchGithubRunnerSources({
        githubUrl,
        branch,
        files,
      });

      setOutput((current) => `${current}${t("runner_compiling")}\n`);

      const result = await runWithPiston({
        language,
        files: sources,
        stdin,
      });

      const lines = [
        result.compileStdout,
        result.compileStderr,
        result.stdout,
        result.stderr,
        result.exitCode !== null
          ? `\n[exit ${result.exitCode}${result.signal ? `, signal ${result.signal}` : ""}]`
          : "",
      ]
        .filter(Boolean)
        .join("\n");

      setOutput((current) => `${current}${lines}`);
    } catch (runError) {
      const message =
        runError instanceof Error ? runError.message : "UNKNOWN_ERROR";

      if (message.startsWith("SOURCE_FETCH_FAILED:")) {
        setError(
          t("runner_error_source_fetch", { file: message.split(":")[1] ?? "" })
        );
        return;
      }

      const errorKey =
        message === "INVALID_GITHUB_URL"
          ? "runner_error_invalid_github"
          : message === "NO_SOURCE_FILES"
            ? "runner_error_no_sources"
            : message === "PISTON_REQUEST_FAILED"
              ? "runner_error_piston"
              : "runner_error_generic";

      setError(t(errorKey));
    } finally {
      setIsRunning(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="lg">
          <Hammer />
          <span>{t("make")}</span>
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
              htmlFor="runner-stdin"
              className="text-sm font-medium text-foreground"
            >
              {t("runner_stdin_label")}
            </label>
            <Textarea
              id="runner-stdin"
              value={stdin}
              onChange={(event) => setStdin(event.target.value)}
              rows={4}
              className="font-mono text-sm"
              placeholder={t("runner_stdin_placeholder")}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={handleRun} disabled={isRunning}>
              {isRunning ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Hammer />
              )}
              <span>{isRunning ? t("runner_running") : t("runner_run")}</span>
            </Button>
          </div>

          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}

          <pre className="max-h-96 overflow-auto rounded-lg border bg-muted/40 p-4 font-mono text-sm whitespace-pre-wrap">
            {output || t("runner_output_placeholder")}
          </pre>

          <p className="text-xs text-muted-foreground">{t("runner_note")}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
