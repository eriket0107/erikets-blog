import { vi, describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ThemeButton from ".";

const mockHandleThemeChange = vi.fn();
let theme: "light" | "dark" = "dark";

vi.mock("../../hooks/useTheme", () => ({
  useTheme: () => ({
    theme,
    handleThemeChange: mockHandleThemeChange,
  }),
}));

describe("Theme Button Test", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should be able to click theme", async () => {
    render(<ThemeButton />);

    const themeButton = await screen.findByTestId("theme-btn");
    expect(themeButton.tagName).toBe("BUTTON");

    fireEvent.click(themeButton);
    expect(mockHandleThemeChange).toBeCalledTimes(1);
    expect(theme).toBe("dark");
  });

  it("should render with dark theme", () => {
    const { getByTestId } = render(<ThemeButton />);

    const themeButton = getByTestId("theme-btn");
    expect(themeButton).toHaveClass("bg-white");
  });

  it("shoud channge to light theme", () => {
    if (theme !== "light") {
      theme = "light";
    }

    const { getByTestId } = render(<ThemeButton />);

    const themeButton = getByTestId("theme-btn");
    expect(themeButton).toHaveClass("bg-accent-foreground");
  });
});
