"use client";

import { Badge, Table } from "@mantine/core";

export function ApprovalSummary() {
  return (
    <>
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
              <Badge>Awaiting Approval</Badge>
            </td>
            <td>N/A</td>
          </tr>

          <tr>
            <td className={"font-bold text-gray-800"}>Treasurer</td>
            <td>
              <Badge color={"teal"}>Approved</Badge>
            </td>
            <td>N/A</td>
          </tr>

          <tr>
            <td className={"font-bold text-gray-800"}>Secretary</td>
            <td>
              <Badge color={"red"}>Rejected</Badge>
            </td>
            <td>We do not trust you with this amounts of money</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
