import { describe, expect, it, vi } from "vitest";

const features = vi.hoisted(() => ({ aiChat: false, aiInterview: true }));

vi.mock("@/config/site.config", () => ({ siteConfig: { features } }));

import { featureDisabledResponse } from "./feature-disabled-response";

describe("featureDisabledResponse", () => {
  it("機能が無効なら404を返す", async () => {
    const res = featureDisabledResponse("aiChat");
    expect(res?.status).toBe(404);
    expect(await res?.json()).toEqual({ error: "Not Found" });
  });

  it("機能が有効ならnullを返す（処理を続ける）", () => {
    expect(featureDisabledResponse("aiInterview")).toBeNull();
  });
});
