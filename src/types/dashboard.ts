export type LoanSummary = {
  issuedLoans: number;
  totalAmountBorrowed: number;
  totalAmountRepaid: number;
  activeLoans: number;
  overdueLoans: number;
  repaidLoans: number;
  pendingLoans: number;
  loanApplications: number;
  outstandingBalance: number;
};

export type GroupAccountSummary = {
  accountBalance: number;
  totalIncome: number;
  totalExpenses: number;
};

export type MeetingsSummary = {
  meetings: number;
  scheduledMeetings: number;
  totalContributions: number;
};

export type MemberLoanSummary = {
  borrowedLoans: number;
  totalAmountBorrowed: number;
  totalAmountRepaid: number;
  activeLoans: number;
  overdueLoans: number;
  repaidLoans: number;
  pendingLoans: number;
  loanApplications: number;
};

export type MemberMeetingSummary = {
  meetingsAttended: number;
  scheduledMeeting: number;
  totalContributions: number;
};
