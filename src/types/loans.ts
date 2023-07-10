export type Loan = {
  loanId: number;
  memberId: number;
  fullName: string;
  amount: number;
  amountPayable: number;
  interestRate: number;
  interestEarned: number;
  status: LoanStatus;
  startDate?: Date;
  endDate?: Date;
  dueDate?: Date;
  reasonForLoan: string;
  balance: number;
};

export enum LoanStatus {
  "AWAITING_DISBURSEMENT" = "AWAITING_DISBURSEMENT",
  "OVERDUE" = "OVERDUE",
  "ACTIVE" = "ACTIVE",
  "REPAID" = "REPAID",
}

export enum LoanApplicationStatus {
  "AWAITING_APPROVAL" = "AWAITING_APPROVAL",
  "APPROVED" = "APPROVED",
  "REJECTED" = "REJECTED",
}

export enum LoanApprovalStatus {
  "AWAITING_APPROVAL" = "AWAITING_APPROVAL",
  "APPROVED" = "APPROVED",
  "REJECTED" = "REJECTED",
}

export type LoanEligibility =
  | {
      isEligible: true;
      amountEligible: number;
      reason?: string;
    }
  | {
      isEligible: false;
      amountEligible?: number;
      reason: string;
    };

export type LoanApplication = {
  id: number;
  applicationDate: Date;
  memberId: number;
  memberName: string;
  memberPhoneNumber: string;
  amount: number;
  reasonForLoan: string;
  status: LoanApplicationStatus;
  approval: {
    chairman: {
      status: LoanApprovalStatus;
      message?: string;
    };
    treasurer: {
      status: LoanApprovalStatus;
      message?: string;
    };
    secretary: {
      status: LoanApprovalStatus;
      message?: string;
    };
  };
};

export type LoanInstallment = {
  id: number;
  loanId: number;
  amount: number;
  date: Date;
};
