import { vi, describe, it, expect, beforeEach } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { ThemeButton } from ".";

const mockHandleThemeChange = vi.fn();

vi.mock("../../hooks/useTheme", () => ({
  useTheme: () => ({
    theme: "dark",
    handleThemeChange: mockHandleThemeChange,
    isDark: false,
  }),
}));

describe("Theme Button Nav", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render and handle click", () => {
    const { getByTestId } = render(<ThemeButton.Nav />);
    const themeButton = getByTestId("theme-btn-nav");
    
    expect(themeButton).toBeInTheDocument();
    expect(themeButton.tagName).toBe("BUTTON");
    
    fireEvent.click(themeButton);
    expect(mockHandleThemeChange).toHaveBeenCalledTimes(1);
  });
});

describe("Theme Button Menu", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render and handle click", () => {
    const { getByTestId } = render(<ThemeButton.Menu />);
    const themeButton = getByTestId("theme-btn-menu");
    
    expect(themeButton).toBeInTheDocument();
    expect(themeButton.tagName).toBe("BUTTON");
    
    fireEvent.click(themeButton);
    expect(mockHandleThemeChange).toHaveBeenCalledTimes(1);
  });
});
