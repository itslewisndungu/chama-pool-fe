"use client";

import { Button } from "@mantine/core";
import Link from "next/link";

export function NoActiveApplication() {
  return (
    <section className={"grid place-content-center mt-16"}>
      <p className={"text-xl md:text-2xl font-light text-gray-800"}>
        You currently have no active loan application.
      </p>

      <Button
        className={"justify-self-center"}
        component={Link}
        href={"/member/loans/apply"}
      >
        Apply for a loan
      </Button>
    </section>
  );
}
