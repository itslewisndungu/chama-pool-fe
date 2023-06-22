"use client";

import { Text, Progress, Card, Button } from "@mantine/core";
import Link from "next/link";
import { getFormattedCurrency } from "@/lib/utils";

export function RepaymentProgressCard() {
  return (
    <Card withBorder radius="md" padding="xl" className={"flex-1"}>
      <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
        Amount
      </Text>
      <Text fz="lg" fw={500}>
        {getFormattedCurrency(10_000)} repaid.
      </Text>
      <Progress value={70} mt="md" size="lg" radius="xl" />
      <span className={"flex justify-between items-center mt-4"}>
        <p className={"m-0"}>{getFormattedCurrency(5000)} remaining.</p>
        <Button
          variant={"light"}
          component={Link}
          size={"sm"}
          href={"./installments"}
        >
          View installments
        </Button>
      </span>
    </Card>
  );
}
