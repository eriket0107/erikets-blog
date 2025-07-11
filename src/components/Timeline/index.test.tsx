import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MilestoneType } from "@/interfaces/milestones";
import { Timeline } from ".";

// Mock the useTimeline hook
vi.mock("./Milestone/useMilestone.ts", () => ({
  useTimeline: vi.fn(),
}));

const mockUseTimeline = vi.mocked(
  await import("./Milestone/useMilestone"),
).useTimeline;

const mockMilestones: MilestoneType[] = [
  {
    id: 1,
    title: "First Milestone",
    date: "2024-01-01",
    description: "First milestone description",
  },
  {
    id: 2,
    title: "Second Milestone",
    date: "2024-06-15",
    description: "Second milestone description",
  },
];

describe("Timeline", () => {
  beforeEach(() => {
    mockUseTimeline.mockReturnValue({
      ref: { current: null },
      inView: false,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render timeline with correct structure", () => {
    render(<Timeline milestones={mockMilestones} />);

    const timelineContainer = document.querySelector(".relative.flex.flex-col");
    expect(timelineContainer).toBeInTheDocument();
  });

  it("should render progress bar", () => {
    render(<Timeline milestones={mockMilestones} />);

    const progressBar = document.querySelector(".animate-progress");
    expect(progressBar).toBeInTheDocument();
  });

  it("should render all milestones", () => {
    render(<Timeline milestones={mockMilestones} />);

    expect(screen.getByText("First Milestone")).toBeInTheDocument();
    expect(screen.getByText("Second Milestone")).toBeInTheDocument();
    expect(screen.getByText("2024-01-01")).toBeInTheDocument();
    expect(screen.getByText("2024-06-15")).toBeInTheDocument();
  });

  it("should apply correct styling when milestone is not in view", () => {
    mockUseTimeline.mockReturnValue({
      ref: { current: null },
      inView: false,
    });

    const { container } = render(<Timeline milestones={mockMilestones} />);

    const hiddenElements = container.querySelectorAll(".opacity-0");
    expect(hiddenElements.length).toBeGreaterThan(0);
  });

  it("should apply correct styling when milestone is in view", () => {
    mockUseTimeline.mockReturnValue({
      ref: { current: null },
      inView: true,
    });

    const { container } = render(<Timeline milestones={mockMilestones} />);

    const visibleElements = container.querySelectorAll(".opacity-100");
    expect(visibleElements.length).toBeGreaterThan(0);
  });

  it("should handle empty milestones array", () => {
    const { container } = render(<Timeline milestones={[]} />);

    const timelineContainer = container.querySelector(
      ".relative.flex.flex-col",
    );
    expect(timelineContainer).toBeInTheDocument();
    expect(timelineContainer?.children.length).toBe(1); // Only progress bar
  });

  it("should call useTimeline hook for each milestone", () => {
    render(<Timeline milestones={mockMilestones} />);

    expect(mockUseTimeline).toHaveBeenCalledTimes(mockMilestones.length);
  });
});
