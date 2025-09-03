import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SeeAllPostsButton } from ".";
import { parseCookies, setCookie } from "nookies";
import { useRouter } from "@/hooks/useRouter";
import { ButtonHTMLAttributes } from "react";

vi.mock("nookies", () => ({
  parseCookies: vi.fn(),
  setCookie: vi.fn(),
}));

vi.mock("@/hooks/useRouter", () => ({
  useRouter: vi.fn(),
}));

vi.mock("@/constants/cookies", () => ({
  paginationCookie: "pagination-enabled",
}));

vi.mock("../ui/button", () => ({
  Button: ({
    children,
    onClick,
    ...props
  }: ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
}));

describe("SeeAllPostsButton", () => {
  let mockRefresh: Mock;
  let mockParseCookies: Mock;
  let mockSetCookie: Mock;

  beforeEach(() => {
    vi.clearAllMocks();

    mockRefresh = vi.fn();
    mockParseCookies = parseCookies as Mock;
    mockSetCookie = setCookie as Mock;

    (useRouter as Mock).mockReturnValue({
      refresh: mockRefresh,
    });
  });

  it("should render with correct initial state when pagination is disabled", () => {
    render(<SeeAllPostsButton initialValue={false} />);

    const button = screen.getByRole("switch");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute(
      "aria-label",
      "Switch to show all blog posts",
    );
    expect(screen.getByText("See pages")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Currently showing all posts. Click to see paginated view.",
      ),
    ).toBeInTheDocument();
  });

  it("should render with correct initial state when pagination is enabled", () => {
    render(<SeeAllPostsButton initialValue={true} />);

    const button = screen.getByRole("switch");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute(
      "aria-label",
      "Switch to paginated view of blog posts",
    );
    expect(screen.getByText("See all")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Currently showing paginated posts. Click to see all posts.",
      ),
    ).toBeInTheDocument();
  });

  it("should have proper accessibility attributes", () => {
    render(<SeeAllPostsButton initialValue={false} />);

    const button = screen.getByRole("switch");
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("role", "switch");
    expect(button).toHaveAttribute("aria-label");

    const visualText = screen.getByText("See pages");
    expect(visualText).toHaveAttribute("aria-hidden", "true");

    const srText = screen.getByText(
      "Currently showing all posts. Click to see paginated view.",
    );
    expect(srText).toHaveClass("sr-only");
  });

  it("should set cookie and refresh when no cookie exists", async () => {
    mockParseCookies.mockReturnValue({});

    render(<SeeAllPostsButton initialValue={false} />);

    const button = screen.getByRole("switch");
    fireEvent.click(button);

    expect(mockSetCookie).toHaveBeenCalledWith(
      null,
      "pagination-enabled",
      "true",
    );
    expect(mockRefresh).toHaveBeenCalled();
  });

  it("should toggle cookie from true to false", async () => {
    mockParseCookies.mockReturnValue({ "pagination-enabled": "true" });

    render(<SeeAllPostsButton initialValue={true} />);

    const button = screen.getByRole("switch");
    fireEvent.click(button);

    expect(mockSetCookie).toHaveBeenCalledWith(
      null,
      "pagination-enabled",
      "false",
    );
    expect(mockRefresh).toHaveBeenCalled();
  });

  it("should toggle cookie from false to true", async () => {
    mockParseCookies.mockReturnValue({ "pagination-enabled": "false" });

    render(<SeeAllPostsButton initialValue={false} />);

    const button = screen.getByRole("switch");
    fireEvent.click(button);

    expect(mockSetCookie).toHaveBeenCalledWith(
      null,
      "pagination-enabled",
      "true",
    );
    expect(mockRefresh).toHaveBeenCalled();
  });

  it("should update state when initialValue prop changes", async () => {
    const { rerender } = render(<SeeAllPostsButton initialValue={false} />);

    expect(screen.getByText("See pages")).toBeInTheDocument();

    rerender(<SeeAllPostsButton initialValue={true} />);

    await waitFor(() => {
      expect(screen.getByText("See all")).toBeInTheDocument();
    });
  });

  it("should update local state after cookie toggle", async () => {
    mockParseCookies.mockReturnValue({ "pagination-enabled": "false" });

    render(<SeeAllPostsButton initialValue={false} />);

    expect(screen.getByText("See pages")).toBeInTheDocument();

    const button = screen.getByRole("switch");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("See all")).toBeInTheDocument();
    });
  });

  it("should handle undefined cookie value", async () => {
    mockParseCookies.mockReturnValue({ "pagination-enabled": undefined });

    render(<SeeAllPostsButton initialValue={false} />);

    const button = screen.getByRole("switch");
    fireEvent.click(button);

    expect(mockSetCookie).toHaveBeenCalledWith(
      null,
      "pagination-enabled",
      "true",
    );
    expect(mockRefresh).toHaveBeenCalled();
  });

  it("should apply correct CSS classes", () => {
    render(<SeeAllPostsButton initialValue={false} />);

    const button = screen.getByRole("switch");
    expect(button).toHaveClass(
      "animate-fade-in-fast",
      "absolute",
      "left-0",
      "flex",
      "h-[30px]",
      "cursor-pointer",
      "!p-0",
      "transition-all",
      "transition-discrete",
      "hover:scale-95",
      "hover:opacity-85",
    );
  });

  it("should have correct displayName", () => {
    expect(SeeAllPostsButton.displayName).toBe("SeeAllPostsButton");
  });
});
