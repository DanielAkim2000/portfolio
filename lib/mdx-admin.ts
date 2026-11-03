import fs from "fs/promises";
import path from "path";

const contentRoot = path.join(process.cwd(), "content");

export async function readMdxFile(
  locale: string,
  type: "blog" | "projects",
  filename: string
) {
  const filePath = path.join(contentRoot, locale, type, `${filename}.mdx`);
  try {
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
  const dirPath = path.join(contentRoot, locale, type);
  const filePath = path.join(dirPath, `${filename}.mdx`);
  await fs.mkdir(dirPath, { recursive: true });
  await fs.writeFile(filePath, content, "utf-8");
}

export async function deleteMdxFile(
  locale: string,
  type: "blog" | "projects",
  filename: string
) {
  const filePath = path.join(contentRoot, locale, type, `${filename}.mdx`);
  try {
    await fs.unlink(filePath);
  } catch {
    // fichier absent
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
