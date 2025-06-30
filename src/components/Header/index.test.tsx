import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from ".";

import { NextIntlClientProvider } from "next-intl";
import messages from "../../../messages/en.json";

// Mock next/font/google
vi.mock("next/font/google", () => ({
  Roboto_Mono: () => ({
    className: "font-roboto-mono",
  }),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    push: vi.fn(),
    prefetch: vi.fn(),
    replace: vi.fn(),
  }),
  permanentRedirect: vi.fn(),
  redirect: vi.fn(),
  useParams: () => ({ locale: "en" }),
  useSelectedLayoutSegment: () => ({ locale: "en" }),
}));

const renderComponent = () => {
  render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <Header />
    </NextIntlClientProvider>,
  );
};

describe("Header", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    renderComponent();
  });

  it("should render the header with correct structure", () => {
    const headerBox = screen.getByTestId("header-box");
    expect(headerBox).toBeInTheDocument();
    expect(headerBox.tagName).toBe("HEADER");
  });

  it("should have correct accessibility attributes", () => {
    const headerBox = screen.getByTestId("header-box");
    expect(headerBox).toHaveAttribute("aria-label", "Header of screen");
  });

  it("should have correct Box component props", () => {
    const headerBox = screen.getByTestId("header-box");
    expect(headerBox).toHaveClass("justify-between");
    expect(headerBox).toHaveClass("items-center");
  });
});
