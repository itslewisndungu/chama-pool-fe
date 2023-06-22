import { MemberNotEligible } from "@/app/group/loans/new-loan/MemberNotEligible";
import { MemberEligible } from "@/app/group/loans/new-loan/MemberEligible";

type LoanEligibility =
  | {
      isEligible: true;
      amountEligible: number;
      reason?: string;
    }
  | {
      isEligible: false;
      amountEligible?: number;
      reason: string;
    };

const isMemberEligibleForLoan = async (
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

export default async function Page() {
  const { isEligible, amountEligible, reason } = await isMemberEligibleForLoan(
    true
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
