"use client";

import { LoanApplication, LoanApprovalStatus } from "@/types/loans";
import { getFormattedCurrency } from "@/lib/utils";
import { Badge, Button, Modal, Table } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useDisclosure } from "@mantine/hooks";
import { UpdateApplicationStatusForm } from "./update-application-status-form";

interface Props {
  application: LoanApplication;
}

const StatusBadge = ({ status }: { status: LoanApprovalStatus }) => {
  return (
    <Badge
      color={
        status === LoanApprovalStatus.REJECTED
          ? "red"
          : LoanApprovalStatus.APPROVED
          ? "teal"
          : "blue"
      }
    >
      {status}
    </Badge>
  );
};

export function ApplicationSummary({ application }: Props) {
  const { approval } = application;
  const { data: session } = useSession();
  const [opened, { close, open }] = useDisclosure(false);

  const role = session?.user.roles.includes("CHAIRMAN")
    ? ("chairman" as keyof typeof approval)
    : session?.user.roles.includes("SECRETARY")
    ? ("secretary" as keyof typeof approval)
    : ("treasurer" as keyof typeof approval);

  return (
    <>
      <section className={"space-y-4 m-5"}>
        <h2 className={"mb-0 mt-1"}>Loan summary</h2>
        <div className={"flex flex-col my-1"}>
          <p className={"my-1 space-x-2"}>
            <span className={"text-gray-800 text-sm"}>Loan status:</span>
            <span>{application.status}</span>
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

        <h2 className={"m-0"}>Approval Summary</h2>

        <Table className={"max-w-4xl"} verticalSpacing={"md"}>
          <thead>
            <tr>
              <th>Stakeholder</th>
              <th>Approval status</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className={"font-bold text-gray-800"}>Chairman</td>
              <td>
                <StatusBadge status={approval.chairman.status} />
              </td>
              <td>{approval.chairman?.message ?? "No message yet"}</td>
              <td>
                {session?.user.roles.includes("CHAIRMAN") ? (
                  <Button onClick={open}>Update approval status</Button>
                ) : null}
              </td>
            </tr>

            <tr>
              <td className={"font-bold text-gray-800"}>Treasurer</td>
              <td>
                <StatusBadge status={approval.treasurer.status} />
              </td>
              <td>{approval.treasurer?.message ?? "No message yet"}</td>
              <td>
                {session?.user.roles.includes("TREASURER") ? (
                  <Button onClick={open}>Update approval status</Button>
                ) : null}
              </td>
            </tr>
            <tr>
              <td className={"font-bold text-gray-800"}>Secretary</td>
              <td>
                <StatusBadge status={approval.secretary.status} />
              </td>
              <td>{approval.secretary?.message ?? "No message yet"}</td>
              <td>
                {session?.user.roles.includes("SECRETARY") ? (
                  <Button onClick={open}>Update approval status</Button>
                ) : null}
              </td>
            </tr>
          </tbody>
        </Table>
      </section>

      <Modal
        opened={opened}
        onClose={close}
        withCloseButton
        title={
          <h2 className={"text-lg text-gray-800 m-0"}>
            Update loan application approval status
          </h2>
        }
      >
        <UpdateApplicationStatusForm
          loanId={application.id}
          close={close}
          approved={approval[role].status}
          message={approval[role].message}
        />
      </Modal>
    </>
  );
}
