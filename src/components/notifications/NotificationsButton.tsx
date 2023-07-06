"use client";

import { GroupNotification } from "@/types/notifications";
import {
  ActionIcon,
  Drawer,
  Indicator,
  Tooltip,
  ScrollArea,
} from "@mantine/core";
import { IconBell } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { markAllNotificationsAsRead } from "@/lib/api/mark-all-notifications-as-read";
import { useRouter } from "next/navigation";
import { NotificationCard } from "./NotificationCard";
import { useEffect, useState } from "react";

type Props = {
  unreadCount: number;
  notifications: GroupNotification[];
};

export function NotificationsButton(props: Props) {
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();

  const [unreadCount, setUnreadCount] = useState(props.unreadCount);
  const [notifications, setNotifications] = useState(props.notifications);

  const unreadnotifications = notifications.filter((n) => !n.read)
  const readnotifications = notifications.filter((n) => n.read)

  useEffect(() => {
    setNotifications(props.notifications);
    setUnreadCount(props.unreadCount);
  }, [props.notifications, props.unreadCount]);

  const closeNotifications = () => {
    if (unreadCount > 0) {
      markAllNotificationsAsRead();
      router.refresh();
    }
    close();
  };

  return (
    <>
      <Tooltip label={"Notifications"}>
        <Indicator
          disabled={unreadCount === 0}
          label={unreadCount}
          color={"cyan"}
          size={20}
        >
          <ActionIcon color={""} variant={"filled"} size={"lg"} onClick={open}>
            <IconBell />
          </ActionIcon>
        </Indicator>
      </Tooltip>

      <Drawer
        position={"right"}
        opened={opened}
        onClose={closeNotifications}
        title="Your Notifications"
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <div className={"grid gap-2"}>
          {notifications.length === 0 ? (
            <p className="lead">You have no notifications</p>
          ) : (
            notifications.map(notification => (
              <NotificationCard
                notification={notification}
                key={notification.title + notification.message}
              />
            ))
          )}
        </div>
      </Drawer>
    </>
  );
}
