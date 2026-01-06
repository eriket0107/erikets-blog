import { LanguageType } from "@/interfaces/post";
import { getPostsData } from "@/lib/posts";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const locale = ((await cookies()).get('NEXT_LOCALE')?.value || 'en') as LanguageType
    const allPostsData = getPostsData(locale);

    return NextResponse.json({
      data: allPostsData,
      items: allPostsData.length,
    }, { status: 200 });
  } catch (error) {
    console.log((error as Error).message)
    return NextResponse.json({ error: 'Posts not found' }, { status: 404 });
  }
}