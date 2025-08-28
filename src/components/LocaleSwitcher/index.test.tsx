import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../messages/en.json";
import LocaleSwitcher from ".";

vi.mock("@/constants/emojis", () => ({
  Emojis: {
    UnitedStatesFlag: ({
      height,
      width,
    }: {
      height?: number;
      width?: number;
    }) => (
      <div data-testid="us-flag" style={{ height, width }}>
        US Flag
      </div>
    ),
    BrazilFlag: ({ height, width }: { height?: number; width?: number }) => (
      <div data-testid="br-flag" style={{ height, width }}>
        BR Flag
      </div>
    ),
  },
}));

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
    expect(screen.getByTestId("us-flag")).toBeInTheDocument();
  });

  it("should display the correct flag for the current locale", () => {
    const { rerender } = renderComponent("en");
    expect(screen.getByTestId("us-flag")).toBeInTheDocument();
    expect(screen.queryByTestId("br-flag")).not.toBeInTheDocument();

    rerender(
      <NextIntlClientProvider locale="br" messages={messages}>
        <LocaleSwitcher />
      </NextIntlClientProvider>,
    );
    expect(screen.getByTestId("br-flag")).toBeInTheDocument();
    expect(screen.queryByTestId("us-flag")).not.toBeInTheDocument();
  });

  it("should call router.replace with the new locale when flag is clicked", () => {
    renderComponent("en");

    const flag = screen.getByTestId("us-flag");
    fireEvent.click(flag);

    expect(useRouter).toHaveBeenCalledWith(
      { pathname: "/some-path", params: null },
      { locale: "br" },
    );
  });

  it("should toggle between locales when clicked", () => {
    const { rerender } = renderComponent("en");

    // Click US flag should switch to BR
    const usFlag = screen.getByTestId("us-flag");
    fireEvent.click(usFlag);

    expect(useRouter).toHaveBeenCalledWith(
      { pathname: "/some-path", params: null },
      { locale: "br" },
    );

    useRouter.mockClear();

    rerender(
      <NextIntlClientProvider locale="br" messages={messages}>
        <LocaleSwitcher />
      </NextIntlClientProvider>,
    );

    const brFlag = screen.getByTestId("br-flag");
    fireEvent.click(brFlag);

    expect(useRouter).toHaveBeenCalledWith(
      { pathname: "/some-path", params: null },
      { locale: "en" },
    );
  });
});
