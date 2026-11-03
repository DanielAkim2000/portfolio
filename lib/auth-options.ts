import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import prisma from "@/lib/prisma";
import {
  clearAttempts,
  isRateLimited,
  registerAttempt,
} from "@/lib/rate-limit";

const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
// Hash factice : évite de révéler par le temps de réponse si un email existe.
const DUMMY_HASH =
  "$2b$12$C6UzMDM.H6dfI/f/IKcEeO8dY6xk5yX1gk0YtqzQwJq8s5bYk3q0m";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const forwarded = req?.headers?.["x-forwarded-for"];
        const ip = (Array.isArray(forwarded) ? forwarded[0] : forwarded)
          ?.split(",")[0]
          ?.trim();
        const emailKey = `login:email:${credentials.email.toLowerCase()}`;
        const keys = ip ? [emailKey, `login:ip:${ip}`] : [emailKey];

        if (keys.some((key) => isRateLimited(key, MAX_LOGIN_ATTEMPTS, LOGIN_WINDOW_MS))) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        const isValid = await compare(
          credentials.password,
          user?.password ?? DUMMY_HASH
        );

        if (!user || !isValid) {
          keys.forEach((key) => registerAttempt(key, LOGIN_WINDOW_MS));
          return null;
        }

        clearAttempts(emailKey);

        return {
          id: user.id,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email ?? "";
      }
      return token;
    },
    async session({ session, token }) {
      if (!token.id) {
        return session;
      }

      const user = await prisma.user.findUnique({
        where: { id: token.id as string },
        select: { id: true, email: true },
      });

      if (user) {
        session.user.id = user.id;
        session.user.email = user.email;
      }

      return session;
    },
  },
};
