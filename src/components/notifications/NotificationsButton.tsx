"use client";

import { GroupNotification } from "@/types/notifications";
import {
  ActionIcon,
  Card,
  Text,
  Drawer,
  Indicator,
  Tooltip,
  Badge,
  ScrollArea,
} from "@mantine/core";
import { IconBell, IconNotification } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { getFormattedDate } from "@/lib/utils";
import { markAllNotificationsAsRead } from "@/lib/api/mark-all-notifications-as-read";
import { useRouter } from "next/navigation";

type Props = {
  unreadCount: number;
  notifications: GroupNotification[];
};

export function NotificationsButton(props: Props) {
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();

  const closeNotifications = () => {
    if (props.unreadCount > 0) {
      markAllNotificationsAsRead();
      router.refresh();
    }
    close();
  };

  return (
    <>
      <Tooltip label={"Notifications"}>
        <Indicator
          disabled={props.unreadCount === 0}
          label={props.unreadCount}
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
        <NotificationsList notifications={props.notifications} />
      </Drawer>
    </>
  );
}

function NotificationsList({
  notifications,
}: {
  notifications: GroupNotification[];
}) {
  return (
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
  );
}

function NotificationCard({
  notification,
}: {
  notification: GroupNotification;
}) {
  return (
    <Card withBorder={true} radius="md" padding={"sm"}>
      <div className={"flex justify-between"}>
        <Text weight={500}>{notification.title}</Text>
        <Badge>{notification.type}</Badge>
      </div>

      <p className={"my-1 text-sm"}>{notification.message}</p>

      <p className={"m-0 text-xs text-gray-700"}>
        {getFormattedDate(new Date(notification.date))}
      </p>
    </Card>
  );
}
