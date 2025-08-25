import { LanguageType } from "@/interfaces/post";
import { getPostData } from "@/lib/posts";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";


export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const locale = ((await cookies()).get('NEXT_LOCALE')?.value || 'en') as LanguageType
  const { id } = await params
  const data = getPostData(id, locale)

  return NextResponse.json({
    data,
  }, { status: 200 });
}