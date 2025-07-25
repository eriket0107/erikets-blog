import { LanguageType } from "./post";


export interface CareerType {
  id: string
  text?: { [K in LanguageType]: string };
};
