"use client";

import MeetingsListHeader from "./MeetingsListHeader";
import MeetingsListTable from "./MeetingsListTable";
import { keys } from "@mantine/utils";
import { useState } from "react";

type Props = {};

export interface Meeting {
  id: string;
  kind: string;
  date: string;
  agenda: string;
}

const data: Meeting[] = [
  {
    agenda: "Monthly meeting",
    date: "12-10-2021",
    id: "1",
    kind: "Regular",
  },
  {
    agenda: "Contribute to funeral",
    date: "12-10-2021",
    id: "2",
    kind: "Welfare",
  },
  {
    agenda: "Monthly meeting",
    date: "12-10-2021",
    id: "3",
    kind: "Regular",
  },
  {
    agenda: "Monthly meeting",
    date: "12-10-2021",
    id: "4",
    kind: "Regular",
  },
  {
    agenda: "Monthly meeting",
    date: "12-10-2021",
    id: "5",
    kind: "Regular",
  },
  {
    agenda: "Monthly meeting",
    date: "12-10-2021",
    id: "6",
    kind: "Regular",
  },
  {
    agenda: "Monthly meeting",
    date: "12-10-2021",
    id: "7",
    kind: "Regular",
  },
  {
    agenda: "Monthly meeting",
    date: "12-10-2021",
    id: "8",
    kind: "Regular",
  },
];

const MeetingsList = (props: Props) => {
  const [sortedData, setSortedData] = useState(data);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<keyof Meeting | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof Meeting) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    );
  };

  function filterData(data: Meeting[], search: string) {
    const query = search.toLowerCase().trim();
    return data.filter(item =>
      keys(data[0]).some(key => {
        return String(item[key]).toLowerCase().includes(query);
      })
    );
  }

  function sortData(
    data: Meeting[],
    payload: { sortBy: keyof Meeting | null; reversed: boolean; search: string }
  ) {
    const { sortBy } = payload;

    if (!sortBy) {
      return filterData(data, payload.search);
    }

    return filterData(
      [...data].sort((a, b) => {
        if (payload.reversed) {
          return b[sortBy].localeCompare(a[sortBy]);
        }

        return a[sortBy].localeCompare(b[sortBy]);
      }),
      payload.search
    );
  }

  return (
    <>
      <MeetingsListHeader />
      <MeetingsListTable
        data={sortedData}
        setSorting={setSorting}
        sortBy={sortBy}
        reverseSortDirection={reverseSortDirection}
      />
    </>
  );
};

export default MeetingsList;
