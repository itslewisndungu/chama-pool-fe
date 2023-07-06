import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "next-auth/react";
import { MemberRole } from "./types/MemberRole";
import { IncomingMessage } from "http";

export async function middleware(request: NextRequest) {
  const requestForNextAuth: Partial<IncomingMessage> = {
    headers: {
      cookie: request.headers.get("cookie") ?? undefined,
    },
  };

  const session = await getSession({ req: requestForNextAuth });

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const isAdmin = session.user.roles.some(
    role =>
      role === MemberRole.SECRETARY ||
      role === MemberRole.TREASURER ||
      role === MemberRole.CHAIRMAN
  );

  if (isAdmin) {
    return NextResponse.redirect(new URL("/group/dashboard", request.url));
  }

  return NextResponse.redirect(new URL("/member/dashboard", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/",
};
