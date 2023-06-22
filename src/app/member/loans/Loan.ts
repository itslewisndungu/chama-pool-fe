export type Loan = {
  id: number;
  memberId: number;
  memberName: string;
  amountLoaned: number;
  loanStatus: LoanStatus;
  startDate?: Date;
  endDate?: Date;
  reasonForLoan: string;
};

export enum LoanStatus {
  "PENDING" = "PENDING",
  "AWAITING_DISBURSEMENT" = "AWAITING_DISBURSEMENT",
  "OVERDUE" = "OVERDUE",
  "ACTIVE" = "ACTIVE",
  "REPAID" = "REPAID",
}
