import { ReactNode } from "react";
import { LoanDetailHeader } from "@/components/loans/loan-detail-header";
import DownloadReportButton from "@/components/reports/DownloadReportButton";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { loanId: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/login");
  }

  return (
    <>
      <div className={"flex justify-between items-center"}>
        <h1 className={"m-0"}>Loan details</h1>
        <DownloadReportButton
          token={session.accessToken}
          link={`http://localhost:8080/loans/${params.loanId}/report`}
        />
      </div>
      <LoanDetailHeader loanId={params.loanId} />
      {children}
    </>
  );
}
