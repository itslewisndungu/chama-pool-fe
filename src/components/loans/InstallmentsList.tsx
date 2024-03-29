"use client";

import { LoanInstallment } from "@/types/loans";
import { useEffect, useState } from "react";
import { sortTableData } from "@/lib/utils";
import { InstallmentsListTable } from "@/components/loans/InstallmentsTable";
import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { InstallmentForm } from "@/components/loans/InstallmentForm";
import { useRouter } from "next/navigation";

type Props = {
  installments: LoanInstallment[];
  loanId: number;
  isAdmin: boolean;
  balance: number;
};

export function LoanInstallmentsList({ installments, isAdmin, loanId, balance }: Props) {
  const [sortedData, setSortedData] = useState<LoanInstallment[]>(installments);

  const [search] = useState("");
  const [sortBy, setSortBy] = useState<keyof LoanInstallment | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();

  useEffect(() => {
    setSortedData(installments);
  }, [installments]);

  const closeRecordInstallmentModal = () => {
    router.refresh();
    close();
  };

  const setSorting = (field: keyof LoanInstallment) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(
      sortTableData<LoanInstallment>(installments, {
        sortBy: field,
        reversed,
        search,
      })
    );
  };

  return (
    <div className={"grid"}>
      <InstallmentsListTable
        installments={sortedData}
        setSorting={setSorting}
        sortBy={sortBy}
        reverseSortDirection={reverseSortDirection}
      />
      {isAdmin ? (
        <>
          <Button className={"justify-self-center"} onClick={open}>
            Record installment
          </Button>

          <InstallmentForm
            opened={opened}
            close={closeRecordInstallmentModal}
            loanId={loanId}
            loanBalance={balance}
          />
        </>
      ) : null}
    </div>
  );
}
