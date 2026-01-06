'use server'
import { getPostsData, getPostData } from "@/lib/posts"
import { AllPostsResponse } from "@/interfaces/post-response"
import { cookies } from "next/headers"
import { LanguageType, PostType } from "@/interfaces/post"


export const getAllPosts = async (): Promise<AllPostsResponse> => {
  try {
    const locale = ((await cookies()).get('NEXT_LOCALE')?.value || 'en') as LanguageType
    const data = getPostsData(locale)

    return {
      data,
      items: data.length,
    }
  } catch (e) {
    console.log(e)
    throw new Error((e as Error).message)
  }
}


export const getPostById = async (id: string) => {
  try {
    const locale = ((await cookies()).get('NEXT_LOCALE')?.value || 'en') as LanguageType
    const data = getPostData(id, locale) as PostType

    return {
      data
    }
  } catch (e) {
    console.log(e)
    throw new Error((e as Error).message)
  }
}