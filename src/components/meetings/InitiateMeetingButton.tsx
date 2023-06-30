"use client";

import { Button } from "@mantine/core";
import { useTransition } from "react";
import { IconCalendarCheck } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";

type Params = {
  meetingId: number;
  initiate(id: number): void;
};

export function InitiateMeetingButton(params: Params) {
  let [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Button
      loading={isPending}
      onClick={() =>
        startTransition(() => {
          params.initiate(params.meetingId);
          notifications.show({
            title: "Meeting Initiated",
            message: "The meeting has been initiated.",
            color: "teal",
            icon: <IconCalendarCheck size={20} />,
          });
          router.refresh();
        })
      }
      rightIcon={<IconCalendarCheck size={20} />}
    >
      Initiate Meeting
    </Button>
  );
}
