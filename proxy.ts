import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import createMiddleware from "next-intl/middleware";
import { defineRouting } from "next-intl/routing";
import { locales, defaultLocale } from "./i18nConfig";

const intlMiddleware = createMiddleware(
  defineRouting({ locales, defaultLocale })
);

type IntlMiddlewareRequest = Parameters<typeof intlMiddleware>[0];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const isLoginPage = pathname === "/admin/login";

    if (!token && !isLoginPage) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    if (token && isLoginPage) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    const sessionId = request.cookies.get("sessionId")?.value;
    const response = NextResponse.next();

    if (!sessionId) {
      response.cookies.set({
        name: "sessionId",
        value: crypto.randomUUID(),
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
    }

    return response;
  }

  const sessionId = request.cookies.get("sessionId")?.value;
  const needsSession = !sessionId;
  const intlResponse = await intlMiddleware(
    request as IntlMiddlewareRequest
  );

  if (needsSession) {
    intlResponse.cookies.set({
      name: "sessionId",
      value: crypto.randomUUID(),
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  }

  return intlResponse;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
