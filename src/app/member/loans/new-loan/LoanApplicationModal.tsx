"use client";

import { Modal } from "@mantine/core";
import { RequestLoanForm } from "@/app/(home)/loans/new-loan/RequestLoanForm";
import { LoanApplication } from "@/app/(home)/loans/new-loan/AcceptLoanConditions";

type Props = {
  opened: boolean;
  onClose(): void;
};

export function LoanApplicationModal({ opened, onClose }: Props) {
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
      <RequestLoanForm close={onClose} />
    </Modal>
  );
}
