import { Loan, LoanStatus } from "@/types/loans";
import { LoansList } from "./loans-list";

const getGroupLoans = async (): Promise<Loan[]> => {
  /*
  *
export type Loan = {
  interest: number;
  interestEarned: number;
  status: LoanStatus;
  startDate?: Date;
  endDate?: Date;
  dueDate?: Date;
  reasonForLoan: string;
};
  * */
  return [
    {
      id: 1,
      memberId: 1,
      memberName: "John Doe",
      interest: 10,
      interestEarned: 100,
      amountPayable: 1000,
      status: LoanStatus.ACTIVE,
      startDate: new Date("2020-01-01"),
      endDate: new Date("2020-12-31"),
      reasonForLoan: "To buy a new car",
      amount: 1000,
    },
    {
      id: 2,
      memberId: 1,
      memberName: "Jane Doe",
      interest: 10,
      interestEarned: 100,
      amountPayable: 1000,
      status: LoanStatus.ACTIVE,
      startDate: new Date("2020-01-01"),
      endDate: new Date("2020-12-31"),
      reasonForLoan: "To buy a new car",
      amount: 1000,
    },
    {
      id: 3,
      memberId: 1,
      memberName: "Jane Doe",
      interest: 10,
      interestEarned: 100,
      amountPayable: 1000,
      status: LoanStatus.ACTIVE,
      startDate: new Date("2020-01-01"),
      endDate: new Date("2020-12-31"),
      reasonForLoan: "To buy a new car",
      amount: 1000,
    },
    {
      id: 4,
      memberId: 1,
      memberName: "Jane Doe",
      interest: 10,
      interestEarned: 100,
      amountPayable: 1000,
      status: LoanStatus.ACTIVE,
      startDate: new Date("2020-01-01"),
      endDate: new Date("2020-12-31"),
      reasonForLoan: "To buy a new car",
      amount: 1000,
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
