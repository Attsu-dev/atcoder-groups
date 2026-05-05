import { describe, expect, it } from "vitest";
import { parseMemberIds } from "./gist";

describe("parseMemberIds", () => {
  it("keeps valid AtCoder ids in order", () => {
    expect(parseMemberIds("tourist\nBenq\nchokudai")).toEqual([
      "tourist",
      "Benq",
      "chokudai",
    ]);
  });

  it("trims blank lines and removes duplicated ids", () => {
    expect(parseMemberIds("\n tourist \n\nBenq\ntourist\n")).toEqual([
      "tourist",
      "Benq",
    ]);
  });

  it("ignores invalid ids", () => {
    expect(parseMemberIds("valid_user\ninvalid-user\ninvalid user\nabc123")).toEqual([
      "valid_user",
      "abc123",
    ]);
  });
});
