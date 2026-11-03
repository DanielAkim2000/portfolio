import type { WasmProgram } from "./wasm-run";
import cppExercises from "./cpp-exercises.json";

export type WasmVariant = {
  id: string;
  /** Libellé dans le sélecteur (affiché seulement s'il y a plusieurs variantes) */
  label: string;
  /** Groupe du sélecteur (ex. « Module 00 ») */
  group?: string;
  program: WasmProgram;
  /** Programme optionnel qui valide la sortie (ex. checker de push_swap) */
  checker?: WasmProgram;
  /** "none" : rien à saisir ; "args" : la saisie devient les arguments ; "stdin" : l'entrée standard */
  input: "none" | "args" | "stdin";
  /** Mode « args » : "split" découpe sur les espaces, "single" passe toute la saisie comme un seul argument */
  argsMode?: "split" | "single";
  sample: string;
  /** Nombre de valeurs entières distinctes proposées par le bouton « aléatoire » (mode args) */
  randomCount?: number;
  /** Clés dans messages/*.json (groupe projects/id) */
  labelKey?: string;
  noteKey: string;
};

export type WasmRunnerConfig = {
  id: string;
  variants: WasmVariant[];
};

const single = (variant: Omit<WasmVariant, "id" | "label"> & { id: string }): WasmRunnerConfig => ({
  id: variant.id,
  variants: [{ ...variant, label: variant.id }],
});

const cppVariants: WasmVariant[] = cppExercises.map((exercise) => ({
  id: exercise.id,
  label: `cpp${exercise.module} · ${exercise.exercise} — ${exercise.name}`,
  group: `Module ${exercise.module}`,
  program: {
    script: `/wasm/cpp/${exercise.id}.js`,
    factory: `createCpp${exercise.module}Ex${exercise.exercise.slice(2)}`,
  },
  input: exercise.input as WasmVariant["input"],
  argsMode: exercise.argsMode as WasmVariant["argsMode"],
  sample: exercise.sample,
  labelKey: exercise.input === "stdin" ? "runner_cpp_label_stdin" : "runner_cpp_label_args",
  noteKey: "runner_cpp_note",
}));

// Clé : titre français du projet. Les .wasm viennent de scripts/build-wasm.sh.
export const wasmRunners: Record<string, WasmRunnerConfig> = {
  push_swap: single({
    id: "push_swap",
    program: { script: "/wasm/push_swap/push_swap.js", factory: "createPushSwap" },
    checker: { script: "/wasm/push_swap/checker.js", factory: "createChecker" },
    input: "args",
    sample: "4 67 3 87 23",
    randomCount: 100,
    labelKey: "runner_push_swap_label",
    noteKey: "runner_push_swap_note",
  }),
  Libft: single({
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
    labelKey: "runner_libft_label",
    noteKey: "runner_libft_note",
  }),
  ft_printf: single({
    id: "ft_printf",
    program: { script: "/wasm/ft_printf/ft_printf_demo.js", factory: "createFtPrintfDemo" },
    input: "stdin",
    sample: ["%d|42", "%05d|-42", "%-6d|42", "%+d|42", "%.3s|Hello", "%10s|Hello", "%x|255", "%#X|255", "%u|4294967295", "%c|x"].join("\n"),
    labelKey: "runner_ft_printf_label",
    noteKey: "runner_ft_printf_note",
  }),
  get_next_line: single({
    id: "get_next_line",
    program: { script: "/wasm/get_next_line/gnl_demo.js", factory: "createGnlDemo" },
    input: "stdin",
    sample: "Bonjour\nget_next_line lit une ligne à la fois\n\ndernière ligne, sans retour à la ligne",
    labelKey: "runner_get_next_line_label",
    noteKey: "runner_get_next_line_note",
  }),
  "CPP-Modules": { id: "cpp", variants: cppVariants },
};
