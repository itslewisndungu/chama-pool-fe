import { GroupNotification } from "@/types/notifications";
import { NotificationsButton } from "@/components/notifications/NotificationsButton";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { compareDates, getEndpointPath } from "@/lib/utils";

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

  const req = new Request(getEndpointPath("/notifications/member"), {
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

  const sortedNotifications = notifications.sort((a, b) =>
    compareDates(b.date, a.date)
  );

  return (
    <NotificationsButton
      notifications={sortedNotifications}
      unreadCount={unreadCount}
    />
  );
}
