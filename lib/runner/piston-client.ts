import type { RunnerSourceFile } from "./github-sources";

const PISTON_EXECUTE_URL = "https://emkc.org/api/v2/piston/execute";

export type PistonRunResult = {
  stdout: string;
  stderr: string;
  compileStdout: string;
  compileStderr: string;
  exitCode: number | null;
  signal: string | null;
};

export async function runWithPiston({
  language,
  files,
  stdin = "",
  args = [],
}: {
  language: "c" | "cpp";
  files: RunnerSourceFile[];
  stdin?: string;
  args?: string[];
}): Promise<PistonRunResult> {
  const response = await fetch(PISTON_EXECUTE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      language,
      version: "*",
      files,
      stdin,
      args,
      compile_timeout: 10_000,
      run_timeout: 5_000,
    }),
  });

  if (!response.ok) {
    throw new Error("PISTON_REQUEST_FAILED");
  }

  const payload = (await response.json()) as {
    run?: {
      stdout?: string;
      stderr?: string;
      code?: number | null;
      signal?: string | null;
    };
    compile?: {
      stdout?: string;
      stderr?: string;
      code?: number | null;
    };
  };

  return {
    stdout: payload.run?.stdout ?? "",
    stderr: payload.run?.stderr ?? "",
    compileStdout: payload.compile?.stdout ?? "",
    compileStderr: payload.compile?.stderr ?? "",
    exitCode: payload.run?.code ?? null,
    signal: payload.run?.signal ?? null,
  };
}
