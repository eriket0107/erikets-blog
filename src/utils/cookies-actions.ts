"use server"

import { langKeyCookie } from "@/constants/cookies";
import { cookies } from "next/headers";

export async function setLocaleCookie(locale: "br" | "en") {
  (await cookies()).set(langKeyCookie, locale, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 10),
  });
}
