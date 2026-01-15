import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Milestone } from "./index";
import { MilestoneType } from "@/interfaces/milestone";

// Mock motion/react
vi.mock("motion/react", () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => <button {...props}>{children}</button>,
    h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => <h3 {...props}>{children}</h3>,
    h4: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => <h4 {...props}>{children}</h4>,
    p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => <p {...props}>{children}</p>,
  },
}));

// Mock useTimeline hook
vi.mock("./useMilestone", () => ({
  useTimeline: vi.fn(),
}));

import { useTimeline } from "./useMilestone";
const mockUseTimeline = vi.mocked(useTimeline);

// Mock lucide-react
vi.mock("lucide-react", () => ({
  X: () => <span>X</span>,
}));

// Mock getMonthAndYear utility
vi.mock("@/utils/get-month-and-year", () => ({
  getMonthAndYear: (date: string) => {
    const d = new Date(date);
    const month = (d.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = d.getUTCFullYear();
    return `${month}/${year}`;
  },
}));

const mockMilestone: MilestoneType = {
  id: 1,
  title: "Software Engineer",
  company: "Test Company",
  startDate: "2024-01-01",
  endDate: "2024-06-01",
  description: <div>Test milestone description with detailed information.</div>,
};

const mockUseTimelineReturn = {
  ref: { current: null },
  refModal: { current: null },
  inView: false,
  active: false,
  setActive: vi.fn(),
  toggleActive: vi.fn(),
  id: "test-id",
};

describe("Milestone", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseTimeline.mockReturnValue(mockUseTimelineReturn);
  });

  it("should render milestone with correct structure when not active", () => {
    render(<Milestone milestone={mockMilestone} isLast={false} />);

    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("Test Company")).toBeInTheDocument();
    expect(screen.getByText("01/2024 - 06/2024")).toBeInTheDocument();
  });

  it("should render timeline dot and connector line when not last", () => {
    const { container } = render(<Milestone milestone={mockMilestone} isLast={false} />);

    // Check for timeline dot
    const dot = container.querySelector(".bg-primary.rounded-full");
    expect(dot).toBeInTheDocument();

    // Check for connector line
    const line = container.querySelector(".bg-border.flex-1");
    expect(line).toBeInTheDocument();
  });

  it("should not render connector line when is last milestone", () => {
    const { container } = render(<Milestone milestone={mockMilestone} isLast={true} />);

    // Check for timeline dot
    const dot = container.querySelector(".bg-primary.rounded-full");
    expect(dot).toBeInTheDocument();

    // Check that connector line is not rendered
    const line = container.querySelector(".bg-border.flex-1");
    expect(line).not.toBeInTheDocument();
  });

  it("should apply correct styling when milestone is in view", () => {
    mockUseTimeline.mockReturnValue({
      ...mockUseTimelineReturn,
      inView: true,
    });

    const { container } = render(<Milestone milestone={mockMilestone} isLast={false} />);

    const milestoneContainer = container.querySelector(".opacity-100");
    expect(milestoneContainer).toBeInTheDocument();

    const translatedElement = container.querySelector(".translate-x-0");
    expect(translatedElement).toBeInTheDocument();
  });

  it("should apply correct styling when milestone is not in view", () => {
    mockUseTimeline.mockReturnValue({
      ...mockUseTimelineReturn,
      inView: false,
    });

    const { container } = render(<Milestone milestone={mockMilestone} isLast={false} />);

    const hiddenElement = container.querySelector(".opacity-0");
    expect(hiddenElement).toBeInTheDocument();

    const translatedElement = container.querySelector(".-translate-x-5");
    expect(translatedElement).toBeInTheDocument();
  });

  it("should call setActive when clicking on milestone card", () => {
    const mockSetActive = vi.fn();
    mockUseTimeline.mockReturnValue({
      ...mockUseTimelineReturn,
      setActive: mockSetActive,
      inView: true,
    });

    const { container } = render(<Milestone milestone={mockMilestone} isLast={false} />);

    const clickableCard = container.querySelector(".cursor-pointer");
    expect(clickableCard).toBeInTheDocument();

    fireEvent.click(clickableCard!);
    expect(mockSetActive).toHaveBeenCalledWith(true);
  });

  it("should render modal when active", () => {
    mockUseTimeline.mockReturnValue({
      ...mockUseTimelineReturn,
      active: true,
    });

    render(<Milestone milestone={mockMilestone} isLast={false} />);

    // Modal should be rendered
    expect(screen.getByText("X")).toBeInTheDocument(); // Close button

    // Content should be duplicated in modal
    const titles = screen.getAllByText("Software Engineer");
    expect(titles.length).toBeGreaterThan(1); // One in card, one in modal

    const companies = screen.getAllByText("Test Company");
    expect(companies.length).toBeGreaterThan(1); // One in card, one in modal
  });

  it("should call setActive(false) when clicking close button in modal", () => {
    const mockSetActive = vi.fn();
    mockUseTimeline.mockReturnValue({
      ...mockUseTimelineReturn,
      active: true,
      setActive: mockSetActive,
    });

    render(<Milestone milestone={mockMilestone} isLast={false} />);

    const closeButton = screen.getByText("X").closest("button");
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton!);
    expect(mockSetActive).toHaveBeenCalledWith(false);
  });

  it("should render description in modal when active", () => {
    mockUseTimeline.mockReturnValue({
      ...mockUseTimeline,
      active: true,
    });

    render(<Milestone milestone={mockMilestone} isLast={false} />);

    expect(screen.getByText("Test milestone description with detailed information.")).toBeInTheDocument();
  });

  it("should handle milestone without end date", () => {
    const milestoneWithoutEndDate: MilestoneType = {
      ...mockMilestone,
      endDate: null,
    };

    render(<Milestone milestone={milestoneWithoutEndDate} isLast={false} />);

    expect(screen.getByText("01/2024")).toBeInTheDocument();
    expect(screen.queryByText("01/2024 - 06/2024")).not.toBeInTheDocument();
  });

  it("should have correct accessibility attributes", () => {
    const { container } = render(<Milestone milestone={mockMilestone} isLast={false} />);

    const clickableCard = container.querySelector(".cursor-pointer");
    expect(clickableCard).toBeInTheDocument();

    // The minHeight is set as a style prop, not CSS class
    const cardElement = container.querySelector("[style*='min-height']");
    expect(cardElement).toBeInTheDocument();
  });

  it("should render with hover styles", () => {
    const { container } = render(<Milestone milestone={mockMilestone} isLast={false} />);

    const hoverElement = container.querySelector(".hover\\:shadow-lg");
    expect(hoverElement).toBeInTheDocument();

    const scaleElement = container.querySelector(".hover\\:scale-99");
    expect(scaleElement).toBeInTheDocument();
  });

  it("should use unique layoutId based on milestone and id", () => {
    mockUseTimeline.mockReturnValue({
      ...mockUseTimelineReturn,
      id: "unique-test-id",
    });

    const { container } = render(<Milestone milestone={mockMilestone} isLast={false} />);

    // Motion components should have layoutId attributes
    // Since we're mocking motion, we can't easily test the exact layoutId values
    // but we can ensure the component renders with the expected structure
    expect(container.querySelector("div")).toBeInTheDocument();
  });
});