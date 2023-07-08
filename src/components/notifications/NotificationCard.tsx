"use client";

import { Card, Text, Badge } from "@mantine/core";
import { getFormattedDate } from "@/lib/utils";
import { GroupNotification } from "@/types/notifications";

type Props = {
  notification: GroupNotification;
};

export function NotificationCard({ notification }: Props) {
  return (
    <Card withBorder={true} radius="md" padding={"sm"}>
      <div className={"flex justify-between"}>
        <Text weight={500}>{notification.title}</Text>
        <span className={"space-x-1"}>
          <Badge>{notification.type}</Badge>
          {!notification.read ? <Badge color={"teal"}>New</Badge> : null}
        </span>
      </div>

      <p className={"my-1 text-sm"}>{notification.message}</p>

      <p className={"m-0 text-xs text-gray-700"}>
        {getFormattedDate(new Date(notification.date))}
      </p>
    </Card>
  );
}
