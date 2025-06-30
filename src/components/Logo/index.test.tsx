import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Logo } from ".";
import { NextIntlClientProvider } from "next-intl";

import messages from "../../../messages/en.json";

// Mock next/font/google
vi.mock("next/font/google", () => ({
  Roboto_Mono: () => ({
    className: "font-roboto-mono",
  }),
}));

const renderComponent = () => {
  render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <Logo />
    </NextIntlClientProvider>,
  );
};

describe("Logo", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    renderComponent();
  });

  it("should have font roboto mono", () => {
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent("coffee & vanilla code ☕️");
    expect(link).toHaveClass("font-roboto-mono");
  });

  it("should render the desktop title (hidden on mobile)", () => {
    const desktopTitle = screen.getByRole("heading", {
      name: /coffee & vanilla code ☕️/i,
      level: 2,
    });
    expect(desktopTitle).toBeInTheDocument();
    expect(desktopTitle).toHaveTextContent("coffee & vanilla code ☕️");
    expect(desktopTitle).toHaveClass("hidden", "md:block", "pb-0");
  });

  it("should render the mobile title (visible on mobile)", () => {
    const mobileTitle = screen.getByRole("heading", {
      name: /coffee & vanilla code ☕️/i,
      level: 3,
    });
    expect(mobileTitle).toBeInTheDocument();
    expect(mobileTitle).toHaveTextContent("coffee & vanilla code ☕️");
    expect(mobileTitle).toHaveClass("sm:block", "md:hidden", "pb-0");
  });

  it("should render the mobile title with line break", () => {
    const mobileTitle = screen.getByRole("heading", { level: 3 });
    const lineBreak = mobileTitle.querySelector("br");
    expect(lineBreak).toBeInTheDocument();
  });

  it("should render the coffee emoji in both titles", () => {
    const titles = screen.getAllByText(/coffee & vanilla code ☕️/);
    expect(titles).toHaveLength(2);
  });
});
