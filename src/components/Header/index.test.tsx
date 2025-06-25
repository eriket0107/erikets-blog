import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from ".";

// Mock the ThemeButton component
vi.mock("../ThemeButton", () => ({
  ThemeButton: () => <button data-testid="theme-button">Theme Button</button>,
}));

// Mock the Typography component
vi.mock("../Typography", () => ({
  Typography: {
    H2: ({ children, className, ...props }: any) => (
      <h2 className={className} {...props}>
        {children}
      </h2>
    ),
    H3: ({ children, className, ...props }: any) => (
      <h3 className={className} {...props}>
        {children}
      </h3>
    ),
  },
}));

// Mock the Box component
vi.mock("../Box", () => ({
  Box: ({ children, as, className, justify, align, ...props }: any) => {
    const Component = as || "div";
    return (
      <Component
        className={className}
        data-testid="header-box"
        justify={justify}
        align={align}
        {...props}
      >
        {children}
      </Component>
    );
  },
}));

// Mock next/font/google
vi.mock("next/font/google", () => ({
  Roboto_Mono: () => ({
    className: "font-roboto-mono",
  }),
}));

describe("Header Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the header with correct structure", () => {
    render(<Header />);

    const headerBox = screen.getByTestId("header-box");
    expect(headerBox).toBeInTheDocument();
    expect(headerBox.tagName).toBe("HEADER");
  });

  it("should render the desktop title (hidden on mobile)", () => {
    render(<Header />);

    const desktopTitle = screen.getByRole("heading", { level: 2 });
    expect(desktopTitle).toBeInTheDocument();
    expect(desktopTitle).toHaveTextContent("coffee & vanilla code ☕️");
    expect(desktopTitle).toHaveClass("font-roboto-mono", "hidden", "lg:block");
  });

  it("should render the mobile title (visible on mobile)", () => {
    render(<Header />);

    const mobileTitle = screen.getByRole("heading", { level: 3 });
    expect(mobileTitle).toBeInTheDocument();
    expect(mobileTitle).toHaveTextContent("coffee & vanilla code ☕️");
    expect(mobileTitle).toHaveClass("font-roboto-mono", "block", "lg:hidden");
  });

  it("should render the mobile title with line break", () => {
    render(<Header />);

    const mobileTitle = screen.getByRole("heading", { level: 3 });
    const lineBreak = mobileTitle.querySelector("br");
    expect(lineBreak).toBeInTheDocument();
  });

  it("should render the ThemeButton component", () => {
    render(<Header />);

    const themeButton = screen.getByTestId("theme-button");
    expect(themeButton).toBeInTheDocument();
  });

  it("should apply correct CSS classes to header box", () => {
    render(<Header />);

    const headerBox = screen.getByTestId("header-box");
    expect(headerBox).toHaveClass("flex", "flex-row", "px-15", "py-4");
  });

  it("should have correct accessibility attributes", () => {
    render(<Header />);

    const headerBox = screen.getByTestId("header-box");
    expect(headerBox).toHaveAttribute("aria-label", "Header of screen");
  });

  it("should have correct Box component props", () => {
    render(<Header />);

    const headerBox = screen.getByTestId("header-box");
    expect(headerBox).toHaveAttribute("justify", "between");
    expect(headerBox).toHaveAttribute("align", "center");
  });

  it("should render both desktop and mobile titles", () => {
    render(<Header />);

    const titles = screen.getAllByText(/coffee & vanilla code/);
    expect(titles).toHaveLength(2);

    // Check that one is for desktop and one for mobile
    const desktopTitle = titles.find((title) =>
      title.className.includes("hidden lg:block"),
    );
    const mobileTitle = titles.find((title) =>
      title.className.includes("block lg:hidden"),
    );

    expect(desktopTitle).toBeDefined();
    expect(mobileTitle).toBeDefined();
  });

  it("should apply Roboto Mono font to both titles", () => {
    render(<Header />);

    const titles = screen.getAllByText(/coffee & vanilla code/);
    titles.forEach((title) => {
      expect(title).toHaveClass("font-roboto-mono");
    });
  });

  it("should render the coffee emoji in both titles", () => {
    render(<Header />);

    const titles = screen.getAllByText(/coffee & vanilla code ☕️/);
    expect(titles).toHaveLength(2);
  });
});
