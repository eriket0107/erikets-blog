import { LanguageType } from "@/interfaces/post";
import { getPostsData } from "@/lib/posts";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";


export async function GET(request: NextRequest) {
  try {
    const locale = ((await cookies()).get('NEXT_LOCALE')?.value || 'en') as LanguageType

    const allPostsData = getPostsData(locale);
    const searchParams = request.nextUrl.searchParams

    const page = Number(searchParams.get('_page')) || 1
    const perPage = Number(searchParams.get('_per_page')) || 10

    const startIndex = (page - 1) * perPage
    const endIndex = startIndex + perPage

    const paginatedPosts = allPostsData.slice(startIndex, endIndex)

    const totalItems = allPostsData.length
    const totalPages = Math.ceil(totalItems / perPage) || 0

    const hasNext = page < totalPages
    const hasPrev = page > 1
    const first = 1
    const last = totalPages

    const next = hasNext ? page + 1 : null
    const prev = hasPrev ? page - 1 : null

    return NextResponse.json({
      data: paginatedPosts,
      next,
      pages: totalPages,
      prev,
      first,
      last,
      items: totalItems,
    }, { status: 200 });
  } catch (error) {
    console.log((error as Error).message)
    return NextResponse.json({ error: 'Posts not found' }, { status: 404 });
  }
}