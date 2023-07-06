"use client";

import { RepaymentProgress } from "@/components/loans/repayment-progress";
import { LoanSummary } from "@/components/loans/loan-summary";
import { Loan } from "@/types/loans";

type Params = {
  loan: Loan;
  isSecretary: boolean;
};

export function Loan({ loan, isSecretary }: Params) {
  return (
    <section className={"max-w-5xl mx-auto mt-8 space-y-8 "}>
      <RepaymentProgress loan={loan} isSecretary={isSecretary} />
      <LoanSummary loan={loan} />
    </section>
  );
}
