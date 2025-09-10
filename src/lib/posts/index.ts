import fs from 'node:fs'
import path from "node:path";
import matter from 'gray-matter';
import { LanguageType, PostType } from '@/interfaces/post';


const postsEnv = process.env.NEXT_PUBLIC_NODE_ENV === 'production' ? 'ready' : 'mock';

const postsDirectory = (locale?: LanguageType) => path.join(process.cwd(), `posts/${postsEnv}/${locale}`)

export const getPostsData = (locale: LanguageType = 'en') => {
  const directory = postsDirectory(locale)

  if (!fs.existsSync(directory)) {
    console.warn(`Posts directory does not exist: ${directory}`)
    return []
  }

  const fileNames = fs.readdirSync(directory)

  if (fileNames.length === 0) {
    console.warn(`Posts directory is empty: ${directory}`)
    return []
  }

  const allPostsData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '')

    const fullPath = path.join(directory, fileName)
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
  const directory = postsDirectory(locale)
  const filePath = path.join(directory, `${id}.md`)

  // Check if directory and file exist
  if (!fs.existsSync(directory)) {
    throw new Error(`Posts directory does not exist: ${directory}`)
  }

  if (!fs.existsSync(filePath)) {
    throw new Error(`Post file does not exist: ${filePath}`)
  }

  const fileName = fs.readFileSync(filePath, 'utf-8')

  const matterResult = matter(fileName)

  return {
    ...matterResult.data,
    content: matterResult.content,
  }
}