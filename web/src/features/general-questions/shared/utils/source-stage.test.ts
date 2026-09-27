import { describe, expect, it } from "vitest";
import { getSessionSourceStage, getSourceStageNotice } from "./source-stage";

describe("getSessionSourceStage", () => {
  it("すべて正式な会議録なら null", () => {
    expect(
      getSessionSourceStage([
        { source_stage: "final" },
        { source_stage: "final" },
      ])
    ).toBeNull();
  });

  it("source_stage 未設定（既存データ）も正式扱いで null", () => {
    expect(getSessionSourceStage([{}])).toBeNull();
  });

  it("速報版が含まれれば preliminary", () => {
    expect(
      getSessionSourceStage([
        { source_stage: "final" },
        { source_stage: "preliminary" },
      ])
    ).toBe("preliminary");
  });

  it("質問通告のみが含まれれば速報版より優先して notice", () => {
    expect(
      getSessionSourceStage([
        { source_stage: "preliminary" },
        { source_stage: "notice" },
      ])
    ).toBe("notice");
  });
});

describe("getSourceStageNotice", () => {
  it("質問通告の注記は答弁が未掲載であることを伝える", () => {
    expect(getSourceStageNotice("notice", "question")).toContain(
      "答弁は、会議録の公開後に掲載します"
    );
  });

  it("速報版の注記は見直しの可能性を伝える", () => {
    expect(getSourceStageNotice("preliminary", "session")).toContain(
      "速報版会議録"
    );
  });
});
