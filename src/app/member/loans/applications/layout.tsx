import { LoanApplicationsHeader } from "@/app/member/loans/applications/loan-applications-header";

export default function LoanApplicationsPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h1 className={"mt-0 mb-4"}>Loan applications</h1>
      <LoanApplicationsHeader />

      {children}
    </>
  );
}
