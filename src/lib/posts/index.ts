import fs from 'node:fs'
import path from "node:path";
import matter from 'gray-matter';
import { LanguageType, PostType } from '@/interfaces/post';

const postsDirectory = (locale?: LanguageType) => path.join(process.cwd(), `posts/ready/${locale}`)

export const getPostsData = (locale: LanguageType = 'en') => {
  const fileNames = fs.readdirSync(postsDirectory(locale))

  const allPostsData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '')

    const fullPath = path.join(postsDirectory(locale), fileName)
    const content = fs.readFileSync(fullPath, 'utf-8')

    const matterResult = matter(content)

    return {
      id,
      ...matterResult.data,
      content: matterResult.content
    } as unknown as PostType
  }).sort((a: PostType, b: PostType) => {
    if (a.date < b.date)
      return 1;
    else
      return -1;
  });

  return allPostsData
}

export const getPostData = (id: string, locale: LanguageType = 'en') => {
  const fileName = fs.readFileSync(`${postsDirectory(locale)}/${id}.md`
    , 'utf-8'
  )

  const matterResult = matter(fileName)

  return {
    ...matterResult.data,
    content: matterResult.content,
  }
}