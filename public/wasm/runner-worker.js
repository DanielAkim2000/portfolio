// Worker générique : charge un module Emscripten, appelle main() avec des arguments et un stdin,
// et renvoie stdout / stderr / code de sortie. Terminé de l'extérieur en cas de dépassement de délai.
self.onmessage = async ({ data }) => {
  const { script, factory, args, stdin } = data;
  try {
    importScripts(script);
    const input = new TextEncoder().encode(stdin ?? "");
    let position = 0;
    let stdout = "";
    let stderr = "";

    const module = await self[factory]({
      print: (line) => { stdout += line + "\n"; },
      printErr: (line) => { stderr += line + "\n"; },
      stdin: () => (position < input.length ? input[position++] : null),
      locateFile: (file) => new URL(file, new URL(script, self.location.href)).href,
    });

    let exitCode = 0;
    try {
      exitCode = module.callMain(args) ?? 0;
    } catch (error) {
      if (error && error.name === "ExitStatus") exitCode = error.status;
      else throw error;
    }
    self.postMessage({ ok: true, stdout, stderr, exitCode });
  } catch (error) {
    self.postMessage({ ok: false, error: String((error && error.message) || error) });
  }
};
