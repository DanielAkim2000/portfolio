export type WasmProgram = {
  /** URL du fichier .js généré par Emscripten (dans public/wasm) */
  script: string;
  /** Nom de la fabrique exportée (-sEXPORT_NAME) */
  factory: string;
};

export type WasmRunResult = {
  stdout: string;
  stderr: string;
  exitCode: number;
};

export async function runWasm({
  program,
  args = [],
  stdin = "",
  timeoutMs = 5000,
}: {
  program: WasmProgram;
  args?: string[];
  stdin?: string;
  timeoutMs?: number;
}): Promise<WasmRunResult> {
  // Un worker neuf par exécution : état propre, et on peut le tuer si le programme boucle
  const worker = new Worker("/wasm/runner-worker.js");

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      worker.terminate();
      reject(new Error("RUN_TIMEOUT"));
    }, timeoutMs);

    worker.onmessage = ({ data }) => {
      clearTimeout(timer);
      worker.terminate();
      if (data.ok) {
        resolve({
          stdout: data.stdout,
          stderr: data.stderr,
          exitCode: data.exitCode,
        });
      } else {
        reject(new Error(data.error));
      }
    };
    worker.onerror = (event) => {
      clearTimeout(timer);
      worker.terminate();
      reject(new Error(event.message || "RUN_FAILED"));
    };

    worker.postMessage({ ...program, args, stdin });
  });
}
