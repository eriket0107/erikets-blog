export type LanguageType = "br" | "en"

type ReferenceType = {
  src: string
  name: string
}

export type PostType = {
  id: string
  imgSrc: string;
  title: { [K in LanguageType]: string };
  description: { [K in LanguageType]: string };
  date: string;
  text?: { [K in LanguageType]: string };
  references?: ReferenceType[]
  tags?: string[]
};
