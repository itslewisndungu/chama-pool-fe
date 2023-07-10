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

  return (await fetch(req).then(res => res.json())) as {
    installments: LoanInstallment[];
    loanBalance: number;
    totalPaid: number;
  };
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

  const { installments, loanBalance } = await getLoanInstallments(
    params.loanId,
    session.accessToken
  );

  const isAdmin = isUserAdmin(session.user.roles);

  return (
    <>
      <LoanInstallmentsList
        installments={installments}
        balance={loanBalance}
        loanId={params.loanId}
        isAdmin={isAdmin}
      />
    </>
  );
}
