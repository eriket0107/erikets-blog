import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../messages/en.json";
import LocaleSwitcher from ".";

const useRouter = vi.fn();

vi.mock("@/hooks/useRouter", () => ({
  useRouter: () => ({
    replace: useRouter,
  }),
}));

vi.mock("@/hooks/usePathname", () => ({
  usePathname: () => "/some-path",
}));

const renderComponent = (locale: "en" | "br") => {
  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LocaleSwitcher />
    </NextIntlClientProvider>,
  );
};

describe("LocaleSwitcher", () => {
  it("should render the locale switcher with the correct title and initial value", () => {
    renderComponent("en");

    expect(screen.getByText("Change language")).toBeInTheDocument();
    expect(screen.getByText("🇺🇸")).toBeInTheDocument();
  });

  it("should display the correct flag for the current locale", () => {
    const { rerender } = renderComponent("en");
    expect(screen.getByText("🇺🇸")).toBeInTheDocument();
    expect(screen.queryByText("🇧🇷")).not.toBeInTheDocument();

    rerender(
      <NextIntlClientProvider locale="br" messages={messages}>
        <LocaleSwitcher />
      </NextIntlClientProvider>,
    );
    expect(screen.getByText("🇧🇷")).toBeInTheDocument();
    expect(screen.queryByText("🇺🇸")).not.toBeInTheDocument();
  });

  it("should call router.replace with the new locale when a different language is selected", () => {
    renderComponent("en");

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "br" } });

    expect(useRouter).toHaveBeenCalledWith(
      { pathname: "/some-path", params: null },
      { locale: "br" },
    );
  });
});
