import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { Logo } from ".";

// Mock next/font/google
vi.mock("next/font/google", () => ({
  Roboto_Mono: () => ({
    className: "font-roboto-mono",
  }),
}));

describe("Logo", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the desktop title (hidden on mobile)", () => {
    const { getByRole } = render(<Logo />);

    const desktopTitle = getByRole("heading", { level: 2 });
    expect(desktopTitle).toBeInTheDocument();
    expect(desktopTitle).toHaveTextContent("coffee & vanilla code ☕️");
    expect(desktopTitle).toHaveClass("font-roboto-mono", "hidden", "md:block");
  });

  it("should render the mobile title (visible on mobile)", () => {
    const { getByRole } = render(<Logo />);

    const mobileTitle = getByRole("heading", { level: 3 });
    expect(mobileTitle).toBeInTheDocument();
    expect(mobileTitle).toHaveTextContent("coffee & vanilla code ☕️");
    expect(mobileTitle).toHaveClass("font-roboto-mono", "block", "md:hidden");
  });

  it("should render the mobile title with line break", () => {
    const { getByRole } = render(<Logo />);

    const mobileTitle = getByRole("heading", { level: 3 });
    const lineBreak = mobileTitle.querySelector("br");
    expect(lineBreak).toBeInTheDocument();
  });

  it("should apply Roboto Mono font to both titles", () => {
    const { getAllByText } = render(<Logo />);

    const titles = getAllByText(/coffee & vanilla code/);
    titles.forEach((title) => {
      expect(title).toHaveClass("font-roboto-mono");
    });
  });

  it("should render the coffee emoji in both titles", () => {
    const { getAllByText } = render(<Logo />);

    const titles = getAllByText(/coffee & vanilla code ☕️/);
    expect(titles).toHaveLength(2);
  });
});
