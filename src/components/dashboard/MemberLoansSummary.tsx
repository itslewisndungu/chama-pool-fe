"use client";

import { Button, Paper, Text } from "@mantine/core";
import { getFormattedCurrency } from "@/lib/utils";
import { MemberLoanSummary } from "@/types/dashboard";
import Link from "next/link";

type Props = {
  summary: MemberLoanSummary;
};

export function MemberLoansSummary({ summary }: Props) {
  return (
    <section className={"p-4 flex gap-4 flex-wrap"}>
      <Paper withBorder p="md" radius="md" className="flex-1 space-y-4">
        <Text size="xs" color="dimmed" className="uppercase font-bold">
          Loans
        </Text>

        <div>
          <p className={"m-0 space-x-2"}>
            <span className={"text-sm"}>Total number of loans borrowed:</span>
            <span className={"font-semibold"}>
              {summary.borrowedLoans} loans
            </span>
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

        <Button component={Link} href="/member/loans">
          View all loans
        </Button>
      </Paper>

      <Paper withBorder p="md" radius="md" className="flex-1 space-y-4 ">
        <Text size="xs" color="dimmed" className="uppercase font-bold">
          Loans Summary by Category
        </Text>
        <div>
          <p className={"m-0 space-x-2"}>
            <span className={" text-sm"}>Active loans:</span>
            <span className={"font-semibold"}>{summary.activeLoans} loans</span>
          </p>
          <p className={"m-0 space-x-2"}>
            <span className={" text-sm"}>Overdue loans:</span>
            <span className={"font-semibold"}>
              {summary.overdueLoans} loans{" "}
            </span>
          </p>
          <p className={"m-0 space-x-2"}>
            <span className={" text-sm"}>Repaid loans:</span>
            <span className={"font-semibold"}>{summary.repaidLoans} loans</span>
          </p>
          <p className={"m-0 space-x-2"}>
            <span className={" text-sm"}>Loans awaiting disbursement</span>
            <span className={"font-semibold"}>
              {summary.pendingLoans} loans
            </span>
          </p>
          <p className={"m-0 space-x-2"}>
            <span className={" text-sm"}>Pending loan applications:</span>
            <span className={"font-semibold"}>
              {summary.loanApplications} loans
            </span>
          </p>
        </div>
      </Paper>
    </section>
  );
}
