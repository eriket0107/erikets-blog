import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { Header } from ".";

// Mock next/font/google
vi.mock("next/font/google", () => ({
  Roboto_Mono: () => ({
    className: "font-roboto-mono",
  }),
}));

describe("Header", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the header with correct structure", () => {
    const { getByTestId } = render(<Header />);

    const headerBox = getByTestId("header-box");
    expect(headerBox).toBeInTheDocument();
    expect(headerBox.tagName).toBe("HEADER");
  });

  it("should have correct accessibility attributes", () => {
    const { getByTestId } = render(<Header />);

    const headerBox = getByTestId("header-box");
    expect(headerBox).toHaveAttribute("aria-label", "Header of screen");
  });

  it("should have correct Box component props", () => {
    const { getByTestId } = render(<Header />);

    const headerBox = getByTestId("header-box");
    expect(headerBox).toHaveClass("justify-between");
    expect(headerBox).toHaveClass("items-center");
  });
});
