/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'node:fs'
import path from 'node:path'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getPostsData, getPostData } from './index'
import { PostType } from '@/interfaces/post'
import matter from 'gray-matter'

// Mock fs module
vi.mock('node:fs')
vi.mock('gray-matter')

const mockFs = vi.mocked(fs)
const mockMatter = vi.mocked(matter)


// Extended type for post with content
type PostWithContent = PostType & { content: string }

describe('getPostsData', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Default to directory existing
    mockFs.existsSync.mockReturnValue(true)
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should return an empty array when directory does not exist', () => {
    mockFs.existsSync.mockReturnValue(false)

    const result = getPostsData('en')

    expect(result).toEqual([])
    expect(mockFs.existsSync).toHaveBeenCalledWith(
      path.join(process.cwd(), 'posts/mock/en')
    )
    expect(mockFs.readdirSync).not.toHaveBeenCalled()
  })

  it('should return an empty array when no posts exist', () => {
    mockFs.existsSync.mockReturnValue(true)
    mockFs.readdirSync.mockReturnValue([])

    const result = getPostsData('en')

    expect(result).toEqual([])
    expect(mockFs.existsSync).toHaveBeenCalledWith(
      path.join(process.cwd(), 'posts/mock/en')
    )
    expect(mockFs.readdirSync).toHaveBeenCalledWith(
      path.join(process.cwd(), 'posts/mock/en')
    )
  })

  it('should return posts data for english locale by default', () => {
    const mockFileNames = ['post1.md', 'post2.md']
    const mockContent1 = `---
title: 'Test Post 1'
date: '2024-01-01'
author: 'Test Author'
tags: ['test']
isPublished: true
imgSrc: 'test-image.jpg'
description: 'Test description 1'
---
# Test content 1`

    const mockContent2 = `---
title: 'Test Post 2'
date: '2024-01-02'
author: 'Test Author'
tags: ['test']
isPublished: true
imgSrc: 'test-image2.jpg'
description: 'Test description 2'
---
# Test content 2`

    mockFs.readdirSync.mockReturnValue(mockFileNames as any)
    mockFs.readFileSync
      .mockReturnValueOnce(mockContent1)
      .mockReturnValueOnce(mockContent2)

    mockMatter
      .mockReturnValueOnce({
        data: {
          title: 'Test Post 1',
          date: '2024-01-01',
          author: 'Test Author',
          tags: ['test'],
          isPublished: true,
          imgSrc: 'test-image.jpg',
          description: 'Test description 1'
        },
        content: '# Test content 1'
      } as any)
      .mockReturnValueOnce({
        data: {
          title: 'Test Post 2',
          date: '2024-01-02',
          author: 'Test Author',
          tags: ['test'],
          isPublished: true,
          imgSrc: 'test-image2.jpg',
          description: 'Test description 2'
        },
        content: '# Test content 2'
      } as any)

    const result = getPostsData()

    expect(result).toHaveLength(2)
    expect(result[0].id).toBe('post2')
    expect(result[1].id).toBe('post1')
    expect(result[0].title).toBe('Test Post 2')
    expect(result[1].title).toBe('Test Post 1')
  })

  it('should return posts sorted by date in descending order (newest first)', () => {
    const mockFileNames = ['old-post.md', 'new-post.md', 'middle-post.md']

    mockFs.readdirSync.mockReturnValue(mockFileNames as any)
    mockFs.readFileSync
      .mockReturnValueOnce('mock content 1')
      .mockReturnValueOnce('mock content 2')
      .mockReturnValueOnce('mock content 3')

    mockMatter
      .mockReturnValueOnce({
        data: { title: 'Old Post', date: '2023-01-01', isPublished: true },
        content: 'Content'
      } as any)
      .mockReturnValueOnce({
        data: { title: 'New Post', date: '2024-12-01', isPublished: true },
        content: 'Content'
      } as any)
      .mockReturnValueOnce({
        data: { title: 'Middle Post', date: '2024-06-01', isPublished: true },
        content: 'Content'
      } as any)

    const result = getPostsData('en')

    expect(result).toHaveLength(3)
    expect(result[0].title).toBe('New Post')
    expect(result[1].title).toBe('Middle Post')
    expect(result[2].title).toBe('Old Post')
  })

  it('should work with brazilian locale', () => {
    const mockFileNames = ['post-br.md']

    mockFs.readdirSync.mockReturnValue(mockFileNames as any)
    mockFs.readFileSync.mockReturnValue('mock content')

    mockMatter.mockReturnValue({
      data: { title: 'Post BR', date: '2024-01-01', isPublished: true },
      content: 'Content'
    } as any)

    getPostsData('br')

    expect(mockFs.readdirSync).toHaveBeenCalledWith(
      path.join(process.cwd(), 'posts/mock/br')
    )
  })

  it('should remove .md extension from filename to create id', () => {
    const mockFileNames = ['my-awesome-post.md']

    mockFs.readdirSync.mockReturnValue(mockFileNames as any)
    mockFs.readFileSync.mockReturnValue('mock content')

    mockMatter.mockReturnValue({
      data: { title: 'Test', date: '2024-01-01', isPublished: true },
      content: 'Content'
    } as any)

    const result = getPostsData('en')

    expect(result[0].id).toBe('my-awesome-post')
  })

  it('should include content from gray-matter parsing', () => {
    const mockFileNames = ['post.md']

    mockFs.readdirSync.mockReturnValue(mockFileNames as any)
    mockFs.readFileSync.mockReturnValue('mock content')

    mockMatter.mockReturnValue({
      data: { title: 'Test Post', date: '2024-01-01', isPublished: true },
      content: '# This is the actual content'
    } as any)

    const result = getPostsData('en')

    expect((result[0] as PostWithContent).content).toBe('# This is the actual content')
  })


  it('should handle posts with all PostType properties', () => {
    const mockFileNames = ['complete-post.md']

    mockFs.readdirSync.mockReturnValue(mockFileNames as any)
    mockFs.readFileSync.mockReturnValue('mock content')

    const completePostData = {
      title: 'Complete Post',
      date: '2024-01-01',
      imgSrc: 'image.jpg',
      description: 'A complete post',
      isPublished: true,
      tags: ['tag1', 'tag2'],
      references: [{ src: 'source1', name: 'Reference 1' }],
      text: 'Additional text'
    }

    mockMatter.mockReturnValue({
      data: completePostData,
      content: 'Post content'
    } as any)

    const result = getPostsData('en')

    expect(result[0]).toMatchObject({
      id: 'complete-post',
      ...completePostData
    })
    expect((result[0] as PostWithContent).content).toBe('Post content')
  })
})

