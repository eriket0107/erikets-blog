import { PostType } from "./post";

export type AllPostsResponse = {
  data: PostType[];
  items: number;
};
