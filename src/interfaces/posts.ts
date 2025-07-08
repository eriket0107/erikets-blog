export type LanguageType = "br" | "en"

interface ReferenceType {
  src: string
  name: string
}

export interface PostType {
  id: string
  imgSrc: string;
  title: { [K in LanguageType]: string };
  description: { [K in LanguageType]: string };
  date: string;
  text?: { [K in LanguageType]: string };
  references?: ReferenceType[]
  tags?: { [K in LanguageType]: string[] }
};
