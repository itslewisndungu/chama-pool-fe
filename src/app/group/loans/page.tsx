import { Loan } from "@/types/loans";
import { LoansList } from "@/components/loans/loans-list";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getEndpointPath } from "@/lib/utils";

const getGroupLoans = async (token: string): Promise<Loan[]> => {
  const req = new Request(getEndpointPath(getEndpointPath("/loans")), {
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
      <h1>List member loans</h1>
      <LoansList loans={loans} />
    </>
  );
}