describe('getPostData', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockFs.existsSync.mockReturnValue(true)
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should throw error when directory does not exist', () => {
    mockFs.existsSync.mockReturnValue(false)

    expect(() => getPostData('test-post')).toThrow('Posts directory does not exist')
    expect(mockFs.existsSync).toHaveBeenCalledWith(
      path.join(process.cwd(), 'posts/mock/en')
    )
    expect(mockFs.readFileSync).not.toHaveBeenCalled()
  })

  it('should throw error when file does not exist', () => {
    mockFs.existsSync
      .mockReturnValueOnce(true) // directory exists
      .mockReturnValueOnce(false) // file doesn't exist

    expect(() => getPostData('test-post')).toThrow('Post file does not exist')
    expect(mockFs.existsSync).toHaveBeenCalledWith(
      path.join(process.cwd(), 'posts/mock/en')
    )
    expect(mockFs.existsSync).toHaveBeenCalledWith(
      path.join(process.cwd(), 'posts/mock/en', 'test-post.md')
    )
    expect(mockFs.readFileSync).not.toHaveBeenCalled()
  })

  it('should read and return parsed post data for given id and default locale', () => {
    const mockContent = `---
title: 'Test Post'
date: '2024-01-01'
---
# Test content`

    mockFs.existsSync
      .mockReturnValueOnce(true) // directory exists
      .mockReturnValueOnce(true) // file exists
    mockFs.readFileSync.mockReturnValue(mockContent)
    mockMatter.mockReturnValue({
      data: {
        title: 'Test Post',
        date: '2024-01-01'
      },
      content: '# Test content'
    } as any)

    const result = getPostData('test-post')

    expect(mockFs.readFileSync).toHaveBeenCalledWith(
      path.join(process.cwd(), 'posts/mock/en', 'test-post.md'),
      'utf-8'
    )
    expect(result).toEqual({
      title: 'Test Post',
      date: '2024-01-01',
      content: '# Test content'
    })
  })

  it('should read and return parsed post data for given id and specific locale', () => {
    const mockContent = `---
title: 'Post em Português'
date: '2024-01-01'
---
# Conteúdo do post`

    mockFs.existsSync
      .mockReturnValueOnce(true) // directory exists
      .mockReturnValueOnce(true) // file exists
    mockFs.readFileSync.mockReturnValue(mockContent)
    mockMatter.mockReturnValue({
      data: {
        title: 'Post em Português',
        date: '2024-01-01'
      },
      content: '# Conteúdo do post'
    } as any)

    const result = getPostData('post-brasileiro', 'br')

    expect(mockFs.readFileSync).toHaveBeenCalledWith(
      path.join(process.cwd(), 'posts/mock/br', 'post-brasileiro.md'),
      'utf-8'
    )
    expect(result).toEqual({
      title: 'Post em Português',
      date: '2024-01-01',
      content: '# Conteúdo do post'
    })
  })

  it('should handle file reading errors', () => {
    const error = new Error('File not found')
    mockFs.existsSync
      .mockReturnValueOnce(true) // directory exists
      .mockReturnValueOnce(true) // file exists
    mockFs.readFileSync.mockImplementation(() => {
      throw error
    })

    expect(() => getPostData('non-existent-post')).toThrow('File not found')
    expect(mockFs.readFileSync).toHaveBeenCalledWith(
      path.join(process.cwd(), 'posts/mock/en', 'non-existent-post.md'),
      'utf-8'
    )
  })

  it('should work with posts that have complex filenames', () => {
    const mockContent = `---
title: 'Complex Post'
date: '2024-01-01'
---
Complex post content`
    mockFs.existsSync
      .mockReturnValueOnce(true) // directory exists
      .mockReturnValueOnce(true) // file exists
    mockFs.readFileSync.mockReturnValue(mockContent)
    mockMatter.mockReturnValue({
      data: {
        title: 'Complex Post',
        date: '2024-01-01'
      },
      content: 'Complex post content'
    } as any)

    const result = getPostData('my-complex-post-name-with-dashes')

    expect(mockFs.readFileSync).toHaveBeenCalledWith(
      path.join(process.cwd(), 'posts/mock/en', 'my-complex-post-name-with-dashes.md'),
      'utf-8'
    )
    expect(result).toEqual({
      title: 'Complex Post',
      date: '2024-01-01',
      content: 'Complex post content'
    })
  })

  it('should return parsed frontmatter and content', () => {
    const rawContent = `---
title: 'Raw Post'
date: '2024-01-01'
tags: ['raw', 'test']
---
This is the actual markdown content.

## Section 1
Some content here.`

    mockFs.existsSync
      .mockReturnValueOnce(true) // directory exists
      .mockReturnValueOnce(true) // file exists
    mockFs.readFileSync.mockReturnValue(rawContent)
    mockMatter.mockReturnValue({
      data: {
        title: 'Raw Post',
        date: '2024-01-01',
        tags: ['raw', 'test']
      },
      content: 'This is the actual markdown content.\n\n## Section 1\nSome content here.'
    } as any)

    const result = getPostData('raw-post')

    expect(result).toEqual({
      title: 'Raw Post',
      date: '2024-01-01',
      tags: ['raw', 'test'],
      content: 'This is the actual markdown content.\n\n## Section 1\nSome content here.'
    })
    // Verify it calls matter() to parse frontmatter
    expect(mockMatter).toHaveBeenCalledWith(rawContent)
  })
})