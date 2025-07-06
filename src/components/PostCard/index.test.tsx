import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { PostCard } from ".";
import { PostType } from "@/interfaces/posts";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../messages/en.json";

// Mock Next.js Image component
vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    className,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & {
    src: string;
    alt: string;
    // eslint-disable-next-line @next/next/no-img-element
  }) => <img src={src} alt={alt} className={className} {...props} />,
}));

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
  redirect: vi.fn(),
  useParams: () => ({ locale: "en" }),
  permanentRedirect: vi.fn(),
}));

const mockPost: PostType = {
  id: "test-post-1",
  title: {
    en: "Test Blog Post",
    br: "",
  },
  description: {
    br: "",
    en: "This is a test description for the blog post that should be displayed properly.",
  },
  imgSrc: "/test-image.jpg",
  date: "2024-01-15",
  text: {
    en: "This is the full text content of the test blog post.",
    br: "",
  },
};

const mockLongPost: PostType = {
  id: "test-post-2",
  title: {
    br: "",
    en: "Test Blog Post with Long Description",
  },
  description: {
    br: "",
    en: "This is a very long test description for the blog post that should be truncated when it exceeds the maximum character length limit which is set to 110 characters in the component and this description definitely exceeds that limit.",
  },
  imgSrc: "/test-image-long.jpg",
  date: "2024-02-20",
  text: {
    br: "",
    en: "This is the full text content of the test blog post with a long description.",
  },
};

const renderComponent = (postMock: PostType, additionalProps = {}) => {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <PostCard post={postMock} {...additionalProps} />
    </NextIntlClientProvider>,
  );
};
describe("PostCard", () => {
  it("should render post card with all elements", () => {
    const { getByText, getByAltText, getByLabelText } =
      renderComponent(mockPost);

    expect(getByText("Test Blog Post")).toBeInTheDocument();
    expect(getByText(mockPost.description["en"])).toBeInTheDocument();
    expect(
      getByAltText("Cover image for blog post: Test Blog Post"),
    ).toBeInTheDocument();
    expect(
      getByLabelText("Read full post: Test Blog Post"),
    ).toBeInTheDocument();
  });

  it("should render with correct article structure", () => {
    const { container } = renderComponent(mockPost);

    const article = container.querySelector("article");
    expect(article).toBeInTheDocument();
    expect(article).toHaveClass("snap-center");
  });

  it("should truncate long descriptions", () => {
    const { getByText } = renderComponent(mockLongPost);

    const expectedTruncatedText =
      mockLongPost.description["en"].substring(0, 110) + "...";
    expect(getByText(expectedTruncatedText)).toBeInTheDocument();
  });

  it("should not truncate short descriptions", () => {
    const { getByText } = renderComponent(mockPost);

    expect(getByText(mockPost.description["en"])).toBeInTheDocument();
    expect(getByText(mockPost.description["en"])).not.toHaveTextContent("...");
  });

  it("should render correct link href", () => {
    const { getByLabelText } = renderComponent(mockPost);

    const link = getByLabelText("Read full post: Test Blog Post");
    expect(link).toHaveAttribute("href", "/en/blog/test-post-1");
  });

  it("should format date correctly", () => {
    const { container } = renderComponent(mockPost);

    const timeElement = container.querySelector("time");
    expect(timeElement).toBeInTheDocument();
    expect(timeElement).toHaveAttribute("dateTime", "2024-01-15");
    expect(timeElement).toHaveTextContent("15/01/2024");
  });

  it("should render without accessibility attributes when not provided", () => {
    const { container } = renderComponent(mockPost);

    const article = container.querySelector("article");
    expect(article).not.toHaveAttribute("aria-posinset");
    expect(article).not.toHaveAttribute("aria-setsize");
  });

  it("should have correct image attributes", () => {
    const { getByAltText } = renderComponent(mockPost);

    const image = getByAltText("Cover image for blog post: Test Blog Post");
    expect(image).toHaveAttribute("src", "/test-image.jpg");
  });

  it("should have correct CSS classes for responsive design", () => {
    const { container } = renderComponent(mockPost);

    const imageContainer = container.querySelector('[class*="min-w-[300px]"]');
    expect(imageContainer).toBeInTheDocument();
    expect(imageContainer).toHaveClass("md:w-[300px]");
  });
});
