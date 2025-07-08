import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Pagination } from ".";

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

const mockPaginationMiddle = {
  prev: 1,
  next: 3,
  first: 1,
  last: 10,
  totalPages: 10,
  currentPage: 2,
};

const mockPaginationFirstPage = {
  prev: null,
  next: 2,
  first: 1,
  last: 10,
  totalPages: 10,
  currentPage: 1,
};

const mockPaginationLastPage = {
  prev: 9,
  next: null,
  first: 1,
  last: 10,
  totalPages: 10,
  currentPage: 10,
};

const renderComponent = (
  pagination: {
    prev: number | null;
    next: number | null;
    first: number;
    last: number;
    totalPages: number;
    currentPage: number;
  },
  className?: string,
) =>
  render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <Pagination pagination={pagination} className={className} />
    </NextIntlClientProvider>,
  );

describe("Pagination", () => {
  it("should render as nav element with correct structure", () => {
    renderComponent(mockPaginationMiddle);
    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();
    expect(nav.tagName).toBe("NAV");
    expect(nav).toHaveClass("flex-col", "items-center", "justify-center");
  });

  it("should display current page with active styling", () => {
    renderComponent(mockPaginationMiddle);
    const currentPageLink = screen.getByText("2");
    expect(currentPageLink).toHaveClass(
      "text-foreground",
      "border-accent-foreground",
      "font-medium",
    );
    expect(currentPageLink).toHaveAttribute(
      "aria-label",
      "Current page 2 of 10",
    );
  });

  it("should display prev and next navigation with all links", () => {
    renderComponent(mockPaginationMiddle);
    const prevPageLink = screen.getByText("1");
    const nextPageLink = screen.getByText("3");
    const links = screen.getAllByRole("link");

    expect(prevPageLink).toHaveClass("text-muted-foreground");
    expect(nextPageLink).toHaveClass("text-muted-foreground");
    expect(links).toHaveLength(6);
  });

  it("should not display prev navigation on first page", () => {
    renderComponent(mockPaginationFirstPage);
    const links = screen.getAllByRole("link");
    const currentPageLink = screen.getByText("1");

    expect(currentPageLink).toHaveClass(
      "text-foreground",
      "border-accent-foreground",
    );
    expect(links).toHaveLength(3);
  });

  it("should not display next navigation on last page", () => {
    renderComponent(mockPaginationLastPage);
    const links = screen.getAllByRole("link");
    const currentPageLink = screen.getByText("10");

    expect(currentPageLink).toHaveClass(
      "text-foreground",
      "border-accent-foreground",
    );
    expect(links).toHaveLength(3);
  });
});
