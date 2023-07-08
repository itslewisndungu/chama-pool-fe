import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "next-auth/react";
import { MemberRole } from "./types/MemberRole";
import { IncomingMessage } from "http";
import { isUserAdmin } from "@/lib/utils";

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

  const isAdmin = isUserAdmin(session.user.roles);

  if (isAdmin) {
    return NextResponse.redirect(new URL("/group/dashboard", request.url));
  }

  return NextResponse.redirect(new URL("/member/dashboard", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/",
};
