---
title: 'Teste'
date: '2025-09-10'
author: 'Erik Oliveira'
tags: ['teste', 'tese2', 'HTML']
isPublished: true
imgSrc: 'https://picsum.photos/600/400?random=12'
description: 'Test only'
---

# MDX Components Visual Test

This file tests all the components defined in the MDX component mapping.

## Typography Components

### Heading 1

This is a test of the H1 component with Typography.H1 styling.

### Heading 2

This is a test of the H2 component with Typography.H2 styling.

### Heading 3

This is a test of the H3 component with Typography.H3 styling.

## Paragraphs

This is a test paragraph using the Typography.P component. It should have proper spacing, text wrapping, and primary color styling. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

## Links

Here's a test of the anchor component: [External Link](https://example.com) - this should open in a new tab with proper styling.

## Lists

### Unordered List

- First item in unordered list
- Second item with some longer text to test wrapping
- Third item
- Fourth item

### Ordered List

1. First numbered item
2. Second numbered item with longer content to test text wrapping and spacing
3. Third numbered item
4. Fourth numbered item

## Code Elements

### Inline Code

Here's some inline `code` that should be styled with the code component.

### Code Block

```javascript
function greetUser(name) {
  console.log(`Hello, ${name}!`);
  return `Welcome, ${name}`;
}

const user = "Erik";
const message = greetUser(user);
```

## Blockquote
>
> This is a blockquote test. It should have a left border, italic text, and proper spacing. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

## Custom Components

### Link Component

<Link href="https://github.com" target="_blank">
  Custom Link Component
</Link>

### ArticleImage Component

### Button Component

<Button variant="default">
  Test Button
</Button>

<Button variant="outline">
  Outline Button
</Button>

<Button variant="secondary">
  Secondary Button
</Button>

### YoutubeEmbed Component

<YoutubeEmbed
  videoId="dQw4w9WgXcQ"
  title="Test YouTube Video"
/>

## Mixed Content Test

Here's a paragraph with **bold text** and *italic text* mixed with `inline code` and a [link](https://example.com).

### Code Example with Multiple Languages

```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

const createUser = (userData: Omit<User, 'id'>): User => {
  return {
    id: crypto.randomUUID(),
    ...userData
  };
};
```

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
```

## Complex Layout Test

### Section with Multiple Elements

This section combines multiple components:

1. **Ordered list item** with `inline code`
2. Another item with a [link to documentation](https://docs.example.com)
3. Final item

> **Important Note:** This blockquote contains **bold text** and `inline code` to test nested styling.

```bash
# Terminal commands
npm install
npm run dev
npm run build
```

### Final Test Section

Here's a final paragraph to test the overall layout and spacing. It includes:

- A bullet point
- Another bullet with `code`
- And a [final link](https://github.com)

<Button variant="default" size="lg">
  Large Test Button
</Button>
