import { describe, expect, it } from "vitest";
import { findAdjacentQuestions } from "./find-adjacent-questions";

const questions = [
  { id: "a", questioner_name: "議員A" },
  { id: "b", questioner_name: "議員B" },
  { id: "c", questioner_name: "議員C" },
];

describe("findAdjacentQuestions", () => {
  it("中間の質問は前後両方を返す", () => {
    const { prev, next } = findAdjacentQuestions(questions, "b");
    expect(prev?.id).toBe("a");
    expect(next?.id).toBe("c");
  });

  it("先頭の質問は prev が null", () => {
    const { prev, next } = findAdjacentQuestions(questions, "a");
    expect(prev).toBeNull();
    expect(next?.id).toBe("b");
  });

  it("末尾の質問は next が null", () => {
    const { prev, next } = findAdjacentQuestions(questions, "c");
    expect(prev?.id).toBe("b");
    expect(next).toBeNull();
  });

  it("見つからない場合は両方 null", () => {
    expect(findAdjacentQuestions(questions, "x")).toEqual({
      prev: null,
      next: null,
    });
  });

  it("1件だけの場合は両方 null", () => {
    expect(findAdjacentQuestions([questions[0]], "a")).toEqual({
      prev: null,
      next: null,
    });
  });
});
