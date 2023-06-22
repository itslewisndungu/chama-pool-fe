"use client";

import { LoansListHeader } from "@/app/(home)/loans/listings/loans-header";
import { LoansListTable } from "@/app/(home)/loans/listings/loans-list-table";
import { useState } from "react";
import { Loan, LoanStatus } from "@/app/(home)/loans/Loan";
import { sortTableData } from "@/lib/utils";

type Props = {
  loans: Loan[];
};

export function LoansList({ loans: data }: Props) {
  const [sortedData, setSortedData] = useState(data);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<keyof Loan | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof Loan) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(
      sortTableData<Loan>(data, { sortBy: field, reversed, search })
    );
  };

  const handleSearch = (searchedValue: string) => {
    setSearch(searchedValue);
    setSortedData(
      sortTableData<Loan>(data, {
        sortBy,
        reversed: reverseSortDirection,
        search: searchedValue,
      })
    );
  };

  const handleFilter = (
    filteredValue: LoanStatus | LoanStatus[] | undefined
  ) => {
    let searchedValue = "";

    if (filteredValue) {
      if (Array.isArray(filteredValue)) {
        // Handle an array of LoanStatus values
        searchedValue = filteredValue.join(",");
      } else {
        // Handle a single LoanStatus value
        searchedValue = filteredValue.toString();
      }
    }

    setSearch(searchedValue);
    setSortedData(
      sortTableData<Loan>(data, {
        sortBy,
        reversed: reverseSortDirection,
        search: searchedValue,
      })
    );
  };

  return (
    <>
      <LoansListHeader searchValue={handleSearch} filterValue={handleFilter} />
      <LoansListTable
        data={sortedData}
        setSorting={setSorting}
        sortBy={sortBy}
        reverseSortDirection={reverseSortDirection}
      />
    </>
  );
}
