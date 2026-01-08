'use client'
import { Suspense } from "react"
import ThemeButton from "../ThemeButton"
import LocaleSwitcher from "../LocaleSwitcher"
import { ToggleSparkles } from "../Sparkles"

export const ActionsButton = () => {
  return (
    <div className="flex gap-5">
      <Suspense fallback={<></>}>
        <ThemeButton.Nav />
        <LocaleSwitcher />
        <ToggleSparkles />
      </Suspense>
    </div>
  )
}