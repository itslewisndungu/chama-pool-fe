export type Transaction = {
  id: number;
  date: Date;
  type: TransactionType;
  amount: number;
  description: string;
};

export enum TransactionType {
  INVESTMENT_INCOME = "INVESTMENT_INCOME",
  LOAN_INTEREST = "LOAN_INTEREST",
  CONTRIBUTION = "CONTRIBUTION",
  MEMBERSHIP_FEE = "MEMBERSHIP_FEE",
  WITHDRAWAL = "WITHDRAWAL",
  LOAN_REPAYMENT = "LOAN_REPAYMENT",
  LOAN_DISBURSEMENT = "LOAN_DISBURSEMENT",
  DIVIDEND = "DIVIDEND",
  DEPOSIT = "DEPOSIT",
}
