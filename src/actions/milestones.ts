'use server'

import { api } from "@/api"
import { REVALIDATE } from "@/constants/revalidate"
import { MilestoneType } from "@/interfaces/milestones"

export const getMilestones = async () => {
  try {
    const data = await api<MilestoneType[]>('milestones', {
      next: {
        tags: ['milestones'],
        revalidate: REVALIDATE.ONE_HOUR
      }
    })

    return data
  } catch (e) {
    console.log(e)
    throw new Error((e as Error).message)
  }
}