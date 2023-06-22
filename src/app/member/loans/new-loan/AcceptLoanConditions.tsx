"use client";

import { useState } from "react";
import { Button, Checkbox } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { LoanApplicationModal } from "@/app/(home)/loans/new-loan/LoanApplicationModal";

export type LoanApplication = {
  amount: number;
  reason: string;
};

const applyForLoan = async (loanApplication: LoanApplication) => {};

export function AcceptLoanConditions() {
  const [accepted, setAccepted] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  return (
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

      <LoanApplicationModal onClose={close} opened={opened} />
    </div>
  );
}
