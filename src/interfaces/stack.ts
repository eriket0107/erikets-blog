import { StaticImageData } from "next/image";


export type StackKey =
  | "cypress"
  | "next"
  | "react"
  | "javascript"
  | "typescript"
  | "nodejs"
  | "postgres"
  | "nestjs"
  | "express"
  | "fastify"
  | "graphql"
  | "jest"
  | "vitest"
  | "vite"
  | "git"
  | "rest"
  | "python"
  | "mongo";

export type IStack = {
  [K in StackKey]: {
    name: string;
    src: StaticImageData;
    display: boolean
  }
};
