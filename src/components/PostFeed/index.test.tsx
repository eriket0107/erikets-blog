import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { PostFeed } from "./index";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../messages/en.json";

// Mock next/navigation
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

// Mock the getPosts action
vi.mock("@/actions/posts", () => ({
  getPosts: vi.fn(),
}));

const mockGetPosts = vi.mocked(await import("@/actions/posts")).getPosts;

const mockData = {
  data: [
    {
      id: "1",
      title: "Post 1",
      imgSrc: "/img1.jpg",
      description: "Desc 1",
      date: "2024-01-01",
    },
    {
      id: "2",
      title: "Post 2",
      imgSrc: "/img2.jpg",
      description: "Desc 2",
      date: "2024-01-02",
    },
  ],
  next: 2,
  pages: 3,
  prev: null,
  first: 1,
  last: 3,
  items: 10,
};

const renderComponent = async (currentPage: number = 1) => {
  const PostFeedComponent = await PostFeed({ currentPage });
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      {PostFeedComponent}
    </NextIntlClientProvider>,
  );
};

describe("PostFeed", () => {
  it("renders posts and pagination", async () => {
    mockGetPosts.mockResolvedValue(mockData);
    await renderComponent(1);

    expect(screen.getByRole("feed")).toBeInTheDocument();
  });

  it("displays post count correctly", async () => {
    mockGetPosts.mockResolvedValue(mockData);
    await renderComponent(1);

    expect(screen.getByTestId("from-to")).toBeInTheDocument();
  });

  it("calls getPosts with correct parameters", async () => {
    mockGetPosts.mockResolvedValue(mockData);
    await renderComponent(2);

    expect(mockGetPosts).toHaveBeenCalledWith({ perPage: 4, currentPage: 2 });
  });

  it("handles empty posts", async () => {
    const emptyData = { ...mockData, data: [], items: 0 };
    mockGetPosts.mockResolvedValue(emptyData);
    await renderComponent(1);

    expect(screen.getByRole("feed")).toBeInTheDocument();
  });

  it("has correct accessibility attributes", async () => {
    mockGetPosts.mockResolvedValue(mockData);
    await renderComponent(1);

    const feedElement = screen.getByRole("feed");
    expect(feedElement).toHaveAttribute(
      "aria-label",
      "Blog posts with pagination",
    );
    expect(feedElement).toHaveAttribute("tabIndex", "0");
  });
});
