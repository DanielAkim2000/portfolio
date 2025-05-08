// middleware.ts
import { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { defineRouting } from "next-intl/routing";
import { locales, defaultLocale } from "./i18nConfig";

const nextIntlMiddleware = createMiddleware(
  defineRouting({ locales, defaultLocale })
);

export async function middleware(request: NextRequest) {
  // 1) Est-ce qu'on doit générer une session ?
  const sessionId = request.cookies.get("sessionId")?.value;
  const needsSession = !sessionId;
  const newSessionId = needsSession ? crypto.randomUUID() : "";

  // 2) Exécution du middleware i18n
  const intlResponse = await nextIntlMiddleware(request);

  // 3) Si on a besoin de la session, on l'ajoute **avant** de renvoyer intlResponse
  if (needsSession) {
    intlResponse.cookies.set({
      name: "sessionId",
      value: newSessionId,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  }

  // 4) Pas besoin de session, on renvoie la réponse i18n telle quelle
  return intlResponse;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
