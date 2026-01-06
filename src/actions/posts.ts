'use server'
import { getPostsData, getPostData } from "@/lib/posts"
import { AllPostsResponse } from "@/interfaces/post-response"
import { cookies } from "next/headers"
import { LanguageType, PostType } from "@/interfaces/post"



export const getAllPosts = async ({ searchQuery = '' }: { searchQuery?: string } = {}): Promise<AllPostsResponse> => {
  try {
    console.log('Fetching posts with search query:', searchQuery);
    const locale = ((await cookies()).get('NEXT_LOCALE')?.value || 'en') as LanguageType;
    let data = getPostsData(locale);

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      data = data.filter((post) => {
        const titleMatch = post.title.toLowerCase().includes(q);
        const descriptionMatch = post.description.toLowerCase().includes(q);
        const tagsMatch = post.tags?.some(tag => tag.toLowerCase().includes(q));
        return titleMatch || descriptionMatch || tagsMatch;
      });
    }

    return {
      data,
      items: data.length,
    };
  } catch (e) {
    console.log(e);
    throw new Error((e as Error).message);
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