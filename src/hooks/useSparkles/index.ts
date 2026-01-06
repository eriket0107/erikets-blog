
import { create } from "zustand"
import { persist } from "zustand/middleware";

interface SparklesStore {
  isSparklesEnabled: boolean;
  setSparkles: (state: boolean) => void;
  toggleSparkles: () => void;
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
    }),
    {
      name: '@coffeAndVanillaCode:sparkles',
    }
  )
);

export const useSparkles = () => {
  const { isSparklesEnabled, setSparkles, toggleSparkles } = useSparklesStore();

  return {
    isSparklesEnabled,
    setSparkles,
    toggleSparkles,
  };
}