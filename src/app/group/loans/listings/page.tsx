import { Loan, LoanStatus } from "@/types/loans";
import { LoansList } from "./loans-list";

const getGroupLoans = async (): Promise<Loan[]> => {
  return [
    {
      id: 1,
      memberId: 1,
      memberName: "John Doe",
      amountLoaned: 1000,
      loanStatus: LoanStatus.ACTIVE,
      startDate: new Date("2020-01-01"),
      endDate: new Date("2020-12-31"),
      reasonForLoan: "To buy a new car",
    },
    {
      id: 2,
      memberId: 1,
      memberName: "Jane Doe",
      amountLoaned: 2000,
      loanStatus: LoanStatus.OVERDUE,
      startDate: new Date("2020-01-01"),
      endDate: new Date("2020-12-31"),
      reasonForLoan: "To buy a new car",
    },
    {
      id: 3,
      memberId: 1,
      memberName: "Jane Doe",
      amountLoaned: 3000,
      loanStatus: LoanStatus.REPAID,
      startDate: new Date("2020-01-01"),
      endDate: new Date("2020-12-31"),
      reasonForLoan: "To buy a new car",
    },
    {
      id: 4,
      memberId: 1,
      memberName: "Jane Doe",
      amountLoaned: 4000,
      loanStatus: LoanStatus.AWAITING_DISBURSEMENT,
      startDate: new Date("2020-01-01"),
      endDate: new Date("2020-12-31"),
      reasonForLoan: "To buy a new car",
    },
  ];
};

export default async function MemberLoansPage() {
  const loans = await getGroupLoans();

  return (
    <>
      <h1>List member loans</h1>
      <LoansList loans={loans} />
    </>
  );
}
