import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { AnimatedNumber } from ".";

vi.mock("./style.module.css", () => ({
  default: { animatedNumber: "animated-number" },
}));

vi.mock("@/utils", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

describe("AnimatedNumber", () => {
  let mockSetProperty: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockSetProperty = vi.fn();
    Object.defineProperty(HTMLElement.prototype, "style", {
      value: { setProperty: mockSetProperty },
      writable: true,
    });
  });

  it("should render and set initial value", async () => {
    render(<AnimatedNumber value={42} />);

    await waitFor(() => {
      expect(mockSetProperty).toHaveBeenCalledWith("--value", "42");
      expect(mockSetProperty).toHaveBeenCalledWith("--timer", "1s");
    });
  });

  it("should update value when prop changes", async () => {
    const { rerender } = render(<AnimatedNumber value={10} />);

    await waitFor(() => {
      expect(mockSetProperty).toHaveBeenCalledWith("--value", "10");
    });

    rerender(<AnimatedNumber value={50} />);

    await waitFor(() => {
      expect(mockSetProperty).toHaveBeenCalledWith("--value", "50");
    });
  });

  it("should accept custom timer", async () => {
    render(<AnimatedNumber value={100} timer="2s" />);

    await waitFor(() => {
      expect(mockSetProperty).toHaveBeenCalledWith("--timer", "2s");
    });
  });

  it("should apply custom className", () => {
    const { container } = render(
      <AnimatedNumber value={25} className="custom-class" />,
    );

    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass("custom-class");
  });

  it("should handle zero and negative values", async () => {
    const { rerender } = render(<AnimatedNumber value={0} />);

    await waitFor(() => {
      expect(mockSetProperty).toHaveBeenCalledWith("--value", "0");
    });

    rerender(<AnimatedNumber value={-15} />);

    await waitFor(() => {
      expect(mockSetProperty).toHaveBeenCalledWith("--value", "-15");
    });
  });
});
