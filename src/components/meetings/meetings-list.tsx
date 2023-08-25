"use client";

import MeetingsListHeader from "./MeetingsListHeader";
import MeetingsListTable from "./MeetingsListTable";
import { useState } from "react";
import { Meeting, MeetingCategory } from "@/types/meetings";
import { sortTableData } from "@/lib/utils";

type Props = {
  meetings: Meeting[];
};

export const MeetingsList = ({ meetings }: Props) => {
  const [sortedData, setSortedData] = useState(meetings);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<keyof Meeting | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof Meeting) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(
      sortTableData<Meeting>(meetings, { sortBy: field, reversed, search })
    );
  };

  const handleSearch = (searchedValue: string) => {
    setSearch(searchedValue);
    setSortedData(
      sortTableData<Meeting>(meetings, {
        sortBy,
        reversed: reverseSortDirection,
        search: searchedValue,
      })
    );
  };

  return (
    <>
      <MeetingsListHeader search={handleSearch} />
      <MeetingsListTable
        meetings={sortedData}
        setSorting={setSorting}
        sortBy={sortBy}
        reverseSortDirection={reverseSortDirection}
      />
    </>
  );
};
