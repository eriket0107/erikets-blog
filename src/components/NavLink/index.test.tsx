import { render } from "@testing-library/react";
import { ILink } from "@/interfaces/link";
import { usePathname } from "next/navigation";
import { describe, expect, it, vi } from "vitest";
import { NavLink } from ".";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

const mockedUsePathname = vi.mocked(usePathname);

const mockLink: ILink = {
  href: "/test",
  label: "Test Page",
  title: "Test",
  icon: <span>Icon</span>,
};

describe("NavLink", () => {
  it("should render the link with title and icon", () => {
    mockedUsePathname.mockReturnValue("/");
    const { getByText, getByRole } = render(<NavLink link={mockLink} />);

    expect(getByText("Test")).toBeInTheDocument();
    expect(getByText("Icon")).toBeInTheDocument();

    const linkElement = getByRole("link");
    expect(linkElement).toHaveAttribute("href", "/test");
    expect(linkElement).toHaveAttribute("aria-label", "Test Page");
  });

  it("should apply selected style when current path matches href", () => {
    mockedUsePathname.mockReturnValue("/test");
    const { getByRole } = render(<NavLink link={mockLink} />);
    const linkElement = getByRole("link");
    expect(linkElement).toHaveClass("border-b-1");
  });

  it("should not apply selected style when current path does not match href", () => {
    mockedUsePathname.mockReturnValue("/");
    const { getByRole } = render(<NavLink link={mockLink} />);
    const linkElement = getByRole("link");
    expect(linkElement).not.toHaveClass("border-b-1");
  });

  it("should apply footer-specific styles when isFooter is true", () => {
    mockedUsePathname.mockReturnValue("/");
    const { getByText } = render(<NavLink link={mockLink} isFooter />);
    const spanElement = getByText("Test");
    expect(spanElement).toHaveClass("hidden", "md:flex");
  });

  it("should apply custom className", () => {
    mockedUsePathname.mockReturnValue("/");
    const { getByRole } = render(
      <NavLink link={mockLink} className="custom-class" />,
    );
    const linkElement = getByRole("link");
    expect(linkElement).toHaveClass("custom-class");
  });
});
