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

      <Progress value={(10_000 * 100) / 19_500} mt="md" size="lg" radius="xl" />
      <span
        className={
          "flex flex-col lg:flex-row justify-between gap-2 lg:items-center mt-4"
        }
      >
        <p className={"m-0 text-sm"}>
          Outstanding balance: {getFormattedCurrency(9500)}
        </p>
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
