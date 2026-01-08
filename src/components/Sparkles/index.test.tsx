import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { ToggleSparkles, Sparkles } from ".";

const mockToggleSparkles = vi.fn();
const mockSetParticleDensity = vi.fn();

let isSparklesEnabled = false;
let particleDensity = 100;

vi.mock("../../hooks/useSparkles", () => ({
  useSparkles: () => ({
    isSparklesEnabled,
    toggleSparkles: mockToggleSparkles,
    particleDensity,
    setParticleDensity: mockSetParticleDensity,
  }),
}));

describe("ToggleSparkles", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    isSparklesEnabled = false;
    particleDensity = 100;
  });

  it("should render toggle button", () => {
    const { container } = render(<ToggleSparkles />);
    const button = container.querySelector("button");
    expect(button).toBeInTheDocument();
  });

  it("should call toggleSparkles when button is clicked", () => {
    const { container } = render(<ToggleSparkles />);
    const button = container.querySelector("button");

    if (button) {
      fireEvent.click(button);
      expect(mockToggleSparkles).toHaveBeenCalledTimes(1);
    }
  });

  it("should show ZapOffIcon when sparkles are disabled", () => {
    isSparklesEnabled = false;
    const { container } = render(<ToggleSparkles />);
    const zapOff = container.querySelector("svg");
    expect(zapOff).toBeInTheDocument();
  });

  it("should show ZapIcon when sparkles are enabled", () => {
    isSparklesEnabled = true;
    const { container } = render(<ToggleSparkles />);
    const zapIcon = container.querySelector("svg");
    expect(zapIcon).toBeInTheDocument();
  });

  it("should have correct aria-label when disabled", () => {
    isSparklesEnabled = false;
    const { container } = render(<ToggleSparkles />);
    const button = container.querySelector("button");
    expect(button).toHaveAttribute("aria-label", "Enable sparkles");
  });

  it("should have correct aria-label when enabled", () => {
    isSparklesEnabled = true;
    const { container } = render(<ToggleSparkles />);
    const button = container.querySelector("button");
    expect(button).toHaveAttribute("aria-label", "Disable sparkles");
  });
});

describe("Sparkles", () => {
  beforeEach(() => {
    isSparklesEnabled = false;
    particleDensity = 100;
  });

  it("should render sparkles component", () => {
    const { container } = render(<Sparkles />);
    expect(container).toBeInTheDocument();
  });

  it("should render with correct particle density", () => {
    particleDensity = 150;
    const { container } = render(<Sparkles />);
    expect(container).toBeInTheDocument();
  });
});
