import { afterEach, describe, expect, it, vi } from "vitest";
import {
  fetchUserAcRank,
  sortAcRankSummaries,
  type AcRankSummary,
} from "./atcoderProblems";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("fetchUserAcRank", () => {
  it("fetches AC count from AtCoder Problems API", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ count: 1234, rank: 56 }),
    } as Response);

    await expect(fetchUserAcRank("kenkoooo")).resolves.toEqual({
      userId: "kenkoooo",
      acCount: 1234,
      rank: 56,
    });

    expect(fetchMock).toHaveBeenCalledWith("/api/ac-rank?user=kenkoooo");
  });

  it("returns an error summary when the request fails", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("Network error"));

    await expect(fetchUserAcRank("kenkoooo")).resolves.toEqual({
      userId: "kenkoooo",
      acCount: null,
      rank: null,
      error: "AC数を取得できませんでした",
    });
  });
});

describe("sortAcRankSummaries", () => {
  it("sorts users by AC count descending", () => {
    const rankings: AcRankSummary[] = [
      { userId: "b", acCount: 10, rank: 2 },
      { userId: "a", acCount: 30, rank: 1 },
      { userId: "c", acCount: 20, rank: 3 },
    ];

    expect(sortAcRankSummaries(rankings).map((ranking) => ranking.userId)).toEqual([
      "a",
      "c",
      "b",
    ]);
  });

  it("puts unavailable counts after available counts", () => {
    const rankings: AcRankSummary[] = [
      { userId: "missing", acCount: null, rank: null },
      { userId: "valid", acCount: 1, rank: 100 },
    ];

    expect(sortAcRankSummaries(rankings).map((ranking) => ranking.userId)).toEqual([
      "valid",
      "missing",
    ]);
  });
});
