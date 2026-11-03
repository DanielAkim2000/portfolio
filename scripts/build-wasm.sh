#!/usr/bin/env bash
# Compile les projets 42 exécutables dans le navigateur (WebAssembly, via Emscripten dans Docker).
# Les sorties sont commitées dans public/wasm : le build du site n'a pas besoin d'Emscripten.
#
#   scripts/build-wasm.sh            compile tout
#   scripts/build-wasm.sh push_swap  compile un seul projet
set -euo pipefail

cd "$(dirname "$0")/.."
OUT="$PWD/public/wasm"
DEMOS="$PWD/scripts/wasm-demos"
WORK="${WASM_WORKDIR:-$(mktemp -d)}"
IMAGE="emscripten/emsdk:6.0.13"
GITHUB="https://github.com/DanielAkim2000"

COMMON_FLAGS=(-O2 -sMODULARIZE=1 -sENVIRONMENT=worker -sINVOKE_RUN=0 -sEXIT_RUNTIME=1
  -sEXPORTED_RUNTIME_METHODS=callMain -sALLOW_MEMORY_GROWTH=1 -sSTACK_SIZE=1048576 -Wall)

fetch() { # <repo> <dossier>
  rm -rf "$WORK/$2" && git clone -q --depth 1 "$GITHUB/$1.git" "$WORK/$2"
  echo "$2 @ $(git -C "$WORK/$2" rev-parse --short HEAD)"
}

emcc() { # <dossier> <args emcc...>
  local dir="$1"; shift
  docker run --rm -u "$(id -u):$(id -g)" -v "$WORK:/src" -v "$OUT:/out" -v "$DEMOS:/demos:ro" -w "/src/$dir" "$IMAGE" emcc "$@"
}

build_push_swap() {
  fetch push_swap push_swap
  mkdir -p "$OUT/push_swap"
  local libft=$(cd "$WORK/push_swap" && ls libft/*.c | tr '\n' ' ')
  local common="pile_utils.c push_swap_actions.c push_swap_actions2.c push_swap_utils.c push_swap_utils2.c
    execution_turk.c execution_turk2.c index_and_cost.c initialise_utils.c target_node.c
    parser/parser_utils.c parser/parser_utils2.c parser/parser.c
    lis/compute_lis_lenghts.c lis/make_lis_keep.c lis/move_stack_except_below.c"
  # shellcheck disable=SC2086
  emcc push_swap "${COMMON_FLAGS[@]}" -sEXPORT_NAME=createPushSwap -I. $common push_swap.c $libft -o /out/push_swap/push_swap.js
  # shellcheck disable=SC2086
  emcc push_swap "${COMMON_FLAGS[@]}" -sEXPORT_NAME=createChecker -I. $common tester.c tester_utils.c \
    get_next_line/get_next_line.c get_next_line/get_next_line_utils.c $libft -o /out/push_swap/checker.js
}

# Les projets sans main (bibliothèques) sont compilés avec un petit programme de démo (scripts/wasm-demos).
build_libft() {
  fetch libft-42 libft-42
  mkdir -p "$OUT/libft"
  local sources=$(cd "$WORK/libft-42" && ls ft_*.c | tr '\n' ' ')
  # shellcheck disable=SC2086
  emcc libft-42 "${COMMON_FLAGS[@]}" -sEXPORT_NAME=createLibftDemo -I. /demos/libft_demo.c $sources -o /out/libft/libft_demo.js
}

build_ft_printf() {
  fetch ft_printf ft_printf
  mkdir -p "$OUT/ft_printf"
  # ft_printabs / ft_intabslen stockent l'entier dans un « long » et testent == 2147483648 : cela suppose
  # un long de 64 bits (Linux x86_64). En WebAssembly il fait 32 bits et -INT_MIN déborde (« --2147483648 »).
  # Correctif appliqué à la copie compilée seulement ; le dépôt n'est pas modifié.
  sed -i 's/(long)/(long long)/g; s/^\tlong\tx;/\tlong long\tx;/' "$WORK/ft_printf/ft_int_utils.c"
  local sources=$(cd "$WORK/ft_printf" && ls ft_*.c libft/ft_*.c | tr '\n' ' ')
  # shellcheck disable=SC2086
  emcc ft_printf "${COMMON_FLAGS[@]}" -sEXPORT_NAME=createFtPrintfDemo -I. /demos/ft_printf_demo.c $sources -o /out/ft_printf/ft_printf_demo.js
}

build_get_next_line() {
  fetch get_next_line get_next_line
  mkdir -p "$OUT/get_next_line"
  emcc get_next_line "${COMMON_FLAGS[@]}" -sEXPORT_NAME=createGnlDemo -DBUFFER_SIZE=42 -I. \
    /demos/gnl_demo.c get_next_line.c get_next_line_utils.c -o /out/get_next_line/gnl_demo.js
}

# Modules C++ 00 à 09 : un programme par exercice (cppNN/exNN/*.cpp), compilés en C++98 avec exceptions.
# Exclus : cpp01/ex04 et cpp09/ex00, qui lisent des fichiers que le visiteur n'a pas.
build_cpp() {
  mkdir -p "$OUT/cpp"
  local n
  for n in 00 01 02 03 04 05 06 07 08 09; do fetch "cpp$n" "cpp$n"; done
  docker run --rm -u "$(id -u):$(id -g)" -v "$WORK:/src" -v "$OUT:/out" -w /src "$IMAGE" bash -c '
    set -e
    for dir in cpp*/ex*; do
      case "$dir" in cpp01/ex04|cpp09/ex00) continue ;; esac
      mod=${dir%%/*}; ex=${dir##*/}
      name=${mod}_${ex}
      factory="createCpp${mod#cpp}Ex${ex#ex}"
      em++ -O2 -std=c++98 -fexceptions -sMODULARIZE=1 -sENVIRONMENT=worker -sINVOKE_RUN=0 -sEXIT_RUNTIME=1 \
        -sEXPORTED_RUNTIME_METHODS=callMain -sALLOW_MEMORY_GROWTH=1 -sEXPORT_NAME="$factory" -I"$dir" \
        "$dir"/*.cpp -o /out/cpp/$name.js 2>&1 | grep -E "error" || true
      [ -f /out/cpp/$name.wasm ] && echo "ok  $name" || echo "ECHEC $name"
    done'
}

targets=("${@:-push_swap libft ft_printf get_next_line cpp}")
read -ra targets <<<"${targets[*]}"
for t in "${targets[@]}"; do "build_$t"; done
ls -la "$OUT"/*/
