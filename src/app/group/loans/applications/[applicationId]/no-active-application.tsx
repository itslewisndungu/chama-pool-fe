"use client";

import { Button } from "@mantine/core";
export function NoActiveApplication({
  applicationId,
}: {
  applicationId: string;
}) {
  return (
    <section className={"grid place-content-center mt-16"}>
      <p className={"text-xl md:text-2xl font-light text-gray-800"}>
        Application with ID {applicationId} not found
      </p>

      <Button className={"justify-self-center"}>Go Back</Button>
    </section>
  );
}
