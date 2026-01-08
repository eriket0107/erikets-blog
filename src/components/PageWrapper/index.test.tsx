import { render } from "@testing-library/react";
import { PageWrapper } from ".";
import { describe } from "node:test";
import { expect, it, vi } from "vitest";
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

describe("PageWrapper component", () => {
  it("should render with default classes", () => {
    const { container } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <PageWrapper>
          <div>test</div>
        </PageWrapper>
      </NextIntlClientProvider>,
    );
    const wrapper = container.querySelector('div[class*="mb-auto"]');
    expect(wrapper).toHaveClass(
      "mb-auto",
    );
  });

  it("should render with additional classes", () => {
    const { container } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <PageWrapper className="extra-class">
          <div>test</div>
        </PageWrapper>
      </NextIntlClientProvider>,
    );
    const wrapper = container.querySelector('div[class*="extra-class"]');
    expect(wrapper).toHaveClass("extra-class");
  });

  it("should render children", () => {
    const { getByText } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <PageWrapper>
          <div>test child</div>
        </PageWrapper>
      </NextIntlClientProvider>,
    );
    expect(getByText("test child")).toBeInTheDocument();
  });
});
