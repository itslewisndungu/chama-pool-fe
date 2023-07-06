"use client";

import { Badge, Table } from "@mantine/core";
import { getFormattedCurrency } from "@/lib/utils";
import { LoanApplication } from "@/types/loans";

type Props = { application: LoanApplication };

export function ActiveApplicationSummary({ application }: Props) {
  const { approval } = application;

  return (
    <section className={"space-y-4 m-5"}>
      <div>
        <h2 className={"mb-0 mt-1"}>Loan summary</h2>

        <div className={"flex flex-col my-1"}>
          <p className={"my-1 space-x-2"}>
            <span className={"text-gray-800 text-sm"}>Application status:</span>
            <span className={"capitalize"}>
              {application.status.split("_").join(" ").toLowerCase()}
            </span>
          </p>
          <p className={"my-1 space-x-2"}>
            <span className={"text-gray-800 text-sm"}>Loan amount:</span>
            <span>{getFormattedCurrency(application.amount)}</span>
          </p>
          <p className={"my-1 space-x-2"}>
            <span className={"text-gray-800 text-sm"}>
              Reason requesting loan:
            </span>
            <span>{application.reasonForLoan}</span>
          </p>
        </div>
      </div>

      <div>
        <h2 className={"m-0"}>Approval Summary</h2>

        <Table className={"max-w-4xl"} verticalSpacing={"md"}>
          <thead>
            <tr>
              <th>Stakeholder</th>
              <th>Approval status</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={"font-bold text-gray-800"}>Chairman</td>
              <td>
                <Badge>{approval.chairman.status}</Badge>
              </td>
              <td>
                {approval.chairman.message ?? (
                  <p className={"text-gray-700 text-sm capitalize m-0"}>
                    message not available
                  </p>
                )}
              </td>
            </tr>

            <tr>
              <td className={"font-bold text-gray-800"}>Treasurer</td>
              <td>
                <Badge>{approval.treasurer.status}</Badge>
              </td>
              <td>
                {approval.treasurer.message ?? (
                  <p className={"text-gray-700 text-sm capitalize m-0"}>
                    message not available
                  </p>
                )}
              </td>
            </tr>

            <tr>
              <td className={"font-bold text-gray-800"}>Secretary</td>
              <td>
                <Badge>{approval.secretary.status}</Badge>
              </td>
              <td>
                {approval.secretary.message ?? (
                  <p className={"text-gray-700 text-sm capitalize m-0"}>
                    message not available
                  </p>
                )}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </section>
  );
}
