"use client";

import { Group, Paper, Text } from "@mantine/core";
import { IconTransferOut, IconReceipt2, IconCoin } from "@tabler/icons-react";
import { getFormattedCurrency } from "@/lib/utils";
import { GroupAccountSummary } from "@/types/dashboard";

type Props = {
  summary: GroupAccountSummary;
};

export function GroupFinancialSummary({ summary }: Props) {
  return (
    <section className="p-4 flex gap-4 flex-wrap">
      <AccountBalanceStatCard balance={summary.accountBalance} />
      <MonthlyRevenueStatCard revenue={summary.totalIncome} />
    </section>
  );
}

const AccountBalanceStatCard = ({ balance }: { balance: number }) => {
  return (
    <Paper withBorder p="md" radius="md" className="flex-1">
      <Group position="apart">
        <Text size="xs" color="dimmed" className="uppercase font-bold">
          Account Balance
        </Text>
        <IconCoin className="text-gray-300" size="1.4rem" stroke={1.5} />
      </Group>

      <div className="pt-5">
        <p className="text-xl md:text-2xl font-bold m-0">
          {getFormattedCurrency(balance)}
        </p>
      </div>

      <Text fz="xs" c="dimmed" mt={7}>
        Total amount of cash in the chama account
      </Text>
    </Paper>
  );
};

const MonthlyRevenueStatCard = ({ revenue }: { revenue: number }) => {
  return (
    <Paper withBorder p="md" radius="md" className="flex-1">
      <Group position="apart">
        <Text size="xs" color="dimmed" className="uppercase font-bold">
          Interest earned from loans
        </Text>
        <IconReceipt2 className="text-gray-300" size="1.4rem" stroke={1.5} />
      </Group>

      <div className="pt-5">
        <p className="text-xl md:text-2xl font-bold m-0">
          {getFormattedCurrency(revenue)}
        </p>
      </div>
    </Paper>
  );
};

const MonthlyExpensesStatCard = ({ expenses }: { expenses: number }) => {
  return (
    <Paper withBorder p="md" radius="md" className="flex-1">
      <Group position="apart">
        <Text size="xs" color="dimmed" className="uppercase font-bold">
          Interest earned from loans
        </Text>
        <IconTransferOut className="text-gray-300" size="1.4rem" stroke={1.5} />
      </Group>

      <div className="pt-5">
        <p className="text-xl md:text-2xl font-bold m-0">
          {getFormattedCurrency(expenses)}
        </p>
      </div>
    </Paper>
  );
};
