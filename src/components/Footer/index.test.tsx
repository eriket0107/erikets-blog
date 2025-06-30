import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Footer } from "./index";
import { socialLinks } from "@/constants/Links";

import { NextIntlClientProvider } from "next-intl";
import messages from "../../../messages/en.json";

const renderComponent = () =>
  render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <Footer />
    </NextIntlClientProvider>,
  );

describe("Footer", () => {
  beforeEach(() => {
    renderComponent();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should render footer with correct accessibility attributes", () => {
    const footer = screen.getByTestId("footer");
    expect(footer.tagName).toBe("FOOTER");
  });

  it("should render copyright text with current year", () => {
    const currentYear = new Date().getFullYear();
    const copyrightText = screen.getByText(
      new RegExp(`by: Erik Oliveira ⓒ - 🇧🇷 - ${currentYear}`),
    );
    expect(copyrightText).toBeInTheDocument();
  });

  it("should render all social links", () => {
    const githubLink = screen.getByRole("link", { name: /github/i });
    const linkedinLink = screen.getByRole("link", { name: /linkedin/i });

    expect(githubLink).toBeInTheDocument();
    expect(linkedinLink).toBeInTheDocument();
  });

  it("should render social link icons", () => {
    const githubIcon = document.querySelector(".lucide-github");
    const linkedinIcon = document.querySelector(".lucide-linkedin");

    expect(githubIcon).toBeInTheDocument();
    expect(linkedinIcon).toBeInTheDocument();
  });

  it("should have correct href attributes for social links", () => {
    const githubLink = screen.getByRole("link", { name: /github/i });
    const linkedinLink = screen.getByRole("link", { name: /linkedin/i });

    expect(githubLink).toHaveAttribute("href", socialLinks[0].href);
    expect(linkedinLink).toHaveAttribute("href", socialLinks[1].href);
  });

  it("should open social links in new tab", () => {
    const githubLink = screen.getByRole("link", { name: /github/i });
    const linkedinLink = screen.getByRole("link", { name: /linkedin/i });

    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(linkedinLink).toHaveAttribute("target", "_blank");
  });

  it("should have correct styling classes for copyright text", () => {
    const currentYear = new Date().getFullYear();
    const copyrightText = screen.getByText(
      new RegExp(`by: Erik Oliveira ⓒ - 🇧🇷 - ${currentYear}`),
    );

    expect(copyrightText).toHaveClass(
      "text-muted-foreground",
      "w-[450px]",
      "md:w-full",
    );
  });

  it("should hide social link titles on mobile and show on desktop", () => {
    const githubTitle = screen.getByText("Github");
    const linkedinTitle = screen.getByText("LinkedIn");

    expect(githubTitle).toHaveClass("hidden", "md:flex");
    expect(linkedinTitle).toHaveClass("hidden", "md:flex");
  });

  it("should render footer with correct semantic structure", () => {
    const footer = screen.getByTestId("footer");
    expect(footer.tagName).toBe("FOOTER");
  });

  it("should contain author information", () => {
    expect(screen.getByText(/Erik Oliveira/)).toBeInTheDocument();
    expect(screen.getByText(/🇧🇷/)).toBeInTheDocument();
  });

  it("should update year automatically", () => {
    const mockDate = new Date("2024-02-02");
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);

    renderComponent();

    expect(screen.getByText(/2024/)).toBeInTheDocument();
  });
});
