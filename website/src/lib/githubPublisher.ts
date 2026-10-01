const GITHUB_API_URL = "https://api.github.com";

type GitHubConfig = {
  token: string;
  owner: string;
  repo: string;
  baseBranch: string;
};

type GitHubRef = {
  ref: string;
  object: {
    sha: string;
    type: string;
    url: string;
  };
};

type GitHubCommit = {
  sha: string;
  tree: {
    sha: string;
  };
};

type GitHubTree = {
  sha: string;
};

type GitHubBlob = {
  sha: string;
};

type GitHubCommitResponse = {
  sha: string;
  html_url: string;
};

type GitHubContentResponse = {
  type: string;
  path: string;
  sha: string;
};

export type ResearchObjectFile = {
  path: string;
  content: string;
};

export type GitHubPublicationResult = {
  owner: string;
  repo: string;
  branch: string;
  commitSha: string;
  commitUrl: string;
  filesPublished: string[];
};

function getGitHubConfig(): GitHubConfig {
  const token = process.env.GITHUB_TOKEN?.trim();

  if (!token) {
    throw new Error("GITHUB_TOKEN is not configured.");
  }

  const repository =
    process.env.GITHUB_REPOSITORY?.trim() || "EcoMicroVerse/platform";

  const repositoryParts = repository.split("/");

  if (
    repositoryParts.length !== 2 ||
    !repositoryParts[0] ||
    !repositoryParts[1]
  ) {
    throw new Error(
      `Invalid GITHUB_REPOSITORY value: ${repository}. Expected owner/repository.`,
    );
  }

  const [owner, repo] = repositoryParts;

  const baseBranch =
    process.env.GITHUB_BASE_BRANCH?.trim() || "main";

  if (!baseBranch) {
    throw new Error("GITHUB_BASE_BRANCH cannot be empty.");
  }

  return {
    token,
    owner,
    repo,
    baseBranch,
  };
}

function githubHeaders(token: string): HeadersInit {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json",
  };
}

async function githubRequest<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const config = getGitHubConfig();

  const response = await fetch(`${GITHUB_API_URL}${path}`, {
    ...init,
    headers: {
      ...githubHeaders(config.token),
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });

  const text = await response.text();

  let body: unknown = null;

  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = text;
    }
  }

  if (!response.ok) {
    const message =
      typeof body === "object" &&
      body !== null &&
      "message" in body &&
      typeof body.message === "string"
        ? body.message
        : `GitHub API request failed with status ${response.status}.`;

    throw new Error(
      `${message} [${response.status} ${response.statusText}]`,
    );
  }

  return body as T;
}

function encodePath(path: string): string {
  return path
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");
}

function validateResearchObjectId(emvId: string): void {
  if (!/^EMV-[A-Z0-9]+\d{4}-\d{4}$/.test(emvId)) {
    throw new Error(
      `Invalid EMV ID for GitHub publication: ${emvId}`,
    );
  }
}

function validateResearchObjectFiles(
  emvId: string,
  files: ResearchObjectFile[],
): void {
  if (!files.length) {
    throw new Error("Cannot publish an empty Research Object.");
  }

  const expectedPrefix = `content/approved/${emvId}/`;
  const seen = new Set<string>();

  for (const file of files) {
    if (!file.path.startsWith(expectedPrefix)) {
      throw new Error(
        `Research Object file is outside the expected directory: ${file.path}`,
      );
    }

    if (
      file.path.includes("..") ||
      file.path.includes("\\") ||
      file.path.startsWith("/") ||
      file.path.includes("//")
    ) {
      throw new Error(
        `Research Object file contains an unsafe path: ${file.path}`,
      );
    }

    if (file.path === expectedPrefix) {
      throw new Error(
        `Research Object file must include a filename: ${file.path}`,
      );
    }

    if (seen.has(file.path)) {
      throw new Error(
        `Duplicate Research Object file path: ${file.path}`,
      );
    }

    if (typeof file.content !== "string") {
      throw new Error(
        `Research Object file content must be text: ${file.path}`,
      );
    }

    seen.add(file.path);
  }
}

async function getBranchRef(
  branch: string,
): Promise<GitHubRef> {
  const config = getGitHubConfig();

  return githubRequest<GitHubRef>(
    `/repos/${config.owner}/${config.repo}/git/ref/heads/${encodeURIComponent(branch)}`,
  );
}

async function getCommit(
  sha: string,
): Promise<GitHubCommit> {
  const config = getGitHubConfig();

  return githubRequest<GitHubCommit>(
    `/repos/${config.owner}/${config.repo}/git/commits/${encodeURIComponent(sha)}`,
  );
}

