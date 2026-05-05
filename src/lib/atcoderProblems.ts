type UserAcRankResponse = {
  count?: unknown;
  rank?: unknown;
};

export type AcRankSummary = {
  userId: string;
  acCount: number | null;
  rank: number | null;
  error?: string;
};

export async function fetchGroupAcRanks(
  userIds: string[],
): Promise<AcRankSummary[]> {
  return Promise.all(userIds.map((userId) => fetchUserAcRank(userId)));
}

export async function fetchUserAcRank(userId: string): Promise<AcRankSummary> {
  try {
    const params = new URLSearchParams({ user: userId });
    const res = await fetch(`/api/ac-rank?${params.toString()}`);

    if (!res.ok) {
      return {
        userId,
        acCount: null,
        rank: null,
        error: "AC数を取得できませんでした",
      };
    }

    const data = (await res.json()) as UserAcRankResponse;

    return {
      userId,
      acCount: toNumberOrNull(data.count),
      rank: toNumberOrNull(data.rank),
    };
  } catch {
    return {
      userId,
      acCount: null,
      rank: null,
      error: "AC数を取得できませんでした",
    };
  }
}

export function sortAcRankSummaries(
  summaries: AcRankSummary[],
): AcRankSummary[] {
  return [...summaries].sort((a, b) => {
    if (a.acCount === null && b.acCount === null) {
      return a.userId.localeCompare(b.userId);
    }

    if (a.acCount === null) {
      return 1;
    }

    if (b.acCount === null) {
      return -1;
    }

    if (a.acCount !== b.acCount) {
      return b.acCount - a.acCount;
    }

    return a.userId.localeCompare(b.userId);
  });
}

function toNumberOrNull(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}
