export type Loan = {
  id: number;
  memberId: number;
  memberName: string;
  amount: number;
  amountPayable: number;
  interest: number;
  interestEarned: number;
  status: LoanStatus;
  startDate?: Date;
  endDate?: Date;
  dueDate?: Date;
  reasonForLoan: string;
};

export enum LoanStatus {
  "PENDING" = "PENDING",
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
  amount: number;
  date: Date;
};
/*
 {
 "amount": 1000,
 "status": "APPROVED",
 "reasonForLoan": "I need to buy a new laptop",
 "approvals": {
 "chairman": {
 "status": "APPROVED",
 "message": "Looks good to me"
 },
"secretary": {
 "status": "REJECTED",
 "message": "I don't think you need a new laptop",
},
 "treasurer": {
 "status": "APPROVED",
 "message": "I think you need a new laptop"
 }
 }
 */
