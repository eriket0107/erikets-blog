"use client";

import { MilestoneType } from "@/interfaces/milestones";
import { useTimeline } from "./useMilestone";
import { Typography } from "@/components/Typography";

export const Milestone = ({
  milestone,
  isLast,
}: {
  milestone: MilestoneType;
  isLast: boolean;
}) => {
  const { inView, ref } = useTimeline();
  return (
    <div
      ref={ref}
      className={`flex w-full items-start transition-opacity duration-1000 ${inView ? "opacity-100" : "opacity-0"}`}
    >
      <div className="mr-4 flex flex-col items-center justify-center pl-1">
        <div
          className={`bg-primary flex h-4 w-4 items-center justify-center rounded-full transition-transform duration-500 ${inView ? "scale-100" : "scale-0"}`}
        >
          <div className="bg-secondary h-1 w-1 rounded-full" />
        </div>
        {!isLast && (
          <div
            className={`origin-toptransition-transform w-1 flex-1 duration-1000 ${inView ? "scale-y-100" : "scale-y-0"}`}
          />
        )}
      </div>

      <div
        className={`hover:shadow-foreground w-full rounded-sm p-2 transition-all duration-300 hover:scale-99 hover:shadow-md/20 hover:shadow-xs ${inView ? "translate-x-0 opacity-100" : "-translate-x-5 opacity-0"}`}
      >
        <Typography.Muted className="text-primary">
          {milestone.date}
        </Typography.Muted>
        <Typography.H4 className="text-primary mt-1 text-lg font-bold">
          {milestone.title}
        </Typography.H4>
      </div>
    </div>
  );
};
