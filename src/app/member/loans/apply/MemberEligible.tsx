"use client";

import { getFormattedCurrency } from "@/lib/utils";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Button, Checkbox } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { LoanApplicationModal } from "@/app/member/loans/apply/LoanApplicationModal";

type Props = {
  amount: number;
  member: string;
};

export function MemberEligible({ amount, member }: Props) {
  const [accepted, setAccepted] = useState(false);
  const [modalOpened, { open, close }] = useDisclosure(false);

  return (
    <div className={"max-w-[70ch] mt-8"}>
      <p className={"text-xl md:text-2xl font-light text-gray-800"}>
        Dear {member}. You are eligible for a loan of{" "}
        {getFormattedCurrency(amount)}
      </p>
      <p className={"text-gray-900"}>
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
      <div className={"flex flex-col gap-6 pt-4 "}>
        <Checkbox
          label={"I agree to terms and conditions"}
          checked={accepted}
          onChange={event => setAccepted(event.currentTarget.checked)}
        />

        {accepted ? (
          <span>
            <Button
              className={"px-12"}
              rightIcon={<IconChevronRight size={20} />}
              disabled={!accepted}
              onClick={open}
            >
              Apply for loan
            </Button>
          </span>
        ) : null}

        <LoanApplicationModal
          onClose={close}
          opened={modalOpened}
          amount={amount}
        />
      </div>
    </div>
  );
}
