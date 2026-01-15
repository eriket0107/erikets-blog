import { Box } from "../Box";
import { Expertise } from "../Expertise";
import { Milestone } from "./Milestone";


export const Timeline = () => {
  const SORTED_MILESTONES = [...Expertise()].sort((a, b) => {
    const dateA = a.endDate || "";
    const dateB = b.endDate || "";
    if (dateB > dateA) return 1;
    else return -1;
  });

  return (
    <Box className="relative flex flex-col items-start gap-4">
      <div className="animate-progress bg-foreground absolute top-0 left-2 h-full w-1.5 rounded-full" />


      {SORTED_MILESTONES.map((milestone, index) => (
        <Milestone
          key={milestone.id}
          milestone={milestone}
          isLast={index === Expertise().length - 1}
        />
      ))}

    </Box>
  );
};
