import { describe, expect, it } from "vitest";
import { extractGistId } from "./url";

describe("extractGistId", () => {
  it("extracts a gist id from a gist URL", () => {
    expect(
      extractGistId(
        "https://gist.github.com/Attsu-dev/0c3b58a297417e2ee64bf182aec22f91",
      ),
    ).toBe("0c3b58a297417e2ee64bf182aec22f91");
  });

  it("accepts a gist URL with a trailing path", () => {
    expect(
      extractGistId(
        "https://gist.github.com/Attsu-dev/0c3b58a297417e2ee64bf182aec22f91/",
      ),
    ).toBe("0c3b58a297417e2ee64bf182aec22f91");
  });

  it("accepts only a gist id", () => {
    expect(extractGistId(" 0c3b58a297417e2ee64bf182aec22f91 ")).toBe(
      "0c3b58a297417e2ee64bf182aec22f91",
    );
  });

  it("rejects invalid input", () => {
    expect(extractGistId("https://example.com/0c3b58a297417e2ee64bf182aec22f91")).toBeNull();
    expect(extractGistId("not-a-gist")).toBeNull();
  });
});
