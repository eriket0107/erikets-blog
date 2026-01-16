import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { QuickConfigFull, QuickConfigMini } from ".";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../messages/en.json";

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

describe("QuickConfigFull", () => {
  it("should render QuickConfigFull component", () => {
    const { container } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <QuickConfigFull />
      </NextIntlClientProvider>
    );
    expect(container).toBeInTheDocument();
  });

  it("should render container with flex gap-5", () => {
    const { container } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <QuickConfigFull />
      </NextIntlClientProvider>
    );
    const flexContainer = container.querySelector(".flex.gap-5");
    expect(flexContainer).toBeInTheDocument();
  });

  it("should render all action buttons", () => {
    const { container } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <QuickConfigFull />
      </NextIntlClientProvider>
    );
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBeGreaterThan(0);
  });
});


vi.mock("../ThemeButton", () => ({
  ThemeButton: { Nav: () => <button>Theme</button> },
}));
vi.mock("../LocaleSwitcher", () => ({
  __esModule: true,
  default: () => <button>Locale</button>,
}));
vi.mock("../Sparkles", () => ({
  ToggleSparkles: () => <button>Sparkles</button>,
}));


describe("QuickConfigMini", () => {
  it("should render the config button", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <QuickConfigMini />
      </NextIntlClientProvider>
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should show config actions when button is clicked", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <QuickConfigMini />
      </NextIntlClientProvider>
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getByText("Theme")).toBeInTheDocument();
    expect(screen.getByText("Locale")).toBeInTheDocument();
    expect(screen.getByText("Sparkles")).toBeInTheDocument();
  });

  it("should hide config actions when clicking outside", async () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <QuickConfigMini />
      </NextIntlClientProvider>
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getByText("Theme")).toBeInTheDocument();

    fireEvent.mouseDown(document);
    await waitFor(() => {
      expect(screen.queryByText("Theme")).not.toBeInTheDocument();
    });
  });
});
