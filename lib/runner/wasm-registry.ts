import type { WasmProgram } from "./wasm-run";

export type WasmRunnerConfig = {
  program: WasmProgram;
  /** Programme optionnel qui valide la sortie (ex. checker de push_swap) */
  checker?: WasmProgram;
  sampleArgs: string;
  /** Nombre de valeurs entières distinctes proposées par le bouton « aléatoire » */
  randomCount: number;
};

// Clé : titre français du projet. Les .wasm viennent de scripts/build-wasm.sh.
export const wasmRunners: Record<string, WasmRunnerConfig> = {
  push_swap: {
    program: { script: "/wasm/push_swap/push_swap.js", factory: "createPushSwap" },
    checker: { script: "/wasm/push_swap/checker.js", factory: "createChecker" },
    sampleArgs: "4 67 3 87 23",
    randomCount: 100,
  },
};
