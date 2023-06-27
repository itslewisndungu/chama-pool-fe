import { RepaymentProgress } from "@/app/member/loans/[loanId]/summary/repayment-progress";
import { LoanSummary } from "@/app/member/loans/[loanId]/summary/loan-summary";
import { Loan } from "@/types/loans";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

const getLoan = async (token: string, loanId: number) => {
  const req = new Request(`http://localhost:8080/loans/${loanId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (await fetch(req).then(res => res.json())) as Loan;
};

type Params = {
  params: {
    loanId: number;
  };
};

export default async function LoanSummaryPage({ params: { loanId } }: Params) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/login");
  }

  const loan = await getLoan(session.accessToken, loanId);
  console.log({ loan });

  return (
    <section className={"max-w-5xl mx-auto mt-8 space-y-8 "}>
      <RepaymentProgress loan={loan} />
      <LoanSummary loan={loan} />
    </section>
  );
}
