import { LoanSummary } from "@/app/group/loans/applications/pending-application/loan-summary";
import { ApprovalSummary } from "@/app/group/loans/applications/pending-application/approval-summary";

export function ActiveApplicationSummary() {
  return (
    <section className={"space-y-4 m-5"}>
      <LoanSummary />
      <ApprovalSummary />
    </section>
  );
}
