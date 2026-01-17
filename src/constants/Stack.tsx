import { IStack, IStackCategory, StackKey } from "@/interfaces/stack";
import cypressImg from "@/assets/tech/cypress.webp";
import nextjsImg from "@/assets/tech/nextjs.webp";
import reactImg from "@/assets/tech/react.webp";
import javascriptImg from "@/assets/tech/javascript.webp";
import typescriptImg from "@/assets/tech/typescript.webp";
import nodejsImg from "@/assets/tech/nodejs.webp";
import postgresImg from "@/assets/tech/postgres.webp";
import nestjsImg from "@/assets/tech/nestjs.webp";
import expressImg from "@/assets/tech/express.webp";
import fastifyImg from "@/assets/tech/fastify.webp";
import graphqlImg from "@/assets/tech/graphql.webp";
import jestImg from "@/assets/tech/jest.webp";
import vitestImg from "@/assets/tech/vitest.webp";
import viteImg from "@/assets/tech/vite.webp";
import gitImg from "@/assets/tech/git.webp";
import restImg from "@/assets/tech/rest.webp";
import pythonImg from "@/assets/tech/python.webp";
import mongoDbImg from "@/assets/tech/mongodb.webp";
import cssImg from "@/assets/tech/css.webp";
import cursorImg from "@/assets/tech/cursor.webp";
import redisImg from "@/assets/tech/redis.webp";
import githubImg from "@/assets/tech/github.webp";
import tailwindImg from "@/assets/tech/tailwind.webp";

export const Stack: IStack = {
  CSS: {
    name: "CSS",
    src: cssImg,
    display: true,
  },
  tailwind: {
    name: "Tailwind",
    display: true,
    src: tailwindImg,
  },
  cypress: {
    name: "Cypress",
    src: cypressImg,
    display: true,
  },
  next: {
    name: "Next.js",
    src: nextjsImg,
    display: true,
  },
  react: {
    name: "React",
    src: reactImg,
    display: true,
  },
  javascript: {
    name: "JavaScript",
    src: javascriptImg,
    display: true,
  },
  typescript: {
    name: "TypeScript",
    src: typescriptImg,
    display: true,
  },
  nodejs: {
    name: "Node.js",
    src: nodejsImg,
    display: true,
  },
  postgres: {
    name: "PostgreSQL",
    src: postgresImg,
    display: true,
  },
  nestjs: {
    name: "NestJS",
    src: nestjsImg,
    display: true,
  },
  express: {
    name: "Express",
    src: expressImg,
    display: true,
  },
  fastify: {
    name: "Fastify",
    src: fastifyImg,
    display: true,
  },
  graphql: {
    name: "GraphQL",
    src: graphqlImg,
    display: true,
  },
  jest: {
    name: "Jest",
    src: jestImg,
    display: true,
  },
  vitest: {
    name: "Vitest",
    src: vitestImg,
    display: true,
  },
  vite: {
    name: "Vite",
    src: viteImg,
    display: true,
  },
  git: {
    name: "Git",
    src: gitImg,
    display: true,
  },
  rest: {
    name: "REST API",
    src: restImg,
    display: true,
  },
  python: {
    name: "Python",
    src: pythonImg,
    display: false,
  },
  mongo: {
    name: "MongoDB",
    src: mongoDbImg,
    display: true,
  },
  redis: {
    name: "Redis",
    src: redisImg,
    display: true,
  },
  cursor: {
    name: "Cursor",
    src: cursorImg,
    display: true,
  },
  github: {
    name: "Github",
    src: githubImg,
    display: true,
  },
};

export const STACK_CATEGORIES: Record<IStackCategory, StackKey[]> = {
  "Programming Languages": ["javascript", "typescript", "python", "CSS"],
  Frameworks: [
    "react",
    "next",
    "nestjs",
    "express",
    "fastify",
    "tailwind",
    "vite",
  ],
  Databases: ["postgres", "mongo", "redis"],
  Tools: [
    "cypress",
    "jest",
    "vitest",
    "git",
    "github",
    "nodejs",
    "graphql",
    "rest",
  ],
  "AI Tooling": ["cursor"],
};

export const getSortedCategoryItems = (categoryKeys: StackKey[]) => {
  return categoryKeys
    .map((key) => Stack[key])
    .filter((item) => item && item.display)
    .sort((a, b) => a.name.localeCompare(b.name));
};

export const StackCategory: Record<IStackCategory, Partial<IStack>> = {
  "Programming Languages": {
    javascript: Stack.javascript,
    typescript: Stack.typescript,
    python: Stack.python,
    CSS: Stack.CSS,
  },
  Frameworks: {
    react: Stack.react,
    next: Stack.next,
    nestjs: Stack.nestjs,
    express: Stack.express,
    fastify: Stack.fastify,
    tailwind: Stack.tailwind,
    vite: Stack.vite,
  },
  Databases: {
    postgres: Stack.postgres,
    mongo: Stack.mongo,
    redis: Stack.redis,
  },
  Tools: {
    cypress: Stack.cypress,
    jest: Stack.jest,
    vitest: Stack.vitest,
    git: Stack.git,
    github: Stack.github,
    nodejs: Stack.nodejs,
    graphql: Stack.graphql,
    rest: Stack.rest,
  },
  "AI Tooling": {
    cursor: Stack.cursor,
  },
};
