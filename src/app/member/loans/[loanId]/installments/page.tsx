import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LoanInstallment } from "@/types/loans";
import { LoanInstallmentsList } from "@/components/loans/InstallmentsList";
import { isUserAdmin } from "@/lib/utils";

const getLoanInstallments = async (loanId: number, token: string) => {
  const req = new Request(
    `http://localhost:8080/loans/${loanId}/installments`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return (await fetch(req).then(res => res.json())) as LoanInstallment[];
};

type Props = {
  params: {
    loanId: number;
  };
};

export default async function LoanInstallmentsPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/login");
  }

  const loanInstallments = await getLoanInstallments(
    params.loanId,
    session.accessToken
  );

  return (
    <>
      <LoanInstallmentsList
        installments={loanInstallments}
        loanId={params.loanId}
        isAdmin={false}
      />
    </>
  );
}
