import { RepaymentProgressCard } from "@/app/(home)/loans/[loanId]/summary/repayment-progress-card";
import { TimelineCard } from "@/app/(home)/loans/[loanId]/summary/timeline-card";
import { LoanSummary } from "@/app/(home)/loans/[loanId]/summary/loan-summary";
import { MemberSummary } from "@/app/(home)/loans/[loanId]/summary/member-summary";

export default function LoanSummaryPage() {
  return (
    <section className={"max-w-5xl mx-auto mt-8 space-y-8 "}>
      <div className={"flex flex-col md:flex-row gap-8 px-4"}>
        <RepaymentProgressCard />
        <TimelineCard />
      </div>

      <div className={"flex flex-col md:flex-row px-4 justify-around "}>
        <LoanSummary />
        <MemberSummary />
      </div>
    </section>
  );
}
