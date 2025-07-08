"use client";

import { useRouter } from "@/hooks/useRouter";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";

interface BackButtonProps {
  onBack?: () => void;
}

export const BackButton = ({ onBack }: BackButtonProps) => {
  const t = useTranslations("BackButton");
  const router = useRouter();

  const handleBackNavigation = () => {
    if (onBack) onBack();
    router.back();
  };

  return (
    <Button
      onClick={handleBackNavigation}
      variant="link"
      className="cursor-pointer !p-0 transition-all transition-discrete hover:scale-95 hover:opacity-85"
      aria-label="Go Back to previous page"
    >
      <ChevronLeft size={16} /> {t("text")}
    </Button>
  );
};
