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

export type LoanApplication = {
  id: number;
  applicationDate: Date;
  memberId: number;
  memberName: string;
  memberPhoneNumber: string;
  amount: number;
  reasonForApplication: string;
  status: LoanApplicationStatus;
  approvals: {
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
