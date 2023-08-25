import { Loan } from "@/types/loans";
import { LoansList } from "@/components/loans/loans-list";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import DownloadReportButton from "@/components/reports/DownloadReportButton";

const getGroupLoans = async (token: string): Promise<Loan[]> => {
  const req = new Request("http://localhost:8080/loans", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (await fetch(req).then(res => res.json())) as Loan[];
};

export default async function MemberLoansPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/login");
  }

  const loans = await getGroupLoans(session.accessToken);

  return (
    <>
      <div className={"flex justify-between items-center"}>
        <h1>Group Loans</h1>
        <DownloadReportButton
          token={session.accessToken}
          link={"http://localhost:8080/loans/report"}
        />
      </div>
      <LoansList loans={loans} />
    </>
  );
}
