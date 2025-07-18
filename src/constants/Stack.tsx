import { IStack } from "@/interfaces/stack";
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

export const Stack: IStack = {
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
    display: false,
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
    display: false,
  },
  rest: {
    name: "REST API",
    src: restImg,
    display: false,
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
};
