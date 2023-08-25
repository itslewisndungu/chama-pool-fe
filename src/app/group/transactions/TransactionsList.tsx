"use client";

import { Transaction } from "@/types/transactions";
import { useState } from "react";
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  Button,
  Badge,
} from "@mantine/core";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
} from "@tabler/icons-react";
import {
  getFormattedCurrency,
  getFormattedDate,
  sortTableData,
} from "@/lib/utils";
import { Th } from "@/components/tables/SortableTableHead";

type Props = { transactions: Transaction[] };

export function TransactionsList({ transactions }: Props) {
  const [sortedData, setSortedData] = useState(transactions);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<keyof Transaction | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof Transaction) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(
      sortTableData<Transaction>(transactions, {
        sortBy: field,
        reversed,
        search,
      })
    );
  };

  const handleSearch = (searchedValue: string) => {
    setSearch(searchedValue);
    setSortedData(
      sortTableData<Transaction>(transactions, {
        sortBy,
        reversed: reverseSortDirection,
        search: searchedValue,
      })
    );
  };

  const rows = sortedData.map(transaction => (
    <tr key={transaction.id}>
      <td>{transaction.id}</td>
      <td>{getFormattedCurrency(transaction.amount)}</td>
      <td>{getFormattedDate(transaction.date)}</td>
      <td>
        <Badge>{transaction.type}</Badge>
      </td>
      <td>{transaction.description}</td>
    </tr>
  ));

  return (
    <ScrollArea>
      <TextInput
        placeholder="Search group transaction"
        mb="md"
        icon={<IconSearch size="0.9rem" stroke={1.5} />}
        value={search}
        onChange={event => handleSearch(event.currentTarget.value)}
      />
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        miw={700}
        sx={{ tableLayout: "fixed" }}
      >
        <thead>
          <tr>
            <Th
              sorted={sortBy === "id"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("id")}
            >
              ID
            </Th>
            <Th
              sorted={sortBy === "amount"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("amount")}
            >
              Amount
            </Th>
            <Th
              sorted={sortBy === "date"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("date")}
            >
              Date
            </Th>
            <Th
              sorted={sortBy === "type"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("type")}
            >
              Transaction type
            </Th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={5} align={"center"}>
                <p className={"text-xl md:text-2xl font-light text-gray-800"}>
                  No transactions found
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </ScrollArea>
  );
}
