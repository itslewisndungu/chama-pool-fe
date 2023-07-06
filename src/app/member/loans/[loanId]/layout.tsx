import { ReactNode } from "react";
import { LoanDetailHeader } from "@/components/loans/loan-detail-header";

export default function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { loanId: string };
}) {
  return (
    <>
      <h1 className={"m-0"}>Loan details</h1>
      <LoanDetailHeader loanId={params.loanId} />
      {children}
    </>
  );
}
