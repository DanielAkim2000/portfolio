export type RunnerSourceFile = {
  name: string;
  content: string;
};

export type GithubRepoRef = {
  owner: string;
  repo: string;
};

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

    return { owner, repo: repo.replace(/\.git$/, "") };
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

  if (files.length === 0) {
    throw new Error("NO_SOURCE_FILES");
  }

  const sources = await Promise.all(
    files.map(async (filePath) => {
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
