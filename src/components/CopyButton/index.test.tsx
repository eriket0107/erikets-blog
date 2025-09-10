import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { CopyButton } from "./index";

// Mock navigator.clipboard
const mockWriteText = vi.fn();
Object.defineProperty(navigator, "clipboard", {
  value: {
    writeText: mockWriteText,
  },
  writable: true,
});

describe("CopyButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockWriteText.mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should render copy icon initially", () => {
    render(<CopyButton clipboard="test content" />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it("should copy string content to clipboard when clicked", async () => {
    const testContent = "Hello, world!";
    render(<CopyButton clipboard={testContent} />);

    const button = screen.getByRole("button");

    await act(async () => {
      fireEvent.click(button);
    });

    expect(mockWriteText).toHaveBeenCalledWith(testContent);
  });

  it("should copy content from React element children when clicked", async () => {
    const testContent = "React element content";
    const mockElement = <span>{testContent}</span>;

    render(<CopyButton clipboard={mockElement} />);

    const button = screen.getByRole("button");

    await act(async () => {
      fireEvent.click(button);
    });

    expect(mockWriteText).toHaveBeenCalledWith(testContent);
  });

  it("should show check icon and disable button after successful copy", async () => {
    render(<CopyButton clipboard="test content" />);

    const button = screen.getByRole("button");

    await act(async () => {
      fireEvent.click(button);
    });

    expect(button).toBeDisabled();
  });

  it("should reset to copy icon after 2 seconds", async () => {
    vi.useFakeTimers();

    render(<CopyButton clipboard="test content" />);

    const button = screen.getByRole("button");

    await act(async () => {
      fireEvent.click(button);
    });

    expect(button).toBeDisabled();

    // Fast-forward time by 2 seconds
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(button).not.toBeDisabled();

    vi.useRealTimers();
  });

  it("should handle clipboard write errors gracefully", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    mockWriteText.mockRejectedValue(new Error("Clipboard write failed"));

    render(<CopyButton clipboard="test content" />);

    const button = screen.getByRole("button");

    await act(async () => {
      fireEvent.click(button);
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      "Failed to copy text: ",
      expect.any(Error),
    );

    consoleSpy.mockRestore();
  });

  it("should have correct CSS classes", () => {
    render(<CopyButton clipboard="test content" />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "text-foreground",
      "absolute",
      "top-4",
      "right-4",
      "h-auto",
      "cursor-copy",
    );
  });

  it("should change cursor class when copied", async () => {
    render(<CopyButton clipboard="test content" />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("cursor-copy");

    await act(async () => {
      fireEvent.click(button);
    });

    expect(button).toHaveClass("cursor-pointer");
  });

  it("should handle empty string content", async () => {
    render(<CopyButton clipboard="" />);

    const button = screen.getByRole("button");

    await act(async () => {
      fireEvent.click(button);
    });

    expect(mockWriteText).toHaveBeenCalledWith("");
  });

  it("should handle React element with empty children", async () => {
    const mockElement = <span></span>;

    render(<CopyButton clipboard={mockElement} />);

    const button = screen.getByRole("button");

    await act(async () => {
      fireEvent.click(button);
    });

    expect(mockWriteText).toHaveBeenCalledWith(undefined);
  });
});
