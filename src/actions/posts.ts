'use server'
import { REVALIDATE } from "@/constants/revalidate"
import { Pagination, PostType } from "@/interfaces/posts"

const api = process.env.NEXT_PUBLIC_NODE_ENV === 'test' ? process.env.NEXT_PUBLIC_API_MOCK : process.env.NEXT_PUBLIC_API

export const getPosts = async ({ page = 1, perPage = 5 }: { page?: number, perPage?: number }): Promise<Pagination<PostType[]>> => {
  try {
    const res = await fetch(`${api}/posts?_page=${page}&_per_page=${perPage}`, {
      cache: 'no-cache',
      next: {
        tags: ['posts'],
        revalidate: REVALIDATE.ONE_HOUR
      }
    })

    const data = await res.json()
    return data
  } catch (e) {
    console.log(e)
    throw new Error((e as Error).message)
  }
}