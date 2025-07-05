'use server'
import { REVALIDATE } from "@/constants/revalidate"
import { Pagination, PostType } from "@/interfaces/posts"
import { api } from "@/api"


export const getPosts = async ({ currentPage = 1, perPage = 5 }: { currentPage?: number, perPage?: number }) => {
  try {
    const data = await api<Pagination<PostType[]>>(`posts?_page=${currentPage}&_per_page=${perPage}`, {
      cache: 'no-cache',
      next: {
        tags: ['posts'],
        revalidate: REVALIDATE.ONE_HOUR
      }
    })

    return data
  } catch (e) {
    console.log(e)
    throw new Error((e as Error).message)
  }
}

export const getPostById = async (id: string) => {
  try {
    const data = await api<PostType>(`posts/${id}`, {
      cache: 'no-cache',
      next: {
        tags: ['post', id],
        revalidate: REVALIDATE.ONE_HOUR
      }
    })

    return data
  } catch (e) {
    console.log(e)
    throw new Error((e as Error).message)
  }
}