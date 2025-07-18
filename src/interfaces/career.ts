import { LanguageType } from "./posts";


export interface CareerType {
  id: string
  text?: { [K in LanguageType]: string };
};
