"use client";

import { useState } from "react";
import { LoanApplication, LoanApplicationStatus } from "@/types/loans";
import { sortTableData } from "@/lib/utils";
import { LoanApplicationsHeader } from "@/app/group/loans/applications/loans-applications-header";
import { LoanApplicationsTable } from "@/app/group/loans/applications/loan-applications-table";
import { ApplicationsTable } from "@/app/member/loans/applications/past-applications/applications-table";

type Props = {
  applications: LoanApplication[];
};

export function ApplicationsList({ applications: data }: Props) {
  const [sortedData, setSortedData] = useState(data);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<keyof LoanApplication | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof LoanApplication) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(
      sortTableData<LoanApplication>(data, { sortBy: field, reversed, search })
    );
  };

  const handleSearch = (searchedValue: string) => {
    setSearch(searchedValue);
    setSortedData(
      sortTableData<LoanApplication>(data, {
        sortBy,
        reversed: reverseSortDirection,
        search: searchedValue,
      })
    );
  };

  const handleFilter = (
    filteredValue: LoanApplicationStatus | LoanApplicationStatus[] | undefined
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
      sortTableData<LoanApplication>(data, {
        sortBy,
        reversed: reverseSortDirection,
        search: searchedValue,
      })
    );
  };

  return (
    <>
      <LoanApplicationsHeader
        searchValue={handleSearch}
        filterValue={handleFilter}
      />
      <LoanApplicationsTable
        applications={sortedData}
        setSorting={setSorting}
        sortBy={sortBy}
        reverseSortDirection={reverseSortDirection}
      />
    </>
  );
}
