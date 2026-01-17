import { StaticImageData } from "next/image";

export type StackKey =
  | "CSS"
  | "cypress"
  | "express"
  | "fastify"
  | "git"
  | "github"
  | "graphql"
  | "jest"
  | "mongo"
  | "nestjs"
  | "next"
  | "nodejs"
  | "postgres"
  | "python"
  | "react"
  | "rest"
  | "tailwind"
  | "typescript"
  | "vite"
  | "vitest"
  | "javascript"
  | "cursor"
  | "redis";

export type IStack = {
  [K in StackKey]: {
    name: string;
    src: StaticImageData;
    display: boolean;
  };
};

export type IStackCategory =
  | "Programming Languages"
  | "Frameworks"
  | "Databases"
  | "Tools"
  | "AI Tooling";
