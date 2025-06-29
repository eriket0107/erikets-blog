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

  it("should have font roboto mono", () => {
    const { getByRole } = render(<Logo />);

    const link = getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent("coffee & vanilla code ☕️");
    expect(link).toHaveClass("font-roboto-mono");
  });

  it("should render the desktop title (hidden on mobile)", () => {
    const { getByRole } = render(<Logo />);

    const desktopTitle = getByRole("heading", { level: 2 });
    expect(desktopTitle).toBeInTheDocument();
    expect(desktopTitle).toHaveTextContent("coffee & vanilla code ☕️");
    expect(desktopTitle).toHaveClass("hidden", "md:block", "pb-0");
  });

  it("should render the mobile title (visible on mobile)", () => {
    const { getByRole } = render(<Logo />);

    const mobileTitle = getByRole("heading", { level: 3 });
    expect(mobileTitle).toBeInTheDocument();
    expect(mobileTitle).toHaveTextContent("coffee & vanilla code ☕️");
    expect(mobileTitle).toHaveClass("sm:block", "md:hidden", "pb-0");
  });

  it("should render the mobile title with line break", () => {
    const { getByRole } = render(<Logo />);

    const mobileTitle = getByRole("heading", { level: 3 });
    const lineBreak = mobileTitle.querySelector("br");
    expect(lineBreak).toBeInTheDocument();
  });

  it("should render the coffee emoji in both titles", () => {
    const { getAllByText } = render(<Logo />);

    const titles = getAllByText(/coffee & vanilla code ☕️/);
    expect(titles).toHaveLength(2);
  });
});
