type GistFile = {
  raw_url?: string;
};

type GistResponse = {
  files: Record<string, GistFile>;
};

export async function fetchMemberIds(gistId: string): Promise<string[]> {
  const rawUrl = await getCachedRawUrl(gistId);
  const text = await fetch(`${rawUrl}?t=${Date.now()}`).then((res) => {
    if (!res.ok) {
      throw new Error("Gistの内容の取得に失敗しました");
    }

    return res.text();
  });

  return parseMemberIds(text);
}

async function getCachedRawUrl(gistId: string): Promise<string> {
  const cachedRawUrl = localStorage.getItem(gistId);

  if (cachedRawUrl) {
    return cachedRawUrl;
  }

  const rawUrl = await fetchRawUrl(gistId);
  localStorage.setItem(gistId, rawUrl);
  return rawUrl;
}

async function fetchRawUrl(gistId: string): Promise<string> {
  const res = await fetch(`https://api.github.com/gists/${gistId}`);

  if (!res.ok) {
    throw new Error("Gistの取得に失敗しました");
  }

  const data = (await res.json()) as GistResponse;
  const firstFile = Object.values(data.files)[0];
  const rawUrl = firstFile?.raw_url;

  if (!rawUrl) {
    throw new Error("Gistの内容が正しくありません");
  }

  return rawUrl.split("/raw/")[0] + "/raw/";
}

function parseMemberIds(text: string): string[] {
  return Array.from(
    new Set(
      text
        .split("\n")
        .map((s) => s.trim())
        .filter((s) => /^[a-zA-Z0-9_]+$/.test(s)),
    ),
  );
}
