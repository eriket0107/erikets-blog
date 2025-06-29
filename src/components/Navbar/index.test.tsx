import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Navbar } from ".";

describe("Navbar component", () => {
  it("should render box as nav", () => {
    const { getByTestId } = render(<Navbar />);

    const navbar = getByTestId("navbar");
    expect(navbar.tagName).toBe("NAV");
  });

  it("should have with as auto", () => {
    const { getByTestId } = render(<Navbar />);

    const navbar = getByTestId("navbar");
    expect(navbar).toHaveClass("w-auto");
  });

  it("should be visible when is desktop", () => {
    const { getByTestId } = render(<Navbar />);

    const navbar = getByTestId("navbar");
    expect(navbar).toHaveClass("md:flex");
  });

  it("should be not visible when is mobile", () => {
    const { getByTestId } = render(<Navbar />);

    const navbar = getByTestId("navbar");
    expect(navbar).toHaveClass("hidden");
  });

  it("should have all the current links to pages", () => {
    const { getByText } = render(<Navbar />);

    const homeLink = getByText(/Home/);
    const blogLink = getByText(/Blog/);
    const aboutLink = getByText(/About/);

    expect(aboutLink).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
    expect(blogLink).toBeInTheDocument();
  });

  it("should redirect to current path", () => {
    const { getByText } = render(<Navbar />);
    const homeLink = getByText(/Home/);
    expect(homeLink).toBeInTheDocument();
    const blogLink = getByText(/Blog/);
    expect(blogLink).toBeInTheDocument();
    const aboutLink = getByText(/About/);
    expect(aboutLink).toBeInTheDocument();
  });
});
