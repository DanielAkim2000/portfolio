import fs from "fs/promises";
import path from "path";

const contentRoot = path.join(process.cwd(), "content");

const LOCALES = ["fr", "en"];
// Lettres, chiffres, espaces, points, tirets et underscores ; ni slash ni ".." ni point initial.
const SAFE_FILENAME = /^(?![.])[\p{L}\p{N} ._-]{1,150}$/u;

function resolveMdxPath(
  locale: string,
  type: "blog" | "projects",
  filename: string
) {
  if (
    !LOCALES.includes(locale) ||
    !SAFE_FILENAME.test(filename) ||
    filename.includes("..")
  ) {
    throw new Error("INVALID_MDX_FILENAME");
  }

  const dirPath = path.join(contentRoot, locale, type);
  const filePath = path.join(dirPath, `${filename}.mdx`);

  if (path.dirname(filePath) !== dirPath) {
    throw new Error("INVALID_MDX_FILENAME");
  }

  return { dirPath, filePath };
}

export async function readMdxFile(
  locale: string,
  type: "blog" | "projects",
  filename: string
) {
  try {
    const { filePath } = resolveMdxPath(locale, type, filename);
    return await fs.readFile(filePath, "utf-8");
  } catch {
    return "";
  }
}

export async function writeMdxFile(
  locale: string,
  type: "blog" | "projects",
  filename: string,
  content: string
) {
  const { dirPath, filePath } = resolveMdxPath(locale, type, filename);
  await fs.mkdir(dirPath, { recursive: true });
  await fs.writeFile(filePath, content, "utf-8");
}

export async function deleteMdxFile(
  locale: string,
  type: "blog" | "projects",
  filename: string
) {
  try {
    const { filePath } = resolveMdxPath(locale, type, filename);
    await fs.unlink(filePath);
  } catch {
    // fichier absent ou nom invalide
  }
}

export async function deleteMdxForAllLocales(
  type: "blog" | "projects",
  filename: string,
  locales: string[] = ["fr", "en"]
) {
  await Promise.all(
    locales.map((locale) => deleteMdxFile(locale, type, filename))
  );
}
