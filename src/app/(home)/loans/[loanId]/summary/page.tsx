import { RepaymentProgressCard } from "@/app/(home)/loans/[loanId]/summary/repayment-progress-card";
import { TimelineCard } from "@/app/(home)/loans/[loanId]/summary/timeline-card";

export default function LoanSummaryPage() {
  return (
    <section className={"mt-8"}>
      <div className={"flex gap-8 px-4"}>
        <RepaymentProgressCard />
        <TimelineCard />
      </div>
    </section>
  );
}
