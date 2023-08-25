"use client";

import { Paper, Text } from "@mantine/core";
import { getFormattedCurrency } from "@/lib/utils";
import { MemberLoanSummary } from "@/types/dashboard";


type Props = {
  summary: MemberLoanSummary;
};

export function ProfileLoansCard({summary}:Props) {
  return (
    <Paper withBorder p="md" radius="md" className="flex-1 space-y-4">
      <Text size="xs" color="dimmed" className="uppercase font-bold">
        Loans
      </Text>

      <div>
        <p className={"m-0 space-x-2"}>
          <span className={"text-sm"}>Total number of loans borrowed:</span>
          <span className={"font-semibold"}>{summary.borrowedLoans} loans</span>
        </p>
        <p className={"m-0 space-x-2"}>
          <span className={"text-sm"}>Total Amount borrowed: </span>
          <span className={"font-semibold"}>
            {getFormattedCurrency(summary.totalAmountBorrowed)}
          </span>
        </p>
        <p className={"m-0 space-x-2"}>
          <span className={"text-sm"}>Total Amount repaid: </span>
          <span className={"font-semibold"}>
            {getFormattedCurrency(summary.totalAmountRepaid)}
          </span>
        </p>
        <p className={"m-0 space-x-2"}>
          <span className={"text-sm"}>Total Outstanding balances: </span>
          <span className={"font-semibold"}>
            {getFormattedCurrency(summary.totalAmountRepaid)}
          </span>
        </p>
      </div>
    </Paper>
  );
}
