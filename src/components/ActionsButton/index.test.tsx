import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { ActionsButton } from ".";
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

vi.mock("../../hooks/useSparkles", () => ({
  useSparkles: () => ({
    isSparklesEnabled: false,
    toggleSparkles: vi.fn(),
    particleDensity: 100,
    setParticleDensity: vi.fn(),
  }),
}));

vi.mock("../../hooks/useTheme", () => ({
  useTheme: () => ({
    theme: "dark",
    handleThemeChange: vi.fn(),
    isDark: true,
  }),
}));

describe("ActionsButton", () => {
  it("should render ActionsButton component", () => {
    const { container } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ActionsButton />
      </NextIntlClientProvider>
    );
    expect(container).toBeInTheDocument();
  });

  it("should render container with flex gap-5", () => {
    const { container } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ActionsButton />
      </NextIntlClientProvider>
    );
    const flexContainer = container.querySelector(".flex.gap-5");
    expect(flexContainer).toBeInTheDocument();
  });

  it("should render all action buttons", () => {
    const { container } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ActionsButton />
      </NextIntlClientProvider>
    );
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBeGreaterThan(0);
  });
});
