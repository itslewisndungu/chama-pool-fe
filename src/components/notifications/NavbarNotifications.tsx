import { GroupNotification } from "@/types/notifications";
import { NotificationsButton } from "@/components/notifications/NotificationsButton";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { resolve } from "path";

interface res {
  notifications: GroupNotification[];
  unreadCount: number;
}

const getUnreadNotifications = async (token: string | undefined) => {
  if (!token) {
    return new Promise<res>(resolve =>
      resolve({ notifications: [], unreadCount: 0 })
    );
  }

  const req = new Request("http://localhost:8080/notifications/member", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (await fetch(req).then(r => r.json())) as res;
};

export async function NavbarNotifications() {
  const session = await getServerSession(authOptions);

  const { notifications, unreadCount } = await getUnreadNotifications(
    session?.accessToken
  );

  return (
    <NotificationsButton
      notifications={notifications}
      unreadCount={unreadCount}
    />
  );
}
