import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getLoan } from "@/lib/api/utils";
import { Loan } from "@/components/loans/loan";

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

  return <Loan loan={loan} />;
}
