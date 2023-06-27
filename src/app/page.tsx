"use client";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { MemberRole } from "@/types/MemberRole";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/login");
  }

  const isAdmin = session.user.roles.some(
    role =>
      role === MemberRole.TREASURER ||
      MemberRole.CHAIRMAN ||
      MemberRole.SECRETARY
  );

  if (isAdmin) {
    return redirect("/group/dashboard");
  } else {
    return redirect("/member/dashboard");
  }
}
