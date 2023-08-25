import { Loan } from "@/types/loans";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LoansList } from "@/components/loans/loans-list";
import { getEndpointPath } from "@/lib/utils";

const getMyLoans = async (token: string): Promise<Loan[]> => {
  const req = new Request(getEndpointPath("/loans/my-loans"), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (await fetch(req).then(res => res.json())) as Loan[];
};

export default async function MyLoansPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/login");
  }

  const loans = await getMyLoans(session.accessToken);

  return (
    <>
      <h1 className={"m-0"}>My loans</h1>
      <LoansList loans={loans} />
    </>
  );
}
