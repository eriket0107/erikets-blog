export type LanguageType = "br" | "en"

interface ReferenceType {
  src: string
  name: string
}

export interface PostType {
  id: string
  imgSrc: string;
  title: string;
  description: string;
  date: string;
  text?: string;
  content?: string;
  references?: ReferenceType[]
  tags?: string[]
  isPublished: boolean;
};
