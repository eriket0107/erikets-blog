import { delayFunction } from "@/utils"

const apiUrl = process.env.NEXT_PUBLIC_NODE_ENV === 'test'
  ? process.env.NEXT_PUBLIC_API_MOCK
  : process.env.NEXT_PUBLIC_API

export const api = async <T = unknown>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  if (process.env.NEXT_PUBLIC_NODE_ENV === 'test') {
    await delayFunction(1000)
  }

  try {
    const response = await fetch(`${apiUrl}/${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}