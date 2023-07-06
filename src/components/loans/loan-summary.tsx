import { getFormattedCurrency } from "@/lib/utils";
import { Badge } from "@mantine/core";
import { Loan } from "@/types/loans";

type Params = {
  loan: Loan;
};

export function LoanSummary({ loan }: Params) {
  return (
    <div className={"flex flex-col md:flex-row px-4 justify-around "}>
      <span>
        <h2 className={"mb-0 font-light text-2xl"}>Loan Summary</h2>
        <div>
          <p className={"space-x-2"}>
            <span className={"font-bold text-sm"}>Loan Status:</span>
            <span>
              <Badge color={"teal"}>{loan.status}</Badge>
            </span>
          </p>
          <p className={"space-x-2"}>
            <span className={"font-bold text-sm"}>Amount borrowed:</span>
            <span>{getFormattedCurrency(loan.amount)}</span>
          </p>
          <p className={"space-x-2"}>
            <span className={"font-bold text-sm"}>Loan duration:</span>
            <span>18-08-2022 to 18-10-2022</span>
          </p>
          <p className={"space-x-2"}>
            <span className={"font-bold text-sm"}>Loan interest rate:</span>
            <span>{loan.interestRate} %</span>
          </p>
          <p className={"space-x-2"}>
            <span className={"font-bold text-sm"}>Interest earned:</span>
            <span>{getFormattedCurrency(loan.interestEarned)} </span>
          </p>
          <p className={"space-x-2"}>
            <span className={"font-bold text-sm"}>Total amount payable</span>
            <span>{getFormattedCurrency(loan.amountPayable)} </span>
          </p>
        </div>
      </span>

      <span>
        <h2 className={"mb-0 font-light text-2xl"}>Member Summary</h2>
        <div>
          <p className={"space-x-2"}>
            <span className={"font-bold text-sm"}>Member ID</span>
            <span>{loan.memberId}</span>
          </p>
          <p className={"space-x-2"}>
            <span className={"font-bold text-sm"}>Member Name</span>
            <span>{loan.memberName}</span>
          </p>
        </div>
      </span>
    </div>
  );
}
