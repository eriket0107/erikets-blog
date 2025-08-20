"use client";

import { MilestoneType } from "@/interfaces/milestone";
import { useTimeline } from "./useMilestone";
import { Typography } from "@/components/Typography";
import { getMonthAndYear } from "@/utils/get-month-and-year";

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
        className={`hover:shadow-foreground w-full border-t border-gray-200 p-2 transition-all duration-300 hover:scale-99 hover:rounded-sm hover:shadow-md/20 hover:shadow-xs ${inView ? "translate-x-0 opacity-100" : "-translate-x-5 opacity-0"}`}
      >
        <Typography.Muted className="text-primary">
          {getMonthAndYear(milestone.startDate)}
          {milestone?.endDate && " - " + getMonthAndYear(milestone?.endDate)}
        </Typography.Muted>
        <Typography.H4 className="text-primary mt-1 text-lg font-bold">
          {milestone.title} - {milestone?.company}
        </Typography.H4>
        {/* <Typography.P className="text-primary text-md mt-1">
          {milestone.description}
        </Typography.P> */}
      </div>
    </div>
  );
};
