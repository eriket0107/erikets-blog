"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { MoonStar, Sun } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { motion, AnimatePresence } from "motion/react";

const ThemeButtonMenu = () => {
  const { handleThemeChange, isDark } = useTheme();

  return (
    <motion.div whileTap={{ scale: 0.95 }} transition={{ duration: 0.1 }}>
      <Button
        className="!flex flex-1 cursor-pointer flex-row items-center justify-between gap-21 border-none text-base transition-all duration-100 ease-in-out focus:bg-transparent"
        variant="ghost"
        size="default-icon"
        onClick={handleThemeChange}
        data-testid="theme-btn-menu"
      >
        {isDark ? "Light" : "Dark"}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={isDark ? "sun" : "moon"}
              initial={{ y: 20, opacity: 0, rotate: -180 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: 180 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="block"
            >
              {isDark ? (
                <Sun color="yellow" size={20} />
              ) : (
                <MoonStar color="black" size={20} />
              )}
            </motion.span>
          </AnimatePresence>
        </div>
      </Button>
    </motion.div>
  );
};

const ThemeButtonNav = () => {
  const { handleThemeChange, isDark } = useTheme();

  return (
    <Tooltip delayDuration={300}>
      <TooltipContent className="text-primary z-[100]">
        {isDark ? "Light" : "Dark"}
      </TooltipContent>
      <TooltipTrigger asChild>
        <motion.div
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.1 }}
        >
          <Button
            onClick={handleThemeChange}
            className="relative cursor-pointer !p-1 md:flex"
            variant={"link"}
            data-testid="theme-btn-nav"
          >
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={isDark ? "sun" : "moon"}
                  initial={{ scale: 0, rotate: -180, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  exit={{ scale: 0, rotate: 180, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="block"
                >
                  {isDark ? (
                    <Sun color="yellow" size={24} />
                  ) : (
                    <MoonStar color="black" size={24} />
                  )}
                </motion.span>
              </AnimatePresence>
            </div>
          </Button>
        </motion.div>
      </TooltipTrigger>
    </Tooltip>
  );
};


const ThemeButton = {
  Nav: ThemeButtonNav,
  Menu: ThemeButtonMenu,
  displayName: "ThemeButton"
}


export default ThemeButton;
