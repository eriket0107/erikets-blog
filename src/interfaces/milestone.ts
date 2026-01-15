import React from "react";

export interface MilestoneType {
  id: number;
  title: string;
  startDate: string;
  endDate: string | null;
  description: React.ReactNode;
  company: string
}