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

const mockPosts: PostType[] = [
  {
    id: "1",
    title: { en: "Post 1", br: "Post 1" },
    imgSrc: "/img1.jpg",
    description: { en: "Desc 1", br: "Desc 1" },
    date: "2024-01-01",
    isPublished: true,
  },
  {
    id: "2",
    title: { en: "Post 2", br: "Post 2" },
    imgSrc: "/img2.jpg",
    description: { en: "Desc 2", br: "Desc 2" },
    date: "2024-01-02",
    isPublished: true,
  },
];

const renderComponent = (posts: PostType[]) => {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <PostFeed posts={posts} />
    </NextIntlClientProvider>,
  );
};

describe("PostFeed", () => {
  it("renders posts", () => {
    renderComponent(mockPosts);
    expect(screen.getByRole("feed")).toBeInTheDocument();
    const postCards = screen.getAllByRole("article");
    expect(postCards).toHaveLength(mockPosts.length);
  });

  it("handles empty posts", () => {
    renderComponent([]);
    expect(screen.getByRole("feed")).toBeInTheDocument();
    const postCards = screen.queryAllByRole("article");
    expect(postCards).toHaveLength(0);
  });

  it("has correct accessibility attributes", () => {
    renderComponent(mockPosts);

    const feedElement = screen.getByRole("feed");
    expect(feedElement).toHaveAttribute(
      "aria-label",
      "Blog posts with pagination",
    );
    expect(feedElement).toHaveAttribute("tabIndex", "0");
  });
});
