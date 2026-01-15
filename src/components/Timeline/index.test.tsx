import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MilestoneType } from "@/interfaces/milestone";
import { Timeline } from ".";

// Mock the useTimeline hook
vi.mock("./Milestone/useMilestone.ts", () => ({
  useTimeline: vi.fn(),
}));

// Mock the Expertise component
vi.mock("../Expertise", () => ({
  Expertise: vi.fn(),
}));

const mockUseTimeline = vi.mocked(
  await import("./Milestone/useMilestone"),
).useTimeline;

const mockExpertise = vi.mocked(
  await import("../Expertise"),
).Expertise;

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
      refModal: { current: null },
      active: false,
      setActive: vi.fn(),
      toggleActive: vi.fn(),
      id: "test-id",
    });

    mockExpertise.mockReturnValue(mockMilestones);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render timeline with correct structure", async () => {
    render(<Timeline />);

    const timelineContainer = document.querySelector(".relative.flex.flex-col");
    expect(timelineContainer).toBeInTheDocument();
  });

  it("should render progress bar", async () => {
    render(<Timeline />);

    const progressBar = document.querySelector(".animate-progress");
    expect(progressBar).toBeInTheDocument();
  });

  it("should render all milestones", async () => {
    render(<Timeline />);

    // Test milestone titles and company names separately
    expect(screen.getByText("First Milestone")).toBeInTheDocument();
    expect(screen.getByText("Test Company")).toBeInTheDocument();
    expect(screen.getByText("Second Milestone")).toBeInTheDocument();
    expect(screen.getByText("Another Company")).toBeInTheDocument();

    expect(screen.getByText("01/2024 - 03/2024")).toBeInTheDocument();
    expect(screen.getByText("06/2024 - 08/2024")).toBeInTheDocument();
  });

  it("should apply correct styling when milestone is not in view", async () => {
    mockUseTimeline.mockReturnValue({
      ref: { current: null },
      inView: false,
      refModal: { current: null },
      active: false,
      setActive: vi.fn(),
      toggleActive: vi.fn(),
      id: "test-id",
    });

    const { container } = render(<Timeline />);

    const hiddenElements = container.querySelectorAll(".opacity-0");
    expect(hiddenElements.length).toBeGreaterThan(0);
  });

  it("should apply correct styling when milestone is in view", async () => {
    mockUseTimeline.mockReturnValue({
      ref: { current: null },
      inView: true,
      refModal: { current: null },
      active: false,
      setActive: vi.fn(),
      toggleActive: vi.fn(),
      id: "test-id",
    });

    const { container } = render(<Timeline />);

    const visibleElements = container.querySelectorAll(".opacity-100");
    expect(visibleElements.length).toBeGreaterThan(0);
  });

  it("should handle empty milestones array", async () => {
    mockExpertise.mockReturnValue([]);
    const { container } = render(<Timeline />);

    const timelineContainer = container.querySelector(
      ".relative.flex.flex-col",
    );
    expect(timelineContainer).toBeInTheDocument();
    expect(timelineContainer?.children.length).toBe(1); // Only progress bar
  });
});
