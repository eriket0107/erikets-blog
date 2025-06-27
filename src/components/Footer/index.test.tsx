import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Footer } from "./index";
import { socialLinks } from "@/constants/SocialLinks";

describe("Footer", () => {
  it("should render footer with correct accessibility attributes", () => {
    const { getByRole } = render(<Footer />);

    const footer = getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveAttribute("aria-label", "Footer of screen");
  });

  it("should render copyright text with current year", () => {
    const { getByText } = render(<Footer />);

    const currentYear = new Date().getFullYear();
    const copyrightText = getByText(
      new RegExp(`by: Erik Oliveira ⓒ - 🇧🇷 - ${currentYear}`),
    );
    expect(copyrightText).toBeInTheDocument();
  });

  it("should render all social links", () => {
    const { getByRole } = render(<Footer />);

    const githubLink = getByRole("link", { name: /github/i });
    const linkedinLink = getByRole("link", { name: /linkedin/i });

    expect(githubLink).toBeInTheDocument();
    expect(linkedinLink).toBeInTheDocument();
  });

  it("should render social link icons", () => {
    const { container } = render(<Footer />);

    // Check for Lucide icons by their class names
    const githubIcon = container.querySelector(".lucide-github");
    const linkedinIcon = container.querySelector(".lucide-linkedin");

    expect(githubIcon).toBeInTheDocument();
    expect(linkedinIcon).toBeInTheDocument();
  });

  it("should have correct href attributes for social links", () => {
    const { getByRole } = render(<Footer />);

    const githubLink = getByRole("link", { name: /github/i });
    const linkedinLink = getByRole("link", { name: /linkedin/i });

    expect(githubLink).toHaveAttribute("href", socialLinks[0].href);
    expect(linkedinLink).toHaveAttribute("href", socialLinks[1].href);
  });

  it("should open social links in new tab", () => {
    const { getByRole } = render(<Footer />);

    const githubLink = getByRole("link", { name: /github/i });
    const linkedinLink = getByRole("link", { name: /linkedin/i });

    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(linkedinLink).toHaveAttribute("target", "_blank");
  });

  it("should have correct styling classes for copyright text", () => {
    const { getByText } = render(<Footer />);

    const currentYear = new Date().getFullYear();
    const copyrightText = getByText(
      new RegExp(`by: Erik Oliveira ⓒ - 🇧🇷 - ${currentYear}`),
    );

    expect(copyrightText).toHaveClass(
      "text-muted-foreground",
      "w-[450px]",
      "md:w-full",
    );
  });

  it("should hide social link titles on mobile and show on desktop", () => {
    const { getByText } = render(<Footer />);

    const githubTitle = getByText("Github");
    const linkedinTitle = getByText("LinkedIn");

    expect(githubTitle).toHaveClass("hidden", "text-base", "md:flex");
    expect(linkedinTitle).toHaveClass("hidden", "text-base", "md:flex");
  });

  it("should render footer with correct semantic structure", () => {
    const { getByRole } = render(<Footer />);

    const footer = getByRole("contentinfo");
    expect(footer.tagName).toBe("FOOTER");
  });

  it("should contain author information", () => {
    const { getByText } = render(<Footer />);

    expect(getByText(/Erik Oliveira/)).toBeInTheDocument();
    expect(getByText(/🇧🇷/)).toBeInTheDocument();
  });

  it("should update year automatically", () => {
    const mockDate = new Date("2024-02-02");
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);

    const { getByText } = render(<Footer />);

    expect(getByText(/2024/)).toBeInTheDocument();

    vi.useRealTimers();
  });
});
