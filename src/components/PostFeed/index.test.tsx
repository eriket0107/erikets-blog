import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { PostFeed } from "./index";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../messages/en.json";
import { PostType } from "@/interfaces/post";

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

vi.mock("next/headers", () => ({
  cookies: vi.fn(() => ({
    get: vi.fn(() => ({ value: "false" })),
  })),
}));

const mockPosts: PostType[] = [
  {
    id: "1",
    title: "Post 1",
    imgSrc: "/img1.jpg",
    description: "Desc 1",
    date: "2024-01-01",
    isPublished: true,
  },
  {
    id: "2",
    title: "Post 2",
    imgSrc: "/img2.jpg",
    description: "Desc 2",
    date: "2024-01-02",
    isPublished: true,
  },
];

const renderComponent = async (posts: PostType[]) => {
  const Component = await PostFeed({ posts });
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      {Component}
    </NextIntlClientProvider>,
  );
};

describe("PostFeed", () => {
  it("should render posts", async () => {
    await renderComponent(mockPosts);
    expect(screen.getByRole("feed")).toBeInTheDocument();
    const postCards = screen.getAllByRole("article");
    expect(postCards).toHaveLength(mockPosts.length);
  });

  it("should handle empty posts", async () => {
    await renderComponent([]);
    expect(screen.getByRole("feed")).toBeInTheDocument();
    const postCards = screen.queryAllByRole("article");
    expect(postCards).toHaveLength(0);
  });

  it("should have correct accessibility attributes", async () => {
    await renderComponent(mockPosts);

    const feedElement = screen.getByRole("feed");
    expect(feedElement).toHaveAttribute(
      "aria-label",
      "Blog posts with pagination",
    );
    expect(feedElement).toHaveAttribute("tabIndex", "0");
  });

  it("should apply pagination styles when pagination is enabled", async () => {
    const { cookies } = await import("next/headers");
    const mockCookies = cookies as ReturnType<typeof vi.fn>;
    mockCookies.mockReturnValue({
      get: vi.fn(() => ({ value: "true" })),
    });

    await renderComponent(mockPosts);

    const feedElement = screen.getByRole("feed");
    expect(feedElement).toHaveClass("md:max-h-[700px]");
  });
});
