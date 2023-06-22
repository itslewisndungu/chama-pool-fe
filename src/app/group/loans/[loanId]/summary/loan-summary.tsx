"use client";

import { getFormattedCurrency } from "@/lib/utils";
import { Badge } from "@mantine/core";

export function LoanSummary() {
  return (
    <span>
      <h2 className={"mb-0 font-light text-2xl"}>Loan Summary</h2>
      <div>
        <p className={"space-x-2"}>
          <span className={"font-bold text-sm"}>Amount borrowed:</span>
          <span>{getFormattedCurrency(15000)}</span>
        </p>
        <p className={"space-x-2"}>
          <span className={"font-bold text-sm"}>Loan duration:</span>
          <span>18-08-2022 to 18-10-2022</span>
        </p>
        <p className={"space-x-2"}>
          <span className={"font-bold text-sm"}>Loan interest rate:</span>
          <span>10 %</span>
        </p>
        <p className={"space-x-2"}>
          <span className={"font-bold text-sm"}>Interest earned:</span>
          <span>{getFormattedCurrency(15000 * 0.3)} </span>
        </p>
        <p className={"space-x-2"}>
          <span className={"font-bold text-sm"}>Total amount payable</span>
          <span>{getFormattedCurrency(15000 * 1.3)} </span>
        </p>
        <p className={"space-x-2"}>
          <span className={"font-bold text-sm"}>Loan Status:</span>
          <span>
            <Badge color={"teal"}>ACTIVE</Badge>
          </span>
        </p>
      </div>
    </span>
  );
}
