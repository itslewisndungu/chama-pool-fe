import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "next-auth/react";
import { MemberRole } from "./types/MemberRole";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const requestForNextAuth = {
    headers: {
      cookie: request.headers.get("cookie"),
    },
  };

  const session = await getSession({ req: requestForNextAuth });

  if (!session) {
      return NextResponse.redirect(new URL('/login', request.url))
  }

  const isAdmin = session.user.roles.some(
      role => role === MemberRole.SECRETARY || role === MemberRole.TREASURER || role === MemberRole.CHAIRMAN
  )

  console.log({isAdmin, role: session.user.roles})

  if (isAdmin) {
      return NextResponse.redirect(new URL('/group/dashboard', request.url))
  }

  return NextResponse.redirect(new URL('/member/dashboard', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/",
};
