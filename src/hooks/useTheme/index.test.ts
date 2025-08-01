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
    localStorageMock.getItem.mockReturnValue('dark');
    matchMediaMock.mockReturnValue({ matches: false });
  });

  it("should initialize with dark theme by default", () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe("dark");
  });

  it("should initialize with dark theme when system prefers dark", () => {
    matchMediaMock.mockReturnValue({ matches: true });
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("dark");
  });

  it("should use stored theme from localStorage", () => {
    localStorageMock.getItem.mockReturnValue("dark");
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("dark");
  });

  it("should toggle theme when handleThemeChange is called", () => {

    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe("dark");

    act(() => {
      result.current.handleThemeChange();
    });
    expect(result.current.theme).toBe("light");

    act(() => {
      result.current.handleThemeChange();
    });

    expect(result.current.theme).toBe("dark");
  });

  it("should check if isDark is false upon theme is light", () => {
    const { result } = renderHook(() => useTheme());


    act(() => {
      result.current.handleThemeChange();
    });

    expect(result.current.isDark).toBe(false)
  })
});

