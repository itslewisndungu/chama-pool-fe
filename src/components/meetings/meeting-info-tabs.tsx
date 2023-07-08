"use client";

import { useRouter, usePathname } from "next/navigation";
import { Tabs } from "@mantine/core";

export function MeetingInfoTabs({ meetingId: id }: { meetingId: number }) {
  const router = useRouter();
  const path = usePathname();

  return (
    <Tabs value={path} onTabChange={router.push}>
      <Tabs.List>
        <Tabs.Tab value={`attendance`}>Meeting attendance</Tabs.Tab>
        <Tabs.Tab value={`contributions`}>Group contributions</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
