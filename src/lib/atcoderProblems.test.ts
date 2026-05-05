import { describe, expect, it } from "vitest";
import { sortAcRankSummaries, type AcRankSummary } from "./atcoderProblems";

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
