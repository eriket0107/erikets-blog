export type LanguageType = "br" | "en"

export type PostType = {
  id: string
  imgSrc: string;
  title: { [K in LanguageType]: string };
  description: { [K in LanguageType]: string };
  date: string;
  text?: { [K in LanguageType]: string };
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