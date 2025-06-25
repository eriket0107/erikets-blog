import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from ".";

// Mock next/font/google
vi.mock("next/font/google", () => ({
  Roboto_Mono: () => ({
    className: "font-roboto-mono",
  }),
}));

describe("Header Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the header with correct structure", () => {
    const { getByTestId } = render(<Header />);

    const headerBox = getByTestId("header-box");
    expect(headerBox).toBeInTheDocument();
    expect(headerBox.tagName).toBe("HEADER");
  });

  it("should render the desktop title (hidden on mobile)", () => {
    const { getByRole } = render(<Header />);

    const desktopTitle = getByRole("heading", { level: 2 });
    expect(desktopTitle).toBeInTheDocument();
    expect(desktopTitle).toHaveTextContent("coffee & vanilla code ☕️");
    expect(desktopTitle).toHaveClass("font-roboto-mono", "hidden", "lg:block");
  });

  it("should render the mobile title (visible on mobile)", () => {
    const { getByRole } = render(<Header />);

    const mobileTitle = getByRole("heading", { level: 3 });
    expect(mobileTitle).toBeInTheDocument();
    expect(mobileTitle).toHaveTextContent("coffee & vanilla code ☕️");
    expect(mobileTitle).toHaveClass("font-roboto-mono", "block", "lg:hidden");
  });

  it("should render the mobile title with line break", () => {
    const { getByRole } = render(<Header />);

    const mobileTitle = getByRole("heading", { level: 3 });
    const lineBreak = mobileTitle.querySelector("br");
    expect(lineBreak).toBeInTheDocument();
  });

  it("should apply correct CSS classes to header box", () => {
    const { getByTestId } = render(<Header />);

    const headerBox = getByTestId("header-box");
    expect(headerBox).toHaveClass("flex", "flex-row", "px-15", "py-4");
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

  it("should apply Roboto Mono font to both titles", () => {
    const { getAllByText } = render(<Header />);

    const titles = getAllByText(/coffee & vanilla code/);
    titles.forEach((title) => {
      expect(title).toHaveClass("font-roboto-mono");
    });
  });

  it("should render the coffee emoji in both titles", () => {
    const { getAllByText } = render(<Header />);

    const titles = getAllByText(/coffee & vanilla code ☕️/);
    expect(titles).toHaveLength(2);
  });
});
