import { vi, describe, it, expect, beforeEach } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import ThemeButton from ".";

const mockHandleThemeChange = vi.fn();
let theme: "light" | "dark" = "dark";

vi.mock("../../hooks/useTheme", () => ({
  useTheme: () => ({
    theme,
    handleThemeChange: mockHandleThemeChange,
  }),
}));

describe("Theme Button", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should be able to click theme nav", async () => {
    const { findByTestId } = render(<ThemeButton variant="nav" />);

    const themeButton = await findByTestId("theme-btn-nav");
    expect(themeButton.tagName).toBe("BUTTON");

    fireEvent.click(themeButton);
    expect(mockHandleThemeChange).toBeCalledTimes(1);
    expect(theme).toBe("dark");
  });

  it("should render with dark theme nav", () => {
    const { getByTestId } = render(<ThemeButton variant="nav" />);

    const themeButton = getByTestId("theme-btn-nav");

    expect(themeButton).toHaveClass("bg-accent-foreground");
  });

  it("shoud channge to light theme nav", () => {
    if (theme !== "light") {
      theme = "light";
    }

    const { getByTestId } = render(<ThemeButton variant="nav" />);

    const themeButton = getByTestId("theme-btn-nav");
    expect(themeButton).toHaveClass("bg-accent-foreground");
  });

  it("should be able to click theme menu", async () => {
    const { findByTestId } = render(<ThemeButton variant="menu" />);

    const themeButton = await findByTestId("theme-btn-menu");
    expect(themeButton.tagName).toBe("BUTTON");

    fireEvent.click(themeButton);
    expect(mockHandleThemeChange).toBeCalledTimes(1);
    expect(theme).toBe("light");
  });

  it("should render with dark theme menu", () => {
    const { getByTestId } = render(<ThemeButton variant="menu" />);

    const themeButton = getByTestId("theme-btn-menu");
    expect(themeButton).toBeInTheDocument();
  });

  it("shoud chanhge to light theme menu", () => {
    if (theme !== "light") {
      theme = "light";
    }

    const { getByTestId } = render(<ThemeButton variant="menu" />);

    const themeButton = getByTestId("theme-btn-menu");
    expect(themeButton).toHaveClass("dark:bg-white");
  });
});
