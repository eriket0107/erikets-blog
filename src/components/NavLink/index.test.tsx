import { render, screen } from "@testing-library/react";
import { ILink } from "@/interfaces/link";
import { describe, expect, it } from "vitest";
import { NavLink } from ".";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../messages/en.json";

const mockLink: ILink = {
  href: "en/test",
  label: "Test Page",
  title: "Test",
  icon: <span>Icon</span>,
};

type NavLinkOptionalProps = {
  isSelected?: boolean;
  isFooter?: boolean;
  className?: string;
};

const renderComponent = (props: NavLinkOptionalProps = {}) =>
  render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <NavLink link={mockLink} {...props} />
    </NextIntlClientProvider>,
  );

describe("NavLink", () => {
  it("should render the link with title and icon", () => {
    renderComponent();

    expect(screen.getByText("Test")).toBeInTheDocument();
    expect(screen.getByText("Icon")).toBeInTheDocument();

    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", "en/test");
    expect(linkElement).toHaveAttribute("aria-label", "Test Page");
  });

  it("should apply selected style when isSelected is true", () => {
    renderComponent({ isSelected: true });
    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveClass("border-b-1");
  });

  it("should not apply selected style when isSelected is false", () => {
    renderComponent();
    const linkElement = screen.getByRole("link");
    expect(linkElement).not.toHaveClass("border-b-1");
  });

  it("should apply footer-specific styles when isFooter is true", () => {
    renderComponent({ isFooter: true });
    const spanElement = screen.getByText("Test");
    expect(spanElement).toHaveClass("hidden", "md:flex");
  });

  it("should apply custom className", () => {
    renderComponent({ className: "custom-class" });
    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveClass("custom-class");
  });
});
