import { RepaymentProgress } from "@/app/member/loans/[loanId]/summary/repayment-progress";
import { LoanSummary } from "@/app/member/loans/[loanId]/summary/loan-summary";

export default function LoanSummaryPage() {
  return (
    <section className={"max-w-5xl mx-auto mt-8 space-y-8 "}>
      <div className={"flex flex-col md:flex-row gap-8 px-4"}>
        <RepaymentProgress />
      </div>

      <div className={"flex flex-col md:flex-row px-4 justify-around "}>
        <LoanSummary />
      </div>
    </section>
  );
}
