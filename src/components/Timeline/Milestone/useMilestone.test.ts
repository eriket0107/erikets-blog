import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTimeline } from "./useMilestone";

// Mock useOutsideClick hook
vi.mock("@/hooks/useOutsideClick", () => ({
  useOutsideClick: vi.fn(),
}));

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

  // Mock document.body.style
  Object.defineProperty(document.body, "style", {
    value: { overflow: "" },
    writable: true,
  });
});

afterEach(() => {
  vi.clearAllMocks();
  vi.unstubAllGlobals();
});

describe("useTimeline", () => {
  it("should initialize with correct default values", () => {
    const { result } = renderHook(() => useTimeline());

    expect(result.current.inView).toBe(false);
    expect(result.current.active).toBe(false);
    expect(result.current.ref).toBeDefined();
    expect(result.current.ref.current).toBe(null);
    expect(result.current.refModal).toBeDefined();
    expect(result.current.refModal.current).toBe(null);
    expect(result.current.id).toBeDefined();
    expect(typeof result.current.setActive).toBe("function");
    expect(typeof result.current.toggleActive).toBe("function");
  });

  it("should create IntersectionObserver with correct threshold", () => {
    renderHook(() => useTimeline());

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      { threshold: 0.1, rootMargin: "-1px", },
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

  it("should toggle active state", () => {
    const { result } = renderHook(() => useTimeline());

    expect(result.current.active).toBe(false);

    act(() => {
      result.current.toggleActive();
    });

    expect(result.current.active).toBe(true);

    act(() => {
      result.current.toggleActive();
    });

    expect(result.current.active).toBe(false);
  });

  it("should set active state directly", () => {
    const { result } = renderHook(() => useTimeline());

    expect(result.current.active).toBe(false);

    act(() => {
      result.current.setActive(true);
    });

    expect(result.current.active).toBe(true);

    act(() => {
      result.current.setActive(false);
    });

    expect(result.current.active).toBe(false);
  });

  it("should handle escape key to close modal", () => {
    const { result } = renderHook(() => useTimeline());

    // Set active to true first
    act(() => {
      result.current.setActive(true);
    });

    expect(result.current.active).toBe(true);

    // Simulate escape key press
    act(() => {
      const escapeEvent = new KeyboardEvent("keydown", { key: "Escape" });
      window.dispatchEvent(escapeEvent);
    });

    expect(result.current.active).toBe(false);
  });

  it("should set body overflow when active", () => {
    const { result } = renderHook(() => useTimeline());

    act(() => {
      result.current.setActive(true);
    });

    expect(document.body.style.overflow).toBe("hidden");

    act(() => {
      result.current.setActive(false);
    });

    expect(document.body.style.overflow).toBe("auto");
  });

  it("should cleanup keyboard event listener on unmount", () => {
    const addEventListenerSpy = vi.spyOn(window, "addEventListener");
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = renderHook(() => useTimeline());

    expect(addEventListenerSpy).toHaveBeenCalledWith("keydown", expect.any(Function));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith("keydown", expect.any(Function));

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it("should generate unique id", () => {
    const { result: result1 } = renderHook(() => useTimeline());
    const { result: result2 } = renderHook(() => useTimeline());

    expect(result1.current.id).toBeDefined();
    expect(result2.current.id).toBeDefined();
    expect(result1.current.id).not.toBe(result2.current.id);
  });
}); 