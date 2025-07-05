
export const delayFunction = (delayValue: number = Number(process.env.NEXT_PUBLIC_API_DELAY) || 1000) => new Promise((resolve) => setTimeout(resolve, delayValue))