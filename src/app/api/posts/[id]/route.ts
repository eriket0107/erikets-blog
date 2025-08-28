import { LanguageType } from "@/interfaces/post";
import { getPostData } from "@/lib/posts";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";


export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params
    const locale = ((await cookies()).get('NEXT_LOCALE')?.value || 'en') as LanguageType
    const data = getPostData(id, locale)

    return NextResponse.json({
      data,
    }, { status: 200 });
  }
  catch (error) {
    console.log((error as Error).message)
    return NextResponse.json({ error: 'Post not found' }, { status: 404, });
  }
}