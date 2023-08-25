"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const markAllNotificationsAsRead = async () => {
    
  const session = await getServerSession(authOptions);

  if (!session) {
    return; 
  }

  console.log("Marking notificationsasread");

  try {
    await fetch("http://localhost:8080/notifications/member/read-all", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    })
  } catch (e) {
    console.error("An error occured when marking all notifications as read");
    console.error(e);
  }
};
