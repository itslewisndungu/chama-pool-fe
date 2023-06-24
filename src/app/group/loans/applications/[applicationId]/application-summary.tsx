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
        status === LoanApprovalStatus.AWAITING_APPROVAL
          ? "blue"
          : LoanApprovalStatus.APPROVED
          ? "teal"
          : "red"
      }
    >
      {status}
    </Badge>
  );
};

export function ActiveApplicationSummary({ application }: Props) {
  const { approvals } = application;
  const { data: session } = useSession();
  const [opened, { close, open }] = useDisclosure(false);

  const role = session?.user.roles.includes("CHAIRMAN")
    ? ("chairman" as keyof typeof approvals)
    : session?.user.roles.includes("SECRETARY")
    ? ("secretary" as keyof typeof approvals)
    : ("treasurer" as keyof typeof approvals);

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
            <span>{application.reasonForApplication}</span>
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
                <StatusBadge status={approvals.chairman.status} />
              </td>
              <td>{approvals.chairman?.message ?? "No message yet"}</td>
              <td>
                {session?.user.roles.includes("CHAIRMAN") ? (
                  <Button onClick={open}>Update approval status</Button>
                ) : null}
              </td>
            </tr>

            <tr>
              <td className={"font-bold text-gray-800"}>Treasurer</td>
              <td>
                <StatusBadge status={approvals.treasurer.status} />
              </td>
              <td>{approvals.treasurer?.message ?? "No message yet"}</td>
              <td>
                {session?.user.roles.includes("TREASURER") ? (
                  <Button onClick={open}>Update approval status</Button>
                ) : null}
              </td>
            </tr>
            <tr>
              <td className={"font-bold text-gray-800"}>Secretary</td>
              <td>
                <StatusBadge status={approvals.secretary.status} />
              </td>
              <td>{approvals.secretary?.message ?? "No message yet"}</td>
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
          close={close}
          approved={approvals[role].status}
          message={approvals[role].message}
        />
      </Modal>
    </>
  );
}