export async function researchObjectExists(
  emvId: string,
  branch?: string,
): Promise<boolean> {
  validateResearchObjectId(emvId);

  const config = getGitHubConfig();
  const targetBranch = branch?.trim() || config.baseBranch;

  const path = `content/approved/${emvId}`;

  const response = await fetch(
    `${GITHUB_API_URL}/repos/${config.owner}/${config.repo}/contents/${encodePath(path)}?ref=${encodeURIComponent(targetBranch)}`,
    {
      method: "GET",
      headers: githubHeaders(config.token),
      cache: "no-store",
    },
  );

  if (response.status === 404) {
    return false;
  }

  const text = await response.text();

  if (!response.ok) {
    let message = text;

    try {
      const parsed = JSON.parse(text);

      if (
        parsed &&
        typeof parsed.message === "string"
      ) {
        message = parsed.message;
      }
    } catch {
      // Keep the raw response text.
    }

    throw new Error(
      `Unable to check Research Object existence: ${message}`,
    );
  }

  let body:
    | GitHubContentResponse
    | GitHubContentResponse[];

  try {
    body = JSON.parse(text) as
      | GitHubContentResponse
      | GitHubContentResponse[];
  } catch {
    throw new Error(
      "GitHub returned an invalid response while checking Research Object existence.",
    );
  }

  return Array.isArray(body)
    ? body.length > 0
    : body.type === "dir" || body.type === "file";
}

async function createBlob(
  content: string,
): Promise<GitHubBlob> {
  const config = getGitHubConfig();

  return githubRequest<GitHubBlob>(
    `/repos/${config.owner}/${config.repo}/git/blobs`,
    {
      method: "POST",
      body: JSON.stringify({
        content,
        encoding: "utf-8",
      }),
    },
  );
}

async function createTree(
  baseTreeSha: string,
  entries: Array<{
    path: string;
    mode: "100644";
    type: "blob";
    sha: string;
  }>,
): Promise<GitHubTree> {
  const config = getGitHubConfig();

  return githubRequest<GitHubTree>(
    `/repos/${config.owner}/${config.repo}/git/trees`,
    {
      method: "POST",
      body: JSON.stringify({
        base_tree: baseTreeSha,
        tree: entries,
      }),
    },
  );
}

async function createCommit(
  message: string,
  treeSha: string,
  parentSha: string,
): Promise<GitHubCommitResponse> {
  const config = getGitHubConfig();

  return githubRequest<GitHubCommitResponse>(
    `/repos/${config.owner}/${config.repo}/git/commits`,
    {
      method: "POST",
      body: JSON.stringify({
        message,
        tree: treeSha,
        parents: [parentSha],
      }),
    },
  );
}

async function updateBranch(
  branch: string,
  commitSha: string,
  expectedOldSha: string,
): Promise<void> {
  const config = getGitHubConfig();

  /*
   * Re-read the branch immediately before moving it.
   *
   * If another commit reached the branch after our initial read,
   * refuse to publish rather than overwriting that newer history.
   */
  const currentRef = await getBranchRef(branch);

  if (currentRef.object.sha !== expectedOldSha) {
    throw new Error(
      `GitHub branch ${branch} changed during publication. ` +
        `Expected ${expectedOldSha}, found ${currentRef.object.sha}. ` +
        `Publication was refused.`,
    );
  }

  await githubRequest(
    `/repos/${config.owner}/${config.repo}/git/refs/heads/${encodeURIComponent(branch)}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        sha: commitSha,
        force: false,
      }),
    },
  );
}

export async function publishResearchObjectToGitHub(input: {
  emvId: string;
  files: ResearchObjectFile[];
  commitMessage?: string;
}): Promise<GitHubPublicationResult> {
  const config = getGitHubConfig();

  validateResearchObjectId(input.emvId);
  validateResearchObjectFiles(input.emvId, input.files);

  /*
   * Never overwrite an existing Research Object.
   */
  const existsOnBase = await researchObjectExists(
    input.emvId,
    config.baseBranch,
  );

  if (existsOnBase) {
    throw new Error(
      `Research Object ${input.emvId} already exists on ` +
        `${config.baseBranch}. Publication was refused.`,
    );
  }

  /*
   * Read the current base branch.
   */
  const baseRef = await getBranchRef(config.baseBranch);
  const baseCommitSha = baseRef.object.sha;

  const baseCommit = await getCommit(baseCommitSha);
  const baseTreeSha = baseCommit.tree.sha;

  /*
   * Create one blob per Research Object file.
   */
  const entries: Array<{
    path: string;
    mode: "100644";
    type: "blob";
    sha: string;
  }> = [];

  for (const file of input.files) {
    const blob = await createBlob(file.content);

    entries.push({
      path: file.path,
      mode: "100644",
      type: "blob",
      sha: blob.sha,
    });
  }

  /*
   * Create a new tree based on the current base branch.
   *
   * The tree contains the complete existing repository plus
   * the new Research Object files.
   */
  const tree = await createTree(baseTreeSha, entries);

  /*
   * Create exactly one commit.
   */
  const commit = await createCommit(
    input.commitMessage?.trim() ||
      `Publish ${input.emvId}`,
    tree.sha,
    baseCommitSha,
  );

  /*
   * Move the base branch only if nobody changed it while
   * the publication was being prepared.
   */
  await updateBranch(
    config.baseBranch,
    commit.sha,
    baseCommitSha,
  );

  return {
    owner: config.owner,
    repo: config.repo,
    branch: config.baseBranch,
    commitSha: commit.sha,
    commitUrl: commit.html_url,
    filesPublished: input.files.map(
      (file) => file.path,
    ),
  };
}
