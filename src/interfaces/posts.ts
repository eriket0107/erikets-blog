export type PostType = {
  id: string
  imgSrc: string;
  title: string;
  description: string;
  date: string;
  text: string;
};

export type Pagination<T> = {
  first: number,
  prev: boolean,
  next: boolean,
  last: number,
  pages: number,
  items: number,
  data: T
}