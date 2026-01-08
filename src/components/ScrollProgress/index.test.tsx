import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { ScrollProgress } from ".";

// Mock motion/react
vi.mock("motion/react", () => ({
  useScroll: vi.fn(() => ({
    scrollYProgress: { get: () => 0, onChange: vi.fn() },
  })),
  useSpring: vi.fn((value) => value),
  motion: {
    div: vi.fn(({ children, style, className, id }) => (
      <div id={id} style={style} className={className}>
        {children}
      </div>
    )),
  },
}));

describe("ScrollProgress", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock querySelector for scroll container
    document.querySelector = vi.fn((selector) => {
      if (selector === ".screen-layout") {
        return document.createElement("div");
      }
      return null;
    });
  });

  it("should render ScrollProgress component", () => {
    const { container } = render(<ScrollProgress />);
    expect(container).toBeInTheDocument();
  });

  it("should render with scroll-indicator id", () => {
    const { container } = render(<ScrollProgress />);
    const indicator = container.querySelector("#scroll-indicator");
    expect(indicator).toBeInTheDocument();
  });

  it("should have fixed position styles", () => {
    const { container } = render(<ScrollProgress />);
    const indicator = container.querySelector("#scroll-indicator");
    expect(indicator).toHaveStyle({ position: "fixed" });
  });

  it("should have correct height", () => {
    const { container } = render(<ScrollProgress />);
    const indicator = container.querySelector("#scroll-indicator");
    expect(indicator).toHaveStyle({ height: "7px" });
  });

  it("should have z-index 1000", () => {
    const { container } = render(<ScrollProgress />);
    const indicator = container.querySelector("#scroll-indicator");
    expect(indicator).toHaveStyle({ zIndex: "1000" });
  });

  it("should be positioned at top", () => {
    const { container } = render(<ScrollProgress />);
    const indicator = container.querySelector("#scroll-indicator");
    expect(indicator).toHaveStyle({ top: "0px" });
  });
});
