import { getFormattedCurrency, getFormattedDate } from "@/lib/utils";
import { Badge, Card, Text } from "@mantine/core";
import { Loan, LoanStatus } from "@/types/loans";

type Params = {
  loan: Loan;
};

export function LoanSummary({ loan }: Params) {
  return (
    <div className={"flex flex-col-reverse md:flex-row px-4 md:gap-8"}>
      <Card withBorder={true} className={"flex-1 gap-1"} padding={"xl"}>
        <Text className={"mb-2"} fz="xs" tt="uppercase" fw={700} c="dimmed">
          Loan details
        </Text>

        <p className={"m-0"}>
          <span className={" text-sm"}>Loan Status: </span>
          <span>
            <Badge size={"sm"} color={"teal"}>
              {loan.status}
            </Badge>
          </span>
        </p>
        <p className={"m-0"}>
          <span className={" text-sm"}>Amount borrowed: </span>
          <span className={"font-semibold"}>
            {getFormattedCurrency(loan.amount)}
          </span>
        </p>
        <p className={"m-0"}>
          <span className={"text-sm"}>Loan duration: </span>
          {loan.status === LoanStatus.AWAITING_DISBURSEMENT ? (
            <span className={"font-semibold"}>Loan not yet disbursed</span>
          ) : (
            <span className={"font-semibold"}>
              {`${getFormattedDate(loan.startDate!)} 
              to
              ${getFormattedDate(loan.dueDate!)}`}
            </span>
          )}
        </p>
        <p className={"m-0"}>
          <span className={" text-sm"}>Loan interest rate: </span>
          <span className={"font-semibold"}>{loan.interestRate}%</span>
        </p>
        <p className={"m-0"}>
          <span className={" text-sm"}>Interest earned: </span>
          <span className={"font-semibold"}>
            {getFormattedCurrency(loan.interestEarned)}{" "}
          </span>
        </p>
        <p className={"m-0"}>
          <span className={" text-sm"}>Total amount payable: </span>
          <span className={"font-semibold"}>
            {getFormattedCurrency(loan.amountPayable)}{" "}
          </span>
        </p>
      </Card>

      <Card withBorder={true} className={"flex-1 gap-1"} padding={"xl"}>
        <Text fz="xs" tt="uppercase" className={"mb-2"} fw={700} c="dimmed">
          Member details
        </Text>

        <p className={"m-0"}>
          <span className={" text-sm"}>Member Name: </span>
          <span className={"font-semibold"}>{loan.memberName}</span>
        </p>
        <p className={"m-0"}>
          <span className={" text-sm"}>Member ID: </span>
          <span className={"font-semibold"}>{loan.memberId}</span>
        </p>
      </Card>
    </div>
  );
}
