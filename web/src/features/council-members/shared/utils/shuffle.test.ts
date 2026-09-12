import { describe, expect, it } from "vitest";
import { shuffle } from "./shuffle";

describe("shuffle", () => {
  it("returns an array with the same length", () => {
    const input = [1, 2, 3, 4, 5];
    expect(shuffle(input)).toHaveLength(input.length);
  });

  it("returns an array containing exactly the same elements", () => {
    const input = ["a", "b", "c", "d"];
    const result = shuffle(input);
    expect([...result].sort()).toEqual([...input].sort());
  });

  it("does not mutate the original array", () => {
    const input = [1, 2, 3];
    const original = [...input];
    shuffle(input);
    expect(input).toEqual(original);
  });

  it("handles an empty array", () => {
    expect(shuffle([])).toEqual([]);
  });

  it("handles a single-element array", () => {
    expect(shuffle([1])).toEqual([1]);
  });
});
