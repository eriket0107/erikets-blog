'use server'
import { REVALIDATE } from "@/constants/revalidate"
import { PostType } from "@/interfaces/post"
import { api } from "@/api"
import { PaginationType } from "@/interfaces/pagination"


export const getPosts = async ({ currentPage = 1, perPage = 5, isPaginated = true }: { currentPage?: number, perPage?: number, isPaginated?: boolean }) => {

  try {
    const handlePagination = () => {
      if (isPaginated) return `?_page=${currentPage}&_per_page=${perPage}`
      return ''
    }


    const data = await api<PaginationType<PostType[]>>(`/api/posts${handlePagination()}`, {
      next: {
        tags: ['posts', `${currentPage}`],
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
    const data = await api<{ data: PostType }>(`/api/posts/${id}`, {
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