'use server'
import { REVALIDATE } from "@/constants/revalidate"
import { PostType } from "@/interfaces/post"
import { api } from "@/api"
import { PaginationType } from "@/interfaces/pagination"

export const getHomePosts = async () => {
  try {
    const data = await api<PaginationType<PostType[]>>(`/api/posts?_page=1&_per_page=2`, {
      next: {
        tags: ['home-posts'],
        revalidate: REVALIDATE.ONE_HOUR
      }
    })

    return data
  } catch (e) {
    console.log(e)
    throw new Error((e as Error).message)
  }
}

export const getBlogPosts = async ({ currentPage = 1, perPage = 3 }: { currentPage?: number, perPage?: number }) => {
  try {
    const data = await api<PaginationType<PostType[]>>(`/api/posts?_page=${currentPage}&_per_page=${perPage}`, {
      next: {
        tags: ['blog-posts', `${currentPage}`, `${perPage}`],
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
        revalidate: REVALIDATE.FOUR_HOURS
      }
    })

    return data
  } catch (e) {
    console.log(e)
    throw new Error((e as Error).message)
  }
}