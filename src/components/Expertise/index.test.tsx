import { describe, it, expect, vi } from "vitest";
import { Expertise } from "./index";

// Mock the useTranslations hook
vi.mock("next-intl", () => ({
  useTranslations: vi.fn().mockReturnValue((key: string) => {
    const translations: Record<string, string> = {
      "multiplan.title": "Software Engineer",
      "multiplan.company": "Multiplan Empreendimentos S.A, RJ", 
      "multiplan.item1": "Implemented an end-to-end MVP for automated parking",
      "multiplan.item2": "Led frontend development for high-traffic system",
      "multiplan.item3": "Optimized performance with React Apollo Client",
      "multiplan.item4": "Integrated 4+ payment providers",
      "multiplan.item5": "Decreased critical errors by 20%",
      "multiplan.item6": "Refactored EV Chargers communication",
      "multiplan.item7": "Architected daily cron job for vehicle migration",
      "pepsico.title": "Software Engineer (Contractor)",
      "pepsico.company": "Latop / PepsiCo",
      "pepsico.item1": "Architected critical freight logistics platform",
      "pepsico.item2": "Reduced redundant API calls by 20%",
      "pepsico.item3": "Engineered 10-minute periodic sync",
      "neurogram.title": "Software Engineer (Contractor)",
      "neurogram.company": "Neurogram",
      "neurogram.item1": "Developed high-performance dynamic landing pages",
      "neurogram.item2": "Automated delivery cycles with CI/CD pipelines",
      "neurogram.item3": "Integrated medical diagnostic algorithms",
    };
    return translations[key] || key;
  }),
}));

describe("Expertise", () => {
  it("should return correct number of milestones", () => {
    const milestones = Expertise();
    expect(milestones).toHaveLength(3);
  });

  it("should return milestones with correct structure", () => {
    const milestones = Expertise();
    
    milestones.forEach((milestone) => {
      expect(milestone).toHaveProperty("id");
      expect(milestone).toHaveProperty("title");
      expect(milestone).toHaveProperty("company");
      expect(milestone).toHaveProperty("startDate");
      expect(milestone).toHaveProperty("endDate");
      expect(milestone).toHaveProperty("description");
      
      expect(typeof milestone.id).toBe("number");
      expect(typeof milestone.title).toBe("string");
      expect(typeof milestone.company).toBe("string");
      expect(typeof milestone.startDate).toBe("string");
      expect(milestone.endDate).toBeTruthy();
    });
  });

  it("should return Multiplan milestone with correct data", () => {
    const milestones = Expertise();
    const multiplanMilestone = milestones.find(m => m.id === 1);
    
    expect(multiplanMilestone).toBeDefined();
    expect(multiplanMilestone?.title).toBe("Software Engineer");
    expect(multiplanMilestone?.company).toBe("Multiplan Empreendimentos S.A, RJ");
    expect(multiplanMilestone?.startDate).toBe("2022-02-01");
    expect(multiplanMilestone?.endDate).toBeTruthy();
  });

  it("should return PepsiCo milestone with correct data", () => {
    const milestones = Expertise();
    const pepsicoMilestone = milestones.find(m => m.id === 2);
    
    expect(pepsicoMilestone).toBeDefined();
    expect(pepsicoMilestone?.title).toBe("Software Engineer (Contractor)");
    expect(pepsicoMilestone?.company).toBe("Latop / PepsiCo");
    expect(pepsicoMilestone?.startDate).toBe("2024-07-01");
    expect(pepsicoMilestone?.endDate).toBe("2025-09-30");
  });

  it("should return Neurogram milestone with correct data", () => {
    const milestones = Expertise();
    const neurogramMilestone = milestones.find(m => m.id === 3);
    
    expect(neurogramMilestone).toBeDefined();
    expect(neurogramMilestone?.title).toBe("Software Engineer (Contractor)");
    expect(neurogramMilestone?.company).toBe("Neurogram");
    expect(neurogramMilestone?.startDate).toBe("2024-04-01");
    expect(neurogramMilestone?.endDate).toBe("2024-09-30");
  });

  it("should return descriptions as ReactNode elements", () => {
    const milestones = Expertise();
    
    milestones.forEach((milestone) => {
      expect(milestone.description).toBeDefined();
      // Description should be a React element (JSX)
      expect(typeof milestone.description).toBe("object");
    });
  });
});