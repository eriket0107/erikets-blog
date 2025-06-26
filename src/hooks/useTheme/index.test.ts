import { vi, describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTheme } from ".";

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
};
Object.defineProperty(window, "localStorage", { value: localStorageMock });

const matchMediaMock = vi.fn();
Object.defineProperty(window, "matchMedia", { value: matchMediaMock });

describe("useTheme", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    matchMediaMock.mockReturnValue({ matches: false });
  });

  it("should initialize with light theme by default", () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("light");
  });

  it("should initialize with light theme when system prefers dark", () => {
    matchMediaMock.mockReturnValue({ matches: true });
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("dark");
  });

  it("should use stored theme from localStorage", () => {
    localStorageMock.getItem.mockReturnValue("dark");
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("dark");
  });

  it.skip("should toggle theme when handleThemeChange is called", () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe("dark");
    console.log(result.current.theme)

    act(() => {
      result.current.handleThemeChange();
    });
    expect(result.current.theme).toBe("light");
    expect(localStorageMock.setItem).toHaveBeenCalledWith("@coffeAndVanillaCode:theme", "light");

    act(() => {
      result.current.handleThemeChange();
    });
    console.log(result.current.theme)

    expect(result.current.theme).toBe("dark");
    expect(localStorageMock.setItem).toHaveBeenCalledWith("@coffeAndVanillaCode:theme", "dark");
  });
});

