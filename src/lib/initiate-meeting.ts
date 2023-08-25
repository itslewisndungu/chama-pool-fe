"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getEndpointPath } from "@/lib/utils";

const initiateMeeting = async (meetingId: number) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/login");
  }

  const req = new Request(getEndpointPath(`/meetings/${meetingId}/initiate`), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  return await fetch(req).then(res => res.json());
};

export default initiateMeeting;
