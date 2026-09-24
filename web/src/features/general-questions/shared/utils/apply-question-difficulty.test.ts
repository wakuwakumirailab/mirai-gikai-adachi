import { describe, expect, it } from "vitest";
import type { GeneralQuestion } from "../types";
import { applyQuestionDifficulty } from "./apply-question-difficulty";

const base: GeneralQuestion = {
  id: "q1",
  council_session_id: "s1",
  questioner_name: "テスト議員",
  questioner_party: null,
  questioner_number: 1,
  session_day: 1,
  question_order: 1,
  summary: "詳しい全体要約",
  summary_easy: "やさしい全体要約",
  topics: [
    {
      title: "保育の充実",
      question_summary: "詳しい質問",
      answer_summary: "詳しい答弁",
      question_summary_easy: "やさしい質問",
      answer_summary_easy: "やさしい答弁",
      answerer_role: "子ども家庭部長",
      answerer_name: "A",
    },
    {
      title: "耐震化の推進",
      question_summary: "詳しい質問2",
      answer_summary: "詳しい答弁2",
      answerer_role: "建築室長",
      answerer_name: "B",
    },
  ],
  raw_text: null,
  source_url: null,
  publish_status: "published",
  created_at: "2026-04-01T00:00:00Z",
  updated_at: "2026-04-01T00:00:00Z",
};

describe("applyQuestionDifficulty", () => {
  it("normal ではやさしい版を使う", () => {
    const result = applyQuestionDifficulty(base, "normal");
    expect(result.summary).toBe("やさしい全体要約");
    expect(result.topics[0].question_summary).toBe("やさしい質問");
    expect(result.topics[0].answer_summary).toBe("やさしい答弁");
  });

  it("normal でもやさしい版がないトピックは詳しい版を使う", () => {
    const result = applyQuestionDifficulty(base, "normal");
    expect(result.topics[1].question_summary).toBe("詳しい質問2");
    expect(result.topics[1].answer_summary).toBe("詳しい答弁2");
  });

  it("normal で summary_easy が空なら summary を使う", () => {
    const result = applyQuestionDifficulty(
      { ...base, summary_easy: null },
      "normal"
    );
    expect(result.summary).toBe("詳しい全体要約");
  });

  it("hard では詳しい版をそのまま使う", () => {
    const result = applyQuestionDifficulty(base, "hard");
    expect(result.summary).toBe("詳しい全体要約");
    expect(result.topics[0].question_summary).toBe("詳しい質問");
    expect(result.topics[0].answer_summary).toBe("詳しい答弁");
  });

  it("タイトル・答弁者は難易度で変わらない", () => {
    const result = applyQuestionDifficulty(base, "normal");
    expect(result.topics[0].title).toBe("保育の充実");
    expect(result.topics[0].answerer_role).toBe("子ども家庭部長");
  });

  it("元のオブジェクトを書き換えない", () => {
    applyQuestionDifficulty(base, "normal");
    expect(base.summary).toBe("詳しい全体要約");
    expect(base.topics[0].answer_summary).toBe("詳しい答弁");
  });
});
