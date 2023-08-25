"use client";

import { NativeSelect, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";

type Props = {};

const MeetingsListHeader = (props: Props) => {
  const [search, setSearch] = useState<string>();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    // setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
    console.log({ searchedValue: value });
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget;
    // setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
    console.log({ sortedValue: value });
  };

  return (
    <div className="container flex gap-4 items-center">
      <div className="flex gap-2 items-center">
        <p className="">Showing</p>
        <NativeSelect
          onChange={handleFilterChange}
          data={[
            { label: "All meetings", value: "all-meetings", selected: true },
            { label: "Scheduled meetings", value: "scheduled-meetings" },
            { label: "Past meetings", value: "past-meetings" },
          ]}
        />
      </div>

      <TextInput
        className="flex-1"
        placeholder="Search meeting"
        icon={<IconSearch size="0.9rem" stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default MeetingsListHeader;
