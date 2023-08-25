import { Table, Text, ScrollArea, rem, Button, Badge } from "@mantine/core";
import { LoanApplication, LoanApplicationStatus } from "@/types/loans";
import Link from "next/link";
import { getFormattedCurrency, getFormattedDate } from "@/lib/utils";
import { Th } from "@/components/tables/SortableTableHead";

type Props = {
  applications: LoanApplication[];
  setSorting: (field: keyof LoanApplication) => void;
  sortBy: keyof LoanApplication | null;
  reverseSortDirection: boolean;
};

export function ApplicationsTable({
  applications,
  setSorting,
  sortBy,
  reverseSortDirection,
}: Props) {
  const loansRows = applications.map((application, idx) => (
    <tr key={application.id}>
      <td>{idx + 1}</td>
      <td>{getFormattedCurrency(application.amount)}</td>
      <td>{getFormattedDate(application.applicationDate)}</td>
      <td>
        <Badge
          color={
            application.status === LoanApplicationStatus.AWAITING_APPROVAL
              ? "blue"
              : application.status === LoanApplicationStatus.APPROVED
              ? "green"
              : "red"
          }
        >
          {application.status}
        </Badge>
      </td>
      <td>
        <Button
          variant={"subtle"}
          component={Link}
          href={`/members/loans/applications/${application.id}`}
        >
          View Details
        </Button>
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        miw={700}
        sx={{ tableLayout: "fixed" }}
      >
        <thead>
          <tr>
            <th style={{ width: rem(60) }}>
              <Text fw={500} fz="sm">
                #
              </Text>
            </th>
            <Th
              sorted={sortBy === "amount"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("amount")}
            >
              Amount
            </Th>
            <Th
              sorted={sortBy === "amount"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("amount")}
            >
              Application Date
            </Th>
            <Th
              sorted={sortBy === "status"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("status")}
            >
              Status
            </Th>
            <th>
              <Text fw={500} fz="sm">
                Actions
              </Text>
            </th>
          </tr>
        </thead>
        <tbody>
          {loansRows.length > 0 ? (
            loansRows
          ) : (
            <tr>
              <td colSpan={6} align={"center"}>
                <p className={"text-xl md:text-2xl font-light text-gray-800"}>
                  You currently have no applications.
                </p>

                <Button
                  className={"justify-self-center"}
                  component={Link}
                  href={"/member/loans/apply"}
                >
                  Apply for a loan
                </Button>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </ScrollArea>
  );
}
