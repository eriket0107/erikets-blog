export type PostType = {
  id: string
  imgSrc: string;
  title: string;
  description: string;
  date: string;
  text?: string;
  references?: string[]
};

export type Pagination<T> = {
  first: number,
  prev: number | null,
  next: number | null,
  last: number,
  pages: number,
  items: number,
  data: T
}