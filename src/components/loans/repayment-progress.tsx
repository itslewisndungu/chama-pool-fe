import { Text, Progress, Card, Button } from "@mantine/core";
import Link from "next/link";
import {
  calculateRemainingDaysPercentage,
  getFormattedCurrency,
  getFormattedDate,
  getRemainingLoanDays,
} from "@/lib/utils";
import { Loan, LoanStatus } from "@/types/loans";
import { DisburseLoanButton } from "@/app/group/loans/listings/disburse-loan-button";

type Params = {
  loan: Loan;
  isTreasurer: boolean;
};

export function RepaymentProgress({ loan, isTreasurer }: Params) {
  return (
    <>
      {loan.status === LoanStatus.AWAITING_DISBURSEMENT ? (
        <div className={"grid justify-items-center"}>
          {isTreasurer ? (
            <>
              <p className={"lead"}>This still awaiting disbursement.</p>
              <DisburseLoanButton loanId={loan.id} />
            </>
          ) : (
            <p className={"lead"}>
              This still awaiting disbursement. The check will be picked during
              the next meeting.
            </p>
          )}
        </div>
      ) : (
        <div className={"flex flex-col md:flex-row gap-8 px-4"}>
          <Card withBorder radius="md" padding="xl" className={"flex-1"}>
            <Text fz="xs" tt="uppercase" fw={700} c="dimmed" className={"mb-2"}>
              Amount
            </Text>
            <Text fz="lg" fw={500}>
              {getFormattedCurrency(loan.amountPayable - loan.balance)} repaid.
            </Text>

            <Progress
              value={
                ((loan.amountPayable - loan.balance) * 100) / loan.amountPayable
              }
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
                Outstanding balance: <br />
                <span className="font-bold">
                  {getFormattedCurrency(loan.balance)}
                </span>
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

          {loan.status !== LoanStatus.REPAID ? (
            <Card withBorder radius="md" padding="xl" className={"flex-1"}>
              <Text
                className={"mb-2"}
                fz="xs"
                tt="uppercase"
                fw={700}
                c="dimmed"
              >
                Timeline
              </Text>
              <Text fz="lg" fw={500}>
                {getRemainingLoanDays(loan.dueDate)}
              </Text>

              <Progress
                value={calculateRemainingDaysPercentage(
                  loan.dueDate,
                  loan.startDate
                )}
                mt="md"
                size="lg"
                radius="xl"
              />

              <p className={"self-end mt-5 text-sm"}>
                {loan.dueDate ? (
                  <p>Loan is due on {getFormattedDate(loan.dueDate)}</p>
                ) : (
                  "Loan has not yet been disbursed"
                )}
              </p>
            </Card>
          ) : null}
        </div>
      )}
    </>
  );
}
