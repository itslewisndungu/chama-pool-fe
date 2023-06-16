"use client";

import { Group, Paper, Text } from "@mantine/core";
import {
  IconTransferOut,
  IconReceipt2,
  IconCoin,
  IconArrowUpRight,
  IconArrowDownRight,
} from "@tabler/icons-react";
import getFormattedCurrency from "@/lib/format-currency";

interface StatsGridProps {
  data: {
    title: string;
    icon: string;
    value: string;
    diff: number;
  }[];
}

const AccountBalanceStatCard = () => {
  const amount = getFormattedCurrency(1_200_000);

  return (
    <Paper withBorder p="md" radius="md" className="flex-1">
      <Group position="apart">
        <Text size="xs" color="dimmed" className="uppercase font-bold">
          Account Balance
        </Text>
        <IconCoin className="text-gray-300" size="1.4rem" stroke={1.5} />
      </Group>

      <div className="pt-5">
        <p className="text-xl md:text-2xl font-bold m-0">{amount}</p>
      </div>

      <Text fz="xs" c="dimmed" mt={7}>
        Total amount of cash in the chama account
      </Text>
    </Paper>
  );
};

const MonthlyRevenueStatCard = () => {
  const amount = getFormattedCurrency(15_000);

  return (
    <Paper withBorder p="md" radius="md" className="flex-1">
      <Group position="apart">
        <Text size="xs" color="dimmed" className="uppercase font-bold">
          Monthly revenue
        </Text>
        <IconReceipt2 className="text-gray-300" size="1.4rem" stroke={1.5} />
      </Group>

      <div className="flex gap-2 mt-5">
        <p className="text-xl md:text-2xl font-bold m-0">{amount}</p>

        <Text
          // color={stat.diff > 0 ? 'teal' : 'red'}
          color={"red"}
          fz="sm"
          fw={500}
          className="flex items-center"
        >
          <span>{13}%</span>
          <IconArrowDownRight size="1rem" stroke={1.5} />
        </Text>
      </div>

      <Text fz="xs" c="dimmed" mt={7}>
        Compared to previous month
      </Text>
    </Paper>
  );
};

const MonthlyExpensesStatCard = () => {
  const amount = getFormattedCurrency(1_000);

  return (
    <Paper withBorder p="md" radius="md" className="flex-1">
      <Group position="apart">
        <Text size="xs" color="dimmed" className="uppercase font-bold">
          Monthly expenses
        </Text>
        <IconTransferOut className="text-gray-300" size="1.4rem" stroke={1.5} />
      </Group>

      <div className="flex gap-2 mt-5">
        <p className="text-xl md:text-2xl font-bold m-0">{amount}</p>

        <Text
          // color={stat.diff > 0 ? 'teal' : 'red'}
          color={"teal"}
          fz="sm"
          fw={500}
          className="flex items-center"
        >
          <span>{13}%</span>
          <IconArrowUpRight size="1rem" stroke={1.5} />
        </Text>
      </div>

      <Text fz="xs" c="dimmed" mt={7}>
        Compared to previous month
      </Text>
    </Paper>
  );
};

export function GroupFinancialSummary({ data }: StatsGridProps) {
  return (
    <div className="p-4 flex gap-4 flex-wrap">
      <AccountBalanceStatCard />
      <MonthlyRevenueStatCard />
      <MonthlyExpensesStatCard />
    </div>
  );
}
