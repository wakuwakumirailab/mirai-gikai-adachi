import { describe, expect, it } from "vitest";
import type { GeneralQuestion } from "../types";
import { summarizeSessionQuestions } from "./summarize-session-questions";

function question(id: string, titles: string[]): GeneralQuestion {
  return {
    id,
    council_session_id: "s",
    questioner_name: id,
    questioner_party: null,
    questioner_number: null,
    question_type: "general",
    session_day: 1,
    question_order: 1,
    summary: null,
    topics: titles.map((title) => ({
      title,
      question_summary: "q",
      answer_summary: "a",
      answerer_role: "区長",
      answerer_name: "A",
    })),
    raw_text: null,
    source_url: null,
    publish_status: "published",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  };
}

describe("summarizeSessionQuestions", () => {
  it("議員数・トピック数・上位テーマを数える", () => {
    const summary = summarizeSessionQuestions([
      question("a", ["保育所の待機児童対策", "産後ケアの拡充", "耐震化助成"]),
      question("b", ["保育園の入園申込み", "避難所のトイレ対策"]),
    ]);
    expect(summary.questionerCount).toBe(2);
    expect(summary.topicCount).toBe(5);
    expect(summary.topThemes[0]).toEqual({ label: "子育て・保育", count: 3 });
    expect(summary.topThemes[1]).toEqual({ label: "防災・安全", count: 2 });
    expect(summary.otherThemeCount).toBe(0);
  });

  it("上位に入らなかったテーマ数を数える", () => {
    const summary = summarizeSessionQuestions(
      [
        question("a", [
          "保育所の待機児童対策",
          "耐震化助成",
          "ワクチン接種の助成",
          "予算編成と財政運営",
        ]),
      ],
      2
    );
    expect(summary.topThemes).toHaveLength(2);
    expect(summary.otherThemeCount).toBe(2);
  });

  it("質問がなければ空", () => {
    expect(summarizeSessionQuestions([])).toEqual({
      questionerCount: 0,
      topicCount: 0,
      topThemes: [],
      otherThemeCount: 0,
    });
  });
});
