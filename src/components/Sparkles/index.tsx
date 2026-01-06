'use client'

import { useSparkles } from "@/hooks/useSparkles"
import { SparklesCore } from "../ui/sparkles"
import { Activity } from "react"
import { ZapIcon, ZapOffIcon } from "lucide-react"
import { cn } from "@/utils"

import { Button } from "../ui/button"

import { useState, useRef } from "react"

const ParticleDensityBar = ({ value, setValue }: { value: number; setValue: (v: number) => void }) => (
  <div className="z-50 bg-white dark:bg-neutral-900 rounded shadow-lg px-4 py-2 flex items-center gap-2 border border-neutral-200 dark:border-neutral-800" style={{ minWidth: 100 }}>
    <span className="text-xs text-neutral-500">Density</span>
    <input
      type="range"
      min={10}
      max={200}
      value={value}
      onChange={e => setValue(Number(e.target.value))}
      className="mx-2 accent-blue-500"
      style={{ width: 120 }}
    />
  </div>
)

export const ToggleSparkles = () => {
  const { isSparklesEnabled, toggleSparkles, particleDensity, setParticleDensity } = useSparkles()
  const [hovered, setHovered] = useState(false)
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    hoverTimeout.current = setTimeout(() => setHovered(true), 1000)
  }
  const handleMouseLeave = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current)
    setHovered(false)
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Button
        variant="ghost"
        onClick={toggleSparkles}
        aria-label={isSparklesEnabled ? 'Disable sparkles' : 'Enable sparkles'}
        title={isSparklesEnabled ? 'Disable sparkles' : 'Enable sparkles'}
      >
        <ZapIcon color="#3b82f6" fill="#3b82f6" className={cn(!isSparklesEnabled && "hidden")} />
        <ZapOffIcon color="#3b82f6" fill="#3b82f6" className={cn(isSparklesEnabled && "hidden")} />
      </Button>
      <Activity mode={hovered ? 'visible' : 'hidden'}>
        <div className="absolute right-0 -top-10 mt-2">
          <ParticleDensityBar value={particleDensity} setValue={setParticleDensity} />
        </div>
      </Activity>
    </div>
  )
}

export const Sparkles = () => {
  const { isSparklesEnabled, particleDensity } = useSparkles()
  return (
    <Activity mode={isSparklesEnabled ? 'visible' : 'hidden'}>
      <div className="w-full absolute inset-0 h-screen invisible! dark:visible! ">
        <SparklesCore
          id="tsparticlesfullpage-dark"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={particleDensity}
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
          particleDensity={particleDensity}
          className="w-full h-full"
          particleColor="#3b82f6"
        />
      </div>
    </Activity>
  )
}