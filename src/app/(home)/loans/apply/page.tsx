import { MemberNotEligible } from "@/app/(home)/loans/apply/MemberNotEligible";
import { MemberEligible } from "@/app/(home)/loans/apply/MemberEligible";

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
    false
  );

  return (
    <section>
      <h1 className="text-xl font-bold m-0">Loan application</h1>

      {!isEligible ? (
        <MemberNotEligible reason={reason} />
      ) : (
        <MemberEligible amount={amountEligible} />
      )}
    </section>
  );
}
