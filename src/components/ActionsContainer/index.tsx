'use client'
import ThemeButton from "../ThemeButton"
import LocaleSwitcher from "../LocaleSwitcher"
import { ToggleSparkles } from "../Sparkles"

export const ActionsContainer = () => {
  return (
    <div className="flex gap-5">
      <ThemeButton.Nav />
      <LocaleSwitcher />
      <ToggleSparkles />
    </div>
  )
}