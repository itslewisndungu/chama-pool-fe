"use client";

import { Text, Progress, Card, Button } from "@mantine/core";
import Link from "next/link";
import { getFormattedCurrency, getFormattedDate } from "@/lib/utils";
import { Loan, LoanStatus } from "@/types/loans";

type Params = {
  loan: Loan;
};

export function RepaymentProgress({ loan }: Params) {
  return loan.status === LoanStatus.AWAITING_DISBURSEMENT ? (
    <p>
      This still awaiting disbursement. The check will be picked during the next
      meeting.
    </p>
  ) : (
    <div className={"flex flex-col md:flex-row gap-8 px-4"}>
      <Card withBorder radius="md" padding="xl" className={"flex-1"}>
        <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
          Amount
        </Text>
        <Text fz="lg" fw={500}>
          {getFormattedCurrency(10_000)} repaid.
        </Text>

        <Progress
          value={(10_000 * 100) / 19_500}
          mt="md"
          size="lg"
          radius="xl"
        />
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

      <Card withBorder radius="md" padding="xl" className={"flex-1"}>
        <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
          Timeline
        </Text>
        <Text fz="lg" fw={500}>
          13 days remaining to repay loan.
        </Text>
        <Progress value={70} mt="md" size="lg" radius="xl" />

        <p className={"self-end mt-5 text-sm"}>
          {loan.dueDate
            ? getFormattedDate(loan.dueDate)
            : "Loan has not yet been disbursed"}
        </p>
      </Card>
    </div>
  );
}
