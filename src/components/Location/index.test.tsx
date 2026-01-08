import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { Location } from ".";

// Mock next-intl/server
vi.mock("next-intl/server", () => ({
  getTranslations: vi.fn(() =>
    Promise.resolve((key: string) => {
      const translations: Record<string, string> = {
        brazil: "Brazil",
      };
      return translations[key] || key;
    })
  ),
}));

describe("Location", () => {
  it("should render location component", async () => {
    const { container } = render(await Location());
    expect(container).toBeInTheDocument();
  });

  it("should display Rio de Janeiro", async () => {
    const { container } = render(await Location());
    const text = container.textContent;
    expect(text).toContain("Rio de Janeiro");
  });

  it("should display Brazil translation", async () => {
    const { container } = render(await Location());
    const text = container.textContent;
    expect(text).toContain("Brazil");
  });

  it("should render MapPin icon", async () => {
    const { container } = render(await Location());
    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });

  it("should have correct flex layout", async () => {
    const { container } = render(await Location());
    const wrapper = container.querySelector(".flex.gap-2");
    expect(wrapper).toBeInTheDocument();
  });
});
