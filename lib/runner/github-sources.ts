export type RunnerSourceFile = {
  name: string;
  content: string;
};

export type GithubRepoRef = {
  owner: string;
  repo: string;
};

const GITHUB_NAME = /^[A-Za-z0-9._-]{1,100}$/;
const GIT_BRANCH = /^[A-Za-z0-9._/-]{1,100}$/;
const SOURCE_PATH = /^[A-Za-z0-9._/-]{1,200}$/;
const MAX_SOURCE_FILES = 20;

function isSafeRelativePath(value: string, pattern: RegExp) {
  return (
    pattern.test(value) &&
    !value.split("/").includes("..") &&
    !value.includes("//")
  );
}

export function parseGithubRepoUrl(url: string): GithubRepoRef | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== "github.com") {
      return null;
    }

    const [owner, repo] = parsed.pathname.split("/").filter(Boolean);
    if (!owner || !repo) {
      return null;
    }

    const cleanRepo = repo.replace(/\.git$/, "");
    if (!GITHUB_NAME.test(owner) || !GITHUB_NAME.test(cleanRepo)) {
      return null;
    }

    return { owner, repo: cleanRepo };
  } catch {
    return null;
  }
}

export function githubRawFileUrl(
  repo: GithubRepoRef,
  branch: string,
  filePath: string
) {
  return `https://raw.githubusercontent.com/${repo.owner}/${repo.repo}/${branch}/${filePath.replace(/^\//, "")}`;
}

export async function fetchGithubRunnerSources({
  githubUrl,
  branch,
  files,
}: {
  githubUrl: string;
  branch: string;
  files: string[];
}): Promise<RunnerSourceFile[]> {
  const repo = parseGithubRepoUrl(githubUrl);
  if (!repo) {
    throw new Error("INVALID_GITHUB_URL");
  }

  if (files.length === 0 || files.length > MAX_SOURCE_FILES) {
    throw new Error("NO_SOURCE_FILES");
  }

  if (!isSafeRelativePath(branch, GIT_BRANCH)) {
    throw new Error("INVALID_GITHUB_URL");
  }

  const sources = await Promise.all(
    files.map(async (filePath) => {
      if (!isSafeRelativePath(filePath.replace(/^\//, ""), SOURCE_PATH)) {
        throw new Error(`SOURCE_FETCH_FAILED:${filePath}`);
      }

      const response = await fetch(
        githubRawFileUrl(repo, branch, filePath)
      );

      if (!response.ok) {
        throw new Error(`SOURCE_FETCH_FAILED:${filePath}`);
      }

      const content = await response.text();
      const name = filePath.split("/").pop() ?? filePath;

      return { name, content };
    })
  );

  return sources;
}
