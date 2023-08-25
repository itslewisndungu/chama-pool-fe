import type { User } from "next-auth";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getEndpointPath } from "@/lib/utils";

const getUser = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<User | null> => {
  const res = await fetch(getEndpointPath("/auth/login"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  if (res.ok) {
    return (await res.json()) as User;
  } else {
    return null;
  }
};

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 2, // 2 hours
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      id: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (credentials) {
          const user = await getUser({ ...credentials });
          return user ? user : null;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        account.access_token = user.token;
        account.userId = user.id.toString();
        token.accessToken = account.access_token;
      }

      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token as any as User;
      return session;
    },
  },
};
