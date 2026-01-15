"use client";

import { MilestoneType } from "@/interfaces/milestone";
import { getMonthAndYear } from "@/utils/get-month-and-year";
import { AnimatePresence, motion } from "motion/react";
import { useTimeline } from "./useMilestone";
import { X } from "lucide-react";

export const Milestone = ({
  milestone,
  isLast,
}: {
  milestone: MilestoneType;
  isLast: boolean;
}) => {
  const { ref, refModal, inView, active, setActive, id } = useTimeline();

  return (
    <>
      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 grid place-items-center z-100 p-4">
            <motion.button
              key={`button-${milestone.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-4 right-4 items-center justify-center bg-background rounded-full h-8 w-8 shadow-lg z-101"
              onClick={() => setActive(false)}
            >
              <X />
            </motion.button>

            <motion.div
              layoutId={`card-${milestone.title}-${id}`}
              ref={refModal}
              className="w-full h-full md:h-fit flex flex-col bg-background border rounded-xl shadow-2xl overflow-y-auto scrollbar- scrollbar-track-transparent scrollbar-thumb-primary/40 hover:scrollbar-thumb-primary/60"
            >
              <div className="p-6 md:p-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                  <div className="flex-1">
                    <motion.h3
                      layoutId={`title-${milestone.title}-${id}`}
                      className="text-2xl font-bold mb-2"
                    >
                      {milestone.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`company-${milestone.company}-${id}`}
                      className="text-lg text-muted-foreground mb-2"
                    >
                      {milestone.company}
                    </motion.p>
                    <motion.p
                      layoutId={`dates-${milestone.title}-${id}`}
                      className="text-sm text-muted-foreground"
                    >
                      {getMonthAndYear(milestone.startDate)}
                      {milestone?.endDate && " - " + getMonthAndYear(milestone?.endDate)}
                    </motion.p>
                  </div>
                </div>

                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {milestone.description && (
                    <div className="text-base leading-relaxed ">
                      {milestone.description}
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <motion.div
        layoutId={`card-${milestone.title}-${id}`}
        className="relative w-full"
      >
        <div
          ref={ref}
          className={`flex w-full items-start transition-all duration-1000 ${inView ? "opacity-100" : "opacity-0"}`}
          style={{ minHeight: 80 }}
        >
          <div className="mr-4 flex flex-col items-center justify-center pl-1">
            <div
              className={`bg-primary flex h-4 w-4 items-center justify-center rounded-full transition-transform duration-500 ${inView ? "scale-100" : "scale-0"}`}
            >
              <div className="bg-secondary h-1 w-1 rounded-full" />
            </div>
            {!isLast && (
              <div
                className={`w-1 flex-1 bg-border transition-transform duration-1000 origin-top ${inView ? "scale-y-100" : "scale-y-0"}`}
              />
            )}
          </div>

          <div
            onClick={() => setActive(true)}
            className={`w-full border rounded-lg p-4 transition-all duration-300 hover:shadow-lg hover:scale-99 cursor-pointer ${inView ? "translate-x-0 opacity-100" : "-translate-x-5 opacity-0"}`}
          >
            <motion.p
              layoutId={`dates-${milestone.title}-${id}`}
              className="text-sm text-muted-foreground mb-2"
            >
              {getMonthAndYear(milestone.startDate)}
              {milestone?.endDate && " - " + getMonthAndYear(milestone?.endDate)}
            </motion.p>
            <motion.h4
              layoutId={`title-${milestone.title}-${id}`}
              className="text-lg font-bold mb-1"
            >
              {milestone.title}
            </motion.h4>
            <motion.p
              layoutId={`company-${milestone.company}-${id}`}
              className="text-base text-muted-foreground"
            >
              {milestone.company}
            </motion.p>
          </div>
        </div>
      </motion.div>
    </>
  );
};


