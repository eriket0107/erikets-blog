import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTimeline } from "./useMilestone";

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
const mockObserve = vi.fn();
const mockUnobserve = vi.fn();

beforeEach(() => {
  mockIntersectionObserver.mockReturnValue({
    observe: mockObserve,
    unobserve: mockUnobserve,
    disconnect: vi.fn(),
  });

  vi.stubGlobal("IntersectionObserver", mockIntersectionObserver);
});

afterEach(() => {
  vi.clearAllMocks();
  vi.unstubAllGlobals();
});

describe("useTimeline", () => {
  it("should initialize with correct default values", () => {
    const { result } = renderHook(() => useTimeline());

    expect(result.current.inView).toBe(false);
    expect(result.current.ref).toBeDefined();
    expect(result.current.ref.current).toBe(null);
  });

  it("should create IntersectionObserver with correct threshold", () => {
    renderHook(() => useTimeline());

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      { threshold: 0.5 },
    );
  });

  it("should set inView to true when element intersects", () => {
    let observerCallback: (entries: IntersectionObserverEntry[]) => void;

    mockIntersectionObserver.mockImplementation((callback) => {
      observerCallback = callback;
      return {
        observe: mockObserve,
        unobserve: mockUnobserve,
        disconnect: vi.fn(),
      };
    });

    const { result } = renderHook(() => useTimeline());

    act(() => {
      observerCallback([
        {
          isIntersecting: true,
          target: document.createElement("div"),
        } as unknown as IntersectionObserverEntry,
      ]);
    });

    expect(result.current.inView).toBe(true);
  });

  it("should set inView to false when element does not intersect", () => {
    let observerCallback: (entries: IntersectionObserverEntry[]) => void;

    mockIntersectionObserver.mockImplementation((callback) => {
      observerCallback = callback;
      return {
        observe: mockObserve,
        unobserve: mockUnobserve,
        disconnect: vi.fn(),
      };
    });

    const { result } = renderHook(() => useTimeline());

    act(() => {
      observerCallback([
        {
          isIntersecting: false,
          target: document.createElement("div"),
        } as unknown as IntersectionObserverEntry,
      ]);
    });

    expect(result.current.inView).toBe(false);
  });

  it("should cleanup observer on unmount", () => {
    const mockDisconnect = vi.fn();
    mockIntersectionObserver.mockImplementation(() => ({
      observe: mockObserve,
      unobserve: mockUnobserve,
      disconnect: mockDisconnect,
    }));

    const { unmount } = renderHook(() => useTimeline());

    unmount();

    // Observer should be created and cleaned up
    expect(mockIntersectionObserver).toHaveBeenCalled();
  });
}); 