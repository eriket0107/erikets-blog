import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { BurgerMenu } from ".";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../messages/en.json";

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

describe("BurgerMenu", () => {
  it("should render burger menu", () => {
    const { getByTestId } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <BurgerMenu />
      </NextIntlClientProvider>,
    );
    const burgerButton = getByTestId("burger-menu");

    expect(burgerButton).toBeInTheDocument();
  });

  it("should open burger menu", () => {
    const { getByTestId } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <BurgerMenu />
      </NextIntlClientProvider>,
    );
    const burgerButton = getByTestId("burger-menu");

    fireEvent.pointerDown(burgerButton);

    const burgerContainer = getByTestId("burger-menu-container");
    expect(burgerContainer).toBeInTheDocument();
  });

  it("should have all the menu links", () => {
    const { getByText, getByTestId } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <BurgerMenu />
      </NextIntlClientProvider>,
    );
    const burgerButton = getByTestId("burger-menu");

    fireEvent.pointerDown(burgerButton);
    const homeLink = getByText(/Home/);
    const blogLink = getByText(/Blog/);
    const aboutLink = getByText(/About/);

    expect(aboutLink).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
    expect(blogLink).toBeInTheDocument();
  });
});
