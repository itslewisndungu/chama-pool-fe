"use client";

import { Button } from "@mantine/core";
import Link from "next/link";

type Props = {
  reason: string;
};

export function MemberNotEligible({ reason }: Props) {
  return (
    <div
      className={"grid place-content-center mt-8 md:mt-16 text-center gap-4"}
    >
      <p className={"text-gray-900"}>
        Dear Lewis. Unfortunately, you are not currently eligible for a loan.
        <br />
        {reason}.
      </p>

      <span>
        <Button component={Link} href={"/dashboard"}>
          Go to dashboard
        </Button>
      </span>
    </div>
  );
}
