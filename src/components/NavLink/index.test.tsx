import { render } from "@testing-library/react";
import { ILink } from "@/interfaces/link";
import { describe, expect, it } from "vitest";
import { NavLink } from ".";

const mockLink: ILink = {
  href: "/test",
  label: "Test Page",
  title: "Test",
  icon: <span>Icon</span>,
};

describe("NavLink", () => {
  it("should render the link with title and icon", () => {
    const { getByText, getByRole } = render(<NavLink link={mockLink} />);

    expect(getByText("Test")).toBeInTheDocument();
    expect(getByText("Icon")).toBeInTheDocument();

    const linkElement = getByRole("link");
    expect(linkElement).toHaveAttribute("href", "/test");
    expect(linkElement).toHaveAttribute("aria-label", "Test Page");
  });

  it("should apply selected style when isSelected is true", () => {
    const { getByRole } = render(<NavLink link={mockLink} isSelected />);
    const linkElement = getByRole("link");
    expect(linkElement).toHaveClass("border-b-1");
  });

  it("should not apply selected style when isSelected is false", () => {
    const { getByRole } = render(<NavLink link={mockLink} />);
    const linkElement = getByRole("link");
    expect(linkElement).not.toHaveClass("border-b-1");
  });

  it("should apply footer-specific styles when isFooter is true", () => {
    const { getByText } = render(<NavLink link={mockLink} isFooter />);
    const spanElement = getByText("Test");
    expect(spanElement).toHaveClass("hidden", "md:flex");
  });

  it("should apply custom className", () => {
    const { getByRole } = render(
      <NavLink link={mockLink} className="custom-class" />,
    );
    const linkElement = getByRole("link");
    expect(linkElement).toHaveClass("custom-class");
  });
});
