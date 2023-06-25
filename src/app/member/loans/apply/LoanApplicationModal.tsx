"use client";

import { Modal } from "@mantine/core";
import { RequestLoanForm } from "@/app/member/loans/apply/RequestLoanForm";

type Props = {
  opened: boolean;
  onClose(): void;
  amount: number;
};

export function LoanApplicationModal({ opened, onClose, amount }: Props) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <h2 className={"font-semibold text-gray-800 text-xl m-0"}>
          Apply for a loan
        </h2>
      }
    >
      <RequestLoanForm close={onClose} amountEligible={amount} />
    </Modal>
  );
}
