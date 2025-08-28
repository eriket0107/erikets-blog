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
    expect(link).toHaveTextContent("coffee & vanilla code");
    expect(link).toHaveClass("font-roboto-mono");
  });

  it("should render the desktop title (hidden on mobile)", () => {
    const desktopTitle = screen.getByTestId("desktop-title");
    expect(desktopTitle).toBeInTheDocument();
    expect(desktopTitle).toHaveTextContent("coffee & vanilla code");
    expect(desktopTitle).toHaveClass("hidden", "md:flex", "pb-0");
  });

  it("should render the mobile title (visible on mobile)", () => {
    const mobileTitle = screen.getByTestId("mobile-title");
    expect(mobileTitle).toBeInTheDocument();
    expect(mobileTitle).toHaveTextContent("coffee & vanilla code");
    expect(mobileTitle).toHaveClass("flex", "md:hidden", "pb-0");
  });

  it("should render the mobile title with line break", () => {
    const mobileTitle = screen.getByTestId("mobile-title");
    const lineBreak = mobileTitle.querySelector("br");
    expect(lineBreak).toBeInTheDocument();
  });

  it("should render the coffee emoji in both titles", () => {
    const coffeeEmojis = screen.getAllByTestId("coffee-cup-emoji");
    expect(coffeeEmojis).toHaveLength(2);
  });
});
