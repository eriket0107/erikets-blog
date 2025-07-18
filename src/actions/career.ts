import { api } from "@/api"
import { REVALIDATE } from "@/constants/revalidate"
import { CareerType } from "@/interfaces/career"

export const getCareer = async (id?: string) => {
  const idParam = id ? id : 1
  try {
    const data = await api<CareerType>(`career/${idParam}`, {
      next: {
        tags: ['career'],
        revalidate: REVALIDATE.ONE_HOUR
      }
    })

    return data
  } catch (e) {
    console.log(e)
    throw new Error((e as Error).message)
  }
}