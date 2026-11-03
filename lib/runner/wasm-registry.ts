import type { WasmProgram } from "./wasm-run";

export type WasmRunnerConfig = {
  /** Sert à retrouver les textes : runner_<id>_label et runner_<id>_note dans messages/*.json */
  id: string;
  program: WasmProgram;
  /** Programme optionnel qui valide la sortie (ex. checker de push_swap) */
  checker?: WasmProgram;
  /** "args" : la saisie devient les arguments du programme ; "stdin" : elle devient son entrée standard */
  input: "args" | "stdin";
  sample: string;
  /** Nombre de valeurs entières distinctes proposées par le bouton « aléatoire » (mode args) */
  randomCount?: number;
};

// Clé : titre français du projet. Les .wasm viennent de scripts/build-wasm.sh.
export const wasmRunners: Record<string, WasmRunnerConfig> = {
  push_swap: {
    id: "push_swap",
    program: { script: "/wasm/push_swap/push_swap.js", factory: "createPushSwap" },
    checker: { script: "/wasm/push_swap/checker.js", factory: "createChecker" },
    input: "args",
    sample: "4 67 3 87 23",
    randomCount: 100,
  },
  Libft: {
    id: "libft",
    program: { script: "/wasm/libft/libft_demo.js", factory: "createLibftDemo" },
    input: "stdin",
    sample: [
      "strlen|Hello 42",
      "atoi|  -42abc",
      "itoa|-2147483648",
      "strchr|hello world|o",
      "substr|portfolio|4|5",
      "strjoin|ft_|printf",
      "strtrim|--abc--|-",
      "split|a,b,,c|,",
      "toupper|a",
    ].join("\n"),
  },
  ft_printf: {
    id: "ft_printf",
    program: { script: "/wasm/ft_printf/ft_printf_demo.js", factory: "createFtPrintfDemo" },
    input: "stdin",
    sample: ["%d|42", "%05d|-42", "%-6d|42", "%+d|42", "%.3s|Hello", "%10s|Hello", "%x|255", "%#X|255", "%u|4294967295", "%c|x"].join("\n"),
  },
  get_next_line: {
    id: "get_next_line",
    program: { script: "/wasm/get_next_line/gnl_demo.js", factory: "createGnlDemo" },
    input: "stdin",
    sample: "Bonjour\nget_next_line lit une ligne à la fois\n\ndernière ligne, sans retour à la ligne",
  },
};
