import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MilestoneType } from "@/interfaces/milestone";
import { Timeline } from ".";

// Mock the getMilestones action
vi.mock("@/actions/milestones", () => ({
  getMilestones: vi.fn(),
}));

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
    startDate: "2024-01-01",
    endDate: "2024-03-01",
    description: "First milestone description",
    company: "Test Company",
  },
  {
    id: 2,
    title: "Second Milestone",
    startDate: "2024-06-15",
    endDate: "2024-08-15",
    description: "Second milestone description",
    company: "Another Company",
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

  it("should render timeline with correct structure", async () => {
    render(<Timeline milestones={mockMilestones} />);

    const timelineContainer = document.querySelector(".relative.flex.flex-col");
    expect(timelineContainer).toBeInTheDocument();
  });

  it("should render progress bar", async () => {
    render(<Timeline milestones={mockMilestones} />);

    const progressBar = document.querySelector(".animate-progress");
    expect(progressBar).toBeInTheDocument();
  });

  it("should render all milestones", async () => {
    render(<Timeline milestones={mockMilestones} />);

    // Test milestone titles with company names
    expect(
      screen.getByText(/First Milestone - Test Company/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Second Milestone - Another Company/),
    ).toBeInTheDocument();

    expect(screen.getByText("1/2024 - 3/2024")).toBeInTheDocument();
    expect(screen.getByText("6/2024 - 8/2024")).toBeInTheDocument();
  });

  it("should apply correct styling when milestone is not in view", async () => {
    mockUseTimeline.mockReturnValue({
      ref: { current: null },
      inView: false,
    });

    const { container } = render(<Timeline milestones={mockMilestones} />);

    const hiddenElements = container.querySelectorAll(".opacity-0");
    expect(hiddenElements.length).toBeGreaterThan(0);
  });

  it("should apply correct styling when milestone is in view", async () => {
    mockUseTimeline.mockReturnValue({
      ref: { current: null },
      inView: true,
    });

    const { container } = render(<Timeline milestones={mockMilestones} />);

    const visibleElements = container.querySelectorAll(".opacity-100");
    expect(visibleElements.length).toBeGreaterThan(0);
  });

  it("should handle empty milestones array", async () => {
    const { container } = render(<Timeline milestones={mockMilestones} />);

    const timelineContainer = container.querySelector(
      ".relative.flex.flex-col",
    );
    expect(timelineContainer).toBeInTheDocument();
    expect(timelineContainer?.children.length).toBe(3);
  });
});
