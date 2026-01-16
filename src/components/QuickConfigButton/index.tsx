'use client'
import { ThemeButton } from "../ThemeButton"
import LocaleSwitcher from "../LocaleSwitcher"
import { ToggleSparkles } from "../Sparkles"
import { SlidersHorizontal } from "lucide-react"
import { Button } from "../ui/button"
import { AnimatePresence, motion } from "motion/react"
import { useRef, useState } from "react"
import { useOutsideClick } from "@/hooks/useOutsideClick"

export const QuickConfigFull = () => {
  return (
    <div className="flex gap-5">
      <ThemeButton.Nav />
      <LocaleSwitcher />
      <ToggleSparkles />
    </div>
  )
}


export const QuickConfigMini = () => {
  const [active, setActive] = useState<boolean>(false)
  const toggleActionsBtn = () => {
    setActive(prev => !prev)
  }
  const ref = useRef<HTMLDivElement>(null)
  useOutsideClick(ref, toggleActionsBtn)

  return (
    <div className="relative">
      <Button variant='link' className="md:flex hidden cursor-pointer bg-transparent text-accent-foreground hover:bg-transparent hover:opacity-70 p-0!" onClick={toggleActionsBtn}>
        <SlidersHorizontal />
      </Button>

      <AnimatePresence>
        {active && <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -20, transition: { duration: 0.05 } }}
          animate={{ opacity: 1, y: 1, }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.05 } }}
          className="rounded-md border border-gray-200! dark:border-gray-800! absolute top-10 -right-3 py-1 px-2 items-center bg-background flex flex-col gap-1">
          <ThemeButton.Nav />
          <LocaleSwitcher />
          <ToggleSparkles />
        </motion.div>}
      </AnimatePresence>
    </div >
  )
}
