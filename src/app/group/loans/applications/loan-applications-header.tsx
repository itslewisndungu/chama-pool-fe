"use client";

import { Tabs } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";

export function LoanApplicationsHeader() {
  const path = usePathname();
  const router = useRouter();

  return (
    <Tabs value={path} onTabChange={router.push}>
      <Tabs.List>
        <Tabs.Tab value="/loans/applications/pending-application">
          Pending Application
        </Tabs.Tab>
        <Tabs.Tab value="/loans/applications/past-applications">
          Past Applications
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
