import { describe, it, expect, vi } from "vitest";
import { Expertise } from "./index";

vi.mock("next-intl", () => ({
  useTranslations: vi.fn(() => {
    const t = (key: string) => key;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    t.rich = (key: string, opts?: any) => opts?.strong?.(key) || key;
    return t;
  }),
}));

describe("Expertise", () => {
  it("should return 3 milestones with correct structure", () => {
    const milestones = Expertise();
    
    expect(milestones).toHaveLength(3);
    expect(milestones[0]).toMatchObject({
      id: 1,
      startDate: "2022-02-01",
    });
    expect(milestones[1]).toMatchObject({
      id: 2,
      startDate: "2024-07-01",
      endDate: "2025-09-30",
    });
    expect(milestones[2]).toMatchObject({
      id: 3,
      startDate: "2024-04-01",
      endDate: "2024-09-30",
    });
  });

  it("should have required properties", () => {
    const milestones = Expertise();
    
    milestones.forEach((milestone) => {
      expect(milestone).toHaveProperty("id");
      expect(milestone).toHaveProperty("title");
      expect(milestone).toHaveProperty("company");
      expect(milestone).toHaveProperty("startDate");
      expect(milestone).toHaveProperty("endDate");
      expect(milestone).toHaveProperty("description");
    });
  });
});