import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Navbar } from ".";

import { NextIntlClientProvider } from "next-intl";
import messages from "../../../messages/en.json";

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
    const blogLink = screen.getByText(/Blog/);
    const aboutLink = screen.getByText(/About/);

    expect(aboutLink).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
    expect(blogLink).toBeInTheDocument();
  });

  it("should redirect to current path", () => {
    const homeLink = screen.getByText(/Home/);
    expect(homeLink).toBeInTheDocument();
    const blogLink = screen.getByText(/Blog/);
    expect(blogLink).toBeInTheDocument();
    const aboutLink = screen.getByText(/About/);
    expect(aboutLink).toBeInTheDocument();
  });
});
