import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BackButton } from ".";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../messages/en.json";

const mockBack = vi.fn();
vi.mock("@/hooks/useRouter", () => ({
  useRouter: () => ({
    back: mockBack,
  }),
}));

const renderComponent = (props = {}) => {
  render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <BackButton {...props} />
    </NextIntlClientProvider>,
  );
};

describe("BackButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render with translated text and icon", () => {
    renderComponent();

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Go back");

    // Check if ChevronLeft icon is present
    const icon = document.querySelector(".lucide-chevron-left");
    expect(icon).toBeInTheDocument();
  });

  it("should call router.back() when clicked", () => {
    renderComponent();

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  it("should call onBack callback when provided", () => {
    const mockOnBack = vi.fn();
    renderComponent({ onBack: mockOnBack });

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockOnBack).toHaveBeenCalledTimes(1);
    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  it("should work without onBack callback", () => {
    renderComponent();

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockBack).toHaveBeenCalledTimes(1);
  });
});
