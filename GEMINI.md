# Project: Eriket Blog

A modern, high-performance personal blog built with Next.js 16, React 19, and TypeScript.

## Project Overview

- **Core Stack:** [Next.js 16](https://nextjs.org/) (App Router), [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/).
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/) (Radix UI), [Lucide React](https://lucide.dev/), [Framer Motion](https://www.framer.com/motion/).
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/).
- **Internationalization:** [next-intl](https://next-intl-docs.vercel.app/) (Supports `en` and `br` locales).
- **Content:** MDX-based posts using `@next/mdx` and `next-mdx-remote`. Posts are located in the `posts/` directory.
- **Testing:** [Vitest](https://vitest.dev/) with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) and `happy-dom`.
- **Other:** `nextjs-toploader` for page transitions, `tsparticles` for interactive backgrounds, `json-server` for mock APIs.

## Directory Structure

- `src/app/`: Next.js App Router pages and layouts.
- `src/components/`: Reusable React components.
  - `src/components/ui/`: UI primitives (Shadcn UI).
- `src/templates/`: Page-level templates used by the app router.
- `src/lib/`: Core logic, including post processing and data fetching.
- `src/actions/`: Server actions for data manipulation.
- `src/hooks/`: Custom React hooks.
- `src/i18n/`: Internationalization configuration.
- `src/utils/`: Utility functions.
- `posts/`: MDX content files.
  - `posts/mock/`: Mock posts for development.
  - `posts/ready/`: Production-ready posts.
- `messages/`: Translation files (`en.json`, `br.json`).
- `test/`: Testing setup and utilities.

## Building and Running

### Development
```bash
pnpm dev
```
Starts the Next.js development server with Turbopack.

### Development with Mock API
```bash
pnpm dev-mock
```
Starts both the `json-server` (mock API) and the Next.js development server.

### Build
```bash
pnpm build
```
Builds the application for production.

### Testing
```bash
pnpm test          # Run tests once
pnpm test:watch    # Run tests in watch mode
```

### Linting
```bash
pnpm lint          # Run ESLint
pnpm lint:fix      # Run ESLint and fix issues
```

## Development Conventions

- **Component Structure:** Components should be colocated with their tests and styles (if any). Use `index.tsx` as the main entry point within a component directory.
- **Styling:** Use Tailwind CSS utility classes. For complex conditional classes, use the `cn` utility (found in `src/utils/cn.ts`).
- **Internationalization:** All user-facing strings must be localized using `next-intl`. Use the `useTranslations` hook in client components and `getTranslations` in server components.
- **Server Components:** Prefer Server Components for data fetching and static content. Use Client Components only when interactivity or browser-only APIs are required.
- **Type Safety:** Ensure all props, state, and utility functions are strictly typed. Avoid `any`.
- **Tests:** Add unit tests for new components and utility functions using Vitest and React Testing Library.
