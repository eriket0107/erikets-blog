
import { create } from "zustand"
import { persist } from "zustand/middleware";


interface SparklesStore {
  isSparklesEnabled: boolean;
  setSparkles: (state: boolean) => void;
  toggleSparkles: () => void;
  particleDensity: number;
  setParticleDensity: (density: number) => void;
}

const useSparklesStore = create<SparklesStore>()(
  persist(
    (set, get) => ({
      isSparklesEnabled: true,
      setSparkles: (state: boolean) => set({ isSparklesEnabled: state }),
      toggleSparkles: () => {
        const currentState = get().isSparklesEnabled;
        set({ isSparklesEnabled: !currentState });
      },
      particleDensity: 100,
      setParticleDensity: (density: number) => set({ particleDensity: density }),
    }),
    {
      name: '@coffeeAndVanillaCode:sparkles',
    }
  )
);

export const useSparkles = () => {
  const { isSparklesEnabled, setSparkles, toggleSparkles, particleDensity, setParticleDensity } = useSparklesStore();

  return {
    isSparklesEnabled,
    setSparkles,
    toggleSparkles,
    particleDensity,
    setParticleDensity,
  };
}