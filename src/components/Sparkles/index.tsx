'use client'

import { useSparkles } from "@/hooks/useSparkles"
import { SparklesCore } from "../ui/sparkles"
import { Activity } from "react"
import { ZapIcon, ZapOffIcon } from "lucide-react"
import { cn } from "@/utils"

export const ToggleSparkles = () => {
  const { isSparklesEnabled, toggleSparkles } = useSparkles()

  return (
    <button
      onClick={toggleSparkles}
      className={cn("transition-colors p-2")}
      aria-label={isSparklesEnabled ? 'Disable sparkles' : 'Enable sparkles'}
      title={isSparklesEnabled ? 'Disable sparkles' : 'Enable sparkles'}
    >
      <ZapIcon color="#3b82f6" fill="#3b82f6" className={cn(!isSparklesEnabled && "hidden")} />
      <ZapOffIcon color="#3b82f6" fill="#3b82f6" className={cn(isSparklesEnabled && "hidden")} />
    </button>
  )
}

export const Sparkles = () => {
  const { isSparklesEnabled } = useSparkles()
  return (
    <Activity mode={isSparklesEnabled ? 'visible' : 'hidden'}>
      <div className="w-full absolute inset-0 h-screen invisible! dark:visible! ">
        <SparklesCore
          id="tsparticlesfullpage-dark"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      <div className="w-full absolute inset-0 h-screen visible! dark:invisible!">
        <SparklesCore
          id="tsparticlesfullpage-light"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#3b82f6"
        />
      </div>
    </Activity>
  )
}