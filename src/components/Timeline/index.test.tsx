import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MilestoneType } from "@/interfaces/milestones";
import { Timeline } from ".";

// Mock the getMilestones action
vi.mock("@/actions/timeline", () => ({
  getMilestones: vi.fn(),
}));

// Mock the useTimeline hook
vi.mock("./Milestone/useMilestone.ts", () => ({
  useTimeline: vi.fn(),
}));

const mockGetMilestones = vi.mocked(
  await import("@/actions/timeline"),
).getMilestones;

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
    mockGetMilestones.mockResolvedValue(mockMilestones);
    mockUseTimeline.mockReturnValue({
      ref: { current: null },
      inView: false,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render timeline with correct structure", async () => {
    render(await Timeline());

    const timelineContainer = document.querySelector(".relative.flex.flex-col");
    expect(timelineContainer).toBeInTheDocument();
  });

  it("should render progress bar", async () => {
    render(await Timeline());

    const progressBar = document.querySelector(".animate-progress");
    expect(progressBar).toBeInTheDocument();
  });

  it("should render all milestones", async () => {
    render(await Timeline());

    expect(screen.getByText("First Milestone")).toBeInTheDocument();
    expect(screen.getByText("Second Milestone")).toBeInTheDocument();
    expect(screen.getByText("2024-01-01")).toBeInTheDocument();
    expect(screen.getByText("2024-06-15")).toBeInTheDocument();
  });

  it("should apply correct styling when milestone is not in view", async () => {
    mockUseTimeline.mockReturnValue({
      ref: { current: null },
      inView: false,
    });

    const { container } = render(await Timeline());

    const hiddenElements = container.querySelectorAll(".opacity-0");
    expect(hiddenElements.length).toBeGreaterThan(0);
  });

  it("should apply correct styling when milestone is in view", async () => {
    mockUseTimeline.mockReturnValue({
      ref: { current: null },
      inView: true,
    });

    const { container } = render(await Timeline());

    const visibleElements = container.querySelectorAll(".opacity-100");
    expect(visibleElements.length).toBeGreaterThan(0);
  });

  it("should handle empty milestones array", async () => {
    mockGetMilestones.mockResolvedValue([]);

    const { container } = render(await Timeline());

    const timelineContainer = container.querySelector(
      ".relative.flex.flex-col",
    );
    expect(timelineContainer).toBeInTheDocument();
    expect(timelineContainer?.children.length).toBe(1); // Only progress bar
  });

  it("should call getMilestones action", async () => {
    render(await Timeline());

    expect(mockGetMilestones).toHaveBeenCalledTimes(1);
  });
});
