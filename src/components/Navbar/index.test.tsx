import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Navbar } from ".";

import { NextIntlClientProvider } from "next-intl";
import messages from "../../../messages/en.json";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    push: vi.fn(),
    prefetch: vi.fn(),
    replace: vi.fn(),
  }),
  permanentRedirect: vi.fn(),
  redirect: vi.fn(),
  useParams: () => ({ locale: "en" }),
  useSelectedLayoutSegment: () => ({ locale: "en" }),
}));

const renderComponent = () => {
  render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <Navbar />
    </NextIntlClientProvider>,
  );
};

describe("Navbar component", () => {
  beforeEach(() => {
    renderComponent();
  });

  it("should render box as nav", () => {
    const navbar = screen.getByTestId("navbar");
    expect(navbar.tagName).toBe("NAV");
  });

  it("should have with as auto", () => {
    const navbar = screen.getByTestId("navbar");
    expect(navbar).toHaveClass("w-auto");
  });

  it("should be visible when is desktop", () => {
    const navbar = screen.getByTestId("navbar");
    expect(navbar).toHaveClass("md:flex");
  });

  it("should be not visible when is mobile", () => {
    const navbar = screen.getByTestId("navbar");
    expect(navbar).toHaveClass("hidden");
  });

  it("should have all the current links to pages", () => {
    const homeLink = screen.getByText(/Home/);
    // const blogLink = screen.getByText(/Blog/);
    const aboutLink = screen.getByText(/About/);

    expect(aboutLink).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
    // expect(blogLink).toBeInTheDocument();
  });

  it("should redirect to current path", () => {
    const homeLink = screen.getByText(/Home/);
    expect(homeLink).toBeInTheDocument();
    // const blogLink = screen.getByText(/Blog/);
    // expect(blogLink).toBeInTheDocument();
    const aboutLink = screen.getByText(/About/);
    expect(aboutLink).toBeInTheDocument();
  });

  it("should render semantic navigation structure", () => {
    const navbar = screen.getByTestId("navbar");
    const navList = navbar.querySelector("ul");
    const navItems = navbar.querySelectorAll("li");

    expect(navList).toBeInTheDocument();
    // expect(navItems).toHaveLength(3); // home, blog, about
    expect(navItems).toHaveLength(2); // home, about
  });

  it("should have proper ARIA attributes", () => {
    const navbar = screen.getByTestId("navbar");
    const homeLink = screen.getByLabelText(/Navigate to Home page/);

    expect(navbar).toHaveAttribute("aria-label", "Main navigation");
    expect(homeLink).toHaveAttribute("aria-current", "page"); // Since pathname is "/"
  });

  it("should have links with proper semantic attributes", () => {
    const homeLink = screen.getByRole("link", { name: /Home/ });
    // const blogLink = screen.getByRole("link", { name: /Blog/ });
    const aboutLink = screen.getByRole("link", { name: /About/ });

    expect(homeLink).toHaveAttribute("href", "/en");
    // expect(blogLink).toHaveAttribute("href", "/en/blog");
    expect(aboutLink).toHaveAttribute("href", "/en/about");
  });
});
