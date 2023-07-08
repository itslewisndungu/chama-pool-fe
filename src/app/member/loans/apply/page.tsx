import { MemberNotEligible } from "@/app/member/loans/apply/MemberNotEligible";
import { MemberEligible } from "@/app/member/loans/apply/MemberEligible";
import { LoanEligibility } from "@/types/loans";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

const mockIsMemberEligibleForLoan = async (
  eligible: boolean = true
): Promise<LoanEligibility> => {
  if (eligible) {
    return {
      amountEligible: 10_000,
      isEligible: true,
    };
  } else {
    return {
      isEligible: false,
      reason: "You have an outstanding loan that needs to be paid first",
    };
  }
};

const isMemberEligibleForLoan = async (
  token: string
): Promise<LoanEligibility> => {
  const req = new Request("http://localhost:8080/loans/eligibility", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await fetch(req);
  return (await res.json()) as LoanEligibility;
};
export default async function Page() {
  // const { isEligible, amountEligible, reason } =
  //   await mockIsMemberEligibleForLoan(true);

  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/login");
  }

  const { isEligible, amountEligible, reason } = await isMemberEligibleForLoan(
    session.accessToken
  );

  return (
    <section>
      <h1 className="font-semibold m-0">Loan application</h1>

      {!isEligible ? (
        <MemberNotEligible reason={reason} />
      ) : (
        <MemberEligible amount={amountEligible} />
      )}
    </section>
  );
}
