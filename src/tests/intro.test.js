import { describe, expect, it } from "vitest";
import { max } from "../intro";

describe("max", () => {
  it("should return the first argument if it is greater", () => {
    expect(max(3, 2)).toBe(3);
  });

  it("should return the second argument if it is greater", () => {
    expect(max(3, 4)).toBe(4);
  });

  it("should return the first argument if arguments are equal", () => {
    expect(max(1, 1)).toBe(1);
  });
});
