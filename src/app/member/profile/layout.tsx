"use client";

import { Tabs } from "@mantine/core";

import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

export default async function ProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const path = usePathname();

  return (
    <div className={"flex"}>
      <Tabs value={path} onTabChange={router.push} orientation="vertical">
        <Tabs.List>
          <Tabs.Tab value="/member/profile/personal-information">
            Personal Information
          </Tabs.Tab>
          <Tabs.Tab value="/member/profile/kin">Next of kin</Tabs.Tab>
          <Tabs.Tab value="/member/profile/address">Home address</Tabs.Tab>
          <Tabs.Tab value="/member/profile/occupation">Occupation</Tabs.Tab>
        </Tabs.List>
      </Tabs>

      <section>{children}</section>
    </div>
  );
}
