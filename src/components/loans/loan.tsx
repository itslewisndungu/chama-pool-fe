"use client";

import { RepaymentProgress } from "@/components/loans/repayment-progress";
import { LoanSummary } from "@/components/loans/loan-summary";
import { Loan } from "@/types/loans";

type Params = {
  loan: Loan;
  isTreasurer: boolean;
};

export function Loan({ loan, isTreasurer }: Params) {
  return (
    <section className={"max-w-5xl mx-auto mt-8 space-y-8 "}>
      <RepaymentProgress loan={loan} isTreasurer={isTreasurer} />
      <LoanSummary loan={loan} />
    </section>
  );
}
