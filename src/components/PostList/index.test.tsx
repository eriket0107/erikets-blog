import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { PostList } from ".";
import { PostType } from "@/interfaces/post";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../messages/en.json";

vi.mock("@/actions/posts", () => ({
  getPosts: vi.fn(),
}));

vi.mock("../PostCard", () => ({
  PostCard: ({ post }: { post: PostType }) => (
    <div data-testid="post-card">{post.title}</div>
  ),
}));

vi.mock("next-intl/server", () => ({
  getTranslations: vi.fn(() => ({
    rich: vi.fn(),
  })),
}));

const mockPosts: PostType[] = [
  {
    id: "post-1",
    title: "First Post",
    description: "Description",
    imgSrc: "/image1.jpg",
    date: "2024-01-15",
    text: "Content",
    isPublished: true,
  },
  {
    id: "post-2",
    title: "Second Post",
    description: "Description",
    imgSrc: "/image2.jpg",
    date: "2024-01-16",
    text: "Content",
    isPublished: true,
  },
];

const mockPagination = {
  first: 1,
  prev: 0,
  next: 0,
  last: 1,
  pages: 1,
  items: 2,
  data: mockPosts,
};

const renderComponent = async () => {
  const ComponentWrapper = await PostList({});
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      {ComponentWrapper}
    </NextIntlClientProvider>,
  );
};

describe("PostList", () => {
  it("should render feed container", async () => {
    const { getPosts } = await import("@/actions/posts");
    vi.mocked(getPosts).mockResolvedValue({
      ...mockPagination,
    });

    await renderComponent();

    expect(screen.getByRole("feed")).toBeInTheDocument();
  });

  it("should call getPosts with perPage: 2", async () => {
    const { getPosts } = await import("@/actions/posts");
    vi.mocked(getPosts).mockResolvedValue(mockPagination);

    await PostList({});

    expect(getPosts).toHaveBeenCalledWith({ perPage: 2 });
  });

  it("should render correct number of PostCard components", async () => {
    const { getPosts } = await import("@/actions/posts");
    vi.mocked(getPosts).mockResolvedValue(mockPagination);

    await renderComponent();

    expect(screen.getAllByTestId("post-card")).toHaveLength(2);
  });

  it("should render empty state when no posts", async () => {
    const { getPosts } = await import("@/actions/posts");
    vi.mocked(getPosts).mockResolvedValue({ ...mockPagination, data: [] });

    await renderComponent();

    expect(screen.getByTestId("empty-posts")).toBeInTheDocument();
  });
});
