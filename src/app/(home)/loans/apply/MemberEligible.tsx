import { AcceptLoanConditions } from "@/app/(home)/loans/apply/AcceptLoanConditions";
import getFormattedCurrency from "@/lib/format-currency";

type Props = {
  amount: number;
};

export function MemberEligible({ amount }: Props) {
  return (
    <div className={"max-w-[70ch] mt-8"}>
      <p className={"text-lg font-light text-gray-800"}>
        Dear Lewis. You are eligible for a loan of{" "}
        {getFormattedCurrency(amount)}
      </p>
      <p className={"text-sm text-gray-900"}>
        Loans are supposed to be repaid within five months and with an interest
        of 10% on the total amount loaned. After five months, the interest rises
        by 5% for three months that follow. If the loan exceeds the time limit
        by three months and the situation is not understandable by the group
        members, they take the next step which is attaching a property belonging
        to the member and which is equivalent in value to the amount in default.
        The defaulters are also suspended from taking further loans until the
        members feel that there has been a credible change of behaviour and that
        the defaulter has become disciplined enough.
      </p>

      <AcceptLoanConditions />
    </div>
  );
}
