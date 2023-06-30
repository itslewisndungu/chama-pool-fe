"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

const initiateMeeting = async (meetingId: number) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/login");
  }

  const req = new Request(
    `http://localhost:8080/meetings/${meetingId}/initiate`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  );

  return await fetch(req).then(res => res.json());
};

export default initiateMeeting;
