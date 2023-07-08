"use client";

import { Button, Paper, Text } from "@mantine/core";
import { getFormattedCurrency } from "@/lib/utils";

export function GroupLoansSummary() {
  return (
    <section className={"p-4 flex gap-4 flex-wrap"}>
      <Paper withBorder p="md" radius="md" className="flex-1 space-y-4">
        <Text size="xs" color="dimmed" className="uppercase font-bold">
          Loans
        </Text>

        <div>
          <p className={"m-0 space-x-2"}>
            <span className={"text-sm"}>Total number of loans issued:</span>
            <span className={"font-semibold"}>{120}</span>
          </p>
          <p className={"m-0 space-x-2"}>
            <span className={"text-sm"}>Total Amount borrowed: </span>
            <span className={"font-semibold"}>
              {getFormattedCurrency(520000)}
            </span>
          </p>
          <p className={"m-0 space-x-2"}>
            <span className={"text-sm"}>Total Amount repaid: </span>
            <span className={"font-semibold"}>
              {getFormattedCurrency(120000)}
            </span>
          </p>
        </div>

        <Button>View all loans</Button>
      </Paper>

      <Paper withBorder p="md" radius="md" className="flex-1 space-y-4 ">
        <Text size="xs" color="dimmed" className="uppercase font-bold">
          Loans Summary
        </Text>
        <div>
          <p className={"m-0 space-x-2"}>
            <span className={" text-sm"}>Active loans:</span>
            <span className={"font-semibold"}>{4}</span>
          </p>
          <p className={"m-0 space-x-2"}>
            <span className={" text-sm"}>Overdue loans:</span>
            <span className={"font-semibold"}>{1}</span>
          </p>
          <p className={"m-0 space-x-2"}>
            <span className={" text-sm"}>Repaid loans:</span>
            <span className={"font-semibold"}>{5}</span>
          </p>
          <p className={"m-0 space-x-2"}>
            <span className={" text-sm"}>Pending loan applications:</span>
            <span className={"font-semibold"}>{2}</span>
          </p>
        </div>
      </Paper>
    </section>
  );
}
