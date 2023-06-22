"use client";

import { Card, Progress, Text } from "@mantine/core";

export function TimelineCard() {
  return (
    <Card withBorder radius="md" padding="xl" className={"flex-1"}>
      <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
        Timeline
      </Text>
      <Text fz="lg" fw={500}>
        13 days remaining to repay loan
      </Text>
      <Progress value={70} mt="md" size="lg" radius="xl" />

      <p className={"self-end mt-5"}>Deadline: 13th May, 2023</p>
    </Card>
  );
}
