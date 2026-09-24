// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SessionSummaryLines } from "./session-summary-lines";

describe("SessionSummaryLines", () => {
  it("3行サマリーを表示する", () => {
    render(
      <SessionSummaryLines
        lines={["1行目の話題", "2行目の話題", "3行目の話題"]}
      />
    );
    expect(
      screen.getByText("どんな話があった？（今回の3行まとめ）")
    ).toBeInTheDocument();
    expect(screen.getByText("1行目の話題")).toBeInTheDocument();
    expect(screen.getByText("3行目の話題")).toBeInTheDocument();
  });

  it("4行以上あっても3行までしか表示しない", () => {
    render(
      <SessionSummaryLines lines={["1行目", "2行目", "3行目", "4行目"]} />
    );
    expect(screen.queryByText("4行目")).not.toBeInTheDocument();
  });

  it("null や空配列なら何も表示しない", () => {
    const { container, rerender } = render(
      <SessionSummaryLines lines={null} />
    );
    expect(container).toBeEmptyDOMElement();
    rerender(<SessionSummaryLines lines={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
