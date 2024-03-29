"use client";

import { Tabs } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  loanId: string;
};

export function LoanDetailHeader({ loanId }: Props) {
  const path = usePathname();
  const router = useRouter();

  return (
    <Tabs value={path} onTabChange={router.push}>
      <Tabs.List>
        <Tabs.Tab value={`summary`}>Loan summary</Tabs.Tab>
        <Tabs.Tab value={`installments`}>Loan installments</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
