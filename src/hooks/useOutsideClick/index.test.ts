import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { RefObject } from "react";
import { useOutsideClick } from "./index";

describe("useOutsideClick", () => {
  let mockCallback: ReturnType<typeof vi.fn>;
  let mockRef: RefObject<HTMLDivElement | null>;
  let mockElement: HTMLDivElement;

  beforeEach(() => {
    mockCallback = vi.fn();
    mockElement = document.createElement("div");
    document.body.appendChild(mockElement);

    mockRef = {
      current: mockElement,
    };
  });

  afterEach(() => {
    vi.clearAllMocks();
    document.body.removeChild(mockElement);
  });

  it("should call callback when clicking outside the element", () => {
    renderHook(() => useOutsideClick(mockRef, mockCallback));

    // Create a click event outside the element
    const outsideElement = document.createElement("div");
    document.body.appendChild(outsideElement);

    const mouseEvent = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
    });

    Object.defineProperty(mouseEvent, "target", {
      value: outsideElement,
      enumerable: true,
    });

    document.dispatchEvent(mouseEvent);

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith(mouseEvent);

    document.body.removeChild(outsideElement);
  });

  it("should not call callback when clicking inside the element", () => {
    renderHook(() => useOutsideClick(mockRef, mockCallback));

    const mouseEvent = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
    });

    Object.defineProperty(mouseEvent, "target", {
      value: mockElement,
      enumerable: true,
    });

    document.dispatchEvent(mouseEvent);

    expect(mockCallback).not.toHaveBeenCalled();
  });

  it("should not call callback when clicking on child element", () => {
    const childElement = document.createElement("span");
    mockElement.appendChild(childElement);

    renderHook(() => useOutsideClick(mockRef, mockCallback));

    const mouseEvent = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
    });

    Object.defineProperty(mouseEvent, "target", {
      value: childElement,
      enumerable: true,
    });

    document.dispatchEvent(mouseEvent);

    expect(mockCallback).not.toHaveBeenCalled();
  });

  it("should handle null ref", () => {
    const nullRef = { current: null };

    renderHook(() => useOutsideClick(nullRef, mockCallback));

    const outsideElement = document.createElement("div");
    document.body.appendChild(outsideElement);

    const mouseEvent = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
    });

    Object.defineProperty(mouseEvent, "target", {
      value: outsideElement,
      enumerable: true,
    });

    document.dispatchEvent(mouseEvent);

    expect(mockCallback).not.toHaveBeenCalled();

    document.body.removeChild(outsideElement);
  });

  it("should handle null event target", () => {
    renderHook(() => useOutsideClick(mockRef, mockCallback));

    const mouseEvent = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
    });

    Object.defineProperty(mouseEvent, "target", {
      value: null,
      enumerable: true,
    });

    document.dispatchEvent(mouseEvent);

    expect(mockCallback).not.toHaveBeenCalled();
  });

  it("should cleanup event listener on unmount", () => {
    const addEventListenerSpy = vi.spyOn(document, "addEventListener");
    const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");

    const { unmount } = renderHook(() => useOutsideClick(mockRef, mockCallback));

    expect(addEventListenerSpy).toHaveBeenCalledWith("mousedown", expect.any(Function));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith("mousedown", expect.any(Function));

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it("should return the ref", () => {
    const { result } = renderHook(() => useOutsideClick(mockRef, mockCallback));

    expect(result.current).toBe(mockRef);
  });
});