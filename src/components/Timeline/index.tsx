import { Box } from "../Box";
import { Milestone } from "./Milestone";
import { getMilestones } from "@/actions/timeline";

export const Timeline = async () => {
  const milestones = await getMilestones();

  return (
    <Box className="relative flex flex-col items-start gap-4">
      <div className="animate-progress bg-foreground absolute top-0 left-2 h-full w-1.5 rounded-full" />

      {milestones.map((milestone, index) => (
        <Milestone
          key={milestone.id}
          milestone={milestone}
          isLast={index === milestones.length - 1}
        />
      ))}
    </Box>
  );
};
